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
    <div className="bg-[#FAFAFA] text-[#1D242B] min-h-screen">
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
      <section className="relative min-h-[80dvh] flex flex-col border-b border-[#1D242B]/10">
        <div className="px-6 md:px-16 pt-24 md:pt-28 pb-8 md:pb-10">
          <div className="max-w-[110rem] mx-auto">
            <span className="text-[#0077C0] font-bold tracking-widest uppercase mb-3 block text-sm">
              The Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1D242B] mb-4">
              A Decade on the Water
            </h2>
            <p className="text-[#1D242B]/60 text-lg md:text-xl font-medium max-w-2xl">
              From local fishing blogs to Malaysia&apos;s premier game-fish guiding service.
            </p>
          </div>
        </div>
        <Timeline />
      </section>

      {/* 2b. 2026 CLOSING STATEMENT — the timeline's last card is a teaser; this is the
          full write-up, given its own space since it reads as a mission statement rather
          than a milestone blurb. */}
      <section className="py-24 md:py-28 px-6 md:px-16 border-b border-[#1D242B]/10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#0077C0] font-bold tracking-widest uppercase mb-3 block text-sm">
            2026
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1D242B] mb-4">
            A New Path Forward
          </h2>
          <p className="text-[#1D242B]/50 font-serif italic text-lg md:text-xl mb-10">
            Building the next chapter of Fishyology.
          </p>
          <div className="text-left space-y-6 text-[#1D242B]/75 text-base md:text-lg leading-relaxed">
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
            <p className="font-serif italic text-[#1D242B] text-center pt-2">
              The journey continues, but the destination is bigger than ever.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE PLATES */}
      {plates.length > 0 && (
        <section className="py-24 md:py-28 border-b border-[#1D242B]/10 overflow-hidden">
          <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12 md:mb-16">
            <span className="text-[#0077C0] font-bold tracking-widest uppercase mb-3 block text-sm">
              From the Archive
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1D242B] mb-4">
              The Plates
            </h2>
            <p className="text-[#1D242B]/60 text-lg md:text-xl font-medium max-w-2xl">
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
        <section className="py-20 md:py-24 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1D242B] mb-4">
              The Roster
            </h2>
            <p className="text-[#1D242B]/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Meet the anglers and writers documenting the Malaysian waters.
            </p>
          </div>
          <AuthorRoster />
        </section>

        {/* 5. CALL FOR WRITERS CTA */}
        <section id="pitch-section" className="relative py-20 md:py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#1D242B] z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-[#0077C0]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-3 block text-sm">
              Get Hooked With Us
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#FAFAFA] uppercase tracking-tight leading-[1.1] mb-4">
              Tell your story. <br />
              <span className="text-[#408A71] italic font-serif lowercase tracking-normal">
                Inspire the next cast.
              </span>
            </h2>
            <p className="text-[#FAFAFA]/70 text-lg md:text-xl font-medium max-w-2xl mb-8">
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
