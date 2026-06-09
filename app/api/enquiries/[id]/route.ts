import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { deleteEnquiry, getEnquiryById, updateEnquiry } from '@/lib/data';

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
    const updated = await updateEnquiry(params.id, parsed);

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

  const target = await getEnquiryById(params.id);
  if (!target) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (!target.isRead) {
    return NextResponse.json(
      { error: 'Mark enquiry as read before deleting' },
      { status: 400 },
    );
  }

  await deleteEnquiry(params.id);
  return NextResponse.json({ success: true });
}
