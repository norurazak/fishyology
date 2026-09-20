"use client";

import {
  Wind,
  Gauge,
  Waves,
  Thermometer,
  Moon,
  Sunrise,
  Sunset,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { TripConditions as TripConditionsData } from "@/lib/conditions";
import { compassDirection } from "@/lib/conditions";
import { formatMalaysiaTime, formatWindow, isWindowActive } from "@/lib/solunar";
import { formatDuration, minutesUntil, type TideExtreme } from "@/lib/tides";
import TideCurve from "@/components/trips/TideCurve";

// National Hydrographic Centre e-Publication portal. Note jupem.gov.my also
// publishes tide tables but currently serves an unverifiable TLS certificate,
// so we don't send users there.
const TIDE_TABLE_URL = "https://ehydro.hydro.gov.my/index.php?path=61&route=product/category";

const SCORE_STYLES: Record<string, { bar: string; text: string }> = {
  Prime: { bar: "bg-[#408A71]", text: "text-[#408A71]" },
  Good: { bar: "bg-[#0077C0]", text: "text-[#0077C0]" },
  Fair: { bar: "bg-[#C08A00]", text: "text-[#C08A00]" },
  Slow: { bar: "bg-[#1D242B]/40", text: "text-[#1D242B]/60" },
};

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Wind;
  label: string;
  value: string;
  detail?: string | null;
}) {
  return (
    <div className="bg-white border border-[#1D242B]/10 rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50">
        <Icon className="w-3.5 h-3.5 text-[#0077C0]" />
        {label}
      </div>
      <div className="text-lg font-black text-[#1D242B] tracking-tight mt-1 tabular-nums">
        {value}
      </div>
      {detail && (
        <div className="text-xs text-[#1D242B]/60 leading-snug mt-0.5">{detail}</div>
      )}
    </div>
  );
}

function TideTurn({
  label,
  extreme,
  now,
}: {
  label: string;
  extreme: TideExtreme | null;
  now: Date;
}) {
  const away = extreme ? minutesUntil(extreme.time, now) : null;

  return (
    <div className="bg-[#F5F5F0] rounded-xl px-3 py-2">
      <span className="block text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50">
        {label}
      </span>
      {extreme ? (
        <>
          <span className="block text-base font-black text-[#1D242B] tabular-nums leading-tight mt-0.5">
            {formatMalaysiaTime(extreme.time) ?? "--:--"}
            {extreme.heightM !== null && (
              <span className="text-xs font-bold text-[#1D242B]/60 ml-1.5">
                {extreme.heightM.toFixed(1)} m
              </span>
            )}
          </span>
          {away !== null && (
            <span className="block text-xs text-[#1D242B]/60">in {formatDuration(away)}</span>
          )}
        </>
      ) : (
        <span className="block text-sm text-[#1D242B]/50 mt-0.5">—</span>
      )}
    </div>
  );
}

