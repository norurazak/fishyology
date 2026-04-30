"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/mdx'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function FilteredArchive({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Dynamically extract all unique categories from your MDX files
  const categories = ["All", ...Array.from(new Set(posts.map(p => p.frontmatter.category).filter(Boolean)))];

  // Filter posts based on the clicked category tab
  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(p => p.frontmatter.category === activeCategory);

  return (
    <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 border-t border-[#1D242B]/10 mt-12">
      
      {/* HEADER & FILTERS */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1D242B] mb-2">The Archive</h2>
          <p className="text-[#1D242B]/60 font-medium text-lg">Explore our entire history of expeditions and guides.</p>
        </div>
        
        {/* Dynamic Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat as string}
              onClick={() => setActiveCategory(cat as string)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-[#1D242B] text-white shadow-md"
                  : "bg-white border border-[#1D242B]/10 text-[#1D242B]/60 hover:border-[#1D242B]/30 hover:text-[#1D242B]"
              }`}
            >
              {cat as string}
            </button>
          ))}
        </div>
      </div>

      {/* THE GRID */}
      {/* motion.div wrapper allows the layout to smoothly shift */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        
        {/* AnimatePresence handles elements that are being removed from the DOM */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            
            <motion.div
              layout // This tells Framer Motion to animate the position changes
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} // A very smooth, cinematic easing curve
              key={post.slug} // CRITICAL: Uses slug instead of index so React tracks the exact post moving
              className="h-full"
            >
              <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                
                {/* THE IMAGE BLOCK */}
                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-[#1D242B]/5 border border-[#1D242B]/5 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                  <img 
                    src={post.frontmatter.image || "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=800"} 
                    alt={post.frontmatter.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* THE TEXT BLOCK */}
                <div className="flex flex-col flex-grow">
                  
                  {/* Dual Category & Subcategory */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="block text-[#408A71] text-[10px] font-black uppercase tracking-widest">
                      {post.frontmatter.category || "Field Report"}
                    </span>
                    {post.frontmatter.subcategory && (
                      <>
                        <span className="text-[#1D242B]/30 text-[10px] font-black">•</span>
                        <span className="block text-[#0077C0] text-[10px] font-black uppercase tracking-widest">
                          {post.frontmatter.subcategory}
                        </span>
                      </>
                    )}
                  </div>

                  <h4 className="text-2xl font-serif text-[#1D242B] leading-tight group-hover:text-[#0077C0] transition-colors mb-3">
                    {post.frontmatter.title}
                  </h4>
                  
                  {/* MDX Summary Injection */}
                  {post.frontmatter.summary && (
                    <p className="text-[#1D242B]/70 text-sm mb-5 line-clamp-2 leading-relaxed flex-grow">
                      {post.frontmatter.summary}
                    </p>
                  )}

                  <p className="text-xs font-bold text-[#1D242B]/40 mt-auto uppercase tracking-wider">{post.frontmatter.date}</p>
                </div>
                
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* EMPTY STATE */}
      <AnimatePresence>
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 bg-white rounded-[2rem] border border-[#1D242B]/10 mt-8"
          >
            <p className="text-[#1D242B]/50 font-serif italic text-xl">No dispatches found for this category yet.</p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}