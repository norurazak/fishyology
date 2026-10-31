import { getAllPosts } from "@/lib/mdx";
import { getTripPackages } from "@/lib/trips";
import HomeHero from "@/components/home/HomeHero";
import LatestStories from "@/components/home/LatestStories";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import StandardSection from "@/components/home/StandardSection";
import SocialChannels from "@/components/SocialChannels";
import ReaderAnalytics from "@/components/ReaderAnalytics";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 4);
  const featuredTrips = getTripPackages()
    .filter((trip) => !trip.comingSoon && trip.group === "Expedition")
    .slice(0, 3);

  return (
    <div className="relative bg-[#FAFAFA] text-[#1D242B] overflow-hidden selection:bg-[#0077C0] selection:text-white">
      {/* A. INTRO + HERO SLIDER */}
      <HomeHero />

      {/* B. LATEST STORIES */}
      <LatestStories posts={latestPosts} />

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
