import type { Coordinates } from "@/lib/trips";
import {
  MALAYSIA_TIMEZONE,
  getSolunarReading,
  type SolunarReading,
} from "@/lib/solunar";
import { getTideReading, type TideReading } from "@/lib/tides";

/** Open-Meteo is free and key-less; we cache each point for an hour. */
const REVALIDATE_SECONDS = 3600;

export type PressureTrend = "rising" | "falling" | "steady";

export interface WeatherReading {
  observedAt: string;
  airTempC: number | null;
  pressureHpa: number | null;
  pressureTrend: PressureTrend | null;
  pressureChangeHpa: number | null;
  windKnots: number | null;
  windGustKnots: number | null;
  windDirectionDeg: number | null;
  /** Null inland — the marine model only covers open water. */
  waveHeightM: number | null;
  seaTempC: number | null;
}

export interface TripConditions {
  weather: WeatherReading | null;
  solunar: SolunarReading;
  /** Null for freshwater trips, and wherever no provider has data. */
  tide: TideReading | null;
  /** Rendered at request time so the client marks "now" on the tide curve. */
  generatedAt: string;
  /** 0–100 blend of solunar strength and weather favourability. */
  activityScore: number;
  activityLabel: string;
}

export const COMPASS_POINTS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
] as const;

export function compassDirection(degrees: number | null): string | null {
  if (degrees === null || !Number.isFinite(degrees)) return null;
  const index = Math.round(((degrees % 360) + 360) % 360 / 22.5) % 16;
  return COMPASS_POINTS[index];
}

interface ForecastResponse {
  current?: {
    time?: string;
    temperature_2m?: number | null;
    surface_pressure?: number | null;
    wind_speed_10m?: number | null;
    wind_direction_10m?: number | null;
    wind_gusts_10m?: number | null;
  };
  hourly?: {
    time?: string[];
    surface_pressure?: (number | null)[];
  };
}

interface MarineResponse {
  current?: {
    wave_height?: number | null;
    sea_surface_temperature?: number | null;
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // The page must still render if the weather service is unreachable.
    return null;
  }
}

/**
 * Compares the current reading against roughly three hours earlier. A rising
 * barometer typically precedes active feeding; a sharp fall shuts it down.
 */
function derivePressureTrend(
  forecast: ForecastResponse
): { trend: PressureTrend | null; change: number | null } {
  const current = forecast.current?.surface_pressure;
  const times = forecast.hourly?.time;
  const series = forecast.hourly?.surface_pressure;

  if (current == null || !times || !series || times.length === 0) {
    return { trend: null, change: null };
  }

  const currentTime = forecast.current?.time
    ? Date.parse(`${forecast.current.time}:00`)
    : NaN;
  if (Number.isNaN(currentTime)) return { trend: null, change: null };

  const targetTime = currentTime - 3 * 60 * 60 * 1000;

  let closestIndex = -1;
  let closestGap = Infinity;
  for (let i = 0; i < times.length; i++) {
    if (series[i] == null) continue;
    const gap = Math.abs(Date.parse(`${times[i]}:00`) - targetTime);
    if (gap < closestGap) {
      closestGap = gap;
      closestIndex = i;
    }
  }

  if (closestIndex === -1) return { trend: null, change: null };

  const previous = series[closestIndex];
  if (previous == null) return { trend: null, change: null };

  const change = Number((current - previous).toFixed(1));
  if (change > 0.5) return { trend: "rising", change };
  if (change < -0.5) return { trend: "falling", change };
  return { trend: "steady", change };
}

/**
 * Folds weather into the solunar baseline. Deliberately conservative: the
 * solunar score dominates, and weather nudges it within a limited band so the
 * number never implies more precision than the inputs support.
 */
function scoreActivity(solunar: SolunarReading, weather: WeatherReading | null): number {
  let score = solunar.solunarScore;
  if (!weather) return Math.max(0, Math.min(100, Math.round(score)));

  if (weather.pressureTrend === "rising") score += 8;
  else if (weather.pressureTrend === "falling") score -= 6;

  // Light to moderate wind puts chop on the surface and encourages feeding;
  // a flat calm or a blow both hurt.
  if (weather.windKnots != null) {
    if (weather.windKnots >= 5 && weather.windKnots <= 15) score += 6;
    else if (weather.windKnots > 22) score -= 12;
    else if (weather.windKnots < 2) score -= 4;
  }

  // Big swell makes bait presentation and boat handling difficult.
  if (weather.waveHeightM != null) {
    if (weather.waveHeightM > 2) score -= 14;
    else if (weather.waveHeightM > 1.25) score -= 6;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function activityLabel(score: number): string {
  if (score >= 80) return "Prime";
  if (score >= 65) return "Good";
  if (score >= 45) return "Fair";
  return "Slow";
}

async function fetchWeather(coordinates: Coordinates): Promise<WeatherReading | null> {
  const { lat, lon } = coordinates;
  const common = `latitude=${lat}&longitude=${lon}&timezone=${encodeURIComponent(MALAYSIA_TIMEZONE)}`;

  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?${common}` +
    "&current=temperature_2m,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m" +
    "&hourly=surface_pressure&forecast_days=1&past_hours=6&wind_speed_unit=kn";

  const marineUrl =
    `https://marine-api.open-meteo.com/v1/marine?${common}` +
    "&current=wave_height,sea_surface_temperature";

  const [forecast, marine] = await Promise.all([
    fetchJson<ForecastResponse>(forecastUrl),
    fetchJson<MarineResponse>(marineUrl),
  ]);

  if (!forecast?.current) return null;

  const { trend, change } = derivePressureTrend(forecast);

  return {
    observedAt: forecast.current.time ?? "",
    airTempC: forecast.current.temperature_2m ?? null,
    pressureHpa: forecast.current.surface_pressure ?? null,
    pressureTrend: trend,
    pressureChangeHpa: change,
    windKnots: forecast.current.wind_speed_10m ?? null,
    windGustKnots: forecast.current.wind_gusts_10m ?? null,
    windDirectionDeg: forecast.current.wind_direction_10m ?? null,
    waveHeightM: marine?.current?.wave_height ?? null,
    seaTempC: marine?.current?.sea_surface_temperature ?? null,
  };
}

export async function getTripConditions(
  coordinates: Coordinates,
  { includeTides = false }: { includeTides?: boolean } = {}
): Promise<TripConditions> {
  const [weather, tide] = await Promise.all([
    fetchWeather(coordinates),
    includeTides ? getTideReading(coordinates) : Promise.resolve(null),
  ]);

  const solunar = getSolunarReading(coordinates);
  const activityScore = scoreActivity(solunar, weather);

  return {
    weather,
    solunar,
    tide,
    generatedAt: new Date().toISOString(),
    activityScore,
    activityLabel: activityLabel(activityScore),
  };
}
