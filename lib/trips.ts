import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import {
  extractField,
  fieldAsListItems,
  fieldAsParagraphs,
  fieldAsSingleLine,
  slugify,
  splitEntryBlocks,
} from "@/lib/mdxFields";

const tripsFilePath = path.join(process.cwd(), "content", "trips.mdx");

const FrontmatterSchema = z.object({
  title: z.string(),
  updated: z.string(),
  currency: z.string(),
});

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface TripPhoto {
  url: string;
  /** May be empty — not every photo has been captioned yet. */
  caption: string;
}

/** Extra entries beyond this are ignored when parsing `**Photos:**`. */
const MAX_GALLERY_PHOTOS = 10;

/** Which section of /trips a card appears under. */
export type TripGroup = "Expedition" | "Recreational";

export interface TripPackage {
  slug: string;
  name: string;
  category: string;
  group: TripGroup;
  summary: string;
  description: string;
  tripType: string;
  duration: string;
  location: string;
  priceHeadline: string;
  priceUnit: string;
  priceNote: string;
  priceDetail: string;
  maxGuests: string;
  season: string;
  addOns: string[];
  /** Just the URLs, capped at MAX_GALLERY_PHOTOS — unchanged shape existing callers rely on. */
  photos: string[];
  /** The same photos with their captions, for the trip's gallery page. */
  gallery: TripPhoto[];
  coordinates: Coordinates | null;
  /** True when `**Status:** Coming Soon` — the trip shows but isn't bookable yet. */
  comingSoon: boolean;
}


const PRICE_UNIT_LABELS: Record<string, string> = {
  per_trip: "per trip",
  per_person: "per person",
};

function parsePriceField(lines: string[] | null): {
  headline: string;
  unit: string;
  note: string;
  detail: string;
} {
  const detail = fieldAsSingleLine(lines);
  const headlineMatch = detail.match(/^(RM[\d,]+(?:\.\d+)?\s*(?:per\s+\w+)?)/i);
  const headline = headlineMatch ? headlineMatch[1].trim() : detail;

  const unitMatch = detail.match(/per_(?:trip|person)/i);
  const unit = unitMatch ? PRICE_UNIT_LABELS[unitMatch[0].toLowerCase()] ?? "" : "";

  // Whatever survives after the headline and the raw per_trip/per_person token
  // becomes the human-readable note ("flat rate, inclusive of…").
  let note = detail
    .slice(headlineMatch ? headlineMatch[1].length : 0)
    .replace(/per_(?:trip|person)/i, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s,;.—–-]+/, "")
    .trim();

  // Authors often wrap the whole remainder in one parenthesis — unwrap it so the
  // note doesn't render as a stray aside.
  const wrapped = note.match(/^\(([^)]*)\)$/);
  if (wrapped) note = wrapped[1].trim();

  // A leading "(per boat), inclusive of…" aside reads better promoted to its own
  // sentence than left dangling in brackets.
  const leadingAside = note.match(/^\(([^)]*)\)[\s,;]*([\s\S]+)$/);
  if (leadingAside) {
    const aside = leadingAside[1].trim();
    const rest = leadingAside[2].trim();
    note = `${aside.charAt(0).toUpperCase()}${aside.slice(1)}. ${rest.charAt(0).toUpperCase()}${rest.slice(1)}`;
  }

  if (note) note = note.charAt(0).toUpperCase() + note.slice(1);

  return { headline, unit, note, detail };
}

/**
 * Each "**Photos:**" list line is a URL, optionally followed by `| caption`.
 * Non-http entries (the [PHOTO_NEEDED: ...] placeholder convention) are
 * dropped, and the result is capped at MAX_GALLERY_PHOTOS — extra entries
 * beyond that are simply ignored rather than erroring.
 */
function parseGalleryPhotos(lines: string[] | null): TripPhoto[] {
  return fieldAsListItems(lines)
    .map((entry): TripPhoto | null => {
      const [urlPart, ...captionParts] = entry.split("|");
      const url = urlPart.trim();
      if (!url.startsWith("http")) return null;
      return { url, caption: captionParts.join("|").trim() };
    })
    .filter((photo): photo is TripPhoto => photo !== null)
    .slice(0, MAX_GALLERY_PHOTOS);
}

/**
 * "2.80, 103.50" → { lat, lon }. Returns null for a missing, malformed, or
 * out-of-range field so the trip simply renders without a conditions panel.
 */
function parseCoordinates(lines: string[] | null): Coordinates | null {
  const raw = fieldAsSingleLine(lines);
  if (!raw) return null;

  const match = raw.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!match) return null;

  const lat = Number(match[1]);
  const lon = Number(match[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;

  return { lat, lon };
}

/**
 * Falls back to the category when the field is absent, so trips authored
 * before this field existed still land in the right section.
 */
function parseGroup(lines: string[] | null, category: string): TripGroup {
  const raw = fieldAsSingleLine(lines).toLowerCase();
  if (raw.startsWith("recreational")) return "Recreational";
  if (raw.startsWith("expedition")) return "Expedition";
  return category.trim().toLowerCase() === "pond" ? "Recreational" : "Expedition";
}

function parseTripBlock(block: string): TripPackage {
  const lines = block.split("\n");
  const name = lines[0].trim();
  const body = lines.slice(1);

  const price = parsePriceField(extractField(body, "Price"));
  const gallery = parseGalleryPhotos(extractField(body, "Photos"));
  const category = fieldAsSingleLine(extractField(body, "Category"));

  return {
    slug: slugify(name),
    name,
    category,
    group: parseGroup(extractField(body, "Group"), category),
    summary: fieldAsParagraphs(extractField(body, "Summary")),
    description: fieldAsParagraphs(extractField(body, "Description")),
    tripType: fieldAsSingleLine(extractField(body, "Trip Type")),
    duration: fieldAsSingleLine(extractField(body, "Duration")),
    location: fieldAsSingleLine(extractField(body, "Location")),
    priceHeadline: price.headline,
    priceUnit: price.unit,
    priceNote: price.note,
    priceDetail: price.detail,
    maxGuests: fieldAsSingleLine(extractField(body, "Max Guests")),
    season: fieldAsSingleLine(extractField(body, "Season")),
    addOns: fieldAsListItems(extractField(body, "Add-ons")),
    photos: gallery.map((photo) => photo.url),
    gallery,
    coordinates: parseCoordinates(extractField(body, "Coordinates")),
    comingSoon: fieldAsSingleLine(extractField(body, "Status")).toLowerCase().startsWith("coming soon"),
  };
}

export function getTripPackages(): TripPackage[] {
  const fileContents = fs.readFileSync(tripsFilePath, "utf8");
  const { data, content } = matter(fileContents);
  FrontmatterSchema.parse(data);

  // Each "### {Trip Name}" heading under "## Trips" becomes one trip block.
  return splitEntryBlocks(content, "## Trips").map(parseTripBlock);
}

export function getTripBySlug(slug: string): TripPackage | undefined {
  return getTripPackages().find((trip) => trip.slug === slug);
}
