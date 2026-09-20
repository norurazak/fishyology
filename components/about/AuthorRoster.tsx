"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePitch } from "@/components/about/PitchContext";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Author {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  image: string;
  specialties: string[];
  isActionCard?: boolean;
}

const authorsData: Author[] = [
  {
    id: "noru-razak",
    name: "Noru Razak",
    role: "Founder & Lead Guide",
    shortBio: "Specialist in experiential angling, focused on Malaysian game fish.",
    fullBio:
      "Noru Razak is the founder of Fishyology and an avid angler driven by a passion for time on the water. His focus is simple, reliving and sharing the journey behind every trip, every cast, and every moment outdoors. Through Fishyology, he captures the spirit of angling as an experience, not just an outcome, while building a space where others can connect through the same passion.",
    image:
      "https://res.cloudinary.com/dub3h3elq/image/upload/v1776785253/noru_profile_photo_e7bfe0.jpg",
    specialties: ["SW & FW Expedition", "Writer", "Venture Building"],
  },
  {
    id: "octo-sabri",
    name: "Octo @ A Sabri Harun",
    role: "Mentor and Senior Contributor",
    shortBio: "Social documentarist and sportfishing writer with roots in visual storytelling.",
    fullBio:
      "Octo is a social documentarist and sportfishing magazine writer whose work revolves around capturing authentic moments and stories. With a background as a former HONOR Pro and Vice President of FJM, he brings both competitive experience and leadership into his perspective. As the proprietor of PasarFoto, he continues to shape visual storytelling through a focus on people, culture, and life on the ground.",
    image:
      "https://res.cloudinary.com/dub3h3elq/image/upload/v1776784018/IMG-20260125-WA0043_209835874247036.jpg_esuelu.jpg",
    specialties: ["Social Documentarist", "Mag Write", "SportFishing"],
  },
  {
    id: "join-the-team",
    name: "You?",
    role: "Future Contributor",
    shortBio: "Have a story, strategy, or trip report to share? We want to publish it.",
    fullBio: "",
    image:
      "https://res.cloudinary.com/dub3h3elq/image/upload/v1776785807/pexels-david-underland-9822133_uhngsn.jpg",
    specialties: ["Your Specialty"],
    isActionCard: true,
  },
];

function AuthorModal({ author, onClose }: { author: Author; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-[#1D242B]/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="author-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-[#FAFAFA] rounded-xl p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${author.name} profile`}
          className="absolute top-6 right-6 p-2 bg-[#1D242B]/5 hover:bg-[#1D242B]/10 text-[#1D242B] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077C0]"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden shrink-0">
            <Image
              src={author.image}
              alt={author.name}
              fill
              sizes="(max-width: 768px) 88vw, 220px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#0077C0] text-xs font-black uppercase tracking-widest block mb-2">
              {author.role}
            </span>
            <h3
              id="author-modal-title"
              className="text-4xl font-serif font-bold text-[#1D242B] mb-6 leading-tight"
            >
              {author.name}
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {author.specialties.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#C7EEFF] text-[#0077C0] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[#1D242B]/80 leading-relaxed font-medium">{author.fullBio}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AuthorRoster() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const { open: openPitch } = usePitch();

  const handleCardClick = (author: Author) => {
    if (author.isActionCard) {
      openPitch();
      document.getElementById("pitch-section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setSelectedAuthor(author);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {authorsData.map((author) => (
          <button
            key={author.id}
            type="button"
            onClick={() => handleCardClick(author)}
            aria-label={
              author.isActionCard
                ? "Pitch a story to Fishyology"
                : `Read ${author.name}'s full profile`
            }
            className="group text-left cursor-pointer bg-white border border-[#1D242B]/10 rounded-lg p-5 shadow-sm hover:shadow-xl hover:border-[#1D242B]/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077C0] focus-visible:ring-offset-2"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-5 bg-black/5">
              <Image
                src={author.image}
                alt={author.name}
                fill
                sizes="(max-width: 768px) 88vw, (max-width: 1024px) 44vw, 30vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${
                author.isActionCard ? "text-[#408A71]" : "text-[#0077C0]"
              }`}
            >
              {author.role}
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#1D242B] mb-2 group-hover:text-[#408A71] transition-colors">
              {author.name}
            </h3>
            <p className="text-[#1D242B]/70 text-sm font-medium line-clamp-2">{author.shortBio}</p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedAuthor && (
          <AuthorModal author={selectedAuthor} onClose={() => setSelectedAuthor(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
