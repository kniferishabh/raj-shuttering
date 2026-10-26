import { revalidatePath, revalidateTag } from 'next/cache';

/** Bust server and client caches for all public pages after admin edits. */
export function revalidatePublicSite(): void {
  revalidateTag('site-settings');
  revalidateTag('services');
  revalidateTag('gallery-items');
  revalidateTag('testimonials');
  revalidatePath('/', 'layout');
}

export const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-cache, no-store, must-revalidate',
} as const;
