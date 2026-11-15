"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PitchForm from "@/components/about/PitchForm";

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
    id: "nemo",
    name: "Nemo",
    role: "Fishyology Insight",
    shortBio: "Hunts down the fisheries research, interrogates it, and reports back what actually holds up for anglers.",
    fullBio:
      "Nemo is Fishyology's research agent, a byline rather than a person. Handed a question, it sweeps the peer-reviewed fisheries literature through Scopus AI, pulls the studies that genuinely bear on it, and tests every figure against the source paper before letting that figure into a piece. It makes the calls as it goes: what matters to someone standing on the bank, what is academic noise, where the evidence is thinner than the abstract implies, and which gaps the research simply has not closed yet. It pushes back on its own sources, flags the numbers nobody has measured recently, and says so plainly rather than papering over them. The standard it holds itself to is simple. Every number it files traces back to a citation you can open and check yourself.",
    image: "/nemo-avatar.svg",
    specialties: ["Research Synthesis", "Conservation Science", "Scopus AI"],
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

/** Accessible modal shell shared by the profiles and the pitch form: focus moves to
 *  the close button, Tab is trapped inside, Escape closes, and focus returns to the
 *  card that opened it. */
function ModalShell({
  titleId,
  closeLabel,
  onClose,
  children,
}: {
  titleId: string;
  closeLabel: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
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
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-abyss/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-xl p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center bg-abyss/5 hover:bg-abyss/10 text-abyss rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-abyss"
        >
          <X size={20} />
        </button>

        {children}
      </motion.div>
    </motion.div>
  );
}

function AuthorModal({ author, onClose }: { author: Author; onClose: () => void }) {
  return (
    <ModalShell titleId="author-modal-title" closeLabel={`Close ${author.name} profile`} onClose={onClose}>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden shrink-0">
          <Image
            src={author.image}
            alt=""
            fill
            sizes="(max-width: 768px) 88vw, 220px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-abyss/70 text-xs font-black uppercase tracking-widest block mb-2">
            {author.role}
          </span>
          <h3
            id="author-modal-title"
            className="text-4xl font-serif font-bold text-abyss mb-6 leading-tight"
          >
            {author.name}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {author.specialties.map((tag) => (
              <span
                key={tag}
                className="bg-abyss/5 text-abyss/80 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-abyss/80 leading-relaxed font-medium">{author.fullBio}</p>
        </div>
      </div>
    </ModalShell>
  );
}

/** The call for contributors, opened from the "Future Contributor" card. It carries
 *  the copy and form that used to live in their own section further down the page. */
function PitchModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell titleId="pitch-modal-title" closeLabel="Close the pitch form" onClose={onClose}>
      <span className="text-abyss/70 text-xs font-black uppercase tracking-widest block mb-2">
        Get Hooked With Us
      </span>
      <h3 id="pitch-modal-title" className="text-3xl md:text-4xl font-serif font-bold text-abyss leading-tight mb-4 pr-12">
        Tell your story.
        <span className="block italic font-normal text-tuna-on-light">Inspire the next cast.</span>
      </h3>
      <p className="text-abyss/80 leading-relaxed font-medium mb-6">
        Passionate anglers, conservationists, and storytellers — if you have a trip report or
        strategy worth sharing, we want to publish it in the Fishyology Journal.
      </p>
      <PitchForm />
    </ModalShell>
  );
}

export default function AuthorRoster() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [pitchOpen, setPitchOpen] = useState(false);

  // The home page's "Pitch your story" links to /about#pitch-section, which lands on
  // this roster; open the form straight away so the link does what it says.
  useEffect(() => {
    if (window.location.hash === "#pitch-section") setPitchOpen(true);
  }, []);

  const handleCardClick = (author: Author) => {
    if (author.isActionCard) {
      setPitchOpen(true);
      return;
    }
    setSelectedAuthor(author);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
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
            className={`group flex h-full flex-col text-left cursor-pointer border rounded-lg p-5 shadow-sm hover:shadow-xl transition-[box-shadow,transform,background-color] duration-500 motion-safe:hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-abyss focus-visible:ring-offset-2 ${
              // The Future Contributor card is the roster's call to action, so it takes the
              // Tuna fill with white text (4.96:1) and deepens on hover like the buttons.
              author.isActionCard
                ? "bg-tuna border-tuna hover:bg-tuna-on-light hover:border-tuna-on-light"
                : "bg-white border-abyss/10"
            }`}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-5 bg-black/5">
              <Image
                src={author.image}
                alt=""
                fill
                sizes="(max-width: 768px) 88vw, (max-width: 1024px) 44vw, 23vw"
                className="object-cover"
              />
            </div>
            {/* Role and name reserve two lines each. Without this a longer role or a name
                that wraps pushes that card's bio out of step with the rest of the row. */}
            <span
              className={`text-xs font-black uppercase tracking-widest leading-[1.4] block mb-2 min-h-[2.1rem] ${
                author.isActionCard ? "text-white" : "text-abyss/70"
              }`}
            >
              {author.role}
            </span>
            <h3
              className={`text-2xl font-serif font-bold leading-tight mb-3 min-h-[3.75rem] group-hover:underline underline-offset-4 ${
                author.isActionCard ? "text-white" : "text-abyss"
              }`}
            >
              {author.name}
            </h3>
            <p
              className={`text-sm font-medium leading-relaxed line-clamp-2 ${
                author.isActionCard ? "text-white" : "text-abyss/70"
              }`}
            >
              {author.shortBio}
            </p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedAuthor && (
          <AuthorModal key="author" author={selectedAuthor} onClose={() => setSelectedAuthor(null)} />
        )}
        {pitchOpen && <PitchModal key="pitch" onClose={() => setPitchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
