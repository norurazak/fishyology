import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Expeditions",
  description: "Guided fishing charters in Malaysia are coming soon from Fishyology. Join the list to be first to know when booking opens.",
  alternates: {
    canonical: '/trips',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
