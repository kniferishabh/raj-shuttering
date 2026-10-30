import type { MetadataRoute } from 'next';
import { SERVICE_LANDING_PAGES } from '@/lib/service-landing-pages';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: 'weekly', priority: .9 },
    ...SERVICE_LANDING_PAGES.map(({ slug }) => ({ url: `${SITE_URL}/services/${slug}`, changeFrequency: 'monthly' as const, priority: .9 })),
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: .7 },
    { url: `${SITE_URL}/gallery`, changeFrequency: 'monthly', priority: .7 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: .8 },
  ];
}
