import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { safeReadArray, writeData } from '@/lib/db';
import type { Enquiry } from '@/lib/types';

const updateSchema = z.object({
  isRead: z.boolean(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);
    const items = safeReadArray<Enquiry>('enquiries.json');
    const idx = items.findIndex((e) => e.id === params.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    items[idx] = { ...items[idx], ...parsed };
    writeData('enquiries.json', items);
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

  const items = safeReadArray<Enquiry>('enquiries.json');
  const target = items.find((e) => e.id === params.id);
  if (!target) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (!target.isRead) {
    return NextResponse.json(
      { error: 'Mark enquiry as read before deleting' },
      { status: 400 }
    );
  }
  writeData('enquiries.json', items.filter((e) => e.id !== params.id));
  return NextResponse.json({ success: true });
}
