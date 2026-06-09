import type { GalleryItem } from '@/lib/types';
import {
  getSupabaseAdmin,
  preferPrisma,
  preferSupabaseRest,
  prisma,
  readJsonArrayFile,
  readFromBackend,
  writeJsonFile,
} from './client';
import {
  galleryFromPrisma,
  galleryFromSupabase,
  galleryToPrisma,
  galleryToSupabase,
} from './mappers';

async function listFromPrisma(): Promise<GalleryItem[]> {
  const rows = await prisma.galleryItem.findMany({ orderBy: { sortOrder: 'asc' } });
  return rows.map(galleryFromPrisma);
}

async function listFromSupabase(): Promise<GalleryItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => galleryFromSupabase(row));
}

async function listFromFile(): Promise<GalleryItem[]> {
  return readJsonArrayFile<GalleryItem>('gallery.json');
}

export async function listGalleryItems(): Promise<GalleryItem[]> {
  return readFromBackend(listFromSupabase, listFromPrisma, listFromFile);
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const items = await listGalleryItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function createGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('gallery_items').insert(galleryToSupabase(item));
    if (error) {
      throw error;
    }
    return item;
  }

  if (preferPrisma()) {
    const row = await prisma.galleryItem.create({ data: galleryToPrisma(item) });
    return galleryFromPrisma(row);
  }

  const items = await listFromFile();
  items.push(item);
  writeJsonFile('gallery.json', items);
  return item;
}

export async function updateGalleryItem(
  id: string,
  patch: Partial<GalleryItem>,
): Promise<GalleryItem | null> {
  const existing = await getGalleryItemById(id);
  if (!existing) {
    return null;
  }

  const updated: GalleryItem = { ...existing, ...patch, id };

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('gallery_items').update(galleryToSupabase(updated)).eq('id', id);
    if (error) {
      throw error;
    }
    return updated;
  }

  if (preferPrisma()) {
    const row = await prisma.galleryItem.update({
      where: { id },
      data: galleryToPrisma(updated),
    });
    return galleryFromPrisma(row);
  }

  const items = await listFromFile();
  const index = items.findIndex((item) => item.id === id);
  items[index] = updated;
  writeJsonFile('gallery.json', items);
  return updated;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (!(await getGalleryItemById(id))) {
    return false;
  }

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (error) {
      throw error;
    }
    return true;
  }

  if (preferPrisma()) {
    await prisma.galleryItem.delete({ where: { id } });
    return true;
  }

  const items = await listFromFile();
  writeJsonFile(
    'gallery.json',
    items.filter((item) => item.id !== id),
  );
  return true;
}

export async function replaceAllGalleryItems(items: GalleryItem[]): Promise<void> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    await supabase.from('gallery_items').delete().neq('id', '');
    if (items.length > 0) {
      const { error } = await supabase.from('gallery_items').insert(items.map(galleryToSupabase));
      if (error) {
        throw error;
      }
    }
    return;
  }

  if (preferPrisma()) {
    await prisma.$transaction([
      prisma.galleryItem.deleteMany(),
      ...items.map((item) => prisma.galleryItem.create({ data: galleryToPrisma(item) })),
    ]);
    return;
  }

  writeJsonFile('gallery.json', items);
}
