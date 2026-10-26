import type { MetadataRoute } from 'next';
import { SERVICE_LANDING_PAGES } from '@/lib/service-landing-pages';
import { SITE_URL } from '@/lib/site';

const ROUTES = [
  '',
  '/about',
  '/services',
  ...SERVICE_LANDING_PAGES.map(({ slug }) => `/services/${slug}`),
  '/gallery',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.8,
  }));
}
