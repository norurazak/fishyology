import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/mdx";
import { cloudinaryImage } from "@/lib/cloudinary";
import VideoEmbed from "./VideoEmbed";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=1200";

/* The featured video on the @FishyologyTV channel. Leave the id empty to show
   the placeholder; paste a YouTube video id (the part after v= in the URL)
   and the title to switch the tile to a click-to-play embed. */
const FEATURED_VIDEO = {
  id: "",
  title: "Fishyology on YouTube",
  poster:
    "https://res.cloudinary.com/dub3h3elq/image/upload/v1792204134/Tioman_Island_Fishing_Expedition_10_nv6kvs.jpg",
};

/* Copy for the game tile, mirroring the game's own hero. */
const GAME = {
  href: "/game",
  image:
    "https://res.cloudinary.com/dub3h3elq/image/upload/v1783502920/IMG_5329-EDIT_xh673d.jpg",
  eyebrow: "Game",
  title: "Jigging Master",
  summary: "Master the water. Conquer the fight.",
};

/* Shared keyboard focus ring for the tile links. The ring sits outside the box
   so the tiles' overflow-hidden never clips it. */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-abyss focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFFFFF]";

const TILE = `group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl motion-safe:transition-shadow motion-safe:duration-500 ${FOCUS_RING}`;

const ZOOM =
  "absolute inset-0 w-full h-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105";

/* Every tile's headline is the link's own text, so the photos are decorative:
   an alt that repeated the title would be read out twice. */

/** Photo tile with the text laid over a dark gradient. */
function PhotoTile({
  href,
  image,
  eyebrow,
  title,
  summary,
  byline,
  sizes,
  large = false,
  className = "",
}: {
  href: string;
  image?: string;
  eyebrow: string;
  title: string;
  summary?: string;
  byline?: string;
  sizes: string;
  large?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${TILE} flex items-end bg-abyss ${className}`}>
      <img {...cloudinaryImage(image || FALLBACK_IMAGE, { sizes })} alt="" loading="lazy" className={ZOOM} />
      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
      <span
        aria-hidden="true"
        className={`absolute flex items-center justify-center rounded-full bg-[#FFFFFF] text-abyss shadow-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:rotate-45 ${
          large ? "top-5 right-5 md:top-6 md:right-6 h-11 w-11" : "top-4 right-4 h-10 w-10"
        }`}
      >
        <ArrowUpRight className="w-5 h-5" />
      </span>
      <div className={`relative z-10 ${large ? "p-8 md:p-10" : "p-6"}`}>
        <span className="block text-[#FFFFFF]/85 text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</span>
        <h3
          className={`font-serif text-[#FFFFFF] text-balance ${
            large ? "text-3xl md:text-5xl leading-[1.1] mb-3" : "text-xl md:text-2xl leading-snug line-clamp-3"
          }`}
        >
          {title}
        </h3>
        {summary && (
          <p
            className={`text-[#FFFFFF]/80 text-sm leading-relaxed ${
              large ? "md:text-base line-clamp-2 max-w-2xl" : "mt-2 line-clamp-2"
            }`}
          >
            {summary}
          </p>
        )}
        {byline && <p className="mt-4 text-[#FFFFFF]/85 text-xs font-bold uppercase tracking-widest">{byline}</p>}
      </div>
    </Link>
  );
}

/** The call for authors: a dark tile whose Tuna pill is the one accent. */
function AuthorCallTile({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/about#pitch-section"
      className={`${TILE} flex flex-col justify-between gap-5 bg-abyss p-6 md:p-7 ${className}`}
    >
      <div>
        <span className="block text-white text-xs font-bold uppercase tracking-widest mb-3">Write for Fishyology</span>
        <h3 className="font-serif text-2xl md:text-3xl leading-[1.1] text-white text-balance">
          Tell your story. Inspire the next cast.
        </h3>
        <p className="mt-3 text-[#FFFFFF]/80 text-sm leading-relaxed">
          Have a trip report or strategy worth sharing? We want to publish it in the Fishyology Journal.
        </p>
      </div>
      <span className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full bg-tuna px-6 text-sm font-bold text-white motion-safe:transition-colors group-hover:bg-tuna-on-light">
        Pitch your story
        <ArrowRight
          aria-hidden="true"
          className="w-4 h-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

/**
 * What Fishyology is about, not just the newest posts: Noru's latest story as
 * the 2×2 feature, a YouTube embed beside it, and the game and a call for
 * authors sharing the row below the video. On desktop it is 4 columns;
 * tablets use 2 and phones 1.
 */
export default function Showcase({ story }: { story?: Post }) {
  return (
    <section
      aria-labelledby="showcase-heading"
      className="py-12 md:py-14 px-6 md:px-12 max-w-[1600px] mx-auto"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <span className="text-abyss/70 font-bold tracking-widest uppercase mb-3 block text-sm">
            Inside Fishyology
          </span>
          <h2
            id="showcase-heading"
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-abyss"
          >
            Start Here
          </h2>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(18rem,auto)_minmax(18rem,auto)] gap-4">
        {story && (
          <li className="md:col-span-2 lg:row-span-2">
            <PhotoTile
              href={`/blog/${story.slug}`}
              image={story.frontmatter.image}
              eyebrow={`Latest story · ${story.frontmatter.date}`}
              title={story.frontmatter.title}
              summary={story.frontmatter.summary}
              byline="By Noru Razak"
              sizes="(max-width: 1024px) 100vw, 50vw"
              large
              className="h-full min-h-[26rem]"
            />
          </li>
        )}
        <li className="md:col-span-2">
          <VideoEmbed
            videoId={FEATURED_VIDEO.id}
            title={FEATURED_VIDEO.title}
            poster={FEATURED_VIDEO.poster}
            className="h-full min-h-[16rem]"
          />
        </li>
        <li>
          <PhotoTile {...GAME} sizes="(max-width: 768px) 100vw, 25vw" className="h-full min-h-[18rem]" />
        </li>
        <li>
          <AuthorCallTile className="h-full min-h-[18rem]" />
        </li>
      </ul>
    </section>
  );
}
