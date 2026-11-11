"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

// One Tuna hover for every nav link. The tint is 10% Tuna and the text the on-light
// variant, 5.3:1 together. Keyboard focus gets the same tint plus a ring.
const NAV_LINK_HOVER =
  "hover:bg-tuna/10 hover:text-tuna-on-light focus-visible:bg-tuna/10 focus-visible:text-tuna-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tuna-on-light";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to track mobile menu toggle

  // Listen for scroll events to trigger the frosted glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4 md:px-8 flex flex-col items-center pointer-events-none">
      <nav 
        className={`navbar-pill pointer-events-auto flex items-center justify-between text-abyss px-6 py-3 w-full max-w-6xl transition-all duration-500 relative ${
          isScrolled 
            ? "bg-[#FAFAFA]/70 backdrop-blur-md hover:bg-[#FAFAFA] shadow-lg border border-abyss/10 rounded-2xl" 
            : "bg-[#FAFAFA] shadow-sm border border-transparent rounded-2xl"
        }`}
      >
        {/* Left: Logo & Brand */}
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Fishyology" 
            className="w-7 h-7 object-contain" 
          />
          Fishyology
        </Link>
        
        {/* Center: Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-4 font-medium text-sm">
          <Link href="/" className={`px-4 py-2 rounded-lg ${NAV_LINK_HOVER} transition-colors`}>Home</Link>
          <Link href="/trips" className={`px-4 py-2 rounded-lg ${NAV_LINK_HOVER} transition-colors`}>Trips</Link>
          <Link href="/blog" className={`px-4 py-2 rounded-lg ${NAV_LINK_HOVER} transition-colors`}>Journal</Link>
          <Link href="/resources" className={`px-4 py-2 rounded-lg ${NAV_LINK_HOVER} transition-colors`}>Resources</Link>
          <Link href="/about" className={`px-4 py-2 rounded-lg ${NAV_LINK_HOVER} transition-colors`}>About</Link>
          {/* NEW: Desktop Game Link */}
          <Link href="/game" className={`px-4 py-2 rounded-lg ${NAV_LINK_HOVER} transition-colors`}>Game</Link>
        </div>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/trips" className="btn-primary hidden sm:block px-5 py-2 rounded-lg text-sm font-bold">
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-abyss hover:bg-abyss/5 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`absolute top-[calc(100%+12px)] left-0 w-full bg-[#FAFAFA] border border-abyss/10 rounded-2xl shadow-xl p-4 flex flex-col gap-2 transition-all duration-300 origin-top md:hidden ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <Link href="/" onClick={closeMenu} className={`px-4 py-3 rounded-xl ${NAV_LINK_HOVER} font-medium transition-colors`}>Home</Link>
          <Link href="/trips" onClick={closeMenu} className={`px-4 py-3 rounded-xl ${NAV_LINK_HOVER} font-medium transition-colors`}>Trips</Link>
          <Link href="/blog" onClick={closeMenu} className={`px-4 py-3 rounded-xl ${NAV_LINK_HOVER} font-medium transition-colors`}>Journal</Link>
          <Link href="/resources" onClick={closeMenu} className={`px-4 py-3 rounded-xl ${NAV_LINK_HOVER} font-medium transition-colors`}>Resources</Link>
          <Link href="/about" onClick={closeMenu} className={`px-4 py-3 rounded-xl ${NAV_LINK_HOVER} font-medium transition-colors`}>About</Link>
          {/* NEW: Mobile Game Link */}
          <Link href="/game" onClick={closeMenu} className={`px-4 py-3 rounded-xl ${NAV_LINK_HOVER} font-medium transition-colors`}>Game</Link>
          <hr className="border-abyss/10 my-2" />
          <Link href="/trips" onClick={closeMenu} className="btn-primary text-center py-3 rounded-xl font-bold">
            Book Now
          </Link>
        </div>
      </nav>
    </div>
  );
}
