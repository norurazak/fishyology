"use client";

import { useState } from "react";
import { BRANDS } from "@/lib/electricGuideData";
import ElectricGuideBrandPanel from "@/components/ElectricGuideBrandPanel";

export default function ElectricGuideBrandExplorer() {
  const [activeId, setActiveId] = useState(BRANDS[0].id);

  return (
    <div>
      <nav className="sticky top-24 z-30 bg-[#FAFAFA]/90 backdrop-blur-md border-y border-[#1D242B]/10 -mx-6 md:-mx-16 px-6 md:px-16">
        <div className="flex gap-2 overflow-x-auto py-3 hide-scrollbar max-w-7xl mx-auto">
          {BRANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveId(b.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200 border ${
                activeId === b.id
                  ? "bg-[#1D242B] border-[#1D242B] text-white"
                  : "bg-white border-[#1D242B]/10 text-[#1D242B]/60 hover:border-[#0077C0]/40 hover:text-[#1D242B]"
              }`}
            >
              <span className="font-mono text-[10px] border border-current rounded px-1 py-0.5 opacity-75">{b.code}</span>
              {b.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {BRANDS.map((b) => (
          <ElectricGuideBrandPanel key={b.id} brand={b} active={activeId === b.id} />
        ))}
      </div>
    </div>
  );
}
