import { getGalleryPlates } from "@/lib/gallery";
import AboutHero from "@/components/about/AboutHero";
import Timeline from "@/components/about/Timeline";
import PlateGallery from "@/components/about/PlateGallery";
import AuthorRoster from "@/components/about/AuthorRoster";

export default function AboutPage() {
  const plates = getGalleryPlates();

  return (
    <div className="bg-[#FFFFFF] text-abyss min-h-screen selection:bg-tuna selection:text-white">
      {/* GLOBAL NOISE TEXTURE */}
      <svg className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* 1. HERO */}
      <AboutHero />

      {/* 2. THE 10-YEAR JOURNEY — chapter viewer at 80% of the hero's height, kept tight */}
      <section className="relative min-h-[80dvh] flex flex-col border-b border-abyss/10">
        <div className="px-6 md:px-16 pt-14 md:pt-16 pb-6 md:pb-8">
          <div className="max-w-[110rem] mx-auto">
            <span className="text-abyss/70 font-bold tracking-widest uppercase mb-3 block text-sm">
              The Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-abyss mb-4">
              A Decade on the Water
            </h2>
            <p className="text-abyss/60 text-lg md:text-xl font-medium max-w-2xl">
              From local fishing blogs to Malaysia&apos;s premier game-fish guiding service.
            </p>
          </div>
        </div>
        <Timeline />
      </section>

      {/* 2b. 2026 CLOSING STATEMENT — the timeline's last card is a teaser; this is the
          full write-up, given its own space since it reads as a mission statement rather
          than a milestone blurb. Styled after the site footer: its dark base and soft
          greys, its serif italic voice, and its oversized gradient lettering, here as the
          "2026" numeral anchoring the left column. */}
      <section className="bg-[#121212] text-[#E5E5E5] py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: the heading and the year as a visual anchor */}
            <div className="lg:col-span-5">
              <span className="text-[#A3A3A3] font-bold tracking-widest uppercase mb-3 block text-sm">
                2026
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#FFFFFF] mb-4 text-balance">
                A New Path Forward
              </h2>
              <p className="text-[#D4D4D4] font-serif italic text-lg md:text-xl">
                Building the next chapter of Fishyology.
              </p>
              <p
                aria-hidden="true"
                className="mt-8 md:mt-12 text-[clamp(5.5rem,14vw,11rem)] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#262626] via-[#4A4A4A] to-[#262626] select-none"
              >
                2026
              </p>
            </div>

            {/* Right: the statement in one readable column, a serif italic beat in the
                middle, and the closing line under the section's one accent */}
            <div className="lg:col-span-7 max-w-2xl space-y-6 text-[#A3A3A3] text-base md:text-lg leading-relaxed">
              <p>
                Fishyology enters 2026 with a renewed sense of direction. What began as a fishing
                blog grew into a guiding operation, paused, and found its way back to the water.
              </p>
              <p className="font-serif italic text-[#FFFFFF] text-xl md:text-2xl">
                Now, the focus moves forward.
              </p>
              <p>
                We are building a stronger, more sustainable Fishyology, bringing our experience,
                relationships and passion for Malaysia&apos;s waters under one vision, with new
                opportunities for anglers, partners and the wider fishing community.
              </p>
              <div className="pt-4">
                <div aria-hidden="true" className="w-12 h-[3px] bg-tuna mb-5" />
                <p className="font-serif italic text-[#D4D4D4] text-xl md:text-2xl leading-snug text-balance">
                  The journey continues, but the destination is bigger than ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PLATES */}
      {plates.length > 0 && (
        <section className="py-14 md:py-16 border-b border-abyss/10 overflow-hidden">
          <div className="px-6 md:px-16 max-w-7xl mx-auto mb-8 md:mb-10">
            <span className="text-abyss/70 font-bold tracking-widest uppercase mb-3 block text-sm">
              From the Archive
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-abyss mb-4">
              The Plates
            </h2>
            <p className="text-abyss/60 text-lg md:text-xl font-medium max-w-2xl">
              Photographs from a decade of expeditions. Drag through the strip, then open any
              plate to read it full size.
            </p>
          </div>
          {/* Full-bleed: the strip manages its own gutters so it can run edge to edge */}
          <PlateGallery plates={plates} />
        </section>
      )}

      {/* 4. THE AUTHORS. The "Future Contributor" card opens the pitch form in a modal,
          which replaced the separate call-for-writers section. The id keeps the home
          page's /about#pitch-section link landing here (and opening the form). */}
      <section id="pitch-section" className="scroll-mt-28 py-12 md:py-14 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-abyss mb-4">
            The Roster
          </h2>
          <p className="text-abyss/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Meet the anglers and writers documenting the Malaysian waters.
          </p>
        </div>
        <AuthorRoster />
      </section>
    </div>
  );
}
