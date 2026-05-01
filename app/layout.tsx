import type { Metadata } from 'next';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. IMPORT THE GOOGLE ANALYTICS COMPONENT
import { GoogleAnalytics } from '@next/third-parties/google';

// 2. UPGRADED SEO & METADATA CONFIGURATION
export const metadata: Metadata = {
  // The Official Domain Base
  metadataBase: new URL('https://fishyology.org'),
  
  // Dynamic Title Templating
  title: {
    default: 'Fishyology | Malaysia Fishing Journal and Expedition Platform',
    template: '%s | Fishyology', 
  },
  
  // Search Engine Description
  description: 'Fishyology documents Malaysia fishing waters through real expeditions, field journals, and guided fishing experiences. From saltwater game fishing to freshwater exploration, we tell the stories behind every cast.',
  
  // Social Media Sharing Cards (OpenGraph)
  openGraph: {
    title: 'Fishyology',
    description: 'Expert guides, field reports, and specialized game fishing expeditions.',
    url: 'https://fishyology.org',
    siteName: 'Fishyology',
    locale: 'en_US',
    type: 'website',
  },
  
  // X/Twitter Specific Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Fishyology',
    description: 'Specialized Game Fishing Journal',
  },
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

        {/* 3. INJECT THE TRACKER AT THE BOTTOM OF THE BODY */}
        {/* We use 'as string' to assure TypeScript that this secure variable exists */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
      </body>
    </html>
  );
}