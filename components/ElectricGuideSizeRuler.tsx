import { RULER_COLS, RULER_ROWS, TIER_ROWS } from "@/lib/electricGuideData";

export default function ElectricGuideSizeRuler() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-b border-[#1D242B]/10">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-[#0077C0] text-sm font-bold">01</span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1D242B]">
          Cross-brand size ruler
        </h2>
      </div>
      <p className="text-[#1D242B]/60 text-base md:text-lg font-medium max-w-2xl mb-10">
        Five brands, five sizing systems, zero shared numbering. Read down a column to see what actually sits in the
        same power class.
      </p>

      <div className="bg-white rounded-[1.5rem] border border-[#1D242B]/10 shadow-sm overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest bg-[#1D242B] text-white whitespace-nowrap">
                  Brand
                </th>
                {RULER_COLS.map((c) => (
                  <th
                    key={c}
                    className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest bg-[#1D242B] text-white whitespace-nowrap"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RULER_ROWS.map((row, idx) => (
                <tr key={row.b} className={idx % 2 === 1 ? "bg-[#1D242B]/[0.02]" : ""}>
                  <th className="text-left px-4 py-3 font-serif font-bold text-[#0077C0] whitespace-nowrap border-t border-[#1D242B]/5">
                    {row.b}
                  </th>
                  {row.vals.map((v, i) => (
                    <td
                      key={i}
                      className="px-4 py-3 font-mono text-sm text-[#1D242B]/70 whitespace-nowrap border-t border-[#1D242B]/5"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#1D242B]/50 px-4 py-3 leading-relaxed border-t border-[#1D242B]/5">
          Rough power-class equivalence only – always cross-check exact drag and line capacity in each brand&apos;s
          tab below before buying.
        </p>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-[#1D242B]/10 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[820px]">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#1D242B]/50 border-b border-[#1D242B]/10 whitespace-nowrap">
                  Role
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#1D242B]/50 border-b border-[#1D242B]/10 whitespace-nowrap">
                  Shimano
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#1D242B]/50 border-b border-[#1D242B]/10 whitespace-nowrap">
                  Daiwa
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#1D242B]/50 border-b border-[#1D242B]/10 whitespace-nowrap">
                  Banax
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#1D242B]/50 border-b border-[#1D242B]/10 whitespace-nowrap">
                  Miya Epoch
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#1D242B]/50 border-b border-[#1D242B]/10 whitespace-nowrap">
                  Penn
                </th>
              </tr>
            </thead>
            <tbody>
              {TIER_ROWS.map((row) => (
                <tr key={row.tier}>
                  <th className="text-left px-4 py-3 font-serif font-bold text-[#1D242B] whitespace-nowrap border-t border-[#1D242B]/5">
                    {row.tier}
                  </th>
                  <td className="px-4 py-3 text-sm text-[#1D242B]/70 border-t border-[#1D242B]/5">{row.shi}</td>
                  <td className="px-4 py-3 text-sm text-[#1D242B]/70 border-t border-[#1D242B]/5">{row.dai}</td>
                  <td className="px-4 py-3 text-sm text-[#1D242B]/70 border-t border-[#1D242B]/5">{row.bnx}</td>
                  <td className="px-4 py-3 text-sm text-[#1D242B]/70 border-t border-[#1D242B]/5">{row.miy}</td>
                  <td className="px-4 py-3 text-sm text-[#1D242B]/70 border-t border-[#1D242B]/5">{row.pen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Callout — styled like MDXComponents.tsx's Callout component */}
      <div className="bg-[#1D242B] text-white p-6 md:p-8 rounded-[1.5rem] border-l-4 border-[#408A71] shadow-xl">
        <strong className="block text-[#408A71] uppercase tracking-widest text-sm mb-3 font-black">
          The Purchase You Haven&apos;t Budgeted For
        </strong>
        <div className="text-white/80 font-medium text-lg leading-relaxed space-y-4">
          <p>
            Every guide in this set says the same thing in different words: <strong className="text-white">the reel is not the whole purchase.</strong> Running a
            high-end reel off a dying 12V lead-acid boat battery cuts winding power – Shimano&apos;s guide puts it at
            up to 40% – and alternator voltage spikes are named as the number one killer of these reels&apos; circuit
            boards in Malaysia.
          </p>
          <p>
            Budget <strong className="text-white">RM 400 – RM 800</strong> for a dedicated 14.4V lithium pack on top of the reel price. The two
            exceptions sit at opposite extremes: the Penn Fathom Electric carries its own swappable lithium battery
            internally and needs no external pack at all, while Miya Epoch&apos;s CZ-15, CZ-20 and CZ-30 in 24V trim
            cannot use portable packs and must be wired into a dedicated 24V bank on the vessel.
          </p>
        </div>
      </div>
    </section>
  );
}
