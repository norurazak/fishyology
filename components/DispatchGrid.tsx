import Link from 'next/link';
import { Post } from '@/lib/mdx';
import { resolveAuthor } from '@/lib/authors';

// Landscape feature card across the full width (image beside text), with the four
// standard cards in a row beneath it.
// Receives human-authored posts only; agent digests live in the Insight band.
export default function DispatchGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  const feature = posts[0];
  const standard = posts.slice(1, 5);
  const featureAuthor = resolveAuthor(feature.frontmatter.author);

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Latest Dispatches</h2>
      </div>

      {/* Feature card: landscape, image beside text rather than text over a tall image */}
      <Link
        href={`/blog/${feature.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] rounded-[1rem] overflow-hidden border border-[#1D242B]/10 shadow-lg bg-[#1D242B] mb-12"
      >
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px] overflow-hidden">
          <img
            src={feature.frontmatter.image || 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1200'}
            alt={feature.frontmatter.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* feathers the image into the text panel on wide screens only */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#1D242B]"></div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="inline-block bg-[#FAFAFA] text-[#1D242B] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
              {feature.frontmatter.category || 'Species Profile'}
            </span>
            {feature.frontmatter.subcategory && (
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                {feature.frontmatter.subcategory}
              </span>
            )}
          </div>

          <h3 className="text-3xl md:text-4xl xl:text-5xl font-serif text-[#FAFAFA] leading-[1.1] mb-5 group-hover:text-[#C7EEFF] transition-colors">
            {feature.frontmatter.title}
          </h3>

          {feature.frontmatter.summary && (
            <p className="text-[#FAFAFA]/70 text-sm md:text-base mb-8 line-clamp-3 leading-relaxed">
              {feature.frontmatter.summary}
            </p>
          )}

          <div className="flex items-center gap-3">
            <img
              src={featureAuthor.image}
              alt=""
              aria-hidden="true"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20 bg-[#1D242B] shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[#FAFAFA] font-bold text-sm truncate">{featureAuthor.name}</p>
              <p className="text-[#FAFAFA]/70 text-xs">{feature.frontmatter.date}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Four standard cards in a row beneath the feature */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {standard.map((post) => {
          const author = resolveAuthor(post.frontmatter.author);
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col h-full">
              <div className="relative aspect-[4/3] rounded-[0.875rem] overflow-hidden mb-5 bg-[#1D242B]/5 border border-[#1D242B]/5 group-hover:shadow-lg transition-all duration-500 group-hover:-translate-y-1">
                <img
                  src={post.frontmatter.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b4b0?auto=format&fit=crop&q=80&w=800'}
                  alt={post.frontmatter.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="inline-block bg-[#C7EEFF] text-[#0077C0] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                    {post.frontmatter.category || 'Field Report'}
                  </span>
                  {post.frontmatter.subcategory && (
                    <span className="inline-block bg-[#1D242B]/5 text-[#1D242B]/60 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {post.frontmatter.subcategory}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-serif text-[#1D242B] leading-snug group-hover:text-[#0077C0] transition-colors line-clamp-2 mb-2">
                  {post.frontmatter.title}
                </h4>

                {post.frontmatter.summary && (
                  <p className="text-sm leading-relaxed text-[#1D242B]/60 line-clamp-2">
                    {post.frontmatter.summary}
                  </p>
                )}

                <div className="flex items-center gap-2.5 mt-auto pt-4">
                  <img
                    src={author.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-8 h-8 rounded-full object-cover border border-[#1D242B]/10 bg-[#1D242B]/5 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#1D242B] truncate">{author.name}</p>
                    <p className="text-[11px] font-medium text-[#1D242B]/50">{post.frontmatter.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
