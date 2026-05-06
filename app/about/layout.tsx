// 1. Import the Metadata type from Next.js
import { Metadata } from "next";

// 2. Export the Static Metadata for the About Page
export const metadata: Metadata = {
  title: "About Our Journey",
  // Next.js combines this with your root layout to output: "About Our Journey | Fishyology"
  description: "Discover the 10-year history of Fishyology, from local blogs to premier Malaysian game-fish guiding.",
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