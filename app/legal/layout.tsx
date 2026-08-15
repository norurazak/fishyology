import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Compliance",
  description: "Fishyology's Terms of Use and Privacy Policy.",
  alternates: {
    canonical: '/legal',
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
