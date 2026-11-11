import { getAllPosts } from "@/lib/mdx";
import { getTripPackages } from "@/lib/trips";
import HomeHero from "@/components/home/HomeHero";
import Showcase from "@/components/home/Showcase";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import StandardSection from "@/components/home/StandardSection";
import SocialChannels from "@/components/SocialChannels";
import ReaderAnalytics from "@/components/ReaderAnalytics";

export default function Home() {
  // getAllPosts is newest first, so the first match is Noru's latest story.
  const story = getAllPosts().find((p) => p.frontmatter.author === "Noru Razak");
  const featuredTrips = getTripPackages()
    .filter((trip) => !trip.comingSoon && trip.group === "Expedition")
    .slice(0, 3);

  return (
    <div className="relative bg-[#FFFFFF] text-abyss overflow-hidden selection:bg-tuna selection:text-white">
      {/* A. INTRO + HERO SLIDER */}
      <HomeHero />

      {/* B. SHOWCASE: LATEST STORY, VIDEO, GAME, CALL FOR AUTHORS */}
      <Showcase story={story} />

      {/* C. BOOKABLE TRIPS */}
      <FeaturedTrips trips={featuredTrips} />

      {/* D. THE FISHYOLOGY STANDARD — MANIFESTO + THREE PROOFS */}
      <StandardSection />

      {/* E. FOLLOW THE JOURNEY — SOCIAL CHANNELS */}
      <SocialChannels />

      {/* F. TOP READER COUNTRIES */}
      <ReaderAnalytics />
    </div>
  );
}
