"use client";

import { useState, useEffect } from "react";
import { Link2 } from "lucide-react"; 

// --- Custom SVGs for the removed Brand Icons (Matches Lucide's style perfectly) ---
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// NEW: Custom Threads Icon matching the stroked aesthetic
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
  </svg>
);
// ----------------------------------------------------------------------------------

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Grab the URL safely on the client side
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`Check out this expedition: ${title}`);
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/50 mr-2">Share</span>
      
      {/* Threads */}
      <a 
        href={`https://www.threads.net/intent/post?text=${shareText}%20${shareUrl}`} 
        target="_blank" 
        rel="noreferrer" 
        className="w-10 h-10 rounded-full bg-white border border-[#1D242B]/10 flex items-center justify-center text-[#1D242B] hover:bg-[#000000] hover:text-white hover:border-[#000000] transition-colors shadow-sm"
      >
        <ThreadsIcon className="w-4 h-4" />
      </a>

      {/* Twitter / X */}
      <a 
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} 
        target="_blank" 
        rel="noreferrer" 
        className="w-10 h-10 rounded-full bg-white border border-[#1D242B]/10 flex items-center justify-center text-[#1D242B] hover:bg-[#1D242B] hover:text-white transition-colors shadow-sm"
      >
        <TwitterIcon className="w-4 h-4" />
      </a>
      
      {/* Facebook */}
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
        target="_blank" 
        rel="noreferrer" 
        className="w-10 h-10 rounded-full bg-white border border-[#1D242B]/10 flex items-center justify-center text-[#1D242B] hover:bg-[#0077C0] hover:text-white hover:border-[#0077C0] transition-colors shadow-sm"
      >
        <FacebookIcon className="w-4 h-4" />
      </a>

      {/* Copy Link */}
      <button 
        onClick={copyLink} 
        className="relative w-10 h-10 rounded-full bg-white border border-[#1D242B]/10 flex items-center justify-center text-[#1D242B] hover:bg-[#408A71] hover:text-white hover:border-[#408A71] transition-colors shadow-sm"
      >
        <Link2 className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1D242B] text-white text-[10px] font-bold px-2 py-1 rounded">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}