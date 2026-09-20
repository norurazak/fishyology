import type { TripPackage } from "@/lib/trips";

export const WHATSAPP_NUMBER = "60197789924";
export const CONTACT_EMAIL = "noru.razak@gmail.com";

const PARENTHETICAL = /\s*\([^)]*\)/g;

/** Drops "(…)" asides so long authored fields fit a card chip. */
export function stripParentheticals(value: string): string {
  return value.replace(PARENTHETICAL, "").replace(/\s{2,}/g, " ").trim();
}

function trimEdgePunctuation(value: string): string {
  return value.replace(/^[\s,;.—–-]+/, "").replace(/[\s,;.—–-]+$/, "").trim();
}

/** "Tioman Island, Pahang (departs from Kuala Rompin)" → "Tioman Island, Pahang" */
export function shortLocation(value: string): string {
  const [base] = stripParentheticals(value).split(/\s+—\s+|;/);
  return trimEdgePunctuation(base ?? "");
}

/**
 * Squeezes an authored duration down to a chip-sized phrase, cutting at the
 * cleanest break available rather than hard-truncating mid-clause.
 */
export function shortPhrase(value: string, maxLength = 46): string {
  const base = trimEdgePunctuation(stripParentheticals(value).split(";")[0] ?? "");
  if (base.length <= maxLength) return base;

  const lastComma = base.lastIndexOf(",", maxLength);
  if (lastComma > 11) return trimEdgePunctuation(base.slice(0, lastComma));

  const dash = base.indexOf(" — ");
  if (dash > 11) return trimEdgePunctuation(base.slice(0, dash));

  const lastSpace = base.lastIndexOf(" ", maxLength);
  return `${trimEdgePunctuation(base.slice(0, lastSpace > 11 ? lastSpace : maxLength))}…`;
}

/** "6 (4 pax included…)" → "Up to 6 anglers"; "Minimum 4, maximum 10…" → "4–10 anglers" */
export function shortGuests(value: string): string {
  const base = trimEdgePunctuation(stripParentheticals(value).split(";")[0] ?? "");
  if (/^\d+$/.test(base)) return `Up to ${base} anglers`;

  const range = base.match(/minimum\s+(\d+)[,\s]+maximum\s+(\d+)/i);
  if (range) return `${range[1]}–${range[2]} anglers`;

  return base;
}

/** First sentence only — the rest of the season note belongs in the detail panel. */
export function seasonHeadline(value: string): string {
  const [first] = value.split(/\.\s+/);
  return trimEdgePunctuation(first ?? "");
}

/**
 * "RM3,800" → "From RM3,800" — every quoted rate is a starting point (group
 * size, add-ons, and conditions can move the final price), so the site should
 * never read as a fixed quote.
 */
export function fromPrice(headline: string): string {
  return headline ? `From ${headline}` : headline;
}

function enquiryLine(trip: TripPackage): string {
  const price = trip.priceHeadline ? ` (${fromPrice(trip.priceHeadline)})` : "";
  return `Hi Fishyology, I'd like to enquire about the ${trip.name}${price}.`;
}

export function whatsappLink(trip: TripPackage): string {
  const text = `${enquiryLine(trip)}\n\nPreferred dates:\nGroup size:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function emailLink(trip: TripPackage): string {
  const subject = `Trip enquiry — ${trip.name}`;
  const body = `${enquiryLine(trip)}\n\nPreferred dates:\nGroup size:\nQuestions:`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
