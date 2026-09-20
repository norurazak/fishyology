import Image from 'next/image';
import Link from 'next/link';
import TripBanner from './TripBanner';

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

  // 11. Trip CTA Banner — <TripBanner slug="kuala-rompin-pahang-full-day-charter" /> for a
  //     specific trip (pulls its live name/cover photo/price straight from trips.mdx, so it
  //     can't drift out of sync), or <TripBanner /> with no slug for a generic "browse all
  //     trips" banner. An unrecognized slug also falls back to the generic banner. Add
  //     image="..." to show a different photo than the trip's own cover for this one
  //     placement — the name and price still stay live either way.
  TripBanner,
};