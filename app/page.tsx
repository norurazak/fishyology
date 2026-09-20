"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import SocialChannels from "@/components/SocialChannels";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DATA: HOMEPAGE HERO SLIDES ---
const heroSlides = [
  {
    title: "Relive Our Journey",
    subtitle: "Crafted Through Water and Time",
    text: "Explore real fishing adventures across Malaysia and The World and discover top fishing spots, local techniques, and unforgettable catches from Freshwater and Saltwater Scenes.",
    ctaText: "Read The Journal",
    ctaLink: "/blog",
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
  }
];

// --- DATA: THE FISHYOLOGY STANDARD (Founder / Vision / Global Outreach) ---
const standardPillars = [
  {
    id: "founder",
    label: "The Founder",
    title: "Noru Razak",
    subtitle: "Founder, Est. 2013",
    text: "Fishing has been a defining part of my life since I was six years old. Guided by my father, who is both my inspiration and mentor, I developed not only a love for angling but also a deep respect for the natural world that sustains it. For me, fishing goes beyond the act itself. It is about understanding the environment, the species, and the delicate balance that connects them.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776576974/fishyology_standard_vertical_slider_205600.jpg",
  },
  {
    id: "vision",
    label: "Our Vision",
    title: "Relive Our Journey",
    subtitle: "Behind Every Cast",
    text: "Relive Our Journey is a reflection of Fishyology's vision to document and celebrate the evolving story of angling in Malaysia. It is where every cast, every challenge, and every breakthrough becomes part of a larger narrative that connects anglers across waters and generations.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776446191/20171202_171640_mfkygm.jpg",
  },
  {
    id: "legacy",
    label: "Global Outreach",
    title: "A Worldwide Mission",
    subtitle: "Anglers from 42 Countries",
    text: "Our Mission captures the people behind the passion. From local anglers to international visitors, each story contributes to a growing community connected by a shared appreciation for fishing and the outdoors. By combining local expertise with meaningful exploration, Fishyology continues to support ecotourism while highlighting Malaysia as a world class fishing destination.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776578938/IMG_9649_qwc04y.jpg",
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introVideo, setIntroVideo] = useState("");
  const [introFinished, setIntroFinished] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const discoveryRef = useRef<HTMLDivElement>(null);

  // 1. Cinematic Intro Sequence (GSAP)
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("fishyology_intro_played");

    if (hasPlayed) {
      setIntroFinished(true);
      gsap.set(".splash-screen", { display: "none" });
      return; 
    }

    sessionStorage.setItem("fishyology_intro_played", "true");

    const cinematicVideos = [
      "https://res.cloudinary.com/dub3h3elq/video/upload/v1776573413/download_1_edhjld.mp4", 
      "https://res.cloudinary.com/dub3h3elq/video/upload/v1776573413/download_1_edhjld.mp4" 
    ];
    setIntroVideo(cinematicVideos[Math.floor(Math.random() * cinematicVideos.length)]);

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIntroFinished(true);
          document.body.style.overflow = "auto"; 
        }
      });

      tl.to(".welcome-text", { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, 4.5)
        .to(".splash-screen", { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 7.5)
        .set(".splash-screen", { display: "none" }); 

    }, mainRef);

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

  // 3. Main Page GSAP Scroll Animations
  useEffect(() => {
    if (!introFinished) return; 

    const ctx = gsap.context(() => {
      gsap.from(".discovery-container", {
        scrollTrigger: {
          trigger: discoveryRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, [introFinished]);

  return (
    <div ref={mainRef} className="relative bg-[#FAFAFA] text-[#1D242B] overflow-hidden selection:bg-[#0077C0] selection:text-white">
      
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
        <h1 className="welcome-text opacity-0 translate-y-8 relative z-10 text-4xl md:text-6xl font-serif text-[#FAFAFA] tracking-wide text-center drop-shadow-2xl">
          WELCOME TO OUR WORLD
        </h1>
      </div>

      {/* GLOBAL NOISE TEXTURE */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* A. MASSIVE HERO AUTO-SLIDER */}
      <section className="relative h-[100dvh] w-full bg-[#1D242B] flex items-end pb-24 md:pb-32 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] ease-linear ${
                index === currentSlide && introFinished ? "scale-105" : "scale-100"
              }`}
            />
            {/* Lighter opacity overlays so the images pop more */}
            <div className="absolute inset-0 bg-[#1D242B]/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/20 to-transparent"></div>
            
            <div className="absolute bottom-24 md:bottom-32 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-start">
              <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-md">
                {slide.subtitle}
              </span>
              <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] font-black text-[#FAFAFA] tracking-tighter uppercase mb-6 drop-shadow-2xl max-w-6xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl text-[#FAFAFA]/90 max-w-3xl font-medium mb-10 leading-relaxed drop-shadow-md">
                {slide.text}
              </p>
              
              <Link 
                href={slide.ctaLink} 
                className="group relative inline-flex items-center gap-3 bg-[#FAFAFA] text-[#1D242B] px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl"
              >
                <span className="relative z-10">{slide.ctaText}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
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
              <div className={`h-1.5 transition-all duration-500 rounded-full ${
                index === currentSlide ? "w-16 bg-[#C7EEFF]" : "w-8 bg-white/30 group-hover:bg-white/60"
              }`} />
            </button>
          ))}
        </div>
      </section>

      {/* B. THE FISHYOLOGY STANDARD — MANIFESTO + THREE PROOFS */}
      <section ref={discoveryRef} className="pt-[76px] pb-0 md:pt-[108px] px-6 md:px-12 max-w-[1600px] mx-auto relative">

        {/* The statement */}
        <div className="discovery-container max-w-5xl mb-16 md:mb-24">
          <span className="text-[#0077C0] font-bold tracking-widest uppercase mb-3 block text-sm">
            What We Stand For
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1D242B] mb-8">
            The Fishyology Standard
          </h2>
          <p className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-[#1D242B] leading-[1.2] mb-10">
            We document angling as an experience, not an outcome — every cast, every
            challenge, and every story that connects anglers across waters and generations.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-12 h-[2px] bg-[#0077C0]"></div>
            <span className="font-serif italic text-xl md:text-2xl text-[#1D242B]">
              Noru Razak
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/40">
              Founder, Est. 2013
            </span>
          </div>
        </div>

        {/* The three proofs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {standardPillars.map((pillar) => (
            <article
              key={pillar.id}
              className="group flex flex-col rounded-[1.75rem] overflow-hidden bg-white border border-[#1D242B]/8 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="h-56 md:h-64 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[8s]"
                />
              </div>

              <div className="flex flex-col flex-1 p-6 md:p-8">
                <span className="text-[#0077C0] font-black tracking-widest uppercase text-[10px] md:text-xs mb-3">
                  {pillar.label}
                </span>
                <h3 className="font-serif italic text-2xl md:text-3xl text-[#1D242B] leading-tight mb-1">
                  {pillar.title}
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/40 mb-4">
                  {pillar.subtitle}
                </span>
                <p className="text-[#1D242B]/70 text-sm md:text-base leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex justify-end">
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-3 bg-[#1D242B] text-[#FAFAFA] px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-xl hover:shadow-2xl"
          >
            <span className="relative z-10">Read Our Full Story</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* C. FOLLOW THE JOURNEY — SOCIAL CHANNELS */}
      <SocialChannels />

    </div>
  );
}