import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/lib/mdx';

// Source counts are derived from the body rather than frontmatter so they can never
// drift out of sync with the citations actually in the piece.
function countSources(content: string): number {
  return (content.match(/<Source\s/g) || []).length;
}

function InsightCard({ post }: { post: Post }) {
  const sources = countSources(post.content);
  const { stat, title, summary, date, subcategory, image } = post.frontmatter;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group snap-start shrink-0 w-[280px] sm:w-[330px] lg:w-[380px] flex flex-col rounded-[1.5rem] border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.03] overflow-hidden transition-all duration-300 hover:border-[#FF9A42]/40 hover:bg-[#FAFAFA]/[0.07]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1D242B]">
        <img
          src={image || 'https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=800'}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12161A] via-[#12161A]/30 to-transparent" />
        {stat && (
          <span className="absolute bottom-4 left-5 text-5xl font-black leading-none tracking-tighter tabular-nums text-[#FF9A42] drop-shadow-lg">
            {stat}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5 md:p-6">
        {subcategory && (
          <span className="block text-[10px] font-black uppercase tracking-widest text-[#FAFAFA]/40 mb-2">
            {subcategory}
          </span>
        )}
        <h3 className="text-xl font-serif leading-snug text-[#FAFAFA] line-clamp-2 mb-3 transition-colors group-hover:text-[#FFC184]">
          {title}
        </h3>
        {summary && (
          <p className="text-sm leading-relaxed text-[#FAFAFA]/50 line-clamp-2 mb-5">{summary}</p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FAFAFA]/35">
          {sources > 0 && (
            <>
              <span className="text-[#FF9A42]">{sources} sources</span>
              <span aria-hidden="true">&middot;</span>
            </>
          )}
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}

export default function InsightBand({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  const latest = posts.slice(0, 5);

  return (
    <section className="relative mt-24 overflow-hidden bg-[#12161A] py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[#F2631A]/15 blur-[130px]"
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="flex items-start gap-5 md:gap-7">
            <img
              src="/nemo-avatar.svg"
              alt=""
              aria-hidden="true"
              className="w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-full border border-[#FF9A42]/20"
            />
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#FF9A42] mb-2">
                Fishyology Insight
              </p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#FAFAFA] mb-3">
                Research Digests
              </h2>
              <p className="max-w-xl font-medium text-[#FAFAFA]/50">
                Syntheses of the peer-reviewed literature, researched and written by Nemo. Not field
                reporting: every figure traces back to a citation you can open.
              </p>
            </div>
          </div>

          <Link
            href="/blog?category=Research%20Insight#archive"
            className="group inline-flex items-center gap-2 shrink-0 text-[11px] font-black uppercase tracking-widest text-[#FF9A42] hover:text-[#FFC184] transition-colors"
          >
            All digests in the archive
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Scroll rail: negative margin lets it bleed to the viewport edge while the
            cards stay aligned with the heading above. */}
        <div className="flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-2 -mx-6 px-6 md:-mx-12 md:px-12">
          {latest.map((post) => (
            <InsightCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
