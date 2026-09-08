"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Brand, TAG_LABELS, TierTag, classify, dragText, priceLow, weightLow } from "@/lib/reelGuideData";
import ReelGuideChecklist from "@/components/ReelGuideChecklist";

type SortKey = "price-desc" | "price-asc" | "weight-asc";

const TAG_ORDER: TierTag[] = ["all", "flagship", "sw", "finesse", "workhorse", "jdm", "budget"];

export default function ReelGuideBrandPanel({ brand, active }: { brand: Brand; active: boolean }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<TierTag>("all");
  const [sort, setSort] = useState<SortKey>("price-desc");

  const items = useMemo(() => {
    let list = brand.lineup.map((item) => ({ item, tags: classify(item.t) }));

    if (tag !== "all") list = list.filter((i) => i.tags.includes(tag));
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((i) => {
        const hay = `${i.item.s} ${i.item.t} ${i.item.a} ${i.item.ap} ${i.item.sz.join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }
    if (sort === "price-desc") list = [...list].sort((a, b) => priceLow(b.item.p) - priceLow(a.item.p));
    if (sort === "price-asc") list = [...list].sort((a, b) => priceLow(a.item.p) - priceLow(b.item.p));
    if (sort === "weight-asc") list = [...list].sort((a, b) => weightLow(a.item.w) - weightLow(b.item.w));

    return list;
  }, [brand.lineup, tag, query, sort]);

  return (
    <section className={active ? "block py-12 md:py-16" : "hidden"}>
      <div className="mb-2">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1D242B]">{brand.name}</h2>
        <p className="text-[#1D242B]/60 text-base md:text-lg font-medium max-w-2xl mt-2">{brand.tagline}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 mb-2">
        {brand.philosophy.map((p) => (
          <div key={p.t} className="bg-white border border-[#1D242B]/10 rounded-xl p-4">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0077C0] mb-1.5">{p.t}</h4>
            <p className="text-xs text-[#1D242B]/60 leading-relaxed">{p.d}</p>
          </div>
        ))}
      </div>

      {/* Lineup */}
      <div className="mt-12">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#1D242B] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0077C0]" /> Lineup — sorted &amp; filterable
        </h3>
        <p className="text-sm text-[#1D242B]/50 mb-4 mt-1 max-w-xl">
          Search by series, technique or target species – or filter by tier.
        </p>

        <div className="flex flex-wrap gap-3 items-center bg-[#1D242B]/[0.03] rounded-[1.5rem] p-3.5 mb-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D242B]/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search series, e.g. Toman, GT, finesse…"
              className="w-full bg-white border border-[#1D242B]/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-[#1D242B] focus:outline-none focus:border-[#0077C0] focus:ring-1 focus:ring-[#0077C0] transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {TAG_ORDER.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                  tag === t
                    ? "bg-[#1D242B] text-white shadow-md"
                    : "bg-white border border-[#1D242B]/10 text-[#1D242B]/60 hover:border-[#1D242B]/30 hover:text-[#1D242B]"
                }`}
              >
                {TAG_LABELS[t]}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-white border border-[#1D242B]/10 rounded-full px-4 py-2.5 text-xs font-medium text-[#1D242B] focus:outline-none focus:border-[#0077C0]"
          >
            <option value="price-desc">Price: High → Low</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="weight-asc">Weight: Light → Heavy</option>
          </select>
        </div>
        <p className="font-mono text-xs text-[#1D242B]/40 mb-5">
          {items.length} of {brand.lineup.length} series shown
        </p>

        {items.length === 0 ? (
          <div className="border border-dashed border-[#1D242B]/15 rounded-[1.5rem] p-10 text-center text-sm text-[#1D242B]/40">
            No series match that search. Try a different keyword or reset the filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map(({ item }) => (
              <article
                key={item.s}
                className="flex flex-col bg-white border border-[#1D242B]/10 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex justify-between items-start gap-3 p-5 pb-3 border-b border-[#1D242B]/5">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1D242B] leading-tight">{item.s}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#0077C0]">{item.t}</span>
                  </div>
                  <div className="font-mono text-xs text-[#1D242B] whitespace-nowrap px-2.5 py-1 rounded-md bg-[#C7EEFF]/40 border border-[#0077C0]/10">
                    {item.p}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 px-5 pt-3">
                  <span className="font-mono text-[10px] text-[#1D242B]/50 border border-[#1D242B]/10 rounded px-1.5 py-0.5">{item.w}</span>
                  <span className="font-mono text-[10px] text-[#1D242B]/50 border border-[#1D242B]/10 rounded px-1.5 py-0.5">{item.b} BB</span>
                  {item.d?.max != null && (
                    <span className="font-mono text-[10px] text-[#0077C0] border border-[#0077C0]/30 rounded px-1.5 py-0.5">
                      {dragText(item.d)}
                    </span>
                  )}
                </div>
                <div className="px-5 py-3 text-xs leading-relaxed flex-1 space-y-2.5">
                  <div>
                    <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#408A71] mb-0.5">Advantage</span>
                    <p className="text-[#1D242B]/70">{item.a}</p>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#C1633C] mb-0.5">Weakness</span>
                    <p className="text-[#1D242B]/70">{item.k}</p>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#1D242B]/40 mb-0.5">Best for</span>
                    <p className="text-[#1D242B]/70">{item.ap}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 px-5 pb-4">
                  {item.sz.map((s) => (
                    <span key={s} className="font-mono text-[10px] bg-[#1D242B]/5 text-[#1D242B]/60 rounded px-2 py-0.5">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Capacity */}
      <div className="mt-16">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#1D242B] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0077C0]" /> Spool size &amp; line capacity
        </h3>
        <p className="text-sm text-[#1D242B]/50 mb-4 mt-1 max-w-xl">
          Braid (PE) and mono/fluoro capacity by spool size, with a suggested rigging strategy.
        </p>
        <div className="bg-white rounded-[1.5rem] border border-[#1D242B]/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[720px]">
              <thead>
                <tr>
                  {["Size & Suffix", "Braid (PE – Meters)", "Mono/Fluoro (lb – Meters)", "Rigging Strategy"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest bg-[#1D242B] text-white whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brand.capacity.map((c, i) => (
                  <tr key={c.sz} className={i % 2 === 1 ? "bg-[#1D242B]/[0.02]" : ""}>
                    <td className="px-4 py-3 text-sm font-semibold text-[#1D242B] whitespace-nowrap border-t border-[#1D242B]/5">{c.sz}</td>
                    <td className="px-4 py-3 text-sm text-[#1D242B]/70 whitespace-nowrap border-t border-[#1D242B]/5">{c.br}</td>
                    <td className="px-4 py-3 text-sm text-[#1D242B]/70 whitespace-nowrap border-t border-[#1D242B]/5">{c.mf}</td>
                    <td className="px-4 py-3 text-sm text-[#1D242B]/70 border-t border-[#1D242B]/5">{c.st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Maintenance + Environment */}
      <div className="mt-16">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#1D242B] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0077C0]" /> Maintenance &amp; cost estimation — Malaysian context
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-[#1D242B] text-white rounded-[1.5rem] p-6 border-l-4 border-[#408A71]">
            <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#408A71] mb-2">Environmental factors</h4>
            <p className="text-white/70 text-sm leading-relaxed">{brand.env}</p>
          </div>
          <div className="bg-[#1D242B] text-white rounded-[1.5rem] p-6 border-l-4 border-[#0077C0]">
            <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#C7EEFF] mb-2">JDM / import parts risk</h4>
            <p className="text-white/70 text-sm leading-relaxed">{brand.jdm}</p>
          </div>
        </div>
        <div className="bg-white rounded-[1.5rem] border border-[#1D242B]/10 shadow-sm overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  {["Service / Repair", "Est. Cost (MYR)", "Notes"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest bg-[#1D242B] text-white whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brand.maintenance.map((m, i) => (
                  <tr key={m.sv} className={i % 2 === 1 ? "bg-[#1D242B]/[0.02]" : ""}>
                    <td className="px-4 py-3 text-sm font-semibold text-[#1D242B] whitespace-nowrap border-t border-[#1D242B]/5">{m.sv}</td>
                    <td className="px-4 py-3 text-sm font-mono font-bold text-[#0077C0] whitespace-nowrap border-t border-[#1D242B]/5">{m.c}</td>
                    <td className="px-4 py-3 text-sm text-[#1D242B]/70 border-t border-[#1D242B]/5">{m.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-16">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#1D242B] flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#0077C0]" /> Final buyer&apos;s checklist
        </h3>
        <ReelGuideChecklist items={brand.checklist} />
      </div>
    </section>
  );
}
