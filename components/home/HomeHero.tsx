"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { cloudinaryImage, HERO_WIDTHS } from "@/lib/cloudinary";

const INTRO_VIDEO_BASE = "https://res.cloudinary.com/dub3h3elq/video/upload";
const INTRO_VIDEO_FILE = "v1776573413/download_1_edhjld.mp4";

// --- DATA: HOMEPAGE HERO SLIDES ---
const heroSlides = [
  {
    title: "Relive Our Journey",
    subtitle: "Crafted Through Water and Time",
    text: "Fishing stories, science and guided trips from Malaysian waters.",
    ctaText: "Read The Journal",
    ctaLink: "/blog",
    secondaryCtaText: "See the Trips",
    secondaryCtaLink: "/trips",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776575096/IMG_3455_afqsvy.jpg",
  },
  {
    title: "Conquer The Waters",
    subtitle: "Guided Fishing Charters",
    text: "Plan your ultimate fishing trips in Malaysia and worldwide. Explore top destinations, guided charters, and expert tips for unforgettable angling adventures and experience.",
    ctaText: "Explore Packages",
    ctaLink: "/trips",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776574274/IMG_9149_wloodq.jpg",
  },
  {
    title: "Master The Experience",
    subtitle: "Be Part of Our Journey",
    text: "Master the fishing experience in Malaysia through sustainable angling as we embrace catch and release, ethical practices, and a deeper connection to nature.",
    ctaText: "Our Philosophy",
    ctaLink: "/about",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776574817/IMG_4299_flglgq.jpg",
  },
];

const TITLE_CLASS =
  "text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] font-black text-[#FAFAFA] tracking-tighter uppercase mb-6 drop-shadow-2xl max-w-6xl";

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introVideo, setIntroVideo] = useState("");
  const [introFinished, setIntroFinished] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  // 1. Cinematic Intro Sequence (GSAP)
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("fishyology_intro_played");

    if (hasPlayed) {
      setIntroFinished(true);
      gsap.set(".splash-screen", { display: "none" });
      return;
    }

    sessionStorage.setItem("fishyology_intro_played", "true");

    // Compressed by Cloudinary, with a smaller cut for phones.
    const transform = window.innerWidth < 768 ? "q_auto:low,c_limit,w_720" : "q_auto,c_limit,w_1280";
    setIntroVideo(`${INTRO_VIDEO_BASE}/${transform}/${INTRO_VIDEO_FILE}`);

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIntroFinished(true);
          document.body.style.overflow = "auto";
        },
      });

      tl.to(".welcome-text", { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, 4.5)
        .to(".splash-screen", { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 7.5)
        .set(".splash-screen", { display: "none" });
    }, heroRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, []);

  // 2. Auto-play logic for Hero Slider
  useEffect(() => {
    if (!introFinished) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [introFinished]);

  return (
    <div ref={heroRef}>
      {/* --- CINEMATIC SPLASH SCREEN OVERLAY --- */}
      <div className="splash-screen fixed inset-0 z-[100] bg-[#1D242B] flex items-center justify-center overflow-hidden">
        {introVideo && (
          <video
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          >
            <source src={introVideo} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/10"></div>
        <p className="welcome-text opacity-0 translate-y-8 relative z-10 text-4xl md:text-6xl font-serif text-[#FAFAFA] tracking-wide text-center drop-shadow-2xl">
          WELCOME TO OUR WORLD
        </p>
      </div>

      {/* GLOBAL NOISE TEXTURE */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* MASSIVE HERO AUTO-SLIDER */}
      <section className="relative h-[100dvh] w-full bg-[#1D242B] flex items-end pb-24 md:pb-32 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Later slides wait for the intro so the first paint only fetches one hero. */}
            {(index === 0 || introFinished) && (
              <img
                {...cloudinaryImage(slide.image, { sizes: "100vw", widths: HERO_WIDTHS, quality: "auto:best" })}
                alt={slide.title}
                fetchPriority={index === 0 ? "high" : "auto"}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] ease-linear ${
                  index === currentSlide && introFinished ? "scale-105" : "scale-100"
                }`}
              />
            )}
            {/* Lighter opacity overlays so the images pop more */}
            <div className="absolute inset-0 bg-[#1D242B]/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/20 to-transparent"></div>

            <div className="absolute bottom-24 md:bottom-32 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-start">
              <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-md">
                {slide.subtitle}
              </span>
              {index === 0 ? (
                <h1 className={TITLE_CLASS}>{slide.title}</h1>
              ) : (
                <h2 className={TITLE_CLASS}>{slide.title}</h2>
              )}
              <p className="text-lg md:text-2xl text-[#FAFAFA]/90 max-w-3xl font-medium mb-10 leading-relaxed drop-shadow-md">
                {slide.text}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={slide.ctaLink}
                  className="group relative inline-flex items-center gap-3 bg-[#FAFAFA] text-[#1D242B] px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl"
                >
                  <span className="relative z-10">{slide.ctaText}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
                {slide.secondaryCtaLink && (
                  <Link
                    href={slide.secondaryCtaLink}
                    className="inline-flex items-center gap-3 border border-[#FAFAFA]/60 text-[#FAFAFA] px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:bg-[#FAFAFA]/10 transition-colors"
                  >
                    {slide.secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-12 left-6 md:left-16 z-20 flex gap-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative flex items-center h-4 focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  index === currentSlide ? "w-16 bg-[#C7EEFF]" : "w-8 bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
