import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/mdx";
import { cloudinaryImage } from "@/lib/cloudinary";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=1200";

/* Shared keyboard focus ring for the card links. The ring sits outside the box
   so the cards' overflow-hidden never clips it. */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-abyss focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA]";

/** Newest post as a large feature, with the next few listed beside it. */
export default function LatestStories({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [feature, ...rest] = posts;

  return (
    <section
      aria-labelledby="latest-stories-heading"
      className="py-20 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
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

      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-14">
        <Link
          href={`/blog/${feature.slug}`}
          className={`group relative flex items-end min-h-[420px] lg:min-h-[560px] rounded-[1.75rem] overflow-hidden bg-abyss shadow-xl ${FOCUS_RING}`}
        >
          {/* The headline is the link's text, so the photo is decorative: an
              alt that repeated it would be read out twice. */}
          <img
            {...cloudinaryImage(feature.frontmatter.image || FALLBACK_IMAGE, {
              sizes: "(max-width: 1024px) 100vw, 60vw",
            })}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
          <span
            aria-hidden="true"
            className="absolute top-5 right-5 md:top-6 md:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#FAFAFA] text-abyss shadow-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:rotate-45"
          >
            <ArrowUpRight className="w-5 h-5" />
          </span>
          <div className="relative z-10 p-8 md:p-10">
            <span className="block text-[#FAFAFA]/85 text-xs font-bold uppercase tracking-widest mb-3">
              {feature.frontmatter.category} · {feature.frontmatter.date}
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-[#FAFAFA] leading-[1.1] mb-3 text-balance">
              {feature.frontmatter.title}
            </h3>
            {feature.frontmatter.summary && (
              <p className="text-[#FAFAFA]/80 text-sm md:text-base leading-relaxed line-clamp-2 max-w-2xl">
                {feature.frontmatter.summary}
              </p>
            )}
          </div>
        </Link>

        <ul className="flex flex-col border-t border-abyss/15 divide-y divide-abyss/15">
          {rest.map((post) => (
            <li key={post.slug} className="flex flex-1">
              <Link
                href={`/blog/${post.slug}`}
                className={`group flex w-full items-center gap-5 py-6 rounded-lg ${FOCUS_RING}`}
              >
                <div className="relative w-28 h-28 sm:w-40 sm:h-32 shrink-0 rounded-[1rem] overflow-hidden bg-abyss/5">
                  <img
                    {...cloudinaryImage(post.frontmatter.image || FALLBACK_IMAGE, {
                      sizes: "160px",
                      widths: [320],
                    })}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <span className="block text-abyss/70 text-xs font-bold uppercase tracking-widest mb-2">
                    {post.frontmatter.category} · {post.frontmatter.date}
                  </span>
                  <h3 className="text-lg md:text-xl font-serif text-abyss leading-snug group-hover:underline underline-offset-4 line-clamp-3 text-balance">
                    {post.frontmatter.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
