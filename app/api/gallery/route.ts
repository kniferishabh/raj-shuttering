import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { auth } from '@/lib/auth';
import { safeReadArray, writeData } from '@/lib/db';
import type { GalleryItem } from '@/lib/types';

const gallerySchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  category: z.enum(['shuttering', 'scaffolding', 'project', 'equipment']),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().default(999),
});

export async function GET() {
  const items = safeReadArray<GalleryItem>('gallery.json').sort((a, b) => a.sortOrder - b.sortOrder);
  return NextResponse.json(items, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = gallerySchema.parse(body);
    const item: GalleryItem = {
      id: `gal-${uuid().slice(0, 8)}`,
      ...parsed,
      createdAt: new Date().toISOString(),
    };

    const items = safeReadArray<GalleryItem>('gallery.json');
    items.push(item);
    writeData('gallery.json', items);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
