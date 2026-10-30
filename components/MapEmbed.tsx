import { ArrowUpRight } from "lucide-react";

/**
 * <MapEmbed lat="2.8182016" lng="104.1596416" title="Kampung Tekek" /> shows a
 * wide Google Map pinned to a location. Uses the keyless embed URL, so no API
 * key is needed. `zoom` runs from 1 (world) to 21 (street), `satellite="true"`
 * swaps to imagery, and `href` points the "Open in Google Maps" link at a
 * specific place page instead of the raw coordinates.
 *
 * Every prop is a string because MDXRemote strips `{...}` expressions from
 * post content, so lat={2.8} would arrive as undefined.
 */
export default function MapEmbed({
  lat,
  lng,
  title,
  caption,
  zoom = "12",
  satellite,
  href,
}: {
  lat: string;
  lng: string;
  title: string;
  caption?: string;
  zoom?: string;
  satellite?: string;
  href?: string;
}) {
  const query = `${lat},${lng}`;
  const src = `https://www.google.com/maps?q=${query}&z=${zoom}&t=${satellite === "true" ? "k" : "m"}&output=embed`;
  const mapLink = href ?? `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <figure className="my-16 not-prose">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[1rem] overflow-hidden shadow-2xl border border-[#1D242B]/10 bg-[#1D242B]/5">
        <iframe
          src={src}
          title={`Map of ${title}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe>
      </div>
      <figcaption className="mt-6 text-center text-[#1D242B]/60 font-serif italic text-lg md:text-xl px-4">
        {caption ?? title}
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-1 text-sm font-sans font-bold not-italic text-[#408A71] hover:underline"
        >
          Open in Google Maps
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </figcaption>
    </figure>
  );
}
