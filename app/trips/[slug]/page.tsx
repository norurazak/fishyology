import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Mail,
  Clock,
  Users,
  MapPin,
  Ship,
  CalendarDays,
  Plus,
  Camera,
} from "lucide-react";
import { getTripBySlug, getTripPackages } from "@/lib/trips";
import { getTripConditions } from "@/lib/conditions";
import TripConditionsPanel from "@/components/trips/TripConditions";
import TripGallery from "@/components/trips/TripGallery";
import Fact from "@/components/trips/Fact";
import {
  emailLink,
  fromPrice,
  shortGuests,
  stripParentheticals,
  whatsappLink,
} from "@/components/trips/format";

export function generateStaticParams() {
  return getTripPackages().map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    return { title: "Trip Not Found | Fishyology" };
  }

  return {
    title: trip.name,
    description: trip.summary,
    alternates: {
      canonical: `/trips/${trip.slug}`,
    },
    openGraph: {
      title: trip.name,
      description: trip.summary,
      type: "website",
      url: `https://www.fishyology.org/trips/${trip.slug}`,
      images:
        trip.photos.length > 0
          ? [{ url: trip.photos[0], width: 1200, height: 900, alt: trip.name }]
          : undefined,
    },
  };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) notFound();

  const conditions = trip.coordinates
    ? await getTripConditions(trip.coordinates, {
        includeTides: trip.category.toLowerCase() === "saltwater",
      })
    : null;

  const paragraphs = trip.description ? trip.description.split("\n\n").filter(Boolean) : [];

  if (trip.comingSoon) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <section className="relative flex-1 flex items-center justify-center min-h-[70vh] w-full bg-[#1D242B] overflow-hidden">
          {trip.photos.length > 0 && (
            <Image
              src={trip.photos[0]}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-[#1D242B]/40" />

          <div className="absolute top-24 md:top-28 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto">
            <Link
              href="/trips"
              className="group inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Trips
            </Link>
          </div>

          <div className="relative z-10 text-center px-6 max-w-xl">
            <span className="inline-block bg-[#FAFAFA]/90 text-[#1D242B] text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-md mb-5">
              Coming Soon
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#FAFAFA] leading-tight mb-4">
              {trip.name}
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              This trip isn&apos;t open for booking yet — we&apos;re still putting the details
              together. Check back soon, or explore our other guided trips in the meantime.
            </p>
            <Link
              href="/trips"
              className="inline-flex items-center justify-center gap-2 bg-[#C7EEFF] text-[#1D242B] text-sm font-bold px-6 py-3 rounded-full hover:bg-white transition-colors"
            >
              Explore Other Trips
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HERO */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[420px] w-full bg-[#1D242B] overflow-hidden">
        {trip.photos.length > 0 ? (
          <Image
            src={trip.photos[0]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0077C0]/25 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4" />
            <Camera className="w-12 h-12 text-[#C7EEFF] relative z-10" strokeWidth={1.5} />
            <span className="text-[#C7EEFF]/70 text-xs font-bold uppercase tracking-widest relative z-10">
              Photos Coming Soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-[#1D242B]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/30 to-transparent" />

        <div className="absolute top-24 md:top-28 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto">
          <Link
            href="/trips"
            className="group inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Trips
          </Link>
        </div>

        <div className="absolute bottom-10 md:bottom-14 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto">
          <span className="text-[#C7EEFF] text-[11px] font-extrabold uppercase tracking-widest">
            {trip.category} · {stripParentheticals(trip.tripType)}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#FAFAFA] leading-tight mt-2">
            {trip.name}
          </h1>
        </div>
      </section>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-10 lg:gap-14">
          {/* Main column */}
          <div className="flex flex-col gap-10 md:gap-12 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Fact icon={Clock} label="Duration" value={trip.duration} />
              <Fact icon={Users} label="Group size" value={shortGuests(trip.maxGuests)} />
              <Fact icon={MapPin} label="Location" value={trip.location} />
              <Fact icon={Ship} label="Format" value={trip.tripType} />
            </div>

            {trip.gallery.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/50 mb-4 px-0">
                  Gallery
                </h2>
                <TripGallery trip={trip} />
              </div>
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

            {(trip.summary || paragraphs.length > 0) && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/50 mb-3">
                  About this trip
                </h2>
                <div className="flex flex-col gap-4">
                  {trip.summary && (
                    <p className="text-base text-[#1D242B]/80 leading-relaxed">{trip.summary}</p>
                  )}
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
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/50 mb-3">
                  Add-ons
                </h2>
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

          {/* Sticky sidebar: price, conditions, contact */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
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
                <p className="text-sm text-[#1D242B]/70 leading-relaxed mt-2">{trip.priceNote}</p>
              )}
            </div>

            <div className="bg-white border border-[#1D242B]/10 rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-sm text-[#1D242B]/60 text-center">
                Enquiries come straight to us — no booking platform in between.
              </p>
              <a
                href={whatsappLink(trip)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={emailLink(trip)}
                className="inline-flex items-center justify-center gap-2 bg-[#1D242B] text-white text-sm font-bold px-4 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>

            {conditions && (
              <TripConditionsPanel
                conditions={conditions}
                isSaltwater={trip.category.toLowerCase() === "saltwater"}
              />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
