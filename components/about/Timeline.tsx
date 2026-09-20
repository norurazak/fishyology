"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Pointer travel past which a press counts as a pan, not a click. */
const DRAG_SLOP = 6;

interface Milestone {
  year: string;
  title: string;
  tagline: string;
  desc: string;
  img: string;
}

/**
 * A flat, chronological list — each entry carries its own year, so a year can
 * hold as many milestones as you like. Add another 2019 entry and it simply
 * appears next to the existing one under the same year marker; the year tabs
 * and the rail derive themselves from this array.
 */
const milestones: Milestone[] = [
  {
    year: "2013",
    title: "Where It All Began",
    tagline: "A fishing journal becomes something more.",
    desc: "Fishyology began as a personal record of fishing trips across Malaysia. It was a place to document the waters, the fish, the people and the experiences along the way. A chance connection with Andrew Griffin gave the young blog its first real credibility, reinforcing an idea that would shape everything that followed. Malaysia had a fishing story worth sharing, and Fishyology wanted to tell it.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445335/CIMG4471_1_wupswd.jpg",
  },
  {
    year: "2016",
    title: "Finding Our Voice",
    tagline: "Three years of fishing, one trip at a time.",
    desc: "By 2016, Fishyology had grown from a personal fishing journal into one of Malaysia's recognised fishing blogs. From saltwater coastlines to freshwater rivers, we continued exploring and documenting the country's diverse fisheries. Every trip added another story, another lesson and another connection to the fishing community.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776444739/GOPR1308_1518482485158_high_mrjfqz.jpg",
  },
  {
    year: "2017",
    title: "Kuala Rompin, Our Flagship",
    tagline: "The water that defined our saltwater identity.",
    desc: "Kuala Rompin, Pahang became our flagship destination. Its reefs, current lines and productive waters brought anglers closer to sailfish, cobia, snapper, grouper and many other prized species. Over time, Kuala Rompin became more than a destination. It became one of the defining chapters of the Fishyology story.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1789899279/Fishyology_History_-_Kuala_Rompin_as_one_our_Flagship_Charter_in_Malaysia_ioaa6v.jpg",
  },
  {
    year: "2017",
    title: "Freshwater",
    tagline: "Expanding beyond the coast.",
    desc: "Our journey was never limited to the sea. Freshwater fishing became an equally important part of Fishyology, taking us into rivers, lakes, reservoirs and inland fisheries across Malaysia. It broadened our perspective and strengthened our belief that every body of water has a story worth discovering.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1789790817/Fishyology_History_-_Peacock_Bass_in_Air_Kuning_Perak_ajtcin.jpg",
  },
  {
    year: "2017",
    title: "Technical Fishing",
    tagline: "Learning to fish differently.",
    desc: "As our experience grew, so did the ways we approached fishing. We began exploring more technical and lure driven styles, including jigging, casting and other specialised techniques. These experiences expanded our knowledge and became an important part of the fishing expertise we continue to build today.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1789790821/Fishyology_History_-_Pulau_Jarak_with_GT_Chaser_qzeyet.jpg",
  },
  {
    year: "2018",
    title: "Global Anglers",
    tagline: "Malaysia becomes the destination.",
    desc: "Our story began reaching beyond local anglers. Visitors from around the world started joining us to experience Malaysian waters for themselves. Fishyology became a meeting point between international anglers and the diverse fishing opportunities Malaysia has to offer.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1789790819/Fishyology_History_-_Scott_Bremner_and_Chris_Dann_first_trip_in_Port_Dickson_mwm5t8.jpg",
  },
  {
    year: "2019",
    title: "From Blog to Adventure",
    tagline: "The stories became experiences.",
    desc: "By 2019, Fishyology had grown beyond a blog. More than 250 customers had joined us across 12 locations, representing 42 countries. From single day charters to extended freshwater and saltwater expeditions, we were no longer simply documenting fishing adventures. We were creating them for others.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445424/20160125_124622_poxbqv.jpg",
  },
  {
    year: "2021",
    title: "The Water Falls Silent",
    tagline: "The end of one era and the beginning of a pause.",
    desc: "The way fishing stories were being shared had changed, and the blog era was gradually coming to an end. Then COVID 19 brought the charter world to a standstill. The boats went quiet, trips stopped and Fishyology entered its most uncertain chapter yet.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445597/20180901_154924_v9jkyd.jpg",
  },
  {
    year: "2022",
    title: "Finding Our Way Back",
    tagline: "One step back onto the water.",
    desc: "The story was not over. In 2022, Fishyology returned to the fishing community through RPBIC. It marked our first meaningful step back into the scene after the disruption of the previous years. It was a small beginning, but an important one.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776445850/RPBIC_rwtzge.jpg",
  },
  {
    year: "2023",
    title: "The Restart",
    tagline: "Back on the water and back to the journey.",
    desc: "The comeback gathered momentum. Charters resumed in earnest, bringing Fishyology back to the waters, the anglers and the adventures that had shaped the previous decade. The restart was not about recreating the past. It was about carrying its lessons into what came next.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1783503307/IMG_5812-EDIT_bi0bku.jpg",
  },
  {
    year: "2026",
    title: "A New Path Forward",
    tagline: "Building the next chapter of Fishyology.",
    desc: "Fishyology enters 2026 with a renewed sense of direction — carrying everything the decade before it taught us into a stronger, more sustainable chapter. This is more than a return. It's a new pathway forward.",
    img: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776447013/20180825_083627_1_hxbn0h.jpg",
  },
];

