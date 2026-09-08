"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ChecklistItem } from "@/lib/reelGuideData";

export default function ReelGuideChecklist({ items }: { items: ChecklistItem[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (idx: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => {
        const isOpen = open.has(idx);
        return (
          <div key={idx} className="bg-white border border-[#1D242B]/10 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full text-left bg-transparent px-5 py-4 flex items-center justify-between gap-3 font-bold text-sm text-[#1D242B]"
            >
              <span className="flex items-center">
                <span className="font-mono text-[#0077C0] text-xs mr-3">{String(idx + 1).padStart(2, "0")}</span>
                {item.h}
              </span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 text-[#1D242B]/40 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#0077C0]" : ""}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <ul className="px-5 pb-4 pl-14 text-sm text-[#1D242B]/70 leading-relaxed list-disc space-y-1.5">
                  {item.pts.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
