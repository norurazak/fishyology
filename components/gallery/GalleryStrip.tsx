"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/components/gallery/types";

/** Pointer travel past which a press counts as a pan, not a click. */
const DRAG_SLOP = 6;

/**
 * Items share a row height and vary in width, so two rows stay tidy while the
 * frames themselves run from near-square to panoramic. Cycled by index, so it's
 * deterministic and nothing depends on the image's real dimensions — no layout
 * shift as photos load.
 *
 * Five widths against two rows is deliberate: with an even item count each row
 * receives the same multiset of widths, so both rows end at the same place.
 */
const ITEM_WIDTHS = [
  "w-[62vw] md:w-[20rem] lg:w-[24rem]",
  "w-[42vw] md:w-[13rem] lg:w-[16rem]",
  "w-[54vw] md:w-[17rem] lg:w-[20rem]",
  "w-[38vw] md:w-[11.5rem] lg:w-[14rem]",
  "w-[58vw] md:w-[18rem] lg:w-[22rem]",
];

const ITEM_HEIGHT = "h-[13rem] md:h-[12rem] lg:h-[14rem]";

export default function GalleryStrip({
  items,
  itemLabel = "Photo",
  edgeFade = true,
  onOpen,
}: {
  items: GalleryItem[];
  /** Singular, capitalized — "Plate" or "Photo". Drives all the strip's copy. */
  itemLabel?: string;
  /** Fades the strip's edges toward the page background as you scroll. */
  edgeFade?: boolean;
  onOpen: (index: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Mouse drag-to-pan state. Touch keeps native momentum scrolling.
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    syncEdges();
    const el = scrollerRef.current;
    if (!el) return;

    el.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  /** Scrolls to the next/previous item edge — widths vary, so measure rather than assume. */
  const step = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;

    // Two rows produce duplicate offsets; dedupe so one press moves one column.
    const offsets = [
      ...new Set(
        Array.from(el.querySelectorAll<HTMLElement>("[data-gallery-item]")).map(
          (item) => item.offsetLeft
        )
      ),
    ].sort((a, b) => a - b);
    if (offsets.length === 0) return;

    const current = el.scrollLeft + (offsets[0] ?? 0);
    const target =
      direction === 1
        ? offsets.find((offset) => offset > current + 8)
        : [...offsets].reverse().find((offset) => offset < current - 8);

    el.scrollTo({
      left: (target ?? (direction === 1 ? el.scrollWidth : 0)) - (offsets[0] ?? 0),
      behavior: "smooth",
    });
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      active: true,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = scrollerRef.current;
    if (!state.active || !el) return;

    const delta = event.clientX - state.startX;
    if (!state.moved && Math.abs(delta) > DRAG_SLOP) state.moved = true;
    if (state.moved) el.scrollLeft = state.startScroll - delta;
  };

  const endDrag = () => {
    dragState.current.active = false;
  };

  const openItem = (index: number) => {
    // Swallow the click that ends a pan so dragging never opens an item.
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    onOpen(index);
  };

  if (items.length === 0) return null;

  const renderItem = (item: GalleryItem, index: number) => (
    <button
      key={item.id}
      type="button"
      data-gallery-item
      onClick={() => openItem(index)}
      aria-label={`Open ${itemLabel.toLowerCase()} ${index + 1}: ${item.title}`}
      className={`group shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077C0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA] rounded-lg ${
        ITEM_WIDTHS[index % ITEM_WIDTHS.length]
      }`}
    >
      <div
        className={`relative ${ITEM_HEIGHT} rounded-lg overflow-hidden bg-[#1D242B] shadow-sm group-hover:shadow-2xl transition-shadow duration-300`}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 62vw, 24rem"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1D242B]/85 to-transparent pointer-events-none" />
        <span className="absolute bottom-3 left-3 right-3 flex items-baseline gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C7EEFF] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white font-serif text-sm leading-tight truncate">
            {item.title}
          </span>
        </span>
      </div>
    </button>
  );

  // Two rows on desktop; on mobile the row wrappers collapse to `display:contents`
  // so every item flows into one strip, still in reading order.
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div>
      <div className="relative">
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
        >
          <div className="flex gap-4 md:flex-col md:gap-5 w-max px-6 md:px-16 pb-6">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="contents md:flex md:gap-5">
                {row.map((item, itemIndex) =>
                  renderItem(item, rowIndex === 0 ? itemIndex : half + itemIndex)
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Edge fades — they retreat at each end so the first and last item are
            never washed out when there's nothing more to scroll to. */}
        {edgeFade && (
          <>
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent transition-opacity duration-500 ${
                atStart ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent transition-opacity duration-500 ${
                atEnd ? "opacity-0" : "opacity-100"
              }`}
            />
          </>
        )}
      </div>

      <div className="flex items-center gap-3 mt-2 pl-6 md:pl-16">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Scroll left"
          className="w-10 h-10 rounded-full border border-[#1D242B]/15 flex items-center justify-center text-[#1D242B] hover:border-[#1D242B]/40 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Scroll right"
          className="w-10 h-10 rounded-full border border-[#1D242B]/15 flex items-center justify-center text-[#1D242B] hover:border-[#1D242B]/40 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50 ml-2">
          Drag to explore · {items.length} {itemLabel.toLowerCase()}s
        </span>
      </div>
    </div>
  );
}
