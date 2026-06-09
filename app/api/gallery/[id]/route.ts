import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { deleteGalleryItem, updateGalleryItem } from '@/lib/data';

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
    const updated = await updateGalleryItem(params.id, parsed);

    if (!updated) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
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

  const deleted = await deleteGalleryItem(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
