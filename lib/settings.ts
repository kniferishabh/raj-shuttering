import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { getSiteSettings } from '@/lib/data';
import type { BusinessSettings } from './types';

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
    'Raj Shuttering & Scaffolding has been the backbone of construction projects across Varanasi for over 16 years.',
  metaTitle: 'Raj Shuttering & Scaffolding | Varanasi',
  metaDescription: 'Trusted shuttering and scaffolding rental and wholesale in Varanasi since 2008.',
  colorPalette: 'construction-orange',
  customColors: {
    accentPrimary: '#E07B00',
    accentHover: '#F59E0B',
  },
};

export async function getSettings(): Promise<BusinessSettings> {
  noStore();
  try {
    const settings = await getSiteSettings();
    return settings ?? DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
