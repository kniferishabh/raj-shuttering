import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { deleteService, updateService } from '@/lib/data';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  shortDescription: z.string().min(5).optional(),
  fullDescription: z.string().min(5).optional(),
  category: z.enum(['shuttering', 'scaffolding', 'equipment', 'other']).optional(),
  availableFor: z.array(z.enum(['rent', 'sale'])).optional(),
  features: z.array(z.string()).optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
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
    const updated = await updateService(params.id, parsed);

    if (!updated) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
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

  const deleted = await deleteService(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
