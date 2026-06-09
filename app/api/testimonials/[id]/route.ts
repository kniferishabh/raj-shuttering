import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { deleteTestimonial, updateTestimonial } from '@/lib/data';

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
    const updated = await updateTestimonial(params.id, parsed);

    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
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

  const deleted = await deleteTestimonial(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
