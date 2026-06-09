import type {
  BusinessSettings,
  Enquiry,
  GalleryItem,
  Service,
  Testimonial,
} from '@/lib/types';
import type { CustomColors } from '@/lib/themes';
import type { Prisma, Service as PrismaService, GalleryItem as PrismaGalleryItem, Testimonial as PrismaTestimonial, Enquiry as PrismaEnquiry } from '@prisma/client';

const SETTINGS_ID = 'default';

export { SETTINGS_ID };

function toIso(date: Date): string {
  return date.toISOString();
}

function parseDate(value: string): Date {
  return new Date(value);
}

function parseSocialLinks(value: unknown): BusinessSettings['socialLinks'] {
  if (!value || typeof value !== 'object') {
    return {};
  }
  const links = value as Record<string, unknown>;
  return {
    facebook: typeof links.facebook === 'string' ? links.facebook : undefined,
    instagram: typeof links.instagram === 'string' ? links.instagram : undefined,
    youtube: typeof links.youtube === 'string' ? links.youtube : undefined,
  };
}

function parseCustomColors(value: unknown): CustomColors | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const colors = value as Record<string, unknown>;
  if (typeof colors.accentPrimary !== 'string') {
    return undefined;
  }
  return {
    accentPrimary: colors.accentPrimary,
    accentHover: typeof colors.accentHover === 'string' ? colors.accentHover : undefined,
  };
}

export function settingsFromPrisma(row: {
  businessName: string;
  tagline: string;
  phones: string[];
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  openingHours: string;
  establishedYear: number;
  gstNumber: string;
  socialLinks: unknown;
  heroHeadline: string;
  heroSubheadline: string;
  heroVideoUrl: string;
  heroVideoUrlMobile: string;
  heroVideoPoster: string;
  aboutText: string;
  metaTitle: string;
  metaDescription: string;
  colorPalette: string | null;
  customColors: unknown;
}): BusinessSettings {
  return {
    businessName: row.businessName,
    tagline: row.tagline,
    phone: row.phones,
    whatsapp: row.whatsapp,
    email: row.email,
    address: row.address,
    city: row.city,
    pincode: row.pincode,
    openingHours: row.openingHours,
    establishedYear: row.establishedYear,
    gstNumber: row.gstNumber || undefined,
    socialLinks: parseSocialLinks(row.socialLinks),
    heroHeadline: row.heroHeadline,
    heroSubheadline: row.heroSubheadline,
    heroVideoUrl: row.heroVideoUrl || undefined,
    heroVideoUrlMobile: row.heroVideoUrlMobile || undefined,
    heroVideoPoster: row.heroVideoPoster || undefined,
    aboutText: row.aboutText,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    colorPalette: (row.colorPalette as BusinessSettings['colorPalette']) ?? undefined,
    customColors: parseCustomColors(row.customColors),
  };
}

export function settingsToPrisma(settings: BusinessSettings) {
  return {
    id: SETTINGS_ID,
    businessName: settings.businessName,
    tagline: settings.tagline,
    phones: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    city: settings.city,
    pincode: settings.pincode,
    openingHours: settings.openingHours,
    establishedYear: settings.establishedYear,
    gstNumber: settings.gstNumber ?? '',
    socialLinks: settings.socialLinks as Prisma.InputJsonValue,
    heroHeadline: settings.heroHeadline,
    heroSubheadline: settings.heroSubheadline,
    heroVideoUrl: settings.heroVideoUrl ?? '',
    heroVideoUrlMobile: settings.heroVideoUrlMobile ?? '',
    heroVideoPoster: settings.heroVideoPoster ?? '',
    aboutText: settings.aboutText,
    metaTitle: settings.metaTitle,
    metaDescription: settings.metaDescription,
    colorPalette: settings.colorPalette ?? null,
    customColors: (settings.customColors as Prisma.InputJsonValue | undefined) ?? undefined,
  };
}

