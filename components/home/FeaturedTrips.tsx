import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { TripPackage } from "@/lib/trips";
import { tripImageAlt } from "@/lib/seo";
import { fromPrice, shortLocation, shortPhrase } from "@/components/trips/format";

function TripCard({ trip }: { trip: TripPackage }) {
  const price = fromPrice(trip.priceHeadline);

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col rounded-[1.75rem] overflow-hidden bg-[#FAFAFA] shadow-xl transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] bg-[#1D242B] overflow-hidden">
        {trip.photos[0] && (
          <Image
            src={trip.photos[0]}
            alt={tripImageAlt(trip)}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1D242B]/80 to-transparent" />
        <span className="absolute bottom-4 left-5 right-5 inline-flex items-center gap-1.5 text-white text-xs font-bold">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{shortLocation(trip.location)}</span>
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-7">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1D242B] leading-tight mb-3">
          {trip.name}
        </h3>
        <p className="flex items-center gap-2 text-sm text-[#1D242B]/70 mb-6">
          <Clock className="w-4 h-4 text-[#0077C0] shrink-0" />
          {shortPhrase(trip.duration)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5 border-t border-[#1D242B]/8">
          <span className="text-lg font-black text-[#1D242B] tracking-tight">
            {price}
            {/* Some headlines already say "per day", so only add the unit when it's missing. */}
            {trip.priceUnit && !price.includes("per ") && (
              <span className="ml-1.5 text-xs font-bold uppercase tracking-widest text-[#1D242B]/60">
                {trip.priceUnit}
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0077C0] shrink-0">
            View Trip
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedTrips({ trips }: { trips: TripPackage[] }) {
  if (trips.length === 0) return null;

  return (
    <section className="bg-[#1D242B] py-20 md:py-28">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-3 block text-sm">
              Guided Expeditions
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#FAFAFA] mb-4">
              Fish With Us
            </h2>
            <p className="text-[#FAFAFA]/60 max-w-xl text-sm md:text-base font-medium leading-relaxed">
              Guided charters and expeditions across Malaysia, booked directly with us.
            </p>
          </div>
          <Link
            href="/trips"
            className="group inline-flex items-center gap-2 font-bold text-[#FAFAFA] hover:text-[#C7EEFF] transition-colors"
          >
            All Trips
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trips.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
}
