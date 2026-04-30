"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Slide = {
  title: string;
  category: string;
  image: string;
  link: string;
};

export default function BlogHeroSlider({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic: changes slide every 5000ms (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 mb-20 group">
      <div className="relative h-[60vh] md:h-[70vh] rounded-[2rem] overflow-hidden shadow-2xl bg-[#1D242B]">
        
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with slight slow zoom effect */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                index === currentSlide ? "scale-110" : "scale-100"
              }`}
            />
            {/* Gradient Overlays for perfect text readability */}
            <div className="absolute inset-0 bg-[#1D242B]/10 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B]/90 via-[#1D242B]/40 to-transparent"></div>
            
            {/* Slide Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start">
              <span className="inline-block bg-[#FAFAFA] text-[#1D242B] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg">
                {slide.category}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-[#FAFAFA] leading-[0.9] tracking-tighter mb-8 max-w-4xl drop-shadow-xl uppercase">
                {slide.title}
              </h2>
              
              {/* CTA Button linking to the specific story */}
              <Link 
                href={slide.link}
                className="group/btn inline-flex items-center gap-3 bg-[#0077C0] text-white px-8 py-4 rounded-xl font-bold text-sm md:text-base hover:bg-[#FAFAFA] hover:text-[#1D242B] transition-colors duration-300 shadow-xl"
              >
                Read Story
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-8 right-8 md:right-16 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentSlide ? "bg-[#C7EEFF] scale-125 shadow-[0_0_10px_rgba(199,238,255,0.8)]" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}