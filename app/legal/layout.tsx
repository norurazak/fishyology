import { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";

const description = "Fishyology's Terms of Use and Privacy Policy.";

export const metadata: Metadata = {
  title: "Legal & Compliance",
  description,
  alternates: {
    canonical: '/legal',
  },
  ...socialMetadata({ title: "Legal & Compliance", description, path: "/legal" }),
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
