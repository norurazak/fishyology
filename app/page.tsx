"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

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

// --- DATA: CINEMATIC DISCOVERY TABS ---
const discoveryTabs = [
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
  
  // State for the Cinematic Discovery Section
  const [activeTab, setActiveTab] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
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

  // Handle Cinematic Fade Transition
  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(index);
      setIsFading(false);
    }, 400); 
  };

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

      {/* B. CINEMATIC DISCOVERY SECTION */}
      <section ref={discoveryRef} className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative">
        
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1D242B]">
            The Fishyology Standard
          </h2>
        </div>

        {/* The Massive Cinematic Viewport */}
        <div className="discovery-container relative w-full h-[700px] md:h-[800px] rounded-[2rem] overflow-hidden shadow-2xl bg-[#11151A] group">
          
          {/* Background Images Crossfade */}
          {discoveryTabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeTab === index ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <img 
                src={tab.image} 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[15s]" 
                alt={tab.title} 
              />
              {/* New vignette gradient to protect the text on the right side */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#11151A] via-[#11151A]/10 to-[#11151A]/60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#11151A]/70 to-transparent md:hidden"></div>
            </div>
          ))}

          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 p-8 md:p-16 flex flex-col md:flex-row gap-12 md:gap-16">
            
            {/* Left Column: Minimalist Navigation */}
            <div className="flex flex-row md:flex-col gap-6 md:gap-10 md:w-1/3 justify-start md:justify-center border-b md:border-b-0 md:border-l border-white/10 pb-6 md:pb-0 md:pl-10 h-auto md:h-full overflow-x-auto no-scrollbar">
              {discoveryTabs.map((tab, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(index)}
                    className="group relative text-left transition-all duration-500 shrink-0"
                  >
                    {/* The Active Line Indicator */}
                    <div className={`absolute -bottom-6 md:-left-10 md:bottom-auto md:top-0 h-[2px] w-full md:w-[2px] md:h-full transition-all duration-500 ${isActive ? 'bg-[#C7EEFF]' : 'bg-transparent'}`}></div>
                    
                    <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-[#C7EEFF]' : 'text-white/40 group-hover:text-white/70'}`}>
                      0{index + 1}
                    </span>
                    <span className={`block text-xl md:text-3xl font-serif italic transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right Column: Dynamic Editorial Content */}
            <div className="md:w-2/3 flex items-center justify-end h-full mt-auto md:mt-0">
               <div className={`max-w-xl transition-all duration-700 transform ${isFading ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                  
                  {/* Frosted glass text container */}
                  <div className="bg-[#11151A]/20 backdrop-blur-[2px] p-6 md:p-8 rounded-2xl border border-white/5">
                    
                    {/* Subtitle is now safely inside the frosted glass! */}
                    <span className="text-[#C7EEFF] font-black tracking-widest uppercase text-xs md:text-sm mb-3 block drop-shadow-xl">
                      {discoveryTabs[activeTab].subtitle}
                    </span>
                    
                    <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6 drop-shadow-2xl">
                      {discoveryTabs[activeTab].title}
                    </h3>
                    <p className="text-white/90 font-medium leading-relaxed text-base md:text-lg drop-shadow-lg">
                      {discoveryTabs[activeTab].text}
                    </p>

                    {/* Signature only shows on Founder tab */}
                    {activeTab === 0 && (
                       <div className="mt-8 flex items-center gap-4">
                         <div className="w-12 h-[2px] bg-[#C7EEFF]/70"></div>
                         <span className="text-white font-serif italic text-2xl pr-4 drop-shadow-xl">Noru Razak</span>
                       </div>
                    )}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}