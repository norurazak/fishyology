import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { TripPackage } from "@/lib/trips";
import { tripImageAlt } from "@/lib/seo";
import { fromPrice, shortLocation, shortPhrase } from "@/components/trips/format";

/* Light focus ring for links on the dark section. It sits outside the box so
   the cards' overflow-hidden never clips it. */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-4 focus-visible:ring-offset-abyss";

/**
 * Photo-led trip card. The photo frame is widescreen like the trip photos
 * themselves, so they are barely cropped and the srcset width is the width
 * actually shown (a tall frame upscaled them and went soft). The details sit
 * on a solid panel overlapping the photo's lower edge, so the text keeps its
 * contrast whatever the photo looks like and the card is only as tall as its
 * content.
 */
function TripCard({ trip }: { trip: TripPackage }) {
  const price = fromPrice(trip.priceHeadline);

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#1C1C1C] ${FOCUS_RING}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {trip.photos[0] && (
          <Image
            src={trip.photos[0]}
            alt={tripImageAlt(trip)}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
        )}
        <span className="absolute top-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full bg-[#FFFFFF] px-3 py-1.5 text-xs font-bold text-abyss shadow-md">
          <MapPin aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{shortLocation(trip.location)}</span>
        </span>
      </div>

      <div className="relative z-10 -mt-10 mx-3 mb-3 flex flex-1 flex-col rounded-2xl bg-[#FFFFFF] p-4 md:p-5 shadow-xl">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-abyss leading-tight text-balance line-clamp-2">
          {trip.name}
        </h3>
        <p className="mt-1.5 mb-4 flex items-center gap-2 text-sm text-abyss/70">
          <Clock aria-hidden="true" className="w-4 h-4 shrink-0" />
          {shortPhrase(trip.duration)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-abyss/10 pt-3">
          <span className="text-lg font-black text-abyss tracking-tight">
            {price}
            {/* Some headlines already say "per day", so only add the unit when it's missing. */}
            {trip.priceUnit && !price.includes("per ") && (
              <span className="ml-1.5 text-xs font-bold uppercase tracking-widest text-abyss/70">
                {trip.priceUnit}
              </span>
            )}
          </span>
          <span className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full bg-tuna px-4 text-sm font-bold text-white transition-colors group-hover:bg-tuna-on-light">
            View Trip
            <ArrowRight
              aria-hidden="true"
              className="w-4 h-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedTrips({ trips }: { trips: TripPackage[] }) {
  if (trips.length === 0) return null;

  return (
    <section aria-labelledby="fish-with-us-heading" className="bg-abyss py-12 md:py-16">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            <span className="text-[#FFFFFF]/70 font-bold tracking-widest uppercase mb-3 block text-sm">
              Guided Expeditions
            </span>
            <h2
              id="fish-with-us-heading"
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#FFFFFF] mb-3"
            >
              Fish With Us
            </h2>
            <p className="text-[#FFFFFF]/70 max-w-xl text-sm md:text-base font-medium leading-relaxed">
              Guided charters and expeditions across Malaysia, booked directly with us.
            </p>
          </div>
          <Link
            href="/trips"
            className={`group inline-flex min-h-[44px] items-center gap-2 rounded-lg font-bold text-[#FFFFFF] hover:underline underline-offset-4 ${FOCUS_RING}`}
          >
            All Trips
            <ArrowRight
              aria-hidden="true"
              className="w-4 h-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {trips.map((trip) => (
            <li key={trip.slug}>
              <TripCard trip={trip} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
