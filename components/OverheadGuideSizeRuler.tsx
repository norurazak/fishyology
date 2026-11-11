import { RULER_COLS, RULER_ROWS, TIER_ROWS } from "@/lib/overheadGuideData";

const TIER_BRAND_HEADERS = ["Shimano", "Daiwa", "Abu Garcia", "Penn", "Okuma", "Accurate", "Studio Ocean Mark"];

export default function OverheadGuideSizeRuler() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-b border-abyss/10">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-[#0077C0] text-sm font-bold">01</span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-abyss">
          Cross-brand size ruler
        </h2>
      </div>
      <p className="text-abyss/60 text-base md:text-lg font-medium max-w-2xl mb-10">
        The single biggest source of confusion buying across brands: nobody&apos;s &quot;300&quot; is the same reel.
        Read down a column to see what actually sits in the same footprint.
      </p>

      <div className="bg-white rounded-[1.5rem] border border-abyss/10 shadow-sm overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[820px]">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest bg-abyss text-white whitespace-nowrap">
                  Brand
                </th>
                {RULER_COLS.map((c) => (
                  <th
                    key={c}
                    className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest bg-abyss text-white whitespace-nowrap"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RULER_ROWS.map((row, idx) => (
                <tr key={row.b} className={idx % 2 === 1 ? "bg-abyss/[0.02]" : ""}>
                  <th className="text-left px-4 py-3 font-serif font-bold text-[#0077C0] whitespace-nowrap border-t border-abyss/5">
                    {row.b}
                  </th>
                  {row.vals.map((v, i) => (
                    <td
                      key={i}
                      className="px-4 py-3 font-mono text-sm text-abyss/70 whitespace-nowrap border-t border-abyss/5"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-abyss/50 px-4 py-3 leading-relaxed border-t border-abyss/5">
          Rough footprint equivalence only – always cross-check exact spool capacity in each brand&apos;s tab below before buying.
        </p>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-abyss/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[980px]">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-abyss/50 border-b border-abyss/10 whitespace-nowrap">
                  Role
                </th>
                {TIER_BRAND_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-abyss/50 border-b border-abyss/10 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIER_ROWS.map((row) => (
                <tr key={row.tier}>
                  <th className="text-left px-4 py-3 font-serif font-bold text-abyss whitespace-nowrap border-t border-abyss/5">
                    {row.tier}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-4 py-3 text-sm text-abyss/70 border-t border-abyss/5 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
