import * as SunCalc from "suncalc";
import type { Coordinates } from "@/lib/trips";

export const MALAYSIA_TIMEZONE = "Asia/Kuala_Lumpur";
const MALAYSIA_UTC_OFFSET_MS = 8 * 60 * 60 * 1000;


export interface TimeWindow {
  /** ISO instants — formatted for display by the caller. */
  start: string;
  end: string;
  kind: "major" | "minor";
  /** What drives this window: the moon overhead, underfoot, or on the horizon. */
  driver: string;
}

export interface SolunarReading {
  sunrise: string | null;
  sunset: string | null;
  moonrise: string | null;
  moonset: string | null;
  /** 0–100, rounded. */
  moonIlluminationPct: number;
  moonPhaseName: string;
  windows: TimeWindow[];
  /** 0–100. How strong today's solunar influence is, before weather is folded in. */
  solunarScore: number;
}

/**
 * Solunar theory holds that fish feed most actively when the moon is directly
 * overhead (transit) or directly opposite underfoot — the "major" periods —
 * and less so at moonrise and moonset, the "minor" periods. The effect is
 * strongest at new and full moon, when lunar and solar pull align.
 *
 * Malaysian trips are all in UTC+8, so times are computed against that offset.
 */

function toMalaysiaTime(date: Date): Date {
  return new Date(date.getTime() + MALAYSIA_UTC_OFFSET_MS);
}

/** Formats an instant as HH:MM in Malaysian local time. */
export function formatMalaysiaTime(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const shifted = toMalaysiaTime(date);
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const minutes = String(shifted.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function phaseName(phase: number): string {
  // SunCalc phase: 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter.
  if (phase < 0.03 || phase > 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

interface MoonEvents {
  transit: Date | null;
  underfoot: Date | null;
  rise: Date | null;
  set: Date | null;
}

/**
 * Derives all four lunar events from a single altitude scan across the local
 * day: the highest and lowest points (transit and underfoot) and the horizon
 * crossings (moonrise and moonset).
 *
 * We scan rather than call SunCalc.getMoonTimes because that function buckets
 * its search by midnight in either UTC or the *server's* timezone — neither of
 * which is the Malaysian day, so it returns the wrong day's rise/set for a
 * UTC+8 location. Scanning keeps every event strictly inside the local day.
 *
 * Ten-minute steps with linear interpolation at the crossings put each event
 * within about a minute, far finer than the feeding windows built around them.
 */
function scanMoonEvents(dayStart: Date, coordinates: Coordinates): MoonEvents {
  const STEP_MS = 10 * 60 * 1000;
  const STEPS = (24 * 60) / 10;

  let highest = -Infinity;
  let lowest = Infinity;
  const events: MoonEvents = { transit: null, underfoot: null, rise: null, set: null };

  let previousAltitude: number | null = null;
  let previousMoment: Date | null = null;

  for (let i = 0; i <= STEPS; i++) {
    const moment = new Date(dayStart.getTime() + i * STEP_MS);
    const { altitude } = SunCalc.getMoonPosition(moment, coordinates.lat, coordinates.lon);

    if (altitude > highest) {
      highest = altitude;
      events.transit = moment;
    }
    if (altitude < lowest) {
      lowest = altitude;
      events.underfoot = moment;
    }

    if (previousAltitude !== null && previousMoment !== null) {
      const crossedUp = previousAltitude < 0 && altitude >= 0;
      const crossedDown = previousAltitude >= 0 && altitude < 0;

      if (crossedUp || crossedDown) {
        // Interpolate the zero crossing between the two samples.
        const fraction = previousAltitude / (previousAltitude - altitude);
        const crossing = new Date(previousMoment.getTime() + fraction * STEP_MS);
        if (crossedUp && !events.rise) events.rise = crossing;
        if (crossedDown && !events.set) events.set = crossing;
      }
    }

    previousAltitude = altitude;
    previousMoment = moment;
  }

  return events;
}

function windowAround(centre: Date, halfWidthMinutes: number, kind: TimeWindow["kind"], driver: string): TimeWindow {
  const halfWidthMs = halfWidthMinutes * 60 * 1000;
  return {
    start: new Date(centre.getTime() - halfWidthMs).toISOString(),
    end: new Date(centre.getTime() + halfWidthMs).toISOString(),
    kind,
    driver,
  };
}

/**
 * Scores the day's solunar strength. Peaks at new and full moon (aligned
 * lunar/solar pull, spring tides) and bottoms out at the quarters.
 */
function scoreDay(phase: number): number {
  // Distance from the nearest syzygy (new or full), 0 → aligned, 0.25 → quarter.
  const distanceFromSyzygy = Math.min(
    Math.abs(phase - 0),
    Math.abs(phase - 0.5),
    Math.abs(phase - 1)
  );
  const alignment = 1 - distanceFromSyzygy / 0.25; // 1 at syzygy, 0 at quarter
  return Math.round(45 + alignment * 45);
}

export function getSolunarReading(coordinates: Coordinates, now: Date = new Date()): SolunarReading {
  // Anchor to the start of the local (UTC+8) day, expressed as a real instant.
  const localNow = toMalaysiaTime(now);
  const dayStart = new Date(
    Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate()) -
      MALAYSIA_UTC_OFFSET_MS
  );

  const sunTimes = SunCalc.getTimes(
    new Date(dayStart.getTime() + 12 * 60 * 60 * 1000),
    coordinates.lat,
    coordinates.lon
  );
  const illumination = SunCalc.getMoonIllumination(dayStart);
  const moonTimes = scanMoonEvents(dayStart, coordinates);
  const { transit, underfoot } = moonTimes;

  const windows: TimeWindow[] = [];
  // Majors run roughly two hours either side of the moon's transit/underfoot;
  // minors about an hour either side of moonrise/moonset.
  if (transit) windows.push(windowAround(transit, 75, "major", "Moon overhead"));
  if (underfoot) windows.push(windowAround(underfoot, 75, "major", "Moon underfoot"));
  if (moonTimes.rise) windows.push(windowAround(moonTimes.rise, 45, "minor", "Moonrise"));
  if (moonTimes.set) windows.push(windowAround(moonTimes.set, 45, "minor", "Moonset"));

  windows.sort((a, b) => a.start.localeCompare(b.start));

  const toIso = (value: Date | undefined | null): string | null =>
    value instanceof Date && !Number.isNaN(value.getTime()) ? value.toISOString() : null;

  return {
    sunrise: toIso(sunTimes.sunrise),
    sunset: toIso(sunTimes.sunset),
    moonrise: toIso(moonTimes.rise),
    moonset: toIso(moonTimes.set),
    moonIlluminationPct: Math.round(illumination.fraction * 100),
    moonPhaseName: phaseName(illumination.phase),
    windows,
    solunarScore: scoreDay(illumination.phase),
  };
}

/** True when `now` falls inside the window — used to highlight the live one. */
export function isWindowActive(window: TimeWindow, now: Date = new Date()): boolean {
  const time = now.getTime();
  return time >= Date.parse(window.start) && time <= Date.parse(window.end);
}

export function formatWindow(window: TimeWindow): string {
  return `${formatMalaysiaTime(window.start) ?? "--:--"} – ${formatMalaysiaTime(window.end) ?? "--:--"}`;
}
