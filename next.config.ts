import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Fish Valley closed; the retired trip page points to the trips listing.
      { source: "/trips/fish-valley-semenyih", destination: "/trips", permanent: true },
    ];
  },
  // Browser-side protections that cost nothing: no embedding the site in someone else's
  // page (clickjacking), no guessing file types, less referrer detail sent to other
  // sites, and no camera, microphone, location or payment access, none of which the
  // site uses (fullscreen and vibration, which the game uses, stay allowed).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        ],
      },
    ];
  },
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;