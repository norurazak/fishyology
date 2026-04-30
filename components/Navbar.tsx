"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

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
        className={`navbar-pill pointer-events-auto flex items-center justify-between text-[#1D242B] px-6 py-3 w-full max-w-6xl transition-all duration-500 relative ${
          isScrolled 
            ? "bg-[#FAFAFA]/70 backdrop-blur-md hover:bg-[#FAFAFA] shadow-lg border border-[#1D242B]/10 rounded-2xl" 
            : "bg-[#FAFAFA] shadow-sm border border-transparent rounded-2xl"
        }`}
      >
        {/* Left: Logo & Brand */}
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-3">
          <img 
            src="/logo.svg" 
            alt="Fishyology" 
            className="w-7 h-7 object-contain" 
          />
          Fishyology
        </Link>
        
        {/* Center: Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-4 font-medium text-sm">
          <Link href="/" className="px-4 py-2 rounded-lg hover:bg-[#1D242B]/5 transition-colors">Home</Link>
          <Link href="/trips" className="px-4 py-2 rounded-lg hover:bg-[#408A71]/20 transition-colors">Trips</Link>
          <Link href="/blog" className="px-4 py-2 rounded-lg hover:bg-[#C7EEFF] transition-colors">Journal</Link>
          <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-[#1D242B]/5 transition-colors">About</Link>
        </div>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Custom Packages link removed from here */}
          
          <Link href="/trips" className="hidden sm:block bg-transparent border border-[#1D242B]/20 hover:border-[#1D242B] hover:bg-[#1D242B] hover:text-[#FAFAFA] px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300">
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#1D242B] hover:bg-[#1D242B]/5 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`absolute top-[calc(100%+12px)] left-0 w-full bg-[#FAFAFA] border border-[#1D242B]/10 rounded-2xl shadow-xl p-4 flex flex-col gap-2 transition-all duration-300 origin-top md:hidden ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <Link href="/" onClick={closeMenu} className="px-4 py-3 rounded-xl hover:bg-[#1D242B]/5 font-medium transition-colors">Home</Link>
          <Link href="/trips" onClick={closeMenu} className="px-4 py-3 rounded-xl hover:bg-[#408A71]/10 font-medium transition-colors">Trips</Link>
          <Link href="/blog" onClick={closeMenu} className="px-4 py-3 rounded-xl hover:bg-[#C7EEFF] font-medium transition-colors">Journal</Link>
          <Link href="/about" onClick={closeMenu} className="px-4 py-3 rounded-xl hover:bg-[#1D242B]/5 font-medium transition-colors">About</Link>
          <hr className="border-[#1D242B]/10 my-2" />
          <Link href="/trips" onClick={closeMenu} className="bg-[#1D242B] text-[#FAFAFA] text-center py-3 rounded-xl font-bold transition-all">
            Book Now
          </Link>
        </div>
      </nav>
    </div>
  );
}