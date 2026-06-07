import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { safeReadArray, writeData } from '@/lib/db';
import type { GalleryItem } from '@/lib/types';

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  category: z.enum(['shuttering', 'scaffolding', 'project', 'equipment']).optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);
    const items = safeReadArray<GalleryItem>('gallery.json');
    const idx = items.findIndex((g) => g.id === params.id);

    if (idx === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    items[idx] = { ...items[idx], ...parsed };
    writeData('gallery.json', items);
    return NextResponse.json(items[idx]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = safeReadArray<GalleryItem>('gallery.json');
  const filtered = items.filter((g) => g.id !== params.id);
  if (filtered.length === items.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeData('gallery.json', filtered);
  return NextResponse.json({ success: true });
}
