import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Updated to your official master domain (added www.)
  const baseUrl = 'https://www.fishyology.org';

  // 2. Fetch all your dynamic MDX journal entries
  const posts = getAllPosts();
  
  // 3. Map those posts into the format Google expects
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date), // Uses the exact date from your MDX!
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Define your core static routes
  const staticRoutes = [
    {
      url: baseUrl,
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Home page gets the highest priority
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trips`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'daily' as const, // Daily because you might add new posts frequently
      priority: 0.9,
    },
  ];

  // 5. Combine them all together and return
  return [...staticRoutes, ...postUrls];
}
