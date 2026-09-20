"use client";

import type { TidePoint } from "@/lib/tides";

const WIDTH = 300;
const HEIGHT = 64;
const PADDING_Y = 8;

/**
 * Draws the tide curve across the window the reading covers, with a marker at
 * the current moment. Deliberately unlabelled on the vertical axis — the datum
 * varies by provider, so the shape is the message, not the absolute height.
 */
export default function TideCurve({
  curve,
  nowIso,
}: {
  curve: TidePoint[];
  nowIso: string;
}) {
  if (curve.length < 2) return null;

  const times = curve.map((point) => point.t);
  const heights = curve.map((point) => point.h);

  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const minHeight = Math.min(...heights);
  const maxHeight = Math.max(...heights);

  const timeSpan = maxTime - minTime || 1;
  const heightSpan = maxHeight - minHeight || 1;

  const toX = (t: number) => ((t - minTime) / timeSpan) * WIDTH;
  const toY = (h: number) =>
    HEIGHT - PADDING_Y - ((h - minHeight) / heightSpan) * (HEIGHT - PADDING_Y * 2);

  const linePath = curve
    .map((point, index) => `${index === 0 ? "M" : "L"}${toX(point.t).toFixed(1)},${toY(point.h).toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;

  const now = Date.parse(nowIso);
  const hasNow = Number.isFinite(now) && now >= minTime && now <= maxTime;
  const nowX = hasNow ? toX(now) : null;

  // Interpolate the marker's height so the dot sits on the curve.
  let nowY: number | null = null;
  if (hasNow) {
    for (let i = 1; i < curve.length; i++) {
      if (now <= curve[i].t) {
        const previous = curve[i - 1];
        const current = curve[i];
        const span = current.t - previous.t || 1;
        const fraction = (now - previous.t) / span;
        nowY = toY(previous.h + fraction * (current.h - previous.h));
        break;
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Tide curve for the hours around now"
      className="w-full h-16"
    >
      <defs>
        <linearGradient id="tide-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0077C0" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0077C0" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill="url(#tide-fill)" />
      <path
        d={linePath}
        fill="none"
        stroke="#0077C0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {nowX !== null && nowY !== null && (
        <>
          <line
            x1={nowX}
            y1="0"
            x2={nowX}
            y2={HEIGHT}
            stroke="#1D242B"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={nowX} cy={nowY} r="4" fill="#1D242B" stroke="#FAFAFA" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
