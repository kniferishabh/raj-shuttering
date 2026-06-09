import { revalidatePath } from 'next/cache';

/** Bust server and client caches for all public pages after admin edits. */
export function revalidatePublicSite(): void {
  revalidatePath('/', 'layout');
}

export const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-cache, no-store, must-revalidate',
} as const;
