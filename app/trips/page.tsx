import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TripsComingSoon() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#1D242B] overflow-hidden selection:bg-[#0077C0] selection:text-white">
      
      {/* Background Image with heavy cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dub3h3elq/image/upload/v1776574274/IMG_9149_wloodq.jpg" 
          alt="Offshore Fishing Expedition"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        {/* Layered gradients to ensure text readability */}
        <div className="absolute inset-0 bg-[#1D242B]/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/80 to-transparent"></div>
      </div>

      {/* GLOBAL NOISE TEXTURE (To match the homepage vibe) */}
      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto mt-20">
        
        <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-6 text-sm md:text-base drop-shadow-md animate-pulse">
          Guided Expeditions
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#FAFAFA] mb-8 drop-shadow-2xl">
          Coming Soon.
        </h1>
        
        <p className="text-lg md:text-xl text-[#FAFAFA]/80 font-medium leading-relaxed mb-12 drop-shadow-md max-w-xl">
          We are finalizing the details of our world-class guided charters. The ultimate Fishyology experiences are just over the horizon.
        </p>

        <Link 
          href="/" 
          className="group relative inline-flex items-center gap-3 bg-[#FAFAFA] text-[#1D242B] px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl"
        >
          <ArrowLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" />
          <span className="relative z-10">Return to Port</span>
        </Link>

      </div>
    </div>
  );
}