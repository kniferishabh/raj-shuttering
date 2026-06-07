import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { auth } from '@/lib/auth';
import { safeReadArray, writeData } from '@/lib/db';
import type { Enquiry } from '@/lib/types';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  projectType: z.string().min(1),
  message: z.string().min(20),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const enquiries = safeReadArray<Enquiry>('enquiries.json').sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(enquiries);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.parse(body);
    const item: Enquiry = {
      id: `enq-${uuid().slice(0, 8)}`,
      name: parsed.name,
      phone: parsed.phone,
      email: parsed.email || undefined,
      projectType: parsed.projectType,
      message: parsed.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    const items = safeReadArray<Enquiry>('enquiries.json');
    items.push(item);
    writeData('enquiries.json', items);

    return NextResponse.json({ success: true, id: item.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Please check the form', issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
