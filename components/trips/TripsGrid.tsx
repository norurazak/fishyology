"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Camera,
  Clock,
  MapPin,
  Users,
  CalendarDays,
  MessageCircle,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import type { TripPackage } from "@/lib/trips";
import { tripImageAlt } from "@/lib/seo";
import type { TripConditions } from "@/lib/conditions";
import TripDetailPanel from "@/components/trips/TripDetailPanel";
import {
  fromPrice,
  seasonHeadline,
  shortGuests,
  shortLocation,
  shortPhrase,
  stripParentheticals,
  whatsappLink,
} from "@/components/trips/format";

export interface TripSection {
  id: string;
  label: string;
  title: string;
  description: string;
  trips: TripPackage[];
}

function TripCard({ trip, onOpen }: { trip: TripPackage; onOpen: () => void }) {
  const season = trip.season ? seasonHeadline(trip.season) : "";
  const comingSoon = trip.comingSoon;

  return (
    <article
      className={`group bg-white border border-abyss/10 rounded-2xl overflow-hidden flex flex-col shadow-sm ${
        comingSoon ? "" : "hover:shadow-xl transition-[box-shadow,transform] duration-500 motion-safe:hover:-translate-y-1"
      }`}
    >
      {/* Image — a mouse affordance for the same action as the footer button,
          hidden from assistive tech so the control isn't announced twice. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={comingSoon ? undefined : onOpen}
        disabled={comingSoon}
        className={`relative aspect-[4/3] bg-abyss w-full block overflow-hidden ${
          comingSoon ? "cursor-default" : "cursor-pointer"
        }`}
      >
        {trip.photos.length > 0 ? (
          <Image
            src={trip.photos[0]}
            alt={tripImageAlt(trip)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover ${comingSoon ? "grayscale" : ""}`}
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="absolute top-0 right-0 w-40 h-40 bg-tuna/20 rounded-full blur-[60px] -translate-y-1/3 translate-x-1/4" />
            <Camera aria-hidden="true" className="w-10 h-10 text-[#FFFFFF]/70 relative z-10" strokeWidth={1.5} />
            <span className="text-[#FFFFFF]/80 text-xs font-bold uppercase tracking-widest relative z-10">
              Photos Coming Soon
            </span>
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-abyss/80 to-transparent" />

        {comingSoon ? (
          <span className="absolute top-3 left-3 bg-abyss/90 text-white text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Coming Soon
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-[#FFFFFF]/90 text-abyss text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
            {stripParentheticals(trip.tripType)}
          </span>
        )}

        <span className="absolute bottom-3 left-3 right-3 inline-flex items-center gap-1.5 text-white text-xs font-bold">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{shortLocation(trip.location)}</span>
        </span>
      </button>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div
          className={`flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest mb-2 ${
            comingSoon ? "text-abyss/70" : "text-tuna-on-light"
          }`}
        >
          <BadgeCheck aria-hidden="true" className="w-3.5 h-3.5" />
          {comingSoon ? "Not Yet Bookable" : "Direct Booking"}
        </div>

        <h3 className="text-xl font-serif font-bold text-abyss leading-tight mb-2">
          {trip.name}
        </h3>

        <p className="text-sm text-abyss/80 leading-relaxed line-clamp-3">{trip.summary}</p>

        {/* flex-1 here keeps every card's price block on the same baseline */}
        <div className="flex-1" />

        <dl className="flex flex-col gap-2 mt-5 pt-5 border-t border-abyss/8 text-xs text-abyss/70">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Duration</dt>
            <Clock aria-hidden="true" className="w-3.5 h-3.5 text-abyss/60 flex-shrink-0" />
            <dd>{shortPhrase(trip.duration)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Group size</dt>
            <Users aria-hidden="true" className="w-3.5 h-3.5 text-abyss/60 flex-shrink-0" />
            <dd>{shortGuests(trip.maxGuests)}</dd>
          </div>
          {season && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Season</dt>
              <CalendarDays aria-hidden="true" className="w-3.5 h-3.5 text-abyss/60 flex-shrink-0" />
              <dd className="text-abyss font-semibold">{season}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Price + CTA footer */}
      {comingSoon ? (
        <div className="bg-abyss/5 border-t border-abyss/10 p-5 flex items-center justify-center">
          <span className="text-sm font-bold text-abyss/70 uppercase tracking-widest">
            Coming Soon
          </span>
        </div>
      ) : (
        <div className="bg-abyss/5 border-t border-abyss/10 p-5 flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-2xl font-black text-abyss tracking-tight">
              {fromPrice(trip.priceHeadline)}
            </span>
            {trip.priceUnit && (
              <span className="text-xs font-bold uppercase tracking-widest text-abyss/60">
                {trip.priceUnit}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpen}
              className="btn-primary flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-bold px-3 py-2.5 rounded-full"
            >
              Trip Details
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={whatsappLink(trip)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Enquire about ${trip.name} on WhatsApp`}
              className="inline-flex items-center justify-center gap-1.5 bg-white border border-abyss/10 text-[#25D366] px-3 py-2.5 rounded-full hover:border-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </article>
  );
}

export default function TripsGrid({
  sections,
  conditionsBySlug = {},
}: {
  sections: TripSection[];
  conditionsBySlug?: Record<string, TripConditions>;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedTrip =
    sections.flatMap((section) => section.trips).find((trip) => trip.slug === selectedSlug) ?? null;

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <div className="mb-8 md:mb-10">
            <span className="text-abyss/70 font-bold tracking-widest uppercase mb-3 block text-sm">
              {section.label}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-abyss">
                {section.title}
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-abyss/70 tabular-nums">
                {section.trips.length} {section.trips.length === 1 ? "trip" : "trips"}
              </span>
            </div>
            <p className="text-abyss/70 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
              {section.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} onOpen={() => setSelectedSlug(trip.slug)} />
            ))}
          </div>
        </section>
      ))}

      {selectedTrip && (
        <TripDetailPanel
          trip={selectedTrip}
          conditions={conditionsBySlug[selectedTrip.slug] ?? null}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </div>
  );
}