export default function TripConditions({
  conditions,
  isSaltwater,
}: {
  conditions: TripConditionsData;
  isSaltwater: boolean;
}) {
  const { weather, solunar, tide, generatedAt, activityScore, activityLabel } = conditions;
  const now = new Date(generatedAt);
  const style = SCORE_STYLES[activityLabel] ?? SCORE_STYLES.Fair;

  const trendIcon =
    weather?.pressureTrend === "rising"
      ? TrendingUp
      : weather?.pressureTrend === "falling"
        ? TrendingDown
        : Minus;
  const TrendIcon = trendIcon;

  const windDirection = compassDirection(weather?.windDirectionDeg ?? null);
  const majors = solunar.windows.filter((w) => w.kind === "major");
  const minors = solunar.windows.filter((w) => w.kind === "minor");

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/50 mb-3">
        Conditions &amp; feeding windows
      </h3>

      {/* Activity index */}
      <div className="bg-[#1D242B] rounded-2xl p-5 mb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C7EEFF]">
            Today&apos;s outlook
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/55 tabular-nums">
            {activityScore} / 100
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white tracking-tight">{activityLabel}</span>
          <span className="text-xs text-white/65">
            {solunar.moonIlluminationPct}% moon · {solunar.moonPhaseName}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/15 rounded-full mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full ${style.bar}`}
            style={{ width: `${activityScore}%` }}
          />
        </div>
        <p className="text-xs text-white/65 leading-relaxed mt-3">
          Blends solunar strength with barometric trend, wind and sea state. A guide to timing,
          not a guarantee — your guide makes the final call on the day.
        </p>
      </div>

      {/* Live metrics */}
      {weather ? (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {weather.windKnots != null && (
            <Metric
              icon={Wind}
              label="Wind"
              value={`${Math.round(weather.windKnots)} kts${windDirection ? ` ${windDirection}` : ""}`}
              detail={
                weather.windGustKnots != null
                  ? `Gusting ${Math.round(weather.windGustKnots)} kts`
                  : null
              }
            />
          )}
          {weather.pressureHpa != null && (
            <div className="bg-white border border-[#1D242B]/10 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50">
                <Gauge className="w-3.5 h-3.5 text-[#0077C0]" />
                Pressure
              </div>
              <div className="text-lg font-black text-[#1D242B] tracking-tight mt-1 tabular-nums">
                {Math.round(weather.pressureHpa)} hPa
              </div>
              {weather.pressureTrend && (
                <div
                  className={`flex items-center gap-1 text-xs mt-0.5 ${
                    weather.pressureTrend === "rising"
                      ? "text-[#408A71] font-semibold"
                      : "text-[#1D242B]/60"
                  }`}
                >
                  <TrendIcon className="w-3 h-3" />
                  <span className="capitalize">{weather.pressureTrend}</span>
                  {weather.pressureChangeHpa != null && (
                    <span className="tabular-nums">
                      ({weather.pressureChangeHpa > 0 ? "+" : ""}
                      {weather.pressureChangeHpa})
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
          {weather.waveHeightM != null && (
            <Metric
              icon={Waves}
              label="Swell"
              value={`${weather.waveHeightM.toFixed(1)} m`}
              detail={weather.waveHeightM > 1.5 ? "Choppy — check with us" : "Workable"}
            />
          )}
          {weather.seaTempC != null && (
            <Metric icon={Thermometer} label="Sea temp" value={`${weather.seaTempC.toFixed(1)}°C`} />
          )}
          {weather.seaTempC == null && weather.airTempC != null && (
            <Metric icon={Thermometer} label="Air temp" value={`${weather.airTempC.toFixed(1)}°C`} />
          )}
        </div>
      ) : (
        <p className="text-sm text-[#1D242B]/60 bg-white border border-[#1D242B]/10 rounded-xl p-3 mb-3">
          Live weather is unavailable right now — the feeding windows below are calculated and
          remain accurate.
        </p>
      )}

      {/* Feeding windows */}
      <div className="bg-white border border-[#1D242B]/10 rounded-2xl p-4 mb-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50 mb-3">
          <Moon className="w-3.5 h-3.5 text-[#0077C0]" />
          Peak feeding windows — today
        </div>

        <ul className="flex flex-col gap-1.5">
          {majors.concat(minors).length === 0 && (
            <li className="text-sm text-[#1D242B]/60">
              No lunar windows fall within today at this location.
            </li>
          )}
          {majors.map((window) => {
            const active = isWindowActive(window);
            return (
              <li
                key={`${window.driver}-${window.start}`}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 ${
                  active ? "bg-[#408A71]/12 border border-[#408A71]/30" : "bg-[#F5F5F0]"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <Star className="w-3.5 h-3.5 text-[#408A71] flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#408A71]">
                    Major
                  </span>
                  <span className="text-xs text-[#1D242B]/60 truncate">{window.driver}</span>
                </span>
                <span className="text-sm font-bold text-[#1D242B] tabular-nums whitespace-nowrap">
                  {formatWindow(window)}
                </span>
              </li>
            );
          })}
          {minors.map((window) => {
            const active = isWindowActive(window);
            return (
              <li
                key={`${window.driver}-${window.start}`}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 ${
                  active ? "bg-[#0077C0]/10 border border-[#0077C0]/25" : "bg-[#F5F5F0]"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077C0] flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/60">
                    Minor
                  </span>
                  <span className="text-xs text-[#1D242B]/60 truncate">{window.driver}</span>
                </span>
                <span className="text-sm font-bold text-[#1D242B]/80 tabular-nums whitespace-nowrap">
                  {formatWindow(window)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-3 border-t border-[#1D242B]/8 text-xs text-[#1D242B]/60">
          {solunar.sunrise && (
            <span className="inline-flex items-center gap-1">
              <Sunrise className="w-3.5 h-3.5 text-[#0077C0]" />
              Sunrise {formatMalaysiaTime(solunar.sunrise)}
            </span>
          )}
          {solunar.sunset && (
            <span className="inline-flex items-center gap-1">
              <Sunset className="w-3.5 h-3.5 text-[#0077C0]" />
              Sunset {formatMalaysiaTime(solunar.sunset)}
            </span>
          )}
          <span className="text-[11px] uppercase tracking-widest">MYT (UTC+8)</span>
        </div>
      </div>

      {/* Tide */}
      {isSaltwater && (
        <div className="bg-white border border-[#1D242B]/10 rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50">
              <Waves className="w-3.5 h-3.5 text-[#0077C0]" />
              Tide
            </span>
            {tide?.state && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest ${
                  tide.state === "rising" ? "text-[#408A71]" : "text-[#0077C0]"
                }`}
              >
                {tide.state === "rising" ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {tide.state}
              </span>
            )}
          </div>

          {tide ? (
            <>
              <TideCurve curve={tide.curve} nowIso={generatedAt} />

              <div className="grid grid-cols-2 gap-2 mt-3">
                <TideTurn label="Next high" extreme={tide.nextHigh} now={now} />
                <TideTurn label="Next low" extreme={tide.nextLow} now={now} />
              </div>

              <p className="text-xs text-[#1D242B]/50 leading-relaxed mt-3">
                {tide.source === "worldtides" ? (
                  <>
                    {tide.stationName
                      ? `Station ${tide.stationName} · `
                      : "Harmonic prediction · "}
                    {tide.datum === "CD"
                      ? "heights to Chart Datum, matching official Malaysian tide tables."
                      : "heights to mean sea level."}
                  </>
                ) : (
                  <>
                    Model estimate (Open-Meteo), referenced to mean sea level — not Chart Datum,
                    so heights won&apos;t match printed tide tables. Use it for timing, not
                    navigation.
                  </>
                )}
              </p>
            </>
          ) : (
            <p className="text-sm text-[#1D242B]/60">
              Tide data is unavailable for this location right now.
            </p>
          )}

          <a
            href={TIDE_TABLE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0077C0] hover:text-[#1D242B] transition-colors mt-2"
          >
            Official NHC tide tables
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      )}

      <p className="text-xs text-[#1D242B]/45 leading-relaxed mt-3">
        Weather from Open-Meteo, updated hourly
        {weather?.observedAt ? ` · last reading ${weather.observedAt.replace("T", " ")} MYT` : ""}.
        Sun, moon and feeding windows calculated for this trip&apos;s coordinates.
      </p>
    </div>
  );
}