/** Supabase PostgREST returns snake_case column names. */
export function settingsFromSupabase(row: Record<string, unknown>): BusinessSettings {
  return settingsFromPrisma({
    businessName: String(row.business_name ?? ''),
    tagline: String(row.tagline ?? ''),
    phones: Array.isArray(row.phones) ? row.phones.map(String) : [],
    whatsapp: String(row.whatsapp ?? ''),
    email: String(row.email ?? ''),
    address: String(row.address ?? ''),
    city: String(row.city ?? ''),
    pincode: String(row.pincode ?? ''),
    openingHours: String(row.opening_hours ?? ''),
    establishedYear: Number(row.established_year ?? 2008),
    gstNumber: String(row.gst_number ?? ''),
    socialLinks: row.social_links ?? {},
    heroHeadline: String(row.hero_headline ?? ''),
    heroSubheadline: String(row.hero_subheadline ?? ''),
    heroVideoUrl: String(row.hero_video_url ?? ''),
    heroVideoUrlMobile: String(row.hero_video_url_mobile ?? ''),
    heroVideoPoster: String(row.hero_video_poster ?? ''),
    aboutText: String(row.about_text ?? ''),
    metaTitle: String(row.meta_title ?? ''),
    metaDescription: String(row.meta_description ?? ''),
    colorPalette: row.color_palette ? String(row.color_palette) : null,
    customColors: row.custom_colors ?? null,
  });
}

export function settingsToSupabase(settings: BusinessSettings) {
  const row = settingsToPrisma(settings);
  return {
    id: row.id,
    business_name: row.businessName,
    tagline: row.tagline,
    phones: row.phones,
    whatsapp: row.whatsapp,
    email: row.email,
    address: row.address,
    city: row.city,
    pincode: row.pincode,
    opening_hours: row.openingHours,
    established_year: row.establishedYear,
    gst_number: row.gstNumber,
    social_links: row.socialLinks,
    hero_headline: row.heroHeadline,
    hero_subheadline: row.heroSubheadline,
    hero_video_url: row.heroVideoUrl,
    hero_video_url_mobile: row.heroVideoUrlMobile,
    hero_video_poster: row.heroVideoPoster,
    about_text: row.aboutText,
    meta_title: row.metaTitle,
    meta_description: row.metaDescription,
    color_palette: row.colorPalette,
    custom_colors: row.customColors,
    updated_at: new Date().toISOString(),
  };
}

export function serviceFromPrisma(row: PrismaService): Service {
  return {
    id: row.id,
    name: row.name,
    shortDescription: row.shortDescription,
    fullDescription: row.fullDescription,
    category: row.category as Service['category'],
    availableFor: row.availableFor as Service['availableFor'],
    features: row.features,
    icon: row.icon,
    imageUrl: row.imageUrl ?? undefined,
    images: row.images,
    isActive: row.isActive,
    sortOrder: row.sortOrder,
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function serviceToPrisma(service: Service) {
  return {
    id: service.id,
    name: service.name,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    category: service.category,
    availableFor: service.availableFor,
    features: service.features,
    icon: service.icon,
    imageUrl: service.imageUrl ?? null,
    images: service.images ?? [],
    isActive: service.isActive,
    sortOrder: service.sortOrder,
    createdAt: parseDate(service.createdAt),
    updatedAt: parseDate(service.updatedAt),
  };
}

export function serviceFromSupabase(row: Record<string, unknown>): Service {
  return serviceFromPrisma({
    id: String(row.id),
    name: String(row.name),
    shortDescription: String(row.short_description),
    fullDescription: String(row.full_description),
    category: String(row.category),
    availableFor: Array.isArray(row.available_for) ? row.available_for.map(String) : [],
    features: Array.isArray(row.features) ? row.features.map(String) : [],
    icon: String(row.icon),
    imageUrl: row.image_url ? String(row.image_url) : null,
    images: Array.isArray(row.images) ? row.images.map(String) : [],
    isActive: Boolean(row.is_active),
    sortOrder: Number(row.sort_order ?? 0),
    createdAt: new Date(String(row.created_at ?? Date.now())),
    updatedAt: new Date(String(row.updated_at ?? Date.now())),
  });
}

export function serviceToSupabase(service: Service) {
  const row = serviceToPrisma(service);
  return {
    id: row.id,
    name: row.name,
    short_description: row.shortDescription,
    full_description: row.fullDescription,
    category: row.category,
    available_for: row.availableFor,
    features: row.features,
    icon: row.icon,
    image_url: row.imageUrl,
    images: row.images,
    is_active: row.isActive,
    sort_order: row.sortOrder,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  };
}

export function galleryFromPrisma(row: PrismaGalleryItem): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    imageUrl: row.imageUrl,
    category: row.category as GalleryItem['category'],
    isFeatured: row.isFeatured,
    sortOrder: row.sortOrder,
    createdAt: toIso(row.createdAt),
  };
}

