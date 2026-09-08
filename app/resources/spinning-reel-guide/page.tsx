import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import ReelGuideIntro from "@/components/ReelGuideIntro";
import ReelGuideSizeRuler from "@/components/ReelGuideSizeRuler";
import ReelGuideQuadrantPlot from "@/components/ReelGuideQuadrantPlot";
import ReelGuideBrandExplorer from "@/components/ReelGuideBrandExplorer";

const description =
  "A side-by-side spec sheet for Shimano, Daiwa, Abu Garcia and Penn spinning reels — lineups, line capacity, tropical maintenance costs, and buying logic for jungle rivers, estuaries and offshore work across Malaysia.";

const HERO_IMAGE =
  "https://res.cloudinary.com/dub3h3elq/image/upload/v1788587308/Fishyology_Spinning_Reel_Master_Resources_yzsa2i.jpg";

export const metadata: Metadata = {
  title: "Spinning Reel Master Guide",
  description,
  alternates: {
    canonical: "/resources/spinning-reel-guide",
  },
  openGraph: {
    title: "Spinning Reel Master Guide | Fishyology",
    description,
    type: "article",
    url: "https://www.fishyology.org/resources/spinning-reel-guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinning Reel Master Guide",
    description,
  },
};

export default function SpinningReelGuidePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 selection:bg-[#0077C0] selection:text-white">
      {/* HERO */}
      <section className="relative h-[100dvh] min-h-[640px] w-full bg-[#1D242B] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Spinning Reel Master Guide"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[#1D242B]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/20 to-transparent" />
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-overlay">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <div className="absolute bottom-24 md:bottom-32 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-start">
          <Link
            href="/resources"
            className="flex items-center gap-2 text-[#FAFAFA]/80 hover:text-white text-sm font-bold uppercase tracking-widest mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>

          <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-md">
            Gear &amp; Tackle Guide
          </span>

          <h1 className="text-5xl md:text-8xl lg:text-[7rem] leading-[0.85] font-black text-[#FAFAFA] tracking-tighter uppercase mb-6 drop-shadow-2xl max-w-5xl">
            Spinning Reel <br /> Master Guide
          </h1>

          <p className="text-lg md:text-2xl text-[#FAFAFA]/90 max-w-3xl font-medium mb-10 leading-relaxed drop-shadow-md">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {["4 Brands", "70+ Series Compared", "RM Service Costs", "Toman · Sebarau · GT · Siakap"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/20 text-white/80 drop-shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ReelGuideIntro />
      <ReelGuideSizeRuler />
      <ReelGuideQuadrantPlot />
      <ReelGuideBrandExplorer />

      <p className="text-center text-xs text-[#1D242B]/40 leading-relaxed max-w-2xl mx-auto px-6 mt-16">
        Built from manufacturer spec sheets and dealer listings · pricing is approximate USD, service costs in MYR
        and vary by technician · always confirm current pricing with an authorised dealer.
      </p>
    </div>
  );
}
