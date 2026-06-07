export type ServiceCategory = 'shuttering' | 'scaffolding' | 'equipment' | 'other';
export type AvailableFor = 'rent' | 'sale';
export type GalleryCategory = 'shuttering' | 'scaffolding' | 'project' | 'equipment';

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ServiceCategory;
  availableFor: AvailableFor[];
  features: string[];
  icon: string;
  imageUrl?: string;
  images?: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: GalleryCategory;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  location: string;
  rating: number;
  review: string;
  projectType: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  phone: string[];
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  openingHours: string;
  establishedYear: number;
  gstNumber?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  metaTitle: string;
  metaDescription: string;
}