export function galleryToPrisma(item: GalleryItem) {
  return {
    id: item.id,
    title: item.title,
    description: item.description ?? null,
    imageUrl: item.imageUrl,
    category: item.category,
    isFeatured: item.isFeatured,
    sortOrder: item.sortOrder,
    createdAt: parseDate(item.createdAt),
  };
}

export function galleryFromSupabase(row: Record<string, unknown>): GalleryItem {
  return galleryFromPrisma({
    id: String(row.id),
    title: String(row.title),
    description: row.description ? String(row.description) : null,
    imageUrl: String(row.image_url),
    category: String(row.category),
    isFeatured: Boolean(row.is_featured),
    sortOrder: Number(row.sort_order ?? 0),
    createdAt: new Date(String(row.created_at ?? Date.now())),
  });
}

export function galleryToSupabase(item: GalleryItem) {
  const row = galleryToPrisma(item);
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image_url: row.imageUrl,
    category: row.category,
    is_featured: row.isFeatured,
    sort_order: row.sortOrder,
    created_at: row.createdAt.toISOString(),
  };
}

export function testimonialFromPrisma(row: PrismaTestimonial): Testimonial {
  return {
    id: row.id,
    clientName: row.clientName,
    company: row.company ?? undefined,
    location: row.location,
    rating: row.rating,
    review: row.review,
    projectType: row.projectType,
    isApproved: row.isApproved,
    createdAt: toIso(row.createdAt),
  };
}

export function testimonialToPrisma(item: Testimonial) {
  return {
    id: item.id,
    clientName: item.clientName,
    company: item.company ?? null,
    location: item.location,
    rating: item.rating,
    review: item.review,
    projectType: item.projectType,
    isApproved: item.isApproved,
    createdAt: parseDate(item.createdAt),
  };
}

export function testimonialFromSupabase(row: Record<string, unknown>): Testimonial {
  return testimonialFromPrisma({
    id: String(row.id),
    clientName: String(row.client_name),
    company: row.company ? String(row.company) : null,
    location: String(row.location),
    rating: Number(row.rating ?? 5),
    review: String(row.review),
    projectType: String(row.project_type),
    isApproved: Boolean(row.is_approved),
    createdAt: new Date(String(row.created_at ?? Date.now())),
  });
}

export function testimonialToSupabase(item: Testimonial) {
  const row = testimonialToPrisma(item);
  return {
    id: row.id,
    client_name: row.clientName,
    company: row.company,
    location: row.location,
    rating: row.rating,
    review: row.review,
    project_type: row.projectType,
    is_approved: row.isApproved,
    created_at: row.createdAt.toISOString(),
  };
}

export function enquiryFromPrisma(row: PrismaEnquiry): Enquiry {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    projectType: row.projectType,
    message: row.message,
    isRead: row.isRead,
    createdAt: toIso(row.createdAt),
  };
}

export function enquiryToPrisma(item: Enquiry) {
  return {
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email ?? null,
    projectType: item.projectType,
    message: item.message,
    isRead: item.isRead,
    createdAt: parseDate(item.createdAt),
  };
}

export function enquiryFromSupabase(row: Record<string, unknown>): Enquiry {
  return enquiryFromPrisma({
    id: String(row.id),
    name: String(row.name),
    phone: String(row.phone),
    email: row.email ? String(row.email) : null,
    projectType: String(row.project_type),
    message: String(row.message),
    isRead: Boolean(row.is_read),
    createdAt: new Date(String(row.created_at ?? Date.now())),
  });
}

export function enquiryToSupabase(item: Enquiry) {
  const row = enquiryToPrisma(item);
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    project_type: row.projectType,
    message: row.message,
    is_read: row.isRead,
    created_at: row.createdAt.toISOString(),
  };
}
