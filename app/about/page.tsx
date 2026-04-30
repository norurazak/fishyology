"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { PenTool, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

// --- DATA: HERO SLIDES ---
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
  }
];

// --- DATA: 10-YEAR TIMELINE ---
const timelineData = [
  { year: "2013", title: "The Journey Begins", desc: "Andrew Griffin stands as a pivotal figure in validating Fishyology's mission to showcase Malaysia's fishing scene to the world, strengthening its credibility and global recognition.", img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445335/CIMG4471_1_wupswd.jpg" },
  { year: "2016", title: "Malaysia's Best Fishing Blog", desc: "From saltwater to freshwater, Fishyology has explored countless fishing grounds across Malaysia, capturing moments and experiences to bring you closer to reliving our journey.", img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776444739/GOPR1308_1518482485158_high_mrjfqz.jpg" },
  { year: "2019", title: "Fishyology Charters and Adventures", desc: "Serving over 250 customers across 12 locations in Malaysia, welcoming anglers from 42 countries. From single-day trips to extended freshwater and saltwater expeditions, we deliver fishing experiences across diverse waters.", img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445424/20160125_124622_poxbqv.jpg" },
  { year: "2021", title: "The End of the Blog Era and Covid 19", desc: "Blogs were no longer the primary medium for fishing storytelling. This marked a turning point in how fishing content was shared and experienced, as broader disruptions, including the COVID-19 period, further reshaped how audiences engaged with outdoor and fishing content.", img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445597/20180901_154924_v9jkyd.jpg" },
  { year: "2026", title: "The Next Chapter Begins", desc: "Fishyology returns with renewed purpose and direction. Building on past experiences and a growing vision, this new chapter continues the journey of showcasing Malaysia's fishing scene, deeper, stronger, and with greater intent to share it with the world.", img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445850/RPBIC_rwtzge.jpg" },
];

// --- NEW DATA: AUTHORS DIRECTORY ---
const authorsData = [
  {
    id: "noru-razak",
    name: "Noru Razak",
    role: "Founder & Lead Guide",
    shortBio: "Specialist in experiential angling, focused on Malaysian game fish.",
    fullBio: "Noru Razak is the founder of Fishyology and an avid angler driven by a passion for time on the water. His focus is simple, reliving and sharing the journey behind every trip, every cast, and every moment outdoors. Through Fishyology, he captures the spirit of angling as an experience, not just an outcome, while building a space where others can connect through the same passion.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776785253/noru_profile_photo_e7bfe0.jpg",
    specialties: ["SW & FW Expedition", "Writer", "Venture Building"]
  },
  {
    id: "octo-sabri",
    name: "Octo @ A Sabri Harun",
    role: "Mentor and Senior Contributor",
    shortBio: "Social documentarist and sportfishing writer with roots in visual storytelling.",
    fullBio: "Octo is a social documentarist and sportfishing magazine writer whose work revolves around capturing authentic moments and stories. With a background as a former HONOR Pro and Vice President of FJM, he brings both competitive experience and leadership into his perspective. As the proprietor of PasarFoto, he continues to shape visual storytelling through a focus on people, culture, and life on the ground.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776784018/IMG-20260125-WA0043_209835874247036.jpg_esuelu.jpg",
    specialties: ["Social Documentarist", "Mag Write", "SportFishing"]
  },
  // --- NEW: THE "CALL TO ACTION" CARD ---
  {
    id: "join-the-team",
    name: "You?",
    role: "Future Contributor",
    shortBio: "Have a story, strategy, or trip report to share? We want to publish it.",
    fullBio: "", // Not needed, this won't open the modal
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776785807/pexels-david-underland-9822133_uhngsn.jpg", // A moody silhouette image to match the vibe
    specialties: ["Your Specialty"],
    isActionCard: true // This flag tells our code NOT to open the modal
  }
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const contentRef = useRef(null);

  // States for the Pitch Form
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [pitchStatus, setPitchStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pitchMessage, setPitchMessage] = useState("");

  const [selectedAuthor, setSelectedAuthor] = useState<typeof authorsData[0] | null>(null);

  // --- NEW: Function to handle author card clicks ---
  const handleCardClick = (author: typeof authorsData[0]) => {
    if (author.isActionCard) {
      // 1. Open the form
      setIsPitchOpen(true);
      // 2. Smoothly scroll down to the pitch section
      document.getElementById("pitch-section")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Open the standard author profile modal
      setSelectedAuthor(author);
    }
  };

  async function handlePitchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPitchStatus("loading");
    setPitchMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "1b489a29-4789-4f82-ae2b-77ff5829c0d8");
    formData.append("subject", "New Story Pitch from Fishyology!");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setPitchStatus("success");
        setPitchMessage("Pitch received! We'll review it and reach out soon.");
      } else {
        setPitchStatus("error");
        setPitchMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setPitchStatus("error");
      setPitchMessage("Check your internet connection and try again.");
    }
  }

  // Auto-play logic for Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Animation for timeline
  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [activeYearIndex]);

  // Lock body scroll when Author Modal is open
  useEffect(() => {
    if (selectedAuthor) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedAuthor]);

  return (
    <div className="bg-[#FAFAFA] text-[#1D242B] min-h-screen overflow-hidden">
      
      {/* GLOBAL NOISE TEXTURE */}
      <svg className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* 1. MASSIVE HERO AUTO-SLIDER */}
      <section className="relative h-[100dvh] w-full bg-[#1D242B] flex items-end pb-24 md:pb-32">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] ease-linear ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-[#1D242B]/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-transparent to-transparent"></div>
            <div className="absolute bottom-24 md:bottom-32 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black text-[#FAFAFA] tracking-tighter uppercase leading-[0.85] mb-8 drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl text-[#FAFAFA]/90 max-w-2xl font-medium leading-relaxed drop-shadow-md">
                {slide.text}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-12 left-6 md:left-16 z-20 flex gap-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative flex items-center h-4"
            >
              <div className={`h-1 transition-all duration-500 rounded-full ${
                index === currentSlide ? "w-16 bg-[#C7EEFF]" : "w-8 bg-white/30 group-hover:bg-white/60"
              }`} />
            </button>
          ))}
        </div>
      </section>

      {/* 2. THE 10-YEAR JOURNEY */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-b border-[#1D242B]/10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1D242B] mb-4">A Decade on the Water</h2>
          <p className="text-[#1D242B]/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            From local fishing blogs to Malaysia's premier game-fish guiding service.
          </p>
        </div>
        <div className="relative w-full mb-16">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1D242B]/10 -translate-y-1/2 z-0"></div>
          <div className="relative z-10 flex justify-between items-center overflow-x-auto hide-scrollbar gap-8 pb-4 px-2">
            {timelineData.map((data, index) => (
              <button
                key={index}
                onClick={() => setActiveYearIndex(index)}
                className="flex flex-col items-center gap-3 shrink-0 group focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  activeYearIndex === index 
                    ? "bg-[#0077C0] text-white shadow-[0_0_20px_rgba(0,119,192,0.4)] scale-110" 
                    : "bg-[#FAFAFA] border-2 border-[#1D242B]/20 text-[#1D242B] group-hover:border-[#0077C0]"
                }`}>
                  {data.year}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-[#1D242B]/5">
          <div className="relative aspect-video lg:aspect-square rounded-[1.5rem] overflow-hidden bg-black">
            <img 
              src={timelineData[activeYearIndex].img} 
              alt={timelineData[activeYearIndex].title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[#408A71] font-black text-6xl md:text-8xl opacity-20 mb-[-20px] tracking-tighter">
              {timelineData[activeYearIndex].year}
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#1D242B] mb-6 leading-tight">
              {timelineData[activeYearIndex].title}
            </h3>
            <p className="text-[#1D242B]/70 text-lg leading-relaxed font-medium">
              {timelineData[activeYearIndex].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE AUTHORS */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1D242B] mb-4">The Roster</h2>
          <p className="text-[#1D242B]/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Meet the anglers and writers documenting the Malaysian waters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authorsData.map((author) => (
            <div 
              key={author.id} 
              // --- CHANGED: Use the new function we created ---
              onClick={() => handleCardClick(author)}
              className="group cursor-pointer bg-white border border-[#1D242B]/10 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-[#1D242B]/30 transition-all duration-300"
            >
              <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-6 bg-black/5">
                <img 
                  src={author.image} 
                  alt={author.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${author.isActionCard ? 'text-[#408A71]' : 'text-[#0077C0]'}`}>
                {author.role}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1D242B] mb-3 group-hover:text-[#408A71] transition-colors">
                {author.name}
              </h3>
              <p className="text-[#1D242B]/70 text-sm font-medium line-clamp-2">
                {author.shortBio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AUTHOR MODAL (Framer Motion) */}
      <AnimatePresence>
        {selectedAuthor && !selectedAuthor.isActionCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-[#1D242B]/80 backdrop-blur-md"
            onClick={() => setSelectedAuthor(null)} 
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#FAFAFA] rounded-[2rem] p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setSelectedAuthor(null)}
                className="absolute top-6 right-6 p-2 bg-[#1D242B]/5 hover:bg-[#1D242B]/10 text-[#1D242B] rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 aspect-square rounded-[1.5rem] overflow-hidden shrink-0">
                  <img src={selectedAuthor.image} alt={selectedAuthor.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#0077C0] text-xs font-black uppercase tracking-widest block mb-2">
                    {selectedAuthor.role}
                  </span>
                  <h3 className="text-4xl font-serif font-bold text-[#1D242B] mb-6 leading-tight">
                    {selectedAuthor.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedAuthor.specialties.map((tag) => (
                      <span key={tag} className="bg-[#C7EEFF] text-[#0077C0] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#1D242B]/80 leading-relaxed font-medium">
                    {selectedAuthor.fullBio}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. CALL FOR WRITERS CTA */}
      {/* --- CHANGED: Added id="pitch-section" so we can scroll here --- */}
      <section id="pitch-section" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1D242B] z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0077C0]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="bg-[#C7EEFF] text-[#0077C0] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-8">
            Get Hooked With Us
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#FAFAFA] uppercase tracking-tighter leading-[1.1] mb-8">
            Tell your story. <br/>
            <span className="text-[#408A71] italic font-serif lowercase tracking-normal">Inspire the next cast.</span>
          </h2>
          <p className="text-[#FAFAFA]/70 text-lg md:text-xl font-medium max-w-2xl mb-12">
            We are looking for passionate young anglers, conservationists, and storytellers to contribute to the Fishyology Journal. Have a trip report or strategy to share? We want to publish it.
          </p>
          
          <button 
            onClick={() => setIsPitchOpen(!isPitchOpen)}
            className="group relative inline-flex items-center gap-3 bg-[#0077C0] text-white px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:bg-[#FAFAFA] hover:text-[#1D242B] transition-colors duration-300 shadow-2xl focus:outline-none"
          >
            <span className="relative z-10">{isPitchOpen ? "Close Form" : "Pitch a Story"}</span>
            <PenTool className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          <div 
            className={`w-full max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
              isPitchOpen ? 'max-h-[800px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            {pitchStatus === "success" ? (
              <div className="bg-[#408A71]/20 border border-[#408A71]/40 rounded-2xl p-8 text-center shadow-inner">
                <p className="text-[#C7EEFF] font-bold tracking-widest uppercase text-lg mb-2">
                  Pitch Received!
                </p>
                <p className="text-[#FAFAFA]/80">We will review your submission and reach out via email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handlePitchSubmit} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col gap-5 text-left shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[#FAFAFA] text-sm font-bold ml-2">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    required 
                    placeholder="E.g. Jeremy Wade"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-[#FAFAFA] placeholder:text-[#FAFAFA]/30 focus:outline-none focus:border-[#0077C0] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[#FAFAFA] text-sm font-bold ml-2">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    required 
                    placeholder="your@email.com"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-[#FAFAFA] placeholder:text-[#FAFAFA]/30 focus:outline-none focus:border-[#0077C0] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[#FAFAFA] text-sm font-bold ml-2">Your Story Idea</label>
                  <textarea 
                    id="message"
                    name="message" 
                    required 
                    rows={4}
                    placeholder="Tell us briefly about the trip, strategy, or story you want to share..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-[#FAFAFA] placeholder:text-[#FAFAFA]/30 focus:outline-none focus:border-[#0077C0] transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={pitchStatus === "loading"}
                  className="w-full mt-2 bg-[#FAFAFA] text-[#1D242B] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0077C0] hover:text-white transition-colors duration-300 disabled:opacity-70"
                >
                  {pitchStatus === "loading" ? "Sending Pitch..." : "Submit Pitch"}
                </button>
                {pitchStatus === "error" && (
                  <p className="text-red-400 text-sm font-bold text-center mt-2">{pitchMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}