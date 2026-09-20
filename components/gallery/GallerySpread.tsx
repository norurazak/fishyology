"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/components/gallery/types";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Past this much horizontal throw, a drag turns the page. */
const SWIPE_THRESHOLD = 80;

export default function GallerySpread({
  items,
  index,
  direction,
  itemLabel = "Photo",
  onIndexChange,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  /** Which way the last page turn went, so the incoming leaf rotates in correctly. */
  direction: 1 | -1;
  /** Singular, capitalized — "Plate" or "Photo". Drives the counter and a11y labels. */
  itemLabel?: string;
  onIndexChange: (next: number, direction: 1 | -1) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const item = items[index];

  const turn = useCallback(
    (nextDirection: 1 | -1) => {
      const next = index + nextDirection;
      if (next < 0 || next >= items.length) return;
      onIndexChange(next, nextDirection);
    },
    [index, items.length, onIndexChange]
  );

  // Lock the page behind the spread, and hand focus over (restoring on close).
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
      if (event.key === "ArrowRight") {
        event.preventDefault();
        turn(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        turn(-1);
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
  }, [onClose, turn]);

  if (!item) return null;

  const itemNumber = String(index + 1).padStart(2, "0");
  const total = String(items.length).padStart(2, "0");

  // A page turn rotates the incoming leaf in from the side you're heading; with
  // reduced motion it becomes a plain cross-fade.
  const spreadVariants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: 1 | -1) => ({
          opacity: 0,
          rotateY: dir === 1 ? 14 : -14,
          x: dir === 1 ? 60 : -60,
          transformPerspective: 1600,
        }),
        center: { opacity: 1, rotateY: 0, x: 0, transformPerspective: 1600 },
        exit: (dir: 1 | -1) => ({
          opacity: 0,
          rotateY: dir === 1 ? -10 : 10,
          x: dir === 1 ? -40 : 40,
          transformPerspective: 1600,
        }),
      };

  const meta = item.meta?.filter((entry) => entry.value) ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8 bg-[#1D242B]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-spread-title"
        className="relative w-full max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute -top-2 right-0 md:-top-4 md:-right-4 z-20 w-10 h-10 rounded-full bg-[#FAFAFA]/90 text-[#1D242B] flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7EEFF]"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={item.id}
            custom={direction}
            variants={spreadVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.18 : 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) turn(1);
              else if (info.offset.x > SWIPE_THRESHOLD) turn(-1);
            }}
            className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] rounded-xl overflow-hidden shadow-2xl bg-[#1D242B] h-[86dvh] md:h-[82dvh]"
          >
            {/* Left leaf — the photograph, uncropped, filling the height available */}
            <div className="relative bg-[#14181D] h-[52dvh] md:h-full p-3 md:p-5">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 96vw, 62vw"
                className="object-contain p-1"
                priority
              />
            </div>

            {/* The binding — sits on the seam of the 1.75fr / 1fr split */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute inset-y-0 left-[63.64%] w-10 -translate-x-1/2 z-10 pointer-events-none bg-gradient-to-r from-black/25 via-black/5 to-black/15"
            />

            {/* Right leaf — the paper page. min-h-0 lets it scroll inside the
                fixed-height spread; the inner wrapper centres short captions
                without clipping long ones. */}
            <div className="bg-[#F5F5F0] min-h-0 overflow-y-auto hide-scrollbar">
              <div className="p-7 md:p-10 min-h-full flex flex-col justify-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50 tabular-nums">
                  {itemLabel} {itemNumber} / {total}
                </span>

                <h3
                  id="gallery-spread-title"
                  className="text-2xl md:text-4xl font-serif font-bold text-[#1D242B] leading-tight mt-2 mb-4"
                >
                  {item.title}
                </h3>

                {item.caption && (
                  <p className="font-serif italic text-lg md:text-xl text-[#1D242B]/75 leading-relaxed">
                    {item.caption}
                  </p>
                )}

                {meta.length > 0 && (
                  <>
                    <div className="w-12 h-px bg-[#1D242B]/20 my-6" />
                    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-[#1D242B]/60">
                      {meta.map(({ label, value }) => (
                        <div key={label}>
                          <dt className="sr-only">{label}</dt>
                          <dd className="font-bold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Page turns */}
        <div className="flex items-center justify-between gap-4 mt-5">
          <button
            type="button"
            onClick={() => turn(-1)}
            disabled={index === 0}
            aria-label={`Previous ${itemLabel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-[#FAFAFA] text-xs font-bold uppercase tracking-widest disabled:opacity-25 disabled:cursor-not-allowed hover:text-[#C7EEFF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7EEFF] rounded-full px-3 py-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-[#FAFAFA]/55 text-[11px] font-bold uppercase tracking-widest">
            Drag or use &larr; &rarr;
          </span>

          <button
            type="button"
            onClick={() => turn(1)}
            disabled={index === items.length - 1}
            aria-label={`Next ${itemLabel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-[#FAFAFA] text-xs font-bold uppercase tracking-widest disabled:opacity-25 disabled:cursor-not-allowed hover:text-[#C7EEFF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7EEFF] rounded-full px-3 py-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
