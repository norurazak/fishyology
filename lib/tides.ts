import type { Coordinates } from "@/lib/trips";
import { MALAYSIA_TIMEZONE } from "@/lib/solunar";

/**
 * Tide data comes from one of two providers:
 *
 *   WORLDTIDES_API_KEY set → station-based harmonic predictions in Chart Datum,
 *                            so heights reconcile with official Malaysian tables.
 *          otherwise       → Open-Meteo's MeteoFrance SMOC model, free and
 *                            key-less, but referenced to mean sea level and
 *                            explicitly "not suitable for coastal navigation".
 *
 * Both are normalised to the same shape, and a WorldTides failure falls back to
 * the free source rather than dropping the section.
 */

export type TideDatum = "CD" | "MSL";
export type TideState = "rising" | "falling";

export interface TideExtreme {
  time: string;
  type: "high" | "low";
  heightM: number | null;
}

export interface TidePoint {
  /** Epoch milliseconds. */
  t: number;
  h: number;
}

export interface TideReading {
  source: "worldtides" | "open-meteo";
  datum: TideDatum;
  /** Present only when a real tide gauge backed the prediction. */
  stationName: string | null;
  state: TideState | null;
  currentHeightM: number | null;
  nextHigh: TideExtreme | null;
  nextLow: TideExtreme | null;
  /** Sampled curve spanning a few hours either side of now, for the sparkline. */
  curve: TidePoint[];
}

/** Astronomical predictions don't change, so a week's worth is cached a week. */
const WORLDTIDES_REVALIDATE = 6 * 24 * 3600;
const OPEN_METEO_REVALIDATE = 6 * 3600;

const CURVE_HOURS_BEFORE = 3;
const CURVE_HOURS_AFTER = 15;

