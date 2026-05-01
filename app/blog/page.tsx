import Link from 'next/link';
import { Suspense } from 'react';
import { getAllPosts } from '@/lib/mdx';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import FilteredArchive from '@/components/FilteredArchive';

// ADDED: This forces Cloudflare to build the page as static HTML to prevent 500 errors
export const dynamic = "force-static";

export default function BlogIndex() {
  // Fetch all your markdown files AND sort them by date (Newest to Oldest)
  const realPosts = getAllPosts().sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA; 
  });
  
  // DEVELOPMENT SAFEGUARD: 
  const displayPosts = realPosts.length >= 5 
    ? realPosts 
    : [...realPosts, ...realPosts, ...realPosts, ...realPosts, ...realPosts].slice(0, 5);

  // --- CONSTRUCT THE AUTO-SLIDER DATA ---
  
  // 1. The permanent first slide
  const slideOne = {
    title: "Our Story",
    category: "The Fishyology Origins",
    image: "https://images.unsplash.com/photo-1534062635905-24c6e931e5f0?auto=format&fit=crop&q=80&w=2000",
    link: "/about", 
  };

  // 2. Randomly shuffle the real posts and grab exactly 3
  // We use [...realPosts] to create a copy so we don't accidentally shuffle the grid below!
  const shuffledPosts = [...realPosts].sort(() => 0.5 - Math.random());
  const randomThreePosts = shuffledPosts.slice(0, 3);

  // 3. Format those 3 random posts to match the slider's expected data structure
  const randomSlides = randomThreePosts.map((post) => ({
    title: post.frontmatter.title,
    category: post.frontmatter.category || "Journal Entry",
    image: post.frontmatter.image || "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=2000",
    link: `/blog/${post.slug}`,
  }));

  // 4. Combine Slide 1 with the 3 random slides
  const sliderData = [slideOne, ...randomSlides];

  // Grid Data (This remains perfectly chronological!)
  const gridFeature = displayPosts[0];
  const gridStandard = displayPosts.slice(1, 5);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D242B] pb-32 pt-32">
      
      {/* 1. AUTO-PLAYING HERO SLIDER */}
      <BlogHeroSlider slides={sliderData} />

      {/* 2. BENTO GRID FEATURE SECTION */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Latest Dispatches</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Massive Feature Card */}
          <Link 
            href={`/blog/${gridFeature.slug}`}
            className="group relative h-[600px] lg:h-auto lg:min-h-[700px] rounded-[1.5rem] overflow-hidden flex flex-col justify-end border border-[#1D242B]/10 shadow-lg"
          >
            <img 
              src={gridFeature.frontmatter.image || "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1200"} 
              alt={gridFeature.frontmatter.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B]/90 via-[#1D242B]/30 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-12">
              
              {/* Dual Pill System for Feature Card */}
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="inline-block bg-[#FAFAFA] text-[#1D242B] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                  {gridFeature.frontmatter.category || "Species Profile"}
                </span>
                {gridFeature.frontmatter.subcategory && (
                  <span className="inline-block bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                    {gridFeature.frontmatter.subcategory}
                  </span>
                )}
              </div>

              <h3 className="text-4xl md:text-5xl font-serif text-[#FAFAFA] leading-[1.1] mb-6 group-hover:text-[#C7EEFF] transition-colors">
                {gridFeature.frontmatter.title}
              </h3>
              
              {/* Summary Preview */}
              {gridFeature.frontmatter.summary && (
                <p className="text-[#FAFAFA]/80 text-sm md:text-base mb-8 line-clamp-2 leading-relaxed max-w-xl">
                  {gridFeature.frontmatter.summary}
                </p>
              )}

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 bg-black">
                  <img src="/logo.svg" alt="Fishyology" className="w-full h-full object-contain p-1 opacity-80" />
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-bold text-sm">{gridFeature.frontmatter.author || "Fishyology Team"}</p>
                  <p className="text-[#FAFAFA]/70 text-xs">{gridFeature.frontmatter.date}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Right Column: 2x2 Grid of Standard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {gridStandard.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={`grid-${index}`} className="group flex flex-col h-full">
                <div className="relative aspect-[4/3] rounded-[1.25rem] overflow-hidden mb-5 bg-[#1D242B]/5 border border-[#1D242B]/5 group-hover:shadow-lg transition-all duration-500 group-hover:-translate-y-1">
                  <img 
                    src={post.frontmatter.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b4b0?auto=format&fit=crop&q=80&w=800"} 
                    alt={post.frontmatter.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex flex-col flex-grow">
                  {/* Dual Text Tags for Grid */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-block bg-[#C7EEFF] text-[#0077C0] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {post.frontmatter.category || "Field Report"}
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

                  <div className="flex items-center gap-2 mt-auto pt-4 opacity-70">
                    <p className="text-xs font-bold text-[#1D242B]">{post.frontmatter.author ? post.frontmatter.author.split(' ')[0] : "Fishyology"}</p>
                    <span className="w-1 h-1 rounded-full bg-[#1D242B]/30"></span>
                    <p className="text-xs font-medium text-[#1D242B]/70">{post.frontmatter.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* 3. THE DYNAMIC ARCHIVE FILTER SECTION */}
      <FilteredArchive posts={realPosts} />

    </div>
  );
}