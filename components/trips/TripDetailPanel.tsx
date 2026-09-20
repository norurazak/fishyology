"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Clock,
  MapPin,
  Users,
  CalendarDays,
  Ship,
  MessageCircle,
  Mail,
  Plus,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import type { TripPackage } from "@/lib/trips";
import type { TripConditions } from "@/lib/conditions";
import TripConditionsPanel from "@/components/trips/TripConditions";
import Fact from "@/components/trips/Fact";
import {
  emailLink,
  fromPrice,
  shortGuests,
  stripParentheticals,
  whatsappLink,
} from "@/components/trips/format";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function TripDetailPanel({
  trip,
  conditions,
  onClose,
}: {
  trip: TripPackage;
  conditions: TripConditions | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [entered, setEntered] = useState(false);

  // Slide in on the frame after mount so the closed→open transition actually runs.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Lock the page behind the panel, and hand focus over (restoring it on close).
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

  const paragraphs = trip.description
    ? trip.description.split("\n\n").filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Close trip details"
        onClick={onClose}
        className={`absolute inset-0 w-full h-full bg-[#1D242B]/60 backdrop-blur-sm transition-opacity duration-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="trip-detail-title"
        className={`absolute right-0 top-0 h-[100dvh] w-full max-w-xl bg-[#FAFAFA] shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          entered ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Masthead */}
        <div className="relative h-44 md:h-56 bg-[#1D242B] flex-shrink-0">
          {trip.photos.length > 0 && (
            <Image
              src={trip.photos[0]}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 576px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/40 to-[#1D242B]/10" />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close trip details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FAFAFA]/90 text-[#1D242B] flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7EEFF]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 w-full p-6">
            <span className="text-[#C7EEFF] text-[11px] font-extrabold uppercase tracking-widest">
              {trip.category} · {stripParentheticals(trip.tripType)}
            </span>
            <h2
              id="trip-detail-title"
              className="text-2xl md:text-3xl font-serif font-bold text-[#FAFAFA] leading-tight mt-1"
            >
              {trip.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Fact icon={Clock} label="Duration" value={trip.duration} />
            <Fact icon={Users} label="Group size" value={shortGuests(trip.maxGuests)} />
            <Fact icon={MapPin} label="Location" value={trip.location} />
            <Fact icon={Ship} label="Format" value={trip.tripType} />
          </div>

          <div className="bg-white border border-[#1D242B]/10 rounded-2xl p-5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/50 block mb-2">
              Rate
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-2xl font-black text-[#1D242B]">{fromPrice(trip.priceHeadline)}</span>
              {trip.priceUnit && (
                <span className="text-xs font-bold uppercase tracking-widest text-[#0077C0]">
                  {trip.priceUnit}
                </span>
              )}
            </div>
            {trip.priceNote && (
              <p className="text-sm text-[#1D242B]/80 leading-relaxed mt-2">{trip.priceNote}</p>
            )}
          </div>

          {conditions && (
            <TripConditionsPanel
              conditions={conditions}
              isSaltwater={trip.category.toLowerCase() === "saltwater"}
            />
          )}

          {trip.season && (
            <div className="flex gap-3 bg-[#408A71]/8 border border-[#408A71]/20 rounded-2xl p-5">
              <CalendarDays className="w-5 h-5 text-[#408A71] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#408A71] block mb-1">
                  Season
                </span>
                <p className="text-sm text-[#1D242B]/80 leading-relaxed">{trip.season}</p>
              </div>
            </div>
          )}

          {paragraphs.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/50 mb-3">
                About this trip
              </h3>
              <div className="flex flex-col gap-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-sm text-[#1D242B]/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {trip.addOns.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/50 mb-3">
                Add-ons
              </h3>
              <ul className="flex flex-col gap-2">
                {trip.addOns.map((addOn) => (
                  <li
                    key={addOn}
                    className="flex gap-3 bg-white border border-[#1D242B]/10 rounded-xl px-4 py-3"
                  >
                    <Plus className="w-4 h-4 text-[#0077C0] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#1D242B]/80 leading-relaxed">{addOn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Contact footer — stays reachable however far the reader has scrolled */}
        <div className="flex-shrink-0 border-t border-[#1D242B]/10 bg-white p-5 flex flex-col gap-3">
          <Link
            href={`/trips/${trip.slug}`}
            className="group inline-flex items-center justify-center gap-2 border border-[#1D242B]/15 text-[#1D242B] text-sm font-bold px-4 py-3 rounded-full hover:border-[#1D242B]/40 hover:bg-[#1D242B]/[0.03] transition-colors"
          >
            <ImageIcon className="w-4 h-4 text-[#0077C0]" />
            View Full Trip &amp; Gallery
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <p className="text-sm text-[#1D242B]/60 text-center">
            Enquiries come straight to us — no booking platform in between.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={whatsappLink(trip)}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={emailLink(trip)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1D242B] text-white text-sm font-bold px-4 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
