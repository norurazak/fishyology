import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/mdx";
import { cloudinaryImage } from "@/lib/cloudinary";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=1200";

/* Shared keyboard focus ring for the tile links. The ring sits outside the box
   so the tiles' overflow-hidden never clips it. */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-abyss focus-visible:ring-offset-4 focus-visible:ring-offset-[#FDFDFD]";

const TILE = `group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl motion-safe:transition-shadow motion-safe:duration-500 ${FOCUS_RING}`;

const ZOOM =
  "absolute inset-0 w-full h-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105";

/* Every tile's headline is the link's own text, so the photos are decorative:
   an alt that repeated the title would be read out twice. */

/** Photo tile with the text laid over a dark gradient. */
function PhotoTile({ post, sizes, large = false, className = "" }: {
  post: Post;
  sizes: string;
  large?: boolean;
  className?: string;
}) {
  const { title, category, date, summary, image } = post.frontmatter;
  return (
    <Link href={`/blog/${post.slug}`} className={`${TILE} flex items-end bg-abyss ${className}`}>
      <img {...cloudinaryImage(image || FALLBACK_IMAGE, { sizes })} alt="" loading="lazy" className={ZOOM} />
      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
      {large && (
        <span
          aria-hidden="true"
          className="absolute top-5 right-5 md:top-6 md:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#FDFDFD] text-abyss shadow-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:rotate-45"
        >
          <ArrowUpRight className="w-5 h-5" />
        </span>
      )}
      <div className={`relative z-10 ${large ? "p-8 md:p-10" : "p-6"}`}>
        <span className="block text-[#FDFDFD]/85 text-xs font-bold uppercase tracking-widest mb-3">
          {category} · {date}
        </span>
        <h3
          className={`font-serif text-[#FDFDFD] text-balance ${
            large ? "text-3xl md:text-5xl leading-[1.1] mb-3" : "text-lg md:text-xl leading-snug line-clamp-3"
          }`}
        >
          {title}
        </h3>
        {large && summary && (
          <p className="text-[#FDFDFD]/80 text-sm md:text-base leading-relaxed line-clamp-2 max-w-2xl">
            {summary}
          </p>
        )}
      </div>
    </Link>
  );
}

/** Wide tile split between photo and text, for variety beside the photo tiles. */
function SplitTile({ post, className = "" }: { post: Post; className?: string }) {
  const { title, category, date, summary, image } = post.frontmatter;
  return (
    <Link href={`/blog/${post.slug}`} className={`${TILE} grid grid-cols-2 bg-white ${className}`}>
      <div className="relative order-2 overflow-hidden bg-abyss/5">
        <img
          {...cloudinaryImage(image || FALLBACK_IMAGE, { sizes: "(max-width: 1024px) 50vw, 25vw" })}
          alt=""
          loading="lazy"
          className={ZOOM}
        />
      </div>
      <div className="flex flex-col justify-between gap-4 p-6 md:p-7">
        <span className="block text-abyss/70 text-xs font-bold uppercase tracking-widest">
          {category} · {date}
        </span>
        <div>
          <h3 className="text-xl md:text-2xl font-serif text-abyss leading-snug text-balance line-clamp-3 group-hover:underline underline-offset-4">
            {title}
          </h3>
          {summary && (
            <p className="hidden sm:block mt-2 text-sm text-abyss/70 leading-relaxed line-clamp-2">{summary}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

/**
 * Newest post as a 2×2 feature tile, the next as a wide split tile, and the
 * rest as square photo tiles: 4 columns on desktop, 2 on tablet, 1 on phones.
 */
export default function LatestStories({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [feature, second, ...rest] = posts;

  return (
    <section
      aria-labelledby="latest-stories-heading"
      className="py-16 md:py-20 px-6 md:px-12 max-w-[1600px] mx-auto"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
        <div>
          <span className="text-abyss/70 font-bold tracking-widest uppercase mb-3 block text-sm">
            From The Journal
          </span>
          <h2
            id="latest-stories-heading"
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-abyss"
          >
            Latest Stories
          </h2>
        </div>
        <Link
          href="/blog"
          className={`group inline-flex min-h-[44px] items-center gap-2 rounded-lg font-bold text-abyss hover:underline underline-offset-4 ${FOCUS_RING}`}
        >
          All Stories
          <ArrowRight
            aria-hidden="true"
            className="w-4 h-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
          />
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-[18rem] gap-4">
        <li className="md:col-span-2 md:row-span-2">
          <PhotoTile
            post={feature}
            large
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full min-h-[26rem]"
          />
        </li>
        {second && (
          <li className="md:col-span-2">
            <SplitTile post={second} className="h-full min-h-[16rem]" />
          </li>
        )}
        {rest.map((post) => (
          <li key={post.slug}>
            <PhotoTile
              post={post}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="h-full min-h-[18rem]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
