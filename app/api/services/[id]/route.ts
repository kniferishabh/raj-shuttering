import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { safeReadArray, writeData } from '@/lib/db';
import type { Service } from '@/lib/types';

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
    const services = await safeReadArray<Service>('services.json');
    const idx = services.findIndex((s) => s.id === params.id);

    if (idx === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    services[idx] = {
      ...services[idx],
      ...parsed,
      updatedAt: new Date().toISOString(),
    };

    await writeData('services.json', services);
    return NextResponse.json(services[idx]);
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

  const services = await safeReadArray<Service>('services.json');
  const filtered = services.filter((s) => s.id !== params.id);

  if (filtered.length === services.length) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  await writeData('services.json', filtered);
  return NextResponse.json({ success: true });
}
