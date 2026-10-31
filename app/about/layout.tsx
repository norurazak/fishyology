// 1. Import the Metadata type from Next.js
import { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";

const description = "Discover the 10-year history of Fishyology, from local blogs to premier Malaysian game-fish guiding.";

// 2. Export the Static Metadata for the About Page
export const metadata: Metadata = {
  title: "About Our Journey",
  // Next.js combines this with your root layout to output: "About Our Journey | Fishyology"
  description,
  alternates: {
    canonical: '/about',
  },
  ...socialMetadata({
    title: "About Our Journey",
    description,
    path: "/about",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1792204133/Tioman_Island_Fishing_Expedition_16_djtu3q.jpg",
    alt: "Twin outboards throwing a white wake off Tioman Island",
  }),
};

// 3. Create the invisible wrapper component
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This takes your awesome Client Component page and renders it safely inside the SEO wrapper
  return <>{children}</>;
}