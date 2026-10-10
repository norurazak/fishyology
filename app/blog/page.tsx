import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { isAgentAuthor } from '@/lib/authors';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import DispatchGrid from '@/components/DispatchGrid';
import InsightBand from '@/components/InsightBand';
import FilteredArchive from '@/components/FilteredArchive';

export const metadata: Metadata = {
  title: 'The Journal',
  description: 'Field journals, expedition dispatches, and species guides from Fishyology — real fishing stories from across Malaysia and beyond.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndex() {
  // Fetch all your markdown files AND sort them by date (Newest to Oldest)
  const realPosts = getAllPosts().sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA; 
  });
  
  // Agent-written research digests are kept out of the hero and the dispatch rail so the
  // human field reporting is never mixed in with them; they get their own Insight band.
  const humanPosts = realPosts.filter((p) => !isAgentAuthor(p.frontmatter.author));
  const insightPosts = realPosts.filter((p) => isAgentAuthor(p.frontmatter.author));

  // --- CONSTRUCT THE AUTO-SLIDER DATA ---

  // 1. The permanent first slide
  const slideOne = {
    title: "Our Story",
    category: "The Fishyology Origins",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776446191/20171202_171640_mfkygm.jpg",
    link: "/about",
  };

  // 2. The three most recent human posts. Deterministic rather than shuffled: a front page
  //    should lead with the newest reporting, not a different draw on every load.
  const heroSlides = humanPosts.slice(0, 3).map((post) => ({
    title: post.frontmatter.title,
    category: post.frontmatter.category || "Journal Entry",
    image: post.frontmatter.image || "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=2000",
    link: `/blog/${post.slug}`,
  }));

  const sliderData = [slideOne, ...heroSlides];

  // One feature card plus a 2x2 of standard cards; the archive below holds everything.
  const dispatchPosts = humanPosts.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D242B] pb-32 pt-32">
      
      {/* 1. AUTO-PLAYING HERO SLIDER */}
      <BlogHeroSlider slides={sliderData} />

      {/* 2. LATEST DISPATCHES — bento grid, human reporting only */}
      <DispatchGrid posts={dispatchPosts} />

      {/* 3. FISHYOLOGY INSIGHT — agent-written research digests, visually separated */}
      <InsightBand posts={insightPosts} />

      {/* 4. THE DYNAMIC ARCHIVE FILTER SECTION (RESTORED SUSPENSE) */}
      <Suspense fallback={<div className="text-center p-20 font-bold text-[#1D242B]/50 animate-pulse">Loading archive...</div>}>
        <FilteredArchive posts={realPosts} />
      </Suspense>

    </div>
  );
}