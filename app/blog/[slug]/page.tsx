import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Mail } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/mdx"; 
import ShareButtons from "@/components/ShareButtons";

import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/MDXComponents';
import { authorsData } from "@/lib/authors"; 

// --- CLOUDFLARE FIX: FORCE STATIC GENERATION ---
// 1. Tell Cloudflare to build this as static HTML
export const dynamic = "force-static";

// 2. Hand Cloudflare the "guest list" of all URLs it needs to build
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  // This creates an array of objects like: [{ slug: "post-1" }, { slug: "post-2" }]
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
// -----------------------------------------------

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return notFound();
  }

  // --- UPGRADED: ABSOLUTE CHRONOLOGICAL SEQUENCE LOGIC ---
  // 1. Get all posts and sort them STRICTLY by date (Oldest to Newest)
  const allPosts = getAllPosts().sort((a, b) => {
    // Convert the MDX date string (e.g., "2026-04-20") into a precise millisecond timestamp
    const timeA = new Date(a.frontmatter.date).getTime();
    const timeB = new Date(b.frontmatter.date).getTime();
    
    // Sorting Ascending: timeA - timeB creates a timeline from past to present
    return timeA - timeB; 
  });

  // 2. Find where the current post sits in this chronological timeline
  const currentIndex = allPosts.findIndex((p) => p.slug === resolvedParams.slug);

  // 3. Determine Previous (Published BEFORE) and Next (Published AFTER)
  // If index is greater than 0, there is an older post behind it.
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  // If index is less than the end of the array, there is a newer post ahead of it.
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // EXTRACT FRONTMATTER
  const { title, date, category, subcategory, layout, author, authorEmail, image } = post.frontmatter;

  // FIND THE MATCHING AUTHOR PROFILE
  const matchedAuthor = authorsData.find(a => a.name === author) || {
    name: author || "Fishyology Contributor",
    role: "Guest Writer",
    shortBio: "A valued contributor to the Fishyology Journal.",
    image: "/logo.svg"
  };

  // DETERMINE LAYOUT CLASSES
  let contentClasses = "";

  if (layout === "editorial") {
    contentClasses = `
      max-w-4xl mx-auto prose prose-xl md:prose-2xl text-[#1D242B] 
      prose-p:font-serif prose-p:leading-relaxed 
      prose-headings:font-sans prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter 
      prose-a:text-[#408A71] prose-a:underline-offset-4
      prose-blockquote:border-l-8 prose-blockquote:border-[#1D242B] prose-blockquote:bg-gray-50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-3xl
      prose-p:first-of-type:first-letter:text-[7rem] prose-p:first-of-type:first-letter:font-black prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:mr-6 prose-p:first-of-type:first-letter:text-[#1D242B] prose-p:first-of-type:first-letter:leading-none
    `;
  } 
  else if (layout === "dispatch") {
    contentClasses = `
      max-w-3xl mx-auto prose prose-lg text-[#1D242B] 
      bg-white p-8 md:p-16 rounded-[2rem] shadow-xl border border-[#1D242B]/5
      prose-headings:font-black prose-headings:text-[#408A71] prose-headings:tracking-tight
      prose-a:text-[#0077C0] prose-a:font-bold
      prose-blockquote:border-l-4 prose-blockquote:border-[#0077C0] prose-blockquote:not-italic prose-blockquote:bg-[#C7EEFF]/20 prose-blockquote:py-2
    `;
  }
  else {
    contentClasses = `
      max-w-3xl mx-auto prose prose-lg md:prose-xl text-[#1D242B] 
      prose-p:leading-relaxed 
      prose-headings:font-black prose-headings:tracking-tight 
      prose-a:text-[#0077C0] prose-a:underline-offset-4 
    `;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-32 selection:bg-[#0077C0] selection:text-white">
      
      {/* 1. STANDARDIZED HERO SECTION */}
      <section className="relative h-[70vh] min-h-[600px] w-full flex items-end justify-center pb-20 px-6 overflow-hidden bg-[#1D242B]">
        <img 
          src={image || "https://images.unsplash.com/photo-1582236371719-216960d70b77?auto=format&fit=crop&q=80&w=2000"} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/20 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#FAFAFA]/100 hover:text-white text-sm font-bold uppercase tracking-widest mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
          
          <div className="mb-6 flex justify-center items-center gap-2">
             <span className="bg-[#C7EEFF] text-[#0077C0] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {category || "Expedition"}
            </span>
            {subcategory && (
              <>
                <span className="text-white/50 font-black text-sm px-1">•</span>
                <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  {subcategory}
                </span>
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-[#FAFAFA] tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-4 md:gap-6 text-[#FAFAFA]/80 text-xs md:text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {date}
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
            <div className="flex items-center gap-2 text-[#408A71]">
              {layout === "editorial" ? "Editorial Piece" : layout === "dispatch" ? "Field Dispatch" : "Standard Log"}
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STORY CONTENT */}
      <section className={`px-6 pb-20 ${layout === 'dispatch' ? '-mt-16 relative z-20' : 'pt-24'}`}>
        <article className={contentClasses}>
          <MDXRemote 
            source={post.content} 
            components={mdxComponents} 
          />
        </article>
      </section>

      {/* 3. UPGRADED AUTHOR & SHARE BLOCK */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="border-t-2 border-[#1D242B]/10 pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 bg-white p-8 rounded-[2rem] shadow-sm border border-[#1D242B]/5">
          
          <div className="flex items-center gap-5 max-w-lg">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white border border-[#1D242B]/10 shadow-md shrink-0">
              <img 
                src={matchedAuthor.image} 
                alt={matchedAuthor.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <span className="text-[#0077C0] font-black text-[10px] uppercase tracking-widest block mb-1">
                {matchedAuthor.role}
              </span>
              <p className="text-[#1D242B] font-black tracking-tight text-xl mb-1">
                {matchedAuthor.name}
              </p>
              <p className="text-[#1D242B]/60 text-sm font-medium leading-snug">
                {matchedAuthor.shortBio}
              </p>
              {authorEmail && (
                <a 
                  href={`mailto:${authorEmail}`} 
                  className="inline-flex items-center gap-1 text-[#408A71] hover:text-[#1D242B] text-xs font-bold uppercase tracking-widest transition-colors mt-3"
                >
                  <Mail className="w-3 h-3" /> Connect
                </a>
              )}
            </div>
          </div>

          <div className="md:shrink-0">
            <ShareButtons title={title} />
          </div>
          
        </div>
      </section>

      {/* 4. CHRONOLOGICAL PREVIOUS & NEXT POST NAVIGATION */}
      <section className="max-w-4xl mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          
          {/* Previous Post Card (Published Before) */}
          {prevPost ? (
            <Link 
              href={`/blog/${prevPost.slug}`} 
              className="group flex-1 flex flex-col justify-center p-8 bg-transparent border-2 border-[#1D242B]/5 rounded-[2rem] hover:bg-white hover:border-[#408A71]/50 hover:shadow-xl transition-all duration-300"
            >
              <span className="flex items-center gap-2 text-[#1D242B]/40 text-xs font-bold uppercase tracking-widest mb-3">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Previous Chapter
              </span>
              <h4 className="font-serif text-xl md:text-2xl font-bold text-[#1D242B] leading-snug line-clamp-2">
                {prevPost.frontmatter.title}
              </h4>
            </Link>
          ) : (
            <div className="flex-1"></div> 
          )}

          {/* Next Post Card (Published After) */}
          {nextPost ? (
            <Link 
              href={`/blog/${nextPost.slug}`} 
              className="group flex-1 flex flex-col justify-center items-end text-right p-8 bg-transparent border-2 border-[#1D242B]/5 rounded-[2rem] hover:bg-white hover:border-[#0077C0]/50 hover:shadow-xl transition-all duration-300"
            >
              <span className="flex items-center gap-2 text-[#1D242B]/40 text-xs font-bold uppercase tracking-widest mb-3">
                Next Chapter <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <h4 className="font-serif text-xl md:text-2xl font-bold text-[#1D242B] leading-snug line-clamp-2">
                {nextPost.frontmatter.title}
              </h4>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}

        </div>
      </section>

    </div>
  );
}