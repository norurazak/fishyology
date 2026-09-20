import type { LucideIcon } from "lucide-react";

export default function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-lg bg-[#C7EEFF]/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#0077C0]" />
      </div>
      <div className="min-w-0">
        <span className="block text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50">
          {label}
        </span>
        <span className="block text-sm text-[#1D242B]/80 leading-snug mt-0.5">{value}</span>
      </div>
    </div>
  );
}
