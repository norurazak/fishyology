import { BRANDS, BRAND_COLORS } from "@/lib/baitcastGuideData";

export default function BaitcastGuideIntro() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-b border-[#1D242B]/10">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1D242B] text-center mb-8">
        Baitcasting Reels &amp; Their Applications
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-[#1D242B]/70 font-serif text-lg md:text-xl leading-relaxed">
        <p>
          Baitcasting reels are mechanical devices used in fishing that sit on top of the rod rather than
          underneath it. They are known for offering greater casting accuracy and control compared to other reel
          types, which makes them a preferred choice among experienced anglers. A baitcasting reel is normally
          mounted above the rod and consists of a revolving spool, a braking system, a level wind, a handle, and a
          drag system.
        </p>
        <p>
          The spool rotates freely during the cast, allowing the lure to pull line directly off the reel for long
          and accurate throws. The braking system, either centrifugal or magnetic, controls the speed of the spool
          to prevent it from spinning faster than the line can leave, which helps reduce backlash. Turning the
          handle engages the gears and retrieves the line while the level wind guides it evenly across the spool.
          Baitcasting reels are commonly used for casting heavier lures and lines with precision, though their
          operation generally requires more skill and practice than a spinning reel.
        </p>
      </div>

      <div className="mt-14 pt-10 border-t border-[#1D242B]/10">
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-[#1D242B]/40 mb-7">
          Compared in this guide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {BRANDS.map((b) => (
            <div key={b.id} className="h-9 md:h-11 flex items-center justify-center">
              {b.logo ? (
                <img
                  src={b.logo}
                  alt={b.name}
                  className="h-full w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span
                  style={{ color: BRAND_COLORS[b.id] ?? "#1D242B" }}
                  className="font-serif text-xl md:text-2xl font-bold opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  {b.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
