import type { Metadata } from 'next';
import type { BusinessSettings } from '@/lib/types';

interface PageMetadataInput {
  settings: BusinessSettings;
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}

export function createPageMetadata({
  settings,
  title,
  description,
  path,
  image = '/images/project-modern.jpg',
  keywords = [],
}: PageMetadataInput): Metadata {
  const adminKeywords = (settings.metaKeywords ?? '').split(',').map((item) => item.trim()).filter(Boolean);
  const mergedKeywords = Array.from(new Set([...keywords, ...adminKeywords]));

  return {
    title: { absolute: title },
    description,
    keywords: mergedKeywords,
    alternates: { canonical: path },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: settings.businessName,
      title,
      description,
      url: path,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
