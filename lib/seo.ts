import type { Metadata } from "next";
import type { TripPackage } from "@/lib/trips";
import type { Post } from "@/lib/mdx";
import { isAgentAuthor, resolveAuthor } from "@/lib/authors";
import { cloudinaryShareImage } from "@/lib/cloudinary";
import { fromPrice, shortLocation, stripParentheticals } from "@/components/trips/format";

export const SITE_URL = "https://www.fishyology.org";

/** Link preview for any page without its own photo: a live sailfish off Tioman. */
const DEFAULT_SHARE_IMAGE =
  "https://res.cloudinary.com/dub3h3elq/image/upload/v1792204134/Tioman_Island_Fishing_Expedition_07_xclawu.jpg";
const DEFAULT_SHARE_ALT = "A Pacific sailfish alongside the boat off Tioman Island";

interface SocialPage {
  title: string;
  description: string;
  path: string;
  image?: string;
  alt?: string;
}

/**
 * Link-preview tags for one page. Next.js replaces a parent's openGraph and
 * twitter objects whole, so a page without these would show the homepage's
 * URL and title when shared.
 */
export function socialMetadata({
  title,
  description,
  path,
  image = DEFAULT_SHARE_IMAGE,
  alt = image === DEFAULT_SHARE_IMAGE ? DEFAULT_SHARE_ALT : title,
}: SocialPage) {
  const url = cloudinaryShareImage(image);

  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Fishyology",
      locale: "en_US",
      type: "website",
      // Images hosted outside Cloudinary keep their own size, so don't declare one.
      images: [url === image ? { url, alt } : { url, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [url],
    },
  } satisfies Pick<Metadata, "openGraph" | "twitter">;
}

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

/** The description a post shows in search results and link previews. */
export function postDescription(post: Post): string {
  const { seoDescription, summary } = post.frontmatter;
  return seoDescription || summary || "Read the latest expedition journal from Fishyology.";
}

/** A frontmatter date such as "May 10, 2026" in the ISO format search engines expect. */
export function isoDate(date: string): string {
  return new Date(date).toISOString();
}

export function articleJsonLd(post: Post) {
  const { title, date, updated, image, author } = post.frontmatter;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: postDescription(post),
    image: image ? [image] : undefined,
    datePublished: isoDate(date),
    dateModified: isoDate(updated || date),
    // Nemo is an agent, so research digests are credited to Fishyology rather than a person.
    author: isAgentAuthor(author)
      ? { "@type": "Organization", "@id": ORGANIZATION_ID, name: "Fishyology", url: SITE_URL }
      : { "@type": "Person", name: resolveAuthor(author).name },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Fishyology",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
