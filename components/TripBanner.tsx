import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTripBySlug, type TripPackage } from "@/lib/trips";
import { fromPrice } from "@/components/trips/format";

/**
 * Background for the no-slug fallback banner — the same photo as the /trips
 * page's own hero, so clicking through feels continuous rather than landing
 * on a page that looks unrelated to what was just clicked.
 */
const GENERIC_BANNER_IMAGE =
  "https://res.cloudinary.com/dub3h3elq/image/upload/v1776574274/IMG_9149_wloodq.jpg";

/** Shared shell — image banner with a gradient scrim, text block, and CTA
 * button. `group` sits on this wrapper so hovering anywhere on the banner
 * (not just the button) triggers the photo's zoom, matching how every other
 * clickable image card on the site behaves (trip cards, gallery plates,
 * roster cards) — a slow, always-on Ken Burns would suit a standalone hero
 * slide, but this is a click target sitting inside scrolling article text,
 * so it responds to interaction instead. */
function BannerShell({
  image,
  eyebrow,
  title,
  meta,
  ctaText,
  href,
}: {
  image: string;
  eyebrow: string;
  title: string;
  meta: React.ReactNode;
  ctaText: string;
  href: string;
}) {
  return (
    <div className="group relative my-16 overflow-hidden shadow-2xl not-prose min-h-[280px] md:min-h-[240px] flex items-end bg-[#1D242B]">
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/65 to-[#1D242B]/15" />

      <div className="relative z-10 w-full p-8 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="min-w-0">
          <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-2 text-xs block">
            {eyebrow}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight mb-2">
            {title}
          </h3>
          <div className="text-white/70 text-sm">{meta}</div>
        </div>
        <Link
          href={href}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#C7EEFF] text-[#1D242B] font-bold px-6 py-3 rounded-full hover:bg-white transition-colors"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

/**
 * The no-slug (or unrecognized-slug) fallback — a general nudge toward the
 * trips index, now a real image banner rather than a flat colour card.
 */
function GenericBanner() {
  return (
    <BannerShell
      image={GENERIC_BANNER_IMAGE}
      eyebrow="Guided Expeditions"
      title="Ready for Your Own Trip?"
      meta="Real charters, booked directly with us — no booking platform in between."
      ctaText="Explore Our Trips"
      href="/trips"
    />
  );
}

/**
 * The slug-resolved variant — name and price always read live from the trip
 * itself, so those can never drift out of sync. The image defaults to the
 * trip's own cover photo, but an author can override it per-placement via
 * the `image` prop — e.g. a photo that fits one specific article's context
 * better than the trip's site-wide cover does. Falls back to the generic
 * banner if there's no image at all, rather than rendering a broken one.
 */
function TripSpecificBanner({ trip, image }: { trip: TripPackage; image?: string }) {
  const heroImage = image || trip.photos[0];
  if (!heroImage) return <GenericBanner />;

  return (
    <BannerShell
      image={heroImage}
      eyebrow="Experience It Yourself"
      title={trip.name}
      meta={
        <span className="font-bold">
          {fromPrice(trip.priceHeadline)}
          {trip.priceUnit && <span className="text-white/50 font-medium"> {trip.priceUnit}</span>}
        </span>
      }
      ctaText="Book This Trip"
      href={`/trips/${trip.slug}`}
    />
  );
}

/**
 * <TripBanner slug="kuala-rompin-pahang-full-day-charter" /> for a specific
 * trip — name and price pulled live, never hand-typed; the image defaults to
 * the trip's own cover but can be overridden with `image="..."` when a
 * particular article calls for a different photo.
 * <TripBanner /> with no slug (or a slug that doesn't match any trip) falls
 * back to a generic "browse all trips" banner rather than rendering broken
 * or blank content.
 */
export default function TripBanner({ slug, image }: { slug?: string; image?: string }) {
  const trip = slug ? getTripBySlug(slug) : undefined;
  return trip ? <TripSpecificBanner trip={trip} image={image} /> : <GenericBanner />;
}