export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const reduceMotion = useReducedMotion();

  // Mouse drag-to-pan. Touch keeps native momentum scrolling.
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  /** Years in first-appearance order, each pointing at its first milestone. */
  const years = useMemo(() => {
    const seen = new Map<string, number>();
    milestones.forEach((milestone, index) => {
      if (!seen.has(milestone.year)) seen.set(milestone.year, index);
    });
    return Array.from(seen, ([year, index]) => ({ year, index }));
  }, []);

  const activeYear = milestones[activeIndex]?.year;
  const activeYearTab = Math.max(0, years.findIndex((entry) => entry.year === activeYear));

  /** Which milestone is nearest the reading position, plus the scroll edges. */
  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 1);

    // A quarter into the viewport reads as "the one you're looking at".
    const readingLine = track.scrollLeft + track.clientWidth * 0.25;
    let nearest = 0;
    let smallest = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft - readingLine);
      if (distance < smallest) {
        smallest = distance;
        nearest = index;
      }
    });
    setActiveIndex(nearest);
  }, []);

  useEffect(() => {
    syncFromScroll();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll);
    return () => {
      track.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
    };
  }, [syncFromScroll]);

  const scrollToMilestone = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const card = cardRefs.current[index];
      if (!track || !card) return;

      const first = cardRefs.current[0];
      const gutter = first ? first.offsetLeft : 0;
      track.scrollTo({
        left: card.offsetLeft - gutter,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      // Set the target eagerly rather than waiting for the scroll listener to
      // catch up with the (possibly still-animating) smooth scroll — otherwise
      // a quick second click reads the pre-scroll activeIndex and re-targets
      // the same card instead of advancing, which feels stuck.
      setActiveIndex(index);
    },
    [reduceMotion]
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      const next = Math.max(0, Math.min(milestones.length - 1, activeIndex + direction));
      scrollToMilestone(next);
    },
    [activeIndex, scrollToMilestone]
  );

  /** Standard tablist keyboard model — arrows move, Home/End jump. */
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: activeYearTab + 1,
      ArrowLeft: activeYearTab - 1,
      Home: 0,
      End: years.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;

    event.preventDefault();
    const clamped = Math.max(0, Math.min(years.length - 1, target));
    tabRefs.current[clamped]?.focus();
    scrollToMilestone(years[clamped].index);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const track = trackRef.current;
    if (!state.active || !track) return;

    const delta = event.clientX - state.startX;
    if (!state.moved && Math.abs(delta) > DRAG_SLOP) state.moved = true;
    if (state.moved) track.scrollLeft = state.startScroll - delta;
  };

  const endDrag = () => {
    dragState.current.active = false;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* YEAR TABS — jump points into the track */}
      <div className="px-6 md:px-16 pb-6 md:pb-8">
        <div
          role="tablist"
          aria-label="Fishyology history by year"
          className="flex items-center gap-2 overflow-x-auto hide-scrollbar"
        >
          {years.map((entry, index) => {
            const isActive = index === activeYearTab;
            return (
              <button
                key={entry.year}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                id={`year-tab-${entry.year}`}
                aria-controls={`year-panel-${entry.year}`}
                aria-selected={isActive}
                // Roving tabindex — the rail is one tab stop, arrows move within it.
                tabIndex={isActive ? 0 : -1}
                onClick={() => scrollToMilestone(entry.index)}
                onKeyDown={onTabKeyDown}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold tabular-nums transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077C0] focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#1D242B] text-white"
                    : "bg-white border border-[#1D242B]/10 text-[#1D242B]/60 hover:border-[#1D242B]/30"
                }`}
              >
                {entry.year}
              </button>
            );
          })}
        </div>
      </div>

      {/* HORIZONTAL TRACK */}
      <div className="relative flex-1 min-h-0">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          className="h-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-max px-6 md:px-16 h-full flex items-center">
            {/* The timeline itself, running the full length of the track */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[4.25rem] h-[2px] bg-[#1D242B]/10"
            />

            <div className="flex gap-6 md:gap-8">
              {milestones.map((milestone, index) => {
                const isActive = index === activeIndex;
                const isFirstOfYear =
                  index === 0 || milestones[index - 1].year !== milestone.year;

                return (
                  <article
                    key={`${milestone.year}-${milestone.title}`}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    id={isFirstOfYear ? `year-panel-${milestone.year}` : undefined}
                    role={isFirstOfYear ? "tabpanel" : undefined}
                    aria-labelledby={isFirstOfYear ? `year-tab-${milestone.year}` : undefined}
                    className="shrink-0 w-[78vw] sm:w-[22rem] lg:w-[26rem] flex flex-col"
                  >
                    {/* Rail marker */}
                    <div className="h-[5.5rem] flex flex-col justify-center">
                      <span
                        className={`text-2xl font-black tracking-tighter tabular-nums transition-colors ${
                          isActive ? "text-[#0077C0]" : "text-[#1D242B]/25"
                        }`}
                      >
                        {isFirstOfYear ? milestone.year : ""}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-4 h-4 bg-[#0077C0] ring-4 ring-[#0077C0]/20"
                            : "w-3 h-3 bg-[#1D242B]/20"
                        }`}
                      />
                    </div>

                    {/* Card */}
                    <div
                      className={`rounded-lg overflow-hidden bg-white border transition-all duration-300 ${
                        isActive
                          ? "border-[#0077C0]/30 shadow-xl"
                          : "border-[#1D242B]/10 shadow-sm"
                      }`}
                    >
                      <div className="relative h-44 md:h-52 lg:h-60 bg-[#1D242B]">
                        <Image
                          src={milestone.img}
                          alt={milestone.title}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 640px) 78vw, 26rem"
                          className="object-cover"
                          draggable={false}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1D242B] leading-tight mb-1.5">
                          {milestone.title}
                        </h3>
                        <p className="text-sm font-serif italic text-[#1D242B]/45 mb-3">
                          {milestone.tagline}
                        </p>
                        <p className="text-sm text-[#1D242B]/70 leading-relaxed">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edge fades, retreating at each end */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent transition-opacity duration-500 ${
            atStart ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent transition-opacity duration-500 ${
            atEnd ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* CONTROLS */}
      <div className="px-6 md:px-16 pt-6 pb-10 md:pb-14 flex items-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous milestone"
          className="w-11 h-11 rounded-full border border-[#1D242B]/15 flex items-center justify-center text-[#1D242B] hover:border-[#1D242B]/40 disabled:opacity-25 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077C0]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next milestone"
          className="w-11 h-11 rounded-full border border-[#1D242B]/15 flex items-center justify-center text-[#1D242B] hover:border-[#1D242B]/40 disabled:opacity-25 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077C0]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1D242B]/35 ml-2 tabular-nums">
          Drag to travel · {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(milestones.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
