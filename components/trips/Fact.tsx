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
      <div className="w-9 h-9 rounded-lg bg-abyss/5 flex items-center justify-center flex-shrink-0">
        <Icon aria-hidden="true" className="w-4 h-4 text-abyss/70" />
      </div>
      <div className="min-w-0">
        <span className="block text-xs font-bold uppercase tracking-widest text-abyss/70">
          {label}
        </span>
        <span className="block text-sm text-abyss/80 leading-snug mt-0.5">{value}</span>
      </div>
    </div>
  );
}
