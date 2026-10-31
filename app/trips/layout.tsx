import { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fishing Trips & Guided Charters",
  description: "Guided fishing charters across Malaysia from Fishyology — saltwater trips out of Kuala Rompin and Tioman, freshwater expeditions in Royal Belum, and beginner-friendly pond sessions.",
  alternates: {
    canonical: '/trips',
  },
  ...socialMetadata({
    title: "Fishing Trips & Guided Charters",
    description: "Guided fishing charters across Malaysia — Kuala Rompin, Tioman, Royal Belum and beginner pond sessions, booked directly with Fishyology.",
    path: "/trips",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776574274/IMG_9149_wloodq.jpg",
    alt: "Fishyology guided fishing charter",
  }),
};

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
