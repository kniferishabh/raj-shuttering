import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { auth } from '@/lib/auth';
import { safeReadArray, writeData } from '@/lib/db';
import type { Service } from '@/lib/types';

const serviceSchema = z.object({
  name: z.string().min(2),
  shortDescription: z.string().min(5),
  fullDescription: z.string().min(5),
  category: z.enum(['shuttering', 'scaffolding', 'equipment', 'other']),
  availableFor: z.array(z.enum(['rent', 'sale'])).min(1),
  features: z.array(z.string()).default([]),
  icon: z.string().default('Wrench'),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(999),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';
  const services = await safeReadArray<Service>('services.json');

  if (all) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(services);
  }

  const active = services.filter((s) => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  return NextResponse.json(active, {
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
    const parsed = serviceSchema.parse(body);
    const now = new Date().toISOString();
    const newService: Service = {
      id: `svc-${uuid().slice(0, 8)}`,
      ...parsed,
      createdAt: now,
      updatedAt: now,
    };

    const services = await safeReadArray<Service>('services.json');
    services.push(newService);
    await writeData('services.json', services);

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
