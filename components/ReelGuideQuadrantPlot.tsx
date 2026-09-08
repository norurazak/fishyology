"use client";

import { useMemo, useRef, useState } from "react";
import {
  AXES,
  AxisKey,
  BRAND_COLORS,
  BRANDS,
  DRAG_AXES,
  POINTS,
  QUAD_LABELS,
  ReelPoint,
  dragText,
  median,
} from "@/lib/reelGuideData";

const AXIS_OPTIONS = Object.entries(AXES) as [AxisKey, (typeof AXES)[AxisKey]][];

const W = 760;
const H = 520;
const PAD_L = 64;
const PAD_R = 22;
const PAD_T = 30;
const PAD_B = 58;
const PW = W - PAD_L - PAD_R;
const PH = H - PAD_T - PAD_B;

interface PlottedPoint {
  point: ReelPoint;
  cx: number;
  cy: number;
}

interface Tooltip {
  point: ReelPoint;
  left: number;
  top: number;
}

export default function ReelGuideQuadrantPlot() {
  const [xAxis, setXAxis] = useState<AxisKey>("price");
  const [yAxis, setYAxis] = useState<AxisKey>("wMin");
  const [showLabels, setShowLabels] = useState(false);
  const [offBrands, setOffBrands] = useState<Set<string>>(new Set());
  const [pinned, setPinned] = useState<ReelPoint | null>(null);
  const [hovered, setHovered] = useState<ReelPoint | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const toggleBrand = (id: string) => {
    setOffBrands((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const ax = AXES[xAxis];
  const ay = AXES[yAxis];

  const eligible = useMemo(() => POINTS.filter((p) => !offBrands.has(p.brand)).length, [offBrands]);
  const usesDragAxis = DRAG_AXES.has(xAxis) || DRAG_AXES.has(yAxis);

  const plotted = useMemo((): PlottedPoint[] => {
    const pts = POINTS.filter((p) => !offBrands.has(p.brand) && ax.get(p) > 0 && ay.get(p) > 0);
    if (pts.length < 2) return [];

    const xv = pts.map(ax.get);
    const yv = pts.map(ay.get);
    const tx = (v: number) => (ax.log ? Math.log10(v) : v);
    const ty = (v: number) => (ay.log ? Math.log10(v) : v);
    const xMin = Math.min(...xv.map(tx));
    const xMax = Math.max(...xv.map(tx));
    const yMin = Math.min(...yv.map(ty));
    const yMax = Math.max(...yv.map(ty));
    const xPad = (xMax - xMin) * 0.07 || 1;
    const yPad = (yMax - yMin) * 0.07 || 1;
    const x0 = xMin - xPad;
    const x1 = xMax + xPad;
    const y0 = yMin - yPad;
    const y1 = yMax + yPad;
    const X = (v: number) => PAD_L + ((tx(v) - x0) / (x1 - x0)) * PW;
    const Y = (v: number) => PAD_T + (1 - (ty(v) - y0) / (y1 - y0)) * PH;

    return pts.map((p) => ({ point: p, cx: X(ax.get(p)), cy: Y(ay.get(p)) }));
  }, [offBrands, ax, ay]);

  const scales = useMemo(() => {
    if (plotted.length === 0) return null;
    const xv = plotted.map((p) => ax.get(p.point));
    const yv = plotted.map((p) => ay.get(p.point));
    const tx = (v: number) => (ax.log ? Math.log10(v) : v);
    const ty = (v: number) => (ay.log ? Math.log10(v) : v);
    const xMin = Math.min(...xv.map(tx));
    const xMax = Math.max(...xv.map(tx));
    const yMin = Math.min(...yv.map(ty));
    const yMax = Math.max(...yv.map(ty));
    const xPad = (xMax - xMin) * 0.07 || 1;
    const yPad = (yMax - yMin) * 0.07 || 1;
    return { x0: xMin - xPad, x1: xMax + xPad, y0: yMin - yPad, y1: yMax + yPad };
  }, [plotted, ax, ay]);

  const medianX = useMemo(() => (plotted.length ? median(plotted.map((p) => ax.get(p.point))) : 0), [plotted, ax]);
  const medianY = useMemo(() => (plotted.length ? median(plotted.map((p) => ay.get(p.point))) : 0), [plotted, ay]);

  const hidden = eligible - plotted.length;
  const countText =
    plotted.length === 0
      ? null
      : hidden > 0
      ? `${plotted.length} of ${eligible} series plotted — ${hidden} hidden${usesDragAxis ? " (no confirmed drag figure yet)" : ""}`
      : `${plotted.length} series plotted`;

  const quadKey = `${xAxis}|${yAxis}`;
  const quadLabels = QUAD_LABELS[quadKey] || [
    `${ax.low} · ${ay.high}`,
    `${ax.high} · ${ay.high}`,
    `${ax.low} · ${ay.low}`,
    `${ax.high} · ${ay.low}`,
  ];

  const activePoint = pinned || hovered;

  const withDrag = POINTS.filter((p) => p.drag);
  const withoutDrag = POINTS.filter((p) => !p.drag);

  const handleEnter = (pp: PlottedPoint, el: SVGCircleElement) => {
    if (!pinned) setHovered(pp.point);
    const container = canvasRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const svg = el.ownerSVGElement;
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const scale = svgRect.width / W;
    setTooltip({
      point: pp.point,
      left: svgRect.left - cRect.left + pp.cx * scale,
      top: svgRect.top - cRect.top + pp.cy * scale - 6,
    });
  };

  const handleLeave = () => {
    setTooltip(null);
    if (!pinned) setHovered(null);
  };

  const handleClick = (pp: PlottedPoint) => {
    setPinned((prev) => (prev && prev.brand === pp.point.brand && prev.name === pp.point.name ? null : pp.point));
  };

  const handleKeyDown = (e: React.KeyboardEvent<SVGCircleElement>, pp: PlottedPoint) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setPinned(pp.point);
    setHovered(pp.point);
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-b border-[#1D242B]/10">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-[#0077C0] text-sm font-bold">02</span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1D242B]">
          The positioning map
        </h2>
      </div>
      <p className="text-[#1D242B]/60 text-base md:text-lg font-medium max-w-2xl mb-8">
        Every series from all four brands plotted on two axes you choose. The crosshair sits at the median of
        what&apos;s on screen, splitting the field into four quadrants. Tap or hover any point for the full spec.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center bg-white border border-[#1D242B]/10 rounded-[1.5rem] p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-2">
          <label htmlFor="xAxis" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0077C0]">
            X
          </label>
          <select
            id="xAxis"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value as AxisKey)}
            className="bg-[#FAFAFA] border border-[#1D242B]/10 rounded-full px-3 py-2 text-xs font-medium text-[#1D242B] max-w-[220px] focus:outline-none focus:border-[#0077C0]"
          >
            {AXIS_OPTIONS.map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="yAxis" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0077C0]">
            Y
          </label>
          <select
            id="yAxis"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value as AxisKey)}
            className="bg-[#FAFAFA] border border-[#1D242B]/10 rounded-full px-3 py-2 text-xs font-medium text-[#1D242B] max-w-[220px] focus:outline-none focus:border-[#0077C0]"
          >
            {AXIS_OPTIONS.map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-[#1D242B]/70 cursor-pointer">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            className="accent-[#0077C0] w-4 h-4"
          />
          Name every point
        </label>
        <div className="flex flex-wrap gap-2 md:ml-auto">
          {BRANDS.map((b) => {
            const off = offBrands.has(b.id);
            return (
              <button
                key={b.id}
                onClick={() => toggleBrand(b.id)}
                className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                  off
                    ? "border-[#1D242B]/10 text-[#1D242B]/30 line-through"
                    : "border-[#1D242B]/15 text-[#1D242B]/70 hover:border-[#0077C0]"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: BRAND_COLORS[b.id] ?? "#999" }} />
                {b.name}
              </button>
            );
          })}
        </div>
      </div>

      {countText && <p className="font-mono text-xs text-[#1D242B]/40 mb-4">{countText}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-4 items-start">
        {/* Canvas */}
        <div ref={canvasRef} className="relative bg-white border border-[#1D242B]/10 rounded-[1.5rem] p-2 shadow-sm">
          {tooltip && (
            <div
              className="absolute z-10 pointer-events-none bg-[#1D242B] text-white rounded-lg px-3 py-2 text-xs shadow-xl -translate-x-1/2 -translate-y-full"
              style={{ left: tooltip.left, top: tooltip.top }}
            >
              <b className="block font-serif text-sm leading-tight">{tooltip.point.name}</b>
              <span className="font-mono text-[10px] text-white/60">
                {tooltip.point.brandName} · {tooltip.point.priceTxt} · {tooltip.point.wTxt}
              </span>
            </div>
          )}
          {plotted.length === 0 ? (
            <div className="flex items-center justify-center h-[360px]">
              <p className="font-mono text-sm text-[#1D242B]/40">Turn a brand back on to plot points.</p>
            </div>
          ) : (
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Scatter plot positioning every reel series by the two selected axes">
              <rect x={PAD_L} y={PAD_T} width={PW} height={PH} fill="rgba(29,36,43,0.015)" stroke="rgba(29,36,43,0.1)" />

              {/* Grid + ticks */}
              {scales &&
                [0, 1, 2, 3, 4].map((i) => {
                  const fx = scales.x0 + ((scales.x1 - scales.x0) * i) / 4;
                  const fy = scales.y0 + ((scales.y1 - scales.y0) * i) / 4;
                  const vx = ax.log ? Math.pow(10, fx) : fx;
                  const vy = ay.log ? Math.pow(10, fy) : fy;
                  const px = PAD_L + (PW * i) / 4;
                  const py = PAD_T + PH - (PH * i) / 4;
                  return (
                    <g key={i}>
                      <line x1={px} y1={PAD_T} x2={px} y2={PAD_T + PH} stroke="rgba(29,36,43,0.06)" />
                      <line x1={PAD_L} y1={py} x2={PAD_L + PW} y2={py} stroke="rgba(29,36,43,0.06)" />
                      <text x={px} y={PAD_T + PH + 18} fill="#1D242B" fillOpacity={0.4} fontSize={10} textAnchor="middle" className="font-mono">
                        {ax.fmt(vx)}
                      </text>
                      <text x={PAD_L - 9} y={py + 3} fill="#1D242B" fillOpacity={0.4} fontSize={10} textAnchor="end" className="font-mono">
                        {ay.fmt(vy)}
                      </text>
                    </g>
                  );
                })}

              {/* Crosshair */}
              {plotted.length > 0 &&
                (() => {
                  const tx = (v: number) => (ax.log ? Math.log10(v) : v);
                  const ty = (v: number) => (ay.log ? Math.log10(v) : v);
                  if (!scales) return null;
                  const mxp = PAD_L + ((tx(medianX) - scales.x0) / (scales.x1 - scales.x0)) * PW;
                  const myp = PAD_T + (1 - (ty(medianY) - scales.y0) / (scales.y1 - scales.y0)) * PH;
                  return (
                    <>
                      <line x1={mxp} y1={PAD_T} x2={mxp} y2={PAD_T + PH} stroke="rgba(0,119,192,0.4)" strokeDasharray="5 5" />
                      <line x1={PAD_L} y1={myp} x2={PAD_L + PW} y2={myp} stroke="rgba(0,119,192,0.4)" strokeDasharray="5 5" />
                    </>
                  );
                })()}

              {/* Quadrant labels */}
              <text x={PAD_L + 10} y={PAD_T + 20} fill="rgba(0,119,192,0.55)" fontSize={13} textAnchor="start" className="font-black uppercase tracking-wide">
                {quadLabels[0]}
              </text>
              <text x={PAD_L + PW - 10} y={PAD_T + 20} fill="rgba(0,119,192,0.55)" fontSize={13} textAnchor="end" className="font-black uppercase tracking-wide">
                {quadLabels[1]}
              </text>
              <text x={PAD_L + 10} y={PAD_T + PH - 10} fill="rgba(0,119,192,0.55)" fontSize={13} textAnchor="start" className="font-black uppercase tracking-wide">
                {quadLabels[2]}
              </text>
              <text x={PAD_L + PW - 10} y={PAD_T + PH - 10} fill="rgba(0,119,192,0.55)" fontSize={13} textAnchor="end" className="font-black uppercase tracking-wide">
                {quadLabels[3]}
              </text>

              {/* Points */}
              {plotted.map((pp) => {
                const isPinned = !!pinned && pinned.brand === pp.point.brand && pinned.name === pp.point.name;
                return (
                  <g key={`${pp.point.brand}-${pp.point.name}`}>
                    <circle
                      cx={pp.cx}
                      cy={pp.cy}
                      r={isPinned ? 8 : 5.5}
                      fill={pp.point.color}
                      fillOpacity={isPinned ? 1 : 0.78}
                      stroke={isPinned ? "#1D242B" : "rgba(255,255,255,0.85)"}
                      strokeWidth={isPinned ? 2 : 1}
                      tabIndex={0}
                      role="button"
                      aria-label={`${pp.point.brandName} ${pp.point.name}`}
                      className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1D242B]"
                      onMouseEnter={(e) => handleEnter(pp, e.currentTarget)}
                      onMouseLeave={handleLeave}
                      onFocus={() => !pinned && setHovered(pp.point)}
                      onClick={() => handleClick(pp)}
                      onKeyDown={(e) => handleKeyDown(e, pp)}
                    >
                      <title>{`${pp.point.brandName} ${pp.point.name}`}</title>
                    </circle>
                    {(showLabels || isPinned) && (
                      <text
                        x={pp.cx + 9}
                        y={pp.cy + 3.5}
                        fill={isPinned ? "#1D242B" : "rgba(29,36,43,0.55)"}
                        fontSize={9.5}
                        className="font-mono pointer-events-none"
                      >
                        {pp.point.name}
                      </text>
                    )}
                  </g>
                );
              })}

              <text
                x={PAD_L + PW / 2}
                y={H - 14}
                fill="#0077C0"
                fontSize={11}
                textAnchor="middle"
                className="font-mono uppercase tracking-wide"
              >
                {ax.label.toUpperCase()} →
              </text>
              <text
                x={16}
                y={PAD_T + PH / 2}
                fill="#0077C0"
                fontSize={11}
                textAnchor="middle"
                transform={`rotate(-90 16 ${PAD_T + PH / 2})`}
                className="font-mono uppercase tracking-wide"
              >
                {ay.label.toUpperCase()} →
              </text>
            </svg>
          )}
        </div>

        {/* Detail panel */}
        <aside className="bg-white border border-[#1D242B]/10 rounded-[1.5rem] p-5 shadow-sm min-h-[240px] lg:sticky lg:top-24">
          {activePoint ? (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: activePoint.color }}>
                {activePoint.brandName}
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight text-[#1D242B] mb-1 leading-none">
                {activePoint.name}
              </h4>
              <p className="text-xs text-[#1D242B]/50 mb-4">{activePoint.tier}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="font-mono text-[11px] border border-[#1D242B]/10 rounded-md px-2 py-1 text-[#1D242B]/70">
                  {activePoint.priceTxt}
                </span>
                <span className="font-mono text-[11px] border border-[#1D242B]/10 rounded-md px-2 py-1 text-[#1D242B]/70">
                  {activePoint.wTxt}
                </span>
                <span className="font-mono text-[11px] border border-[#1D242B]/10 rounded-md px-2 py-1 text-[#1D242B]/70">
                  {activePoint.bTxt} BB
                </span>
                {activePoint.drag?.max != null && (
                  <span className="font-mono text-[11px] border border-[#0077C0]/30 rounded-md px-2 py-1 text-[#0077C0]">
                    {dragText(activePoint.drag)}
                  </span>
                )}
              </div>
              {activePoint.drag ? (
                <p className="text-[11px] text-[#1D242B]/40 leading-relaxed mb-4">
                  {activePoint.drag.note} — <span className="text-[#1D242B]/60">{activePoint.drag.src}</span>
                </p>
              ) : (
                <p className="text-[11px] text-[#1D242B]/40 leading-relaxed mb-4">
                  Max drag not yet confirmed from a manufacturer or dealer spec sheet.
                </p>
              )}
              <div className="space-y-3 text-sm">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#408A71] mb-0.5">Advantage</span>
                  <p className="text-[#1D242B]/70 leading-relaxed">{activePoint.adv}</p>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#C1633C] mb-0.5">Weakness</span>
                  <p className="text-[#1D242B]/70 leading-relaxed">{activePoint.weak}</p>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#1D242B]/40 mb-0.5">Best for</span>
                  <p className="text-[#1D242B]/70 leading-relaxed">{activePoint.app}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {activePoint.sizes.map((s) => (
                  <span key={s} className="font-mono text-[10px] bg-[#1D242B] text-white rounded-md px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-[#1D242B]/50 leading-relaxed">
              <strong className="block text-[#1D242B] text-base mb-2">Pick a point</strong>
              Hover or tap any dot to read its full spec here. Switch the axes to re-frame the field – price
              against weight shows what you pay for lightness; size class against price shows what you pay for
              pulling power.
            </div>
          )}
        </aside>
      </div>

      <p className="text-xs text-[#1D242B]/40 leading-relaxed mt-4 max-w-3xl">
        Price is the midpoint of each series&apos; quoted range. Weight uses the lightest and heaviest size in the
        series. Size class is normalised to Japanese sizing, so Penn&apos;s numbers are scaled up (a Penn 2500 plots as
        a 4000) and Abu Garcia&apos;s two-digit global sizes are read as their four-digit equivalents.
      </p>

      <details className="mt-4 bg-white border border-[#1D242B]/10 rounded-[1.5rem] shadow-sm overflow-hidden group">
        <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-[#0077C0] list-none flex items-center gap-2 select-none">
          <span className="font-mono text-[#1D242B]/40 group-open:hidden">+</span>
          <span className="font-mono text-[#1D242B]/40 hidden group-open:inline">−</span>
          Where the drag figures come from
        </summary>
        <div className="px-5 pb-5">
          <p className="text-xs text-[#1D242B]/50 leading-relaxed mb-3">
            Max drag is quoted per size, not per series, so each entry gives the range across that series&apos; sizes
            and the spec sheet it was read from. Figures are manufacturer-published ceilings on a fresh,
            correctly-greased drag stack – not what the reel will hold all day, and not directly comparable to a
            measured pull test.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[#1D242B]/10">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr>
                  {["Series", "Brand", "Max drag", "Detail", "Source"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest bg-[#1D242B] text-white whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {withDrag.map((p, i) => {
                  const d = p.drag!;
                  const val = d.max == null ? "partial" : d.min == null ? `up to ${d.max} kg` : d.min === d.max ? `${d.max} kg` : `${d.min}–${d.max} kg`;
                  return (
                    <tr key={`${p.brand}-${p.name}`} className={i % 2 === 1 ? "bg-[#1D242B]/[0.02]" : ""}>
                      <td className="px-3 py-2 text-sm text-[#1D242B] font-semibold whitespace-nowrap border-t border-[#1D242B]/5">{p.name}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap border-t border-[#1D242B]/5" style={{ color: p.color }}>{p.brandName}</td>
                      <td className="px-3 py-2 text-sm font-mono font-bold text-[#0077C0] whitespace-nowrap border-t border-[#1D242B]/5">{val}</td>
                      <td className="px-3 py-2 text-xs text-[#1D242B]/60 border-t border-[#1D242B]/5">{d.note}</td>
                      <td className="px-3 py-2 text-xs text-[#1D242B]/60 whitespace-nowrap border-t border-[#1D242B]/5">{d.src}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#1D242B]/40 mt-3 leading-relaxed">
            {withoutDrag.length === 0 ? (
              <>All {withDrag.length} series carry a drag figure – every point plots on the drag axis.</>
            ) : (
              <>
                <strong className="text-[#1D242B]/60">Not yet confirmed ({withoutDrag.length} series):</strong>{" "}
                {withoutDrag.map((p) => `${p.brandName} ${p.name}`).join(" · ")}
              </>
            )}
          </p>
        </div>
      </details>
    </section>
  );
}
