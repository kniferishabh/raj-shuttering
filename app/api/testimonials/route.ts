import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { auth } from '@/lib/auth';
import { createTestimonial, listTestimonials } from '@/lib/data';
import { NO_STORE_HEADERS, revalidatePublicSite } from '@/lib/revalidate-site';

export const dynamic = 'force-dynamic';

const testimonialSchema = z.object({
  clientName: z.string().min(2),
  company: z.string().optional(),
  location: z.string().min(2),
  rating: z.number().min(1).max(5),
  review: z.string().min(10),
  projectType: z.string().min(2),
  isApproved: z.boolean().default(false),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';
  const testimonials = await listTestimonials();

  if (all) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(testimonials);
  }

  const approved = testimonials.filter((t) => t.isApproved);
  return NextResponse.json(approved, { headers: NO_STORE_HEADERS });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = testimonialSchema.parse(body);
    const item = {
      id: `rev-${uuid().slice(0, 8)}`,
      ...parsed,
      createdAt: new Date().toISOString(),
    };

    const created = await createTestimonial(item);
    revalidatePublicSite();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
