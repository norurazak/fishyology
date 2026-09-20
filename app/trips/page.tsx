import Link from "next/link";
import Image from "next/image";
import {
  MapPinned,
  CalendarSearch,
  MessageSquareText,
  CircleCheckBig,
  ArrowRight,
  ShieldAlert,
  Anchor,
  Waves,
  BadgeCheck,
} from "lucide-react";
import { getTripPackages } from "@/lib/trips";
import { getTripConditions, type TripConditions } from "@/lib/conditions";
import TripsGrid, { type TripSection } from "@/components/trips/TripsGrid";

const HERO_IMAGE =
  "https://res.cloudinary.com/dub3h3elq/image/upload/v1776574274/IMG_9149_wloodq.jpg";

const bookingSteps = [
  {
    step: "01",
    icon: MapPinned,
    title: "Browse Trips",
    text: "Compare locations, target species, duration, and pricing across our expedition charters and recreational pond sessions.",
  },
  {
    step: "02",
    icon: CalendarSearch,
    title: "Check Your Window",
    text: "Open any trip for its season, live conditions, and today's peak feeding windows — then pick the dates that suit.",
  },
  {
    step: "03",
    icon: MessageSquareText,
    title: "Send an Enquiry",
    text: "Message us on WhatsApp or by email with your trip, dates, and group size. We reply directly and confirm availability.",
  },
  {
    step: "04",
    icon: CircleCheckBig,
    title: "Confirm & Pay",
    text: "Once the details are locked in, we walk you through payment and send your booking confirmation.",
  },
];

export default async function TripsPage() {
  const trips = getTripPackages();
  const waterTypes = Array.from(new Set(trips.map((t) => t.category).filter(Boolean)));

  // Conditions are fetched on the server and cached for an hour, so opening a
  // trip panel costs nothing and the data survives a client with no JS.
  const located = trips.filter((trip) => trip.coordinates !== null);
  const readings = await Promise.all(
    located.map((trip) =>
      getTripConditions(trip.coordinates!, {
        includeTides: trip.category.toLowerCase() === "saltwater",
      })
    )
  );
  const conditionsBySlug: Record<string, TripConditions> = Object.fromEntries(
    located.map((trip, index) => [trip.slug, readings[index]])
  );

  const sections: TripSection[] = [
    {
      id: "expedition",
      label: "Guided Charters",
      title: "The Expedition",
      description:
        "Our guided charters on open water — live-bait sea fishing out of Kuala Rompin, multi-day runs to Tioman, and freshwater casting across Royal Belum's flooded forest. Guides, boat, and (on the saltwater trips) tackle included.",
      trips: trips.filter((trip) => trip.group === "Expedition"),
    },
    {
      id: "recreational",
      label: "Pond Sessions",
      title: "Recreational",
      description:
        "Relaxed, low-commitment days at stocked ponds. Gear and guiding provided, no experience needed — the easiest way in for first-timers, kids, and anyone after a short session close to the Klang Valley.",
      trips: trips.filter((trip) => trip.group === "Recreational"),
    },
  ].filter((section) => section.trips.length > 0);

  const heroStats = [
    { icon: Anchor, value: `${trips.length}`, label: "Guided trips" },
    { icon: Waves, value: `${waterTypes.length}`, label: waterTypes.join(" · ") },
    { icon: BadgeCheck, value: "Direct", label: "No booking platform" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HERO */}
      <section className="relative h-[100dvh] min-h-[600px] w-full bg-[#1D242B] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Fishyology guided fishing charter"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[#1D242B]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/20 to-transparent" />
        {/* Fades the hero's #1D242B base into the #121212 of the section below,
            so the two meet with no visible seam. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#121212]" />
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-overlay">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <div className="absolute bottom-24 md:bottom-32 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-start">
          <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-md">
            Guided Expeditions
          </span>
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] font-black text-[#FAFAFA] tracking-tighter uppercase mb-6 drop-shadow-2xl max-w-6xl">
            Fishing Trips
          </h1>
          <p className="text-lg md:text-2xl text-[#FAFAFA]/90 max-w-3xl font-medium mb-8 leading-relaxed drop-shadow-md">
            Guided charters across Malaysia&apos;s saltwater and freshwater grounds — from a full-day
            Rompin run to a multi-day Tioman expedition. Every trip is bookable directly through us.
          </p>

          <Link
            href="#trips"
            className="group relative inline-flex items-center gap-3 bg-[#FAFAFA] text-[#1D242B] px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl mb-10"
          >
            <span className="relative z-10">See the Trips</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>

          <dl className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {heroStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#C7EEFF] flex-shrink-0" strokeWidth={1.75} />
                <div>
                  <dd className="text-xl font-black text-[#FAFAFA] leading-none">{value}</dd>
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-[#FAFAFA]/70 mt-1">
                    {label}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* HOW BOOKING WORKS — carries the footer's neutral palette, bridging the
          dark hero into the light trip sections below. */}
      <section className="bg-[#121212] px-6 md:px-16 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <span className="text-[#A3A3A3] font-bold tracking-widest uppercase mb-2 block text-sm">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#E5E5E5] mb-3">
              Booking Is Simple
            </h2>
            <p className="font-serif italic text-lg md:text-xl text-[#D4D4D4] leading-snug">
              Four steps, no booking platform in between — you deal with us directly.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bookingSteps.map(({ step, icon: Icon, title, text }) => (
              <li
                key={step}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col gap-2.5 hover:bg-white/[0.06] hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#262626] group-hover:text-[#404040] transition-colors tabular-nums">
                    {step}
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#E5E5E5]" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#E5E5E5]">{title}</h3>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TRIPS */}
      <div id="trips" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-20 scroll-mt-24">
        <TripsGrid sections={sections} conditionsBySlug={conditionsBySlug} />
      </div>

      {/* KNOW THE RULES */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-20">
        <div className="bg-[#1D242B] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-[#C7EEFF] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Know the Rules Before You Cast</h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                Recreational fishing in Malaysia currently has no license requirement, bag limit, or closed
                season — but that landscape is under active discussion. Read our breakdown of where the
                regulatory gaps actually stand.
              </p>
            </div>
          </div>
          <Link
            href="/blog/malaysia-recreational-fishing-license-gap"
            className="group inline-flex items-center gap-2 bg-[#C7EEFF] text-[#1D242B] text-sm font-bold px-5 py-3 rounded-full whitespace-nowrap hover:bg-white transition-colors"
          >
            Read the Report
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
