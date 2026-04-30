import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace this with your Cloudflare staging URL for now, 
  // and update it to "https://fishyology.com" when you buy your domain!
  const baseUrl = 'https://your-temporary-url.pages.dev';

  // 1. Fetch all your dynamic MDX journal entries
  const posts = getAllPosts();
  
  // 2. Map those posts into the format Google expects
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date), // Uses the exact date from your MDX!
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 3. Define your core static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Home page gets the highest priority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trips`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // Daily because you might add new posts frequently
      priority: 0.9,
    },
  ];

  // 4. Combine them all together and return
  return [...staticRoutes, ...postUrls];
}