async function fetchJson<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const response = await fetch(url, { next: { revalidate } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Series maths — shared by both providers
// ---------------------------------------------------------------------------

/** Linear interpolation of the tide height at an arbitrary instant. */
function heightAt(series: TidePoint[], at: number): number | null {
  if (series.length < 2) return null;
  if (at < series[0].t || at > series[series.length - 1].t) return null;

  for (let i = 1; i < series.length; i++) {
    const previous = series[i - 1];
    const current = series[i];
    if (at <= current.t) {
      const span = current.t - previous.t;
      if (span <= 0) return current.h;
      const fraction = (at - previous.t) / span;
      return previous.h + fraction * (current.h - previous.h);
    }
  }
  return null;
}

function stateAt(series: TidePoint[], at: number): TideState | null {
  const before = heightAt(series, at - 30 * 60 * 1000);
  const after = heightAt(series, at + 30 * 60 * 1000);
  if (before === null || after === null) return null;
  if (Math.abs(after - before) < 0.005) return null;
  return after > before ? "rising" : "falling";
}

/**
 * Locates highs and lows as turning points in the series. Because tides are
 * locally parabolic around an extreme, fitting a parabola through the three
 * samples spanning the turn recovers the true time and height to within a few
 * minutes even from hourly data.
 */
function findExtremes(series: TidePoint[]): TideExtreme[] {
  const extremes: TideExtreme[] = [];

  for (let i = 1; i < series.length - 1; i++) {
    const previous = series[i - 1];
    const current = series[i];
    const next = series[i + 1];

    const isHigh = current.h > previous.h && current.h >= next.h;
    const isLow = current.h < previous.h && current.h <= next.h;
    if (!isHigh && !isLow) continue;

    // Vertex of the parabola through the three points, as an offset in samples.
    const denominator = previous.h - 2 * current.h + next.h;
    let offset = 0;
    if (Math.abs(denominator) > 1e-9) {
      offset = (0.5 * (previous.h - next.h)) / denominator;
      if (!Number.isFinite(offset) || Math.abs(offset) > 1) offset = 0;
    }

    const step = offset >= 0 ? next.t - current.t : current.t - previous.t;
    const time = current.t + offset * step;
    const height = current.h - 0.25 * (previous.h - next.h) * offset;

    extremes.push({
      time: new Date(time).toISOString(),
      type: isHigh ? "high" : "low",
      heightM: Number(height.toFixed(2)),
    });
  }

  return extremes;
}

function buildReading(
  series: TidePoint[],
  meta: Pick<TideReading, "source" | "datum" | "stationName">,
  providedExtremes: TideExtreme[] | null,
  now: number
): TideReading | null {
  if (series.length < 3) return null;

  const extremes = providedExtremes ?? findExtremes(series);
  const upcoming = extremes
    .filter((extreme) => Date.parse(extreme.time) > now)
    .sort((a, b) => a.time.localeCompare(b.time));

  const currentHeight = heightAt(series, now);
  const windowStart = now - CURVE_HOURS_BEFORE * 3600 * 1000;
  const windowEnd = now + CURVE_HOURS_AFTER * 3600 * 1000;

  return {
    ...meta,
    state: stateAt(series, now),
    currentHeightM: currentHeight === null ? null : Number(currentHeight.toFixed(2)),
    nextHigh: upcoming.find((extreme) => extreme.type === "high") ?? null,
    nextLow: upcoming.find((extreme) => extreme.type === "low") ?? null,
    curve: series.filter((point) => point.t >= windowStart && point.t <= windowEnd),
  };
}

// ---------------------------------------------------------------------------
// Open-Meteo (free fallback)
// ---------------------------------------------------------------------------

interface OpenMeteoTideResponse {
  hourly?: {
    time?: string[];
    sea_level_height_msl?: (number | null)[];
  };
}

async function fetchOpenMeteoTides(
  coordinates: Coordinates,
  now: number
): Promise<TideReading | null> {
  const url =
    `https://marine-api.open-meteo.com/v1/marine?latitude=${coordinates.lat}` +
    `&longitude=${coordinates.lon}&hourly=sea_level_height_msl&forecast_days=3` +
    `&timezone=${encodeURIComponent(MALAYSIA_TIMEZONE)}`;

  const data = await fetchJson<OpenMeteoTideResponse>(url, OPEN_METEO_REVALIDATE);
  const times = data?.hourly?.time;
  const heights = data?.hourly?.sea_level_height_msl;
  if (!times || !heights) return null;

  const series: TidePoint[] = [];
  for (let i = 0; i < times.length; i++) {
    const height = heights[i];
    if (height == null) continue;
    // Open-Meteo returns wall-clock time for the requested zone, not UTC.
    const t = Date.parse(`${times[i]}:00+08:00`);
    if (Number.isNaN(t)) continue;
    series.push({ t, h: height });
  }

  // Inland points come back as an all-null series — no tide to show.
  if (series.length < 3) return null;

  return buildReading(
    series,
    { source: "open-meteo", datum: "MSL", stationName: null },
    null,
    now
  );
}

// ---------------------------------------------------------------------------
// WorldTides (official, key-gated)
// ---------------------------------------------------------------------------

interface WorldTidesResponse {
  status?: number;
  station?: string;
  responseDatum?: string;
  heights?: { dt?: number; height?: number }[];
  extremes?: { dt?: number; height?: number; type?: string }[];
}

async function fetchWorldTides(
  coordinates: Coordinates,
  apiKey: string,
  now: number
): Promise<TideReading | null> {
  const url =
    `https://www.worldtides.info/api/v3?heights&extremes&days=7&datum=CD` +
    `&lat=${coordinates.lat}&lon=${coordinates.lon}&key=${encodeURIComponent(apiKey)}`;

  const data = await fetchJson<WorldTidesResponse>(url, WORLDTIDES_REVALIDATE);
  if (!data || (data.status != null && data.status !== 200)) return null;

  const series: TidePoint[] = (data.heights ?? [])
    .filter((point): point is { dt: number; height: number } =>
      typeof point.dt === "number" && typeof point.height === "number"
    )
    .map((point) => ({ t: point.dt * 1000, h: point.height }));

  if (series.length < 3) return null;

  const extremes: TideExtreme[] = (data.extremes ?? [])
    .filter((extreme): extreme is { dt: number; height: number; type: string } =>
      typeof extreme.dt === "number" && typeof extreme.type === "string"
    )
    .map((extreme) => ({
      time: new Date(extreme.dt * 1000).toISOString(),
      type: extreme.type.toLowerCase() === "high" ? "high" : "low",
      heightM: typeof extreme.height === "number" ? Number(extreme.height.toFixed(2)) : null,
    }));

  return buildReading(
    series,
    {
      source: "worldtides",
      datum: data.responseDatum === "CD" ? "CD" : "MSL",
      stationName: data.station ?? null,
    },
    extremes.length > 0 ? extremes : null,
    now
  );
}

export async function getTideReading(
  coordinates: Coordinates,
  now: Date = new Date()
): Promise<TideReading | null> {
  const timestamp = now.getTime();
  const apiKey = process.env.WORLDTIDES_API_KEY;

  if (apiKey) {
    const official = await fetchWorldTides(coordinates, apiKey, timestamp);
    if (official) return official;
    // Key present but the call failed — fall through to the free source rather
    // than dropping tides entirely.
  }

  return fetchOpenMeteoTides(coordinates, timestamp);
}

/** Minutes until an extreme, for "next low in 2h 15m" style copy. */
export function minutesUntil(isoTime: string, now: Date = new Date()): number | null {
  const delta = Date.parse(isoTime) - now.getTime();
  if (Number.isNaN(delta) || delta < 0) return null;
  return Math.round(delta / 60000);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) return `${remainder}m`;
  if (remainder === 0) return `${hours}h`;
  return `${hours}h ${remainder}m`;
}
