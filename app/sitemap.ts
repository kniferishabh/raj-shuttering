import type { MetadataRoute } from 'next';

const ROUTES = ['', '/about', '/services', '/gallery', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const lastModified = new Date();

  return ROUTES.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.8,
  }));
}
