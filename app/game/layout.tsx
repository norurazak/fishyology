import { Metadata } from 'next';
import React from 'react';

// --- SEO METADATA ---
// This object tells search engines and social media platforms what your page is about.
export const metadata: Metadata = {
  title: 'Jigging Master | The Fishyology Creative Studio',
  description: 'Master the water. Conquer the fight. Play Jigging Master and face more than 20 legendary saltwater species in this interactive fishing simulator.',
  alternates: {
    canonical: '/game',
  },
  openGraph: {
    title: 'Jigging Master | The Fishyology Creative Studio',
    description: 'Master the water. Conquer the fight. Play Jigging Master and face more than 20 legendary saltwater species in this interactive fishing simulator.',
    url: 'https://www.fishyology.org/game',
    siteName: 'Fishyology',
    images: [
      {
        url: 'https://res.cloudinary.com/dub3h3elq/image/upload/v1783502920/IMG_5329-EDIT_xh673d.jpg', // Your hero image
        width: 1200,
        height: 630,
        alt: 'Jigging Master Game Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jigging Master | The Fishyology Creative Studio',
    description: 'Master the water. Conquer the fight. Play Jigging Master today!',
    images: ['https://res.cloudinary.com/dub3h3elq/image/upload/v1783502920/IMG_5329-EDIT_xh673d.jpg'],
  },
};

// --- LAYOUT COMPONENT ---
// This simply wraps your GamePage component and applies the metadata above.
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
