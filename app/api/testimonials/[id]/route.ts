import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { safeReadArray, writeData } from '@/lib/db';
import type { Testimonial } from '@/lib/types';

const updateSchema = z.object({
  clientName: z.string().min(2).optional(),
  company: z.string().optional(),
  location: z.string().min(2).optional(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().min(10).optional(),
  projectType: z.string().min(2).optional(),
  isApproved: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);
    const items = safeReadArray<Testimonial>('testimonials.json');
    const idx = items.findIndex((t) => t.id === params.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    items[idx] = { ...items[idx], ...parsed };
    writeData('testimonials.json', items);
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
  const items = safeReadArray<Testimonial>('testimonials.json');
  const filtered = items.filter((t) => t.id !== params.id);
  if (filtered.length === items.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeData('testimonials.json', filtered);
  return NextResponse.json({ success: true });
}
