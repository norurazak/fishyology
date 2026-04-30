import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. IMPORT THE GOOGLE ANALYTICS COMPONENT
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: "Fishyology | Relive Our Journey",
  description: "Professionally guided expeditions across Malaysia's top fishing destinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className="bg-[#FAFAFA] text-[#1D242B] antialiased flex flex-col min-h-[100dvh]"
        suppressHydrationWarning
      >
        
        {/* The Floating Navigation Bar */}
        <Navbar />

        {/* The Main Page Content */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* The Massive Editorial Footer */}
        <Footer />

        {/* 2. INJECT THE TRACKER AT THE BOTTOM OF THE BODY */}
        {/* We use 'as string' to assure TypeScript that this secure variable exists */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
      </body>
    </html>
  );
}