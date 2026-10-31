import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/mdx";
import { cloudinaryImage } from "@/lib/cloudinary";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=1200";

/** Newest post as a large feature, with the next few listed beside it. */
export default function LatestStories({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [feature, ...rest] = posts;

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
        <div>
          <span className="text-[#0077C0] font-bold tracking-widest uppercase mb-3 block text-sm">
            From The Journal
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1D242B]">
            Latest Stories
          </h2>
        </div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-bold text-[#1D242B] hover:text-[#0077C0] transition-colors"
        >
          All Stories
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12">
        <Link
          href={`/blog/${feature.slug}`}
          className="group relative flex items-end min-h-[420px] lg:min-h-[560px] rounded-[1.75rem] overflow-hidden bg-[#1D242B] shadow-xl"
        >
          <img
            {...cloudinaryImage(feature.frontmatter.image || FALLBACK_IMAGE, {
              sizes: "(max-width: 1024px) 100vw, 60vw",
            })}
            alt={feature.frontmatter.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/25 to-transparent" />
          <div className="relative z-10 p-8 md:p-10">
            <span className="block text-[#C7EEFF] text-xs font-bold uppercase tracking-widest mb-3">
              {feature.frontmatter.category} · {feature.frontmatter.date}
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-[#FAFAFA] leading-[1.1] mb-3">
              {feature.frontmatter.title}
            </h3>
            {feature.frontmatter.summary && (
              <p className="text-[#FAFAFA]/80 text-sm md:text-base leading-relaxed line-clamp-2 max-w-2xl">
                {feature.frontmatter.summary}
              </p>
            )}
          </div>
        </Link>

        <div className="flex flex-col justify-between gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-5 items-center flex-1">
              <div className="relative w-28 h-28 sm:w-40 sm:h-32 shrink-0 rounded-[1rem] overflow-hidden bg-[#1D242B]/5">
                <img
                  {...cloudinaryImage(post.frontmatter.image || FALLBACK_IMAGE, {
                    sizes: "160px",
                    widths: [320],
                  })}
                  alt={post.frontmatter.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-[#0077C0] text-[10px] font-black uppercase tracking-widest mb-2">
                  {post.frontmatter.category}
                </span>
                <h3 className="text-lg md:text-xl font-serif text-[#1D242B] leading-snug group-hover:text-[#0077C0] transition-colors line-clamp-3">
                  {post.frontmatter.title}
                </h3>
                <span className="block mt-2 text-xs font-medium text-[#1D242B]/50">
                  {post.frontmatter.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
