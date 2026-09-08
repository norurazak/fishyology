import { BRANDS, BRAND_COLORS } from "@/lib/electricGuideData";

export default function ElectricGuideIntro() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-b border-[#1D242B]/10">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1D242B] text-center mb-8">
        Electric Reels &amp; Their Applications
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-[#1D242B]/70 font-serif text-lg md:text-xl leading-relaxed">
        <p>
          Electric reels are mechanical devices that use a motor and rechargeable battery to retrieve fishing
          line automatically, reducing the physical effort required during deep water fishing. They are commonly
          used for deep dropping and jigging in waters that are too deep or too demanding to fish comfortably by
          hand. An electric reel is normally mounted on top of the rod and consists of a motor unit, a spool, a
          drag system, and a control panel or lever for adjusting retrieval speed.
        </p>
        <p>
          The motor drives the spool to wind in line at a controlled speed, allowing anglers to work heavy jigs
          or baits at depth without exhausting their arms. The drag system still manages the resistance needed to
          fight a fish once it is hooked, working alongside the motor to bring it safely to the surface. Some
          electric reels also include programmable settings that repeat a jigging motion automatically. Electric
          reels are widely used for extended deep sea sessions where manual reels would quickly tire out even
          experienced anglers.
        </p>
      </div>

      <div className="mt-14 pt-10 border-t border-[#1D242B]/10">
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-[#1D242B]/40 mb-7">
          Compared in this guide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {BRANDS.map((b) => (
            <div key={b.id} className="h-9 md:h-11 flex items-center justify-center">
              <span
                style={{ color: BRAND_COLORS[b.id] ?? "#1D242B" }}
                className="font-serif text-xl md:text-2xl font-bold opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
