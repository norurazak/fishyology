import { BRANDS, BRAND_COLORS } from "@/lib/overheadGuideData";

export default function OverheadGuideIntro() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-b border-[#1D242B]/10">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1D242B] text-center mb-8">
        Overhead Reels &amp; Their Applications
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-[#1D242B]/70 font-serif text-lg md:text-xl leading-relaxed">
        <p>
          Overhead reels, also known as conventional reels, are mechanical devices built for heavy fishing where
          strength and line capacity matter more than casting distance. They are commonly used on boats for
          bottom fishing, jigging, and trolling in deep water. An overhead reel is normally mounted on top of the
          rod and consists of a large spool, a drag system, a handle, and either a star drag or lever drag
          mechanism.
        </p>
        <p>
          The spool holds a large amount of line to reach significant depths, while the drag system provides the
          resistance needed to control powerful fish without breaking the line. Turning the handle retrieves the
          line and, on many models, engages a gear ratio suited for winching fish up from deep water. Star drag
          reels are engaged quickly and are often used for jigging, while lever drag reels allow anglers to
          preset and adjust drag pressure more precisely during a fight. Overhead reels are widely used by
          anglers targeting large or bottom dwelling species where raw power and durability are essential.
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
