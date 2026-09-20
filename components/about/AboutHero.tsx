"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const heroSlides = [
  {
    title: "The Fishyology Vision",
    text: "Fishyology is driven by a passion for exploring Malaysia’s diverse fishing waters, from saltwater coasts to freshwater depths. Through every trip and catch, we document authentic angling experiences and share them with the world.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776446191/20171202_171640_mfkygm.jpg",
  },
  {
    title: "The Fishyology Mission",
    text: "To showcase Malaysia’s fishing scene through authentic experiences across both saltwater and freshwater waters. Dedicated in sharing the richness of Malaysia’s fishing culture with the world.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776446802/20171231_123709_ue6pot.jpg",
  },
  {
    title: "Live the Experience",
    text: "Join Fishyology as an author, angler, or partner and help shape the story of Malaysia’s fishing scene through shared experiences, real adventures, and meaningful collaboration.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776447013/20180825_083627_1_hxbn0h.jpg",
  },
];

export default function AboutHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  // Auto-advance, but never while the reader is hovering or tabbing through it —
  // copy shouldn't change out from under someone mid-sentence.
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative h-[100dvh] w-full bg-[#1D242B] flex items-end pb-24 md:pb-32"
      aria-roledescription="carousel"
      aria-label="Fishyology vision, mission and invitation"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.title}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover ${
                reduceMotion
                  ? ""
                  : `transition-transform duration-[12000ms] ease-linear ${
                      isActive ? "scale-105" : "scale-100"
                    }`
              }`}
            />
            <div className="absolute inset-0 bg-[#1D242B]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-transparent to-transparent" />
            <div className="absolute bottom-24 md:bottom-32 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black text-[#FAFAFA] tracking-tighter uppercase leading-[0.85] mb-8 drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl text-[#FAFAFA]/90 max-w-2xl font-medium leading-relaxed drop-shadow-md">
                {slide.text}
              </p>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-12 left-6 md:left-16 z-20 flex gap-4">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Show slide ${index + 1}: ${slide.title}`}
            aria-current={index === currentSlide}
            className="group relative flex items-center h-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7EEFF] rounded-full"
          >
            <div
              className={`h-1 transition-all duration-500 rounded-full ${
                index === currentSlide ? "w-16 bg-[#C7EEFF]" : "w-8 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
