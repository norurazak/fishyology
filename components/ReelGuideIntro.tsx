import { BRANDS } from "@/lib/reelGuideData";

// Each brand's real-world identity color (documented public branding, not an
// official brand-guideline hex) — used only for the wordmark fallback below.
const BRAND_WORDMARK_COLORS: Record<string, string> = {
  shimano: "#0066B3",
  daiwa: "#C8102E",
  abugarcia: "#E4002B",
  penn: "#002D62",
};

export default function ReelGuideIntro() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-b border-[#1D242B]/10">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1D242B] text-center mb-8">
        Spinning Reels &amp; Their Applications
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-[#1D242B]/70 font-serif text-lg md:text-xl leading-relaxed">
        <p>
          Spinning reels are mechanical devices commonly used in fishing to store, release, and retrieve fishing
          line. They are one of the most popular types of fishing reels because they are relatively easy to
          operate, versatile, and suitable for anglers of different skill levels. A spinning reel is normally
          mounted underneath a fishing rod and consists of a spool, bail arm, handle, drag system, and gear
          mechanism.
        </p>
        <p>
          The spool holds the fishing line, while the bail arm controls the release and collection of the line.
          When the bail is opened, the line can leave the spool freely during casting. Turning the handle rotates
          the spool mechanism and allows the line to be retrieved. The drag system provides controlled resistance
          when a fish pulls on the line, helping to prevent line breakage and allowing the angler to manage the
          fish safely. Spinning reels are also widely used by beginners because their operation is simpler than
          that of many other reel types.
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
                  style={{ color: BRAND_WORDMARK_COLORS[b.id] ?? "#1D242B" }}
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
