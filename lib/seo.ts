import type { TripPackage } from "@/lib/trips";
import { fromPrice, shortLocation, stripParentheticals } from "@/components/trips/format";

export const SITE_URL = "https://www.fishyology.org";

/** Profile URLs mirror components/SocialChannels.tsx. */
const SAME_AS = [
  "https://www.youtube.com/@FishyologyTV",
  "https://www.instagram.com/fishyologyig/",
  "https://www.facebook.com/Fishyology",
  "https://www.threads.com/@fishyologyig",
];

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Fishyology",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: SAME_AS,
};

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** "RM3,800" → "3800"; null when the headline isn't a plain amount. */
function priceAmount(headline: string): string | null {
  const match = headline.match(/^RM\s*([\d,]+(?:\.\d+)?)/i);
  return match ? match[1].replace(/,/g, "") : null;
}

/** Title for a trip page: the name already carries the place, so add the intent. */
export function tripTitle(trip: TripPackage): string {
  return `${trip.name} — Guided Fishing Trip`;
}

/** Descriptive alt text for a trip's lead photo. */
export function tripImageAlt(trip: TripPackage): string {
  const caption = trip.gallery[0]?.caption;
  if (caption) return caption;
  const format = stripParentheticals(trip.tripType);
  return `${trip.name}${format ? ` — ${format}` : ""} with Fishyology`;
}

export function tripJsonLd(trip: TripPackage) {
  const amount = priceAmount(trip.priceHeadline);
  const url = `${SITE_URL}/trips/${trip.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: trip.name,
    description: trip.summary,
    url,
    image: trip.photos.length > 0 ? trip.photos : undefined,
    touristType: trip.category ? `${trip.category} anglers` : undefined,
    provider: { "@id": ORGANIZATION_ID },
    itinerary: {
      "@type": "Place",
      name: shortLocation(trip.location),
      geo: trip.coordinates
        ? { "@type": "GeoCoordinates", latitude: trip.coordinates.lat, longitude: trip.coordinates.lon }
        : undefined,
    },
    offers: amount
      ? {
          "@type": "Offer",
          url,
          price: amount,
          priceCurrency: "MYR",
          availability: "https://schema.org/InStock",
          description: [fromPrice(trip.priceHeadline), trip.priceUnit].filter(Boolean).join(" "),
        }
      : undefined,
  };
}

export function tripsListJsonLd(trips: TripPackage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fishyology guided fishing trips",
    itemListElement: trips.map((trip, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/trips/${trip.slug}`,
      name: trip.name,
    })),
  };
}

/** JSON-LD for an inline <script>; "<" is escaped so authored text can't close the tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
