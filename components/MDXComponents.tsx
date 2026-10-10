import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Library } from 'lucide-react';
import TripBanner from './TripBanner';
import StressorMap, { Stressor } from './StressorMap';

// Edge shadows that appear only when a wide table actually overflows, and only on the
// side there is more content on. The cover gradients scroll with the content (`local`)
// and sit on top of the fixed shadow gradients (`scroll`), masking them at each end.
const scrollShadow: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, #FAFAFA 40%, rgba(250,250,250,0)),
    linear-gradient(to left, #FAFAFA 40%, rgba(250,250,250,0)),
    linear-gradient(to right, rgba(29,36,43,0.14), rgba(29,36,43,0)),
    linear-gradient(to left, rgba(29,36,43,0.14), rgba(29,36,43,0))`,
  backgroundPosition: 'left center, right center, left center, right center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '28px 100%, 28px 100%, 12px 100%, 12px 100%',
  backgroundAttachment: 'local, local, scroll, scroll',
};

export const mdxComponents = {
  // 1. Upgrade standard markdown images to optimized Next.js Images
  img: (props: any) => (
    <div className="relative w-full h-[400px] md:h-[500px] my-10 rounded-[2rem] overflow-hidden shadow-2xl bg-[#1D242B]/5">
      <Image 
        src={props.src} 
        alt={props.alt || "Fishyology Journal Image"} 
        fill 
        className="object-cover" 
      />
    </div>
  ),
  
  // 2. Safely handle internal vs external links
  a: ({ href, children, ...props }: any) => {
    if (href?.startsWith('/')) {
      return <Link href={href} {...props}>{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  },

  // 3. Custom Callout Component
  Callout: ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-[#1D242B] text-white p-6 md:p-8 rounded-[1.5rem] my-10 border-l-4 border-[#408A71] shadow-xl not-prose">
      <strong className="block text-[#408A71] uppercase tracking-widest text-sm mb-3 font-black">{title}</strong>
      <div className="text-white/80 font-medium text-lg leading-relaxed">{children}</div>
    </div>
  ),

  // 4. High-End Editorial Image with Caption (UPGRADED: Horizontal & Vertical Support)
  Figure: ({ src, alt, caption, orientation = "horizontal" }: { src: string, alt: string, caption?: string, orientation?: "horizontal" | "vertical" }) => {
    const heightClass = orientation === "vertical" 
      ? "h-[600px] md:h-[800px] aspect-[4/5] md:aspect-[3/4] max-w-2xl mx-auto" 
      : "h-[400px] md:h-[650px] w-full"; 

    return (
      <figure className={`my-16 not-prose ${orientation === "vertical" ? "flex flex-col items-center" : ""}`}>
        <div className={`relative rounded-[1rem] overflow-hidden shadow-2xl border border-[#1D242B]/5 ${heightClass}`}>
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-700" 
          />
        </div>
        {caption && (
          <figcaption className={`mt-6 text-center text-[#1D242B]/60 font-serif italic text-lg md:text-xl px-4 ${orientation === "vertical" ? "max-w-2xl" : ""}`}>
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },

  // 5. Cinematic YouTube Embed
  YouTube: ({ id }: { id: string }) => (
    <div className="my-12 relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-[#1D242B]/10 bg-black not-prose">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&color=white`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      ></iframe>
    </div>
  ),

  // 6. Angler's Gear Loadout
  GearLoadout: ({ rod, reel, line, lure }: { rod: string, reel: string, line: string, lure: string }) => (
    <div className="my-12 bg-white rounded-[2rem] p-8 shadow-xl border border-[#1D242B]/10 not-prose">
      <h4 className="text-[#408A71] font-black uppercase tracking-widest text-sm mb-6 border-b border-[#1D242B]/10 pb-4">Captain's Loadout</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div><span className="block text-xs font-bold text-[#1D242B]/40 uppercase tracking-wider mb-1">Rod</span><span className="font-medium text-[#1D242B]">{rod}</span></div>
        <div><span className="block text-xs font-bold text-[#1D242B]/40 uppercase tracking-wider mb-1">Reel</span><span className="font-medium text-[#1D242B]">{reel}</span></div>
        <div><span className="block text-xs font-bold text-[#1D242B]/40 uppercase tracking-wider mb-1">Line</span><span className="font-medium text-[#1D242B]">{line}</span></div>
        <div><span className="block text-xs font-bold text-[#1D242B]/40 uppercase tracking-wider mb-1">Lure/Bait</span><span className="font-medium text-[#0077C0]">{lure}</span></div>
      </div>
    </div>
  ),

  // 7. Species Stats Card
  SpeciesStats: ({ name, scientific, weight, diet }: { name: string, scientific: string, weight: string, diet: string }) => (
    <div className="my-10 bg-[#1D242B] text-[#FAFAFA] rounded-[1.5rem] p-6 md:p-8 shadow-2xl border-l-4 border-[#0077C0] flex flex-col md:flex-row md:items-center justify-between gap-6 not-prose">
      <div>
        <h3 className="text-2xl font-black mb-1">{name}</h3>
        <p className="text-[#FAFAFA]/50 font-serif italic text-lg">{scientific}</p>
      </div>
      <div className="flex gap-8">
        <div><span className="block text-[#0077C0] text-xs font-bold uppercase tracking-widest mb-1">Avg Weight</span>{weight}</div>
        <div><span className="block text-[#0077C0] text-xs font-bold uppercase tracking-widest mb-1">Primary Diet</span>{diet}</div>
      </div>
    </div>
  ),

  // 8. Editorial Pull Quote
  PullQuote: ({ children, author }: { children: React.ReactNode, author?: string }) => (
    <div className="my-16 py-8 border-t-2 border-b-2 border-[#1D242B]/10 not-prose">
      <blockquote className="text-3xl md:text-5xl font-serif text-[#1D242B] leading-tight text-center italic">
        "{children}"
      </blockquote>
      {author && <p className="text-center mt-6 text-[#408A71] font-bold uppercase tracking-widest text-sm">— {author}</p>}
    </div>
  ),

  // 9. Branded Visual Divider
  Divider: () => (
    <div className="flex items-center justify-center gap-4 my-16 not-prose opacity-40">
      <div className="w-16 h-[1px] bg-[#1D242B]"></div>
      <div className="w-2 h-2 rounded-full bg-[#0077C0]"></div>
      <div className="w-16 h-[1px] bg-[#1D242B]"></div>
    </div>
  ),

  // 10. Side-by-Side Image Grid
  ImageGrid: ({ img1, img2, alt1, alt2 }: { img1: string, img2: string, alt1: string, alt2: string }) => (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 not-prose">
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg">
        <Image src={img1} alt={alt1} fill className="object-cover hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg mt-8 md:mt-0">
        <Image src={img2} alt={alt2} fill className="object-cover hover:scale-105 transition-transform duration-700" />
      </div>
    </div>
  ),

  // 11. Research Key Finding — a pulled-out statistic for Fishyology Insight reports.
  //     `source` renders the citation under the stat, so a figure carries its attribution
  //     inline rather than relying on the reader to hunt for it in the Sources table.
  //     `image` sits beside the rule as a narrow portrait crop. It is align-stretched rather
  //     than given a height, so it always matches the blue rule exactly however tall the text
  //     runs, and object-cover keeps it vertical whatever the source aspect ratio is. Plain
  //     <img> because these are remote stock URLs and next/image only allows Cloudinary here.
  KeyFinding: ({ stat, label, source, image, imageAlt, children }: { stat: string, label: string, source?: string, image?: string, imageAlt?: string, children?: React.ReactNode }) => (
    <figure className="my-12 not-prose flex items-stretch gap-5 md:gap-8">
      {image && (
        <img
          src={image}
          alt={imageAlt || ''}
          loading="lazy"
          decoding="async"
          className="w-28 sm:w-36 md:w-44 lg:w-1/4 shrink-0 self-stretch object-cover bg-[#1D242B]/5"
        />
      )}
      <div className="flex-1 min-w-0 border-l-[3px] border-[#0077C0] pl-5 md:pl-8">
        <div className="text-6xl md:text-7xl font-black text-[#1D242B] leading-[0.85] tracking-tighter tabular-nums">{stat}</div>
        <figcaption className="mt-4">
          <p className="text-[#1D242B] font-bold text-base md:text-lg leading-snug">{label}</p>
          {children && <div className="text-[#1D242B]/70 font-medium mt-3 leading-relaxed [&>p]:m-0">{children}</div>}
          {source && (
            <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-[#1D242B]/40">Source: {source}</p>
          )}
        </figcaption>
      </div>
    </figure>
  ),

  // 12. Comparison stat tiles for Fishyology Insight reports. Use instead of a table when
  //     a few categories carry two measures on different scales (a count and a percentage):
  //     plotting both on one axis would be a dual-axis chart. The meter fill is a single
  //     hue across every tile, so bar LENGTH encodes magnitude and colour never encodes rank.
  StatGrid: ({ children, caption }: { children: React.ReactNode, caption?: string }) => (
    <figure className="my-12 not-prose">
      <div className="stat-grid grid gap-4 sm:grid-cols-3">{children}</div>
      {caption && (
        <figcaption className="mt-5 text-sm font-medium italic text-[#1D242B]/50">{caption}</figcaption>
      )}
    </figure>
  ),

  // 13. One tile inside <StatGrid>. `tags` is a comma-separated string. Pass `tagHref` as a
  //     URL template containing `{}` to turn each tag into a link (e.g. a taxonomic family
  //     pointing at a reference database); without it the tags stay as plain pills, so a
  //     non-taxonomic tag is never silently linked somewhere wrong.
  StatMeter: ({ label, value, unit, percent, percentLabel, tags, tagHref }: { label: string, value: string, unit?: string, percent?: string, percentLabel?: string, tags?: string, tagHref?: string }) => {
    const pct = Math.max(0, Math.min(100, Number(percent) || 0));
    const pillClass = "rounded-full bg-[#1D242B]/5 px-2.5 py-1 text-[10px] font-bold text-[#1D242B]/60";
    return (
      <div className="flex flex-col rounded-[1.25rem] border border-[#1D242B]/10 bg-white p-5 md:p-6 transition-shadow hover:shadow-md">
        <span className="block text-[10px] font-black uppercase tracking-widest text-[#408A71]">{label}</span>

        <span className="mt-3 flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-4xl md:text-5xl font-black leading-none tracking-tight text-[#1D242B]">{value}</span>
          {unit && <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D242B]/40">{unit}</span>}
        </span>

        {percent && (
          <span className="mt-6 block">
            <span className="mb-2 flex items-baseline justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1D242B]/50">{percentLabel}</span>
              <span className="text-lg font-black leading-none text-[#F2631A]">{pct}%</span>
            </span>
            {/* track: lighter step of the same hue, not grey, so state reads across the whole bar */}
            <span className="block h-2.5 w-full rounded-[4px] bg-[#F2631A]/10">
              <span className="stat-meter-fill block h-full rounded-r-[4px] bg-[#F2631A]" style={{ width: `${pct}%` }} />
            </span>
          </span>
        )}

        {tags && (
          <span className="mt-6 flex flex-wrap gap-1.5 border-t border-[#1D242B]/5 pt-4">
            {tags.split(',').map((raw) => {
              const tag = raw.trim();
              if (!tagHref) return <span key={tag} className={pillClass}>{tag}</span>;
              return (
                <a
                  key={tag}
                  href={tagHref.replace('{}', encodeURIComponent(tag))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pillClass} inline-flex items-center gap-1 transition-colors hover:bg-[#C7EEFF] hover:text-[#0077C0]`}
                >
                  {tag}
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              );
            })}
          </span>
        )}
      </div>
    );
  },

  // 14. Research Data Tables — GFM markdown tables (`| a | b |`) in an editorial/journal
  //     treatment: rules instead of a boxed grid, tabular figures, and markdown column
  //     alignment (`| ---: |`) forwarded through so numeric columns can right-align.
  table: ({ children, ...props }: { children: React.ReactNode }) => (
    <div className="my-12 not-prose overflow-x-auto" style={scrollShadow}>
      <table {...props} className="w-full border-collapse text-left tabular-nums">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="border-b-2 border-[#1D242B]">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="[&>tr]:border-b [&>tr]:border-[#1D242B]/10">{children}</tbody>
  ),
  th: ({ children, ...props }: { children: React.ReactNode }) => (
    <th {...props} className="px-4 py-3 text-[11px] font-black uppercase tracking-widest text-[#1D242B] align-bottom">{children}</th>
  ),
  td: ({ children, ...props }: { children: React.ReactNode }) => (
    <td {...props} className="px-4 py-5 text-sm md:text-[15px] font-medium leading-relaxed text-[#1D242B]/75 align-top">{children}</td>
  ),

  // 13. Collapsible reference list for Fishyology Insight reports. Native <details> so it
  //     stays a server component: no client JS, keyboard accessible, open-by-default for
  //     crawlers. Wraps <Source /> children.
  Sources: ({ children, title = "Sources" }: { children: React.ReactNode, title?: string }) => (
    <details className="group my-16 not-prose rounded-[1.5rem] border border-[#1D242B]/10 bg-white overflow-hidden transition-shadow open:shadow-xl">
      <summary className="flex items-center gap-4 p-5 md:p-6 cursor-pointer list-none select-none hover:bg-[#1D242B]/[0.02] transition-colors [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#C7EEFF] text-[#0077C0] shrink-0">
          <Library className="w-5 h-5" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-widest text-[#408A71] mb-0.5">
            Peer-reviewed references
          </span>
          <span className="block text-lg font-black text-[#1D242B] tracking-tight">{title}</span>
        </span>
        <span className="flex items-center gap-2 shrink-0 text-[#1D242B]/40">
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest group-open:hidden">
            Show
          </span>
          <span className="hidden sm:group-open:block text-[10px] font-black uppercase tracking-widest">
            Hide
          </span>
          <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
        </span>
      </summary>
      <div className="border-t border-[#1D242B]/10 bg-[#1D242B]/[0.02] p-4 md:p-5 grid gap-3 md:grid-cols-2">
        {children}
      </div>
    </details>
  ),

  // 14. A single reference inside <Sources>.
  Source: ({ n, title, authors, publication, year, url }: { n?: string, title: string, authors?: string, publication?: string, year?: string, url?: string }) => {
    const inner = (
      <div className="flex items-start gap-3">
        {n && (
          <span className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-[#1D242B] text-[#FAFAFA] text-[11px] font-black flex items-center justify-center tabular-nums">
            {n}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block font-bold text-[#1D242B] text-sm leading-snug group-hover/src:text-[#0077C0] transition-colors">
            {title}
          </span>
          {authors && <span className="block text-xs text-[#1D242B]/50 mt-1.5 font-medium">{authors}</span>}
          {(publication || year) && (
            <span className="flex flex-wrap items-center gap-2 mt-2.5">
              {publication && (
                <span className="text-[10px] font-black uppercase tracking-wider text-[#408A71] bg-[#408A71]/10 px-2 py-1 rounded-full">
                  {publication}
                </span>
              )}
              {year && <span className="text-[10px] font-bold text-[#1D242B]/40 tabular-nums">{year}</span>}
            </span>
          )}
        </span>
        {url && <ArrowUpRight className="w-4 h-4 shrink-0 text-[#1D242B]/20 group-hover/src:text-[#0077C0] transition-colors" />}
      </div>
    );

    const className = "group/src block h-full rounded-[1rem] bg-white border border-[#1D242B]/10 p-4 md:p-5 transition-all hover:border-[#0077C0]/40 hover:shadow-md";

    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
    ) : (
      <div className={className}>{inner}</div>
    );
  },

  // Grouped pressure map for research digests (see components/StressorMap.tsx)
  StressorMap,
  Stressor,

  // 15. Trip CTA Banner — <TripBanner slug="kuala-rompin-pahang-full-day-charter" /> for a
  //     specific trip (pulls its live name/cover photo/price straight from trips.mdx, so it
  //     can't drift out of sync), or <TripBanner /> with no slug for a generic "browse all
  //     trips" banner. An unrecognized slug also falls back to the generic banner. Add
  //     image="..." to show a different photo than the trip's own cover for this one
  //     placement — the name and price still stay live either way.
  TripBanner,
};