"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cloudinaryImage } from "@/lib/cloudinary";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  },
];

export default function StandardSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".discovery-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-[76px] pb-0 md:pt-[108px] px-6 md:px-12 max-w-[1600px] mx-auto relative">
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
          <span className="font-serif italic text-xl md:text-2xl text-[#1D242B]">Noru Razak</span>
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
                {...cloudinaryImage(pillar.image, { sizes: "(max-width: 768px) 100vw, 33vw" })}
                alt={pillar.title}
                loading="lazy"
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
              <p className="text-[#1D242B]/70 text-sm md:text-base leading-relaxed">{pillar.text}</p>
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
  );
}
