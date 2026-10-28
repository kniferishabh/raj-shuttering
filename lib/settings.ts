import 'server-only';
import { cache } from 'react';
import { getSiteSettings } from '@/lib/data';
import type { BusinessSettings } from './types';
import { DEFAULT_SITE_CONTENT, mergeSiteContent } from './site-content';

const DEFAULT_SETTINGS: BusinessSettings = {
  businessName: 'Raj Shuttering & Scaffolding',
  tagline: 'Building Varanasi, One Structure at a Time',
  phone: ['+91-9876543210'],
  whatsapp: '+919876543210',
  email: 'rajshuttering@gmail.com',
  address: 'Sa19/46a, Sona Talab, Navodaya Institute, Panch Kochi Road, Pandeypur',
  city: 'Varanasi',
  pincode: '221002',
  openingHours: 'Mon\u2013Sat: 8:30 AM \u2013 7:00 PM',
  establishedYear: 2008,
  socialLinks: {},
  heroHeadline: 'Strength Above. Safety Below.',
  heroSubheadline:
    'Premium shuttering and scaffolding solutions for construction projects across Varanasi and Uttar Pradesh. Trusted since 2008.',
  heroVideoUrl: '',
  heroVideoUrlMobile: '',
  heroVideoPoster: '',
  aboutText:
    'Raj Shuttering & Scaffolding has served construction projects across Varanasi since 2008 with shuttering, scaffolding and formwork equipment for rent and wholesale supply.',
  metaTitle: 'Shuttering & Scaffolding on Rent in Varanasi | Raj Shuttering',
  metaDescription: 'Rent shuttering plates, scaffolding, steel props and construction formwork equipment in Varanasi. Contact Raj Shuttering & Scaffolding for a quote.',
  metaKeywords: 'shuttering, scaffolding, shuttering on rent, scaffolding on rent, steel shuttering plates, construction equipment, formwork equipment, Raj Shuttering',
  colorPalette: 'construction-orange',
  customColors: {
    accentPrimary: '#E07B00',
    accentHover: '#F59E0B',
  },
  siteContent: DEFAULT_SITE_CONTENT,
};

export const getSettings = cache(async (): Promise<BusinessSettings> => {
  try {
    const settings = await getSiteSettings();
    if (!settings) return DEFAULT_SETTINGS;

    const hasLegacyClaims = /over 16 years|4\.5-star rating|61\+ client reviews/i.test(settings.aboutText);
    return {
      ...settings,
      siteContent: mergeSiteContent(settings.siteContent),
      aboutText: hasLegacyClaims ? DEFAULT_SETTINGS.aboutText : settings.aboutText,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
});
