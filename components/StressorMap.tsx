import React from 'react';

// Stressors grouped by origin rather than listed flat. The source literature classifies
// pressures as local/anthropogenic, global/environmental and biological, and that grouping
// carries the finding a plain table loses: most documented pressure on Malaysian reefs is
// local, which is the part that is locally addressable.
//
// No magnitudes exist in this data, so nothing is encoded by length or position. Colour
// marks category identity only. Palette validated for CVD separation and contrast against
// a light surface (worst adjacent pair deltaE 10.6).
const ORIGINS = {
  local: {
    label: 'Local and anthropogenic',
    note: 'Addressable at site level',
    color: '#0077C0',
    tint: 'bg-[#0077C0]/5 border-[#0077C0]/20',
  },
  global: {
    label: 'Global and environmental',
    note: 'Not addressable locally',
    color: '#F2631A',
    tint: 'bg-[#F2631A]/5 border-[#F2631A]/20',
  },
  biological: {
    label: 'Biological',
    note: 'Manageable only in part',
    color: '#2BA86F',
    tint: 'bg-[#2BA86F]/5 border-[#2BA86F]/20',
  },
} as const;

type Origin = keyof typeof ORIGINS;

export function Stressor({ origin, name, impact }: { origin: Origin; name: string; impact: string }) {
  const o = ORIGINS[origin] ?? ORIGINS.local;
  return (
    <div className={`rounded-[0.75rem] border p-4 ${o.tint}`}>
      <span className="block text-sm font-black text-[#1D242B] leading-snug mb-1.5">{name}</span>
      <span className="block text-[13px] leading-relaxed text-[#1D242B]/65">{impact}</span>
    </div>
  );
}

export default function StressorMap({
  children,
  caption,
  note,
}: {
  children: React.ReactNode;
  caption?: string;
  note?: string;
}) {
  const items = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<{ origin: Origin }> => React.isValidElement(c)
  );

  const groups = (Object.keys(ORIGINS) as Origin[])
    .map((key) => ({ key, ...ORIGINS[key], items: items.filter((c) => c.props.origin === key) }))
    .filter((g) => g.items.length > 0);

  return (
    <figure className="my-12 not-prose">
      <div className="grid gap-5 md:grid-cols-3">
        {groups.map((g) => (
          <div key={g.key} className="flex flex-col">
            {/* category rule: identity marker, carried by a label as well as colour */}
            <span className="block h-1 w-full rounded-full mb-3" style={{ backgroundColor: g.color }} />
            <span className="flex items-baseline justify-between gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: g.color }}>
                {g.label}
              </span>
              <span className="text-[11px] font-bold tabular-nums text-[#1D242B]/35">{g.items.length}</span>
            </span>
            <span className="block text-[11px] font-medium text-[#1D242B]/45 mb-4">{g.note}</span>
            <div className="flex flex-col gap-3">{g.items}</div>
          </div>
        ))}
      </div>

      {note && (
        <div className="mt-5 flex items-start gap-3 rounded-[0.75rem] bg-[#1D242B] p-5">
          <span className="mt-[3px] block h-2 w-2 shrink-0 rounded-full bg-[#FF9A42]" />
          <p className="text-sm leading-relaxed text-[#FAFAFA]/80 font-medium">{note}</p>
        </div>
      )}

      {caption && (
        <figcaption className="mt-4 text-sm font-medium italic text-[#1D242B]/50">{caption}</figcaption>
      )}
    </figure>
  );
}
