import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fishing Trips & Guided Charters",
  description: "Guided fishing charters across Malaysia from Fishyology — saltwater trips out of Kuala Rompin and Tioman, freshwater expeditions in Royal Belum, and beginner-friendly pond sessions.",
  alternates: {
    canonical: '/trips',
  },
};

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
