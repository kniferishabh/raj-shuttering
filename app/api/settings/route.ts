import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { writeData } from '@/lib/db';
import { getSettings } from '@/lib/settings';
import type { BusinessSettings } from '@/lib/types';

const settingsSchema = z.object({
  businessName: z.string().min(2),
  tagline: z.string(),
  phone: z.array(z.string()).min(1),
  whatsapp: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  pincode: z.string(),
  openingHours: z.string(),
  establishedYear: z.number(),
  gstNumber: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
  }),
  heroHeadline: z.string(),
  heroSubheadline: z.string(),
  heroVideoUrl: z.string().optional(),
  heroVideoUrlMobile: z.string().optional(),
  heroVideoPoster: z.string().optional(),
  aboutText: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
});

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = settingsSchema.parse(body) as BusinessSettings;
    writeData('settings.json', parsed);
    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
