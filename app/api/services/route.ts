import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { auth } from '@/lib/auth';
import { createService, listServices } from '@/lib/data';
import { NO_STORE_HEADERS, revalidatePublicSite } from '@/lib/revalidate-site';
import type { Service } from '@/lib/types';

export const dynamic = 'force-dynamic';

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
  const services = await listServices();

  if (all) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(services);
  }

  const active = services.filter((s) => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  return NextResponse.json(active, { headers: NO_STORE_HEADERS });
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

    const created = await createService(newService);
    revalidatePublicSite();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
