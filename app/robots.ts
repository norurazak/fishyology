import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // This tells all search engine bots (*) that they are allowed to scan your site
      userAgent: '*',
      allow: '/',
    },
    // This points the bots directly to the sitemap we updated earlier!
    sitemap: 'https://www.fishyology.org/sitemap.xml',
  };
}