import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fishing Trips & Guided Charters",
  description: "Guided fishing charters across Malaysia from Fishyology — saltwater trips out of Kuala Rompin and Tioman, freshwater expeditions in Royal Belum, and beginner-friendly pond sessions.",
  alternates: {
    canonical: '/trips',
  },
  openGraph: {
    title: "Fishing Trips & Guided Charters",
    description: "Guided fishing charters across Malaysia — Kuala Rompin, Tioman, Royal Belum and beginner pond sessions, booked directly with Fishyology.",
    url: 'https://www.fishyology.org/trips',
    siteName: 'Fishyology',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dub3h3elq/image/upload/v1776574274/IMG_9149_wloodq.jpg',
        alt: 'Fishyology guided fishing charter',
      },
    ],
  },
};

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
