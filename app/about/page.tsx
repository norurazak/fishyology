import { getGalleryPlates } from "@/lib/gallery";
import AboutHero from "@/components/about/AboutHero";
import Timeline from "@/components/about/Timeline";
import PlateGallery from "@/components/about/PlateGallery";
import AuthorRoster from "@/components/about/AuthorRoster";
import PitchSection from "@/components/about/PitchSection";
import { PitchProvider } from "@/components/about/PitchContext";

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
          than a milestone blurb. */}
      {/* Styled after the site footer: the same dark base and soft greys, a serif
          italic voice for the lines around the statement, a hairline glass panel, and
          the footer's oversized gradient lettering as a faded "2026" behind the heading. */}
      <section className="relative overflow-hidden bg-[#121212] text-[#E5E5E5] py-16 md:py-20 px-6 md:px-16">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-4 md:top-6 text-center text-[clamp(6rem,22vw,18rem)] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] via-[#2E2E2E] to-[#1A1A1A] select-none"
        >
          2026
        </p>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="text-[#A3A3A3] font-bold tracking-widest uppercase mb-3 block text-sm">
            2026
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#FFFFFF] mb-4">
            A New Path Forward
          </h2>
          <p className="text-[#D4D4D4] font-serif italic text-lg md:text-xl mb-10">
            Building the next chapter of Fishyology.
          </p>
          <div className="text-left text-[#A3A3A3] text-base md:text-lg leading-relaxed bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-10 lg:columns-2 lg:gap-x-12 [&>p]:mb-6 [&>p]:break-inside-avoid [&>p:last-child]:mb-0">
            <p>
              Fishyology enters 2026 with a renewed sense of direction. What began as a fishing
              blog grew into a guiding operation, evolved through years of exploration and
              experience, faced an unexpected pause and found its way back to the water.
            </p>
            <p>Now, the focus moves forward.</p>
            <p>
              We are building Fishyology into a stronger and more sustainable venture, bringing
              together our experience, relationships, fishing knowledge and passion for
              Malaysia&apos;s waters under one vision.
            </p>
            <p>This is more than a return. It is a new pathway forward.</p>
            <p>
              A new chapter built on everything that came before, with new opportunities ahead
              for anglers, partners and the wider fishing community.
            </p>
            <p className="font-serif italic text-[#D4D4D4] text-lg md:text-xl text-center pt-2 [column-span:all]">
              The journey continues, but the destination is bigger than ever.
            </p>
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

      <PitchProvider>
        {/* 4. THE AUTHORS */}
        <section className="py-12 md:py-14 px-6 md:px-16 max-w-7xl mx-auto">
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

        {/* 5. CALL FOR WRITERS CTA */}
        <section id="pitch-section" className="relative py-14 md:py-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-abyss z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-tuna/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[#FFFFFF]/85 font-bold tracking-widest uppercase mb-3 block text-sm">
              Get Hooked With Us
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#FFFFFF] uppercase tracking-tight leading-[1.1] mb-4">
              Tell your story. <br />
              <span className="text-tuna-on-dark italic font-serif lowercase tracking-normal">
                Inspire the next cast.
              </span>
            </h2>
            <p className="text-[#FFFFFF]/70 text-lg md:text-xl font-medium max-w-2xl mb-8">
              Passionate anglers, conservationists, and storytellers — if you have a trip report
              or strategy worth sharing, we want to publish it in the Fishyology Journal.
            </p>

            <PitchSection />
          </div>
        </section>
      </PitchProvider>
    </div>
  );
}
