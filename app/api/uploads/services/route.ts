import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse, type NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';
import { auth } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const BUCKET = process.env.SUPABASE_SERVICE_IMAGES_BUCKET?.trim() || 'service-images';
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return error('Unauthorized', 401);

  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return error('Choose an image to upload.', 400);

    const extension = ALLOWED_TYPES[file.type];
    if (!extension) return error('Only JPG, PNG, WebP and AVIF images are supported.', 415);
    if (file.size === 0) return error('The selected image is empty.', 400);
    if (file.size > MAX_FILE_SIZE) return error('Each image must be 4 MB or smaller.', 413);

    const objectName = `services/${new Date().toISOString().slice(0, 10)}/${uuid()}.${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ? getSupabaseAdmin() : null;

    if (supabase) {
      const { data: bucket } = await supabase.storage.getBucket(BUCKET);
      if (!bucket) {
        const { error: bucketError } = await supabase.storage.createBucket(BUCKET, {
          public: true,
          fileSizeLimit: MAX_FILE_SIZE,
          allowedMimeTypes: Object.keys(ALLOWED_TYPES),
        });
        if (bucketError && !/already exists/i.test(bucketError.message)) throw bucketError;
      }

      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(objectName, bytes, {
        contentType: file.type,
        cacheControl: '31536000',
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectName);
      return NextResponse.json({ url: data.publicUrl });
    }

    if (process.env.NODE_ENV !== 'development') {
      return error('Image storage is not configured. Add Supabase storage credentials.', 503);
    }

    const relativePath = path.join('uploads', ...objectName.split('/').slice(1));
    const destination = path.join(process.cwd(), 'public', relativePath);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, bytes);
    return NextResponse.json({ url: `/${relativePath.replace(/\\/g, '/')}` });
  } catch (uploadError) {
    console.error('Service image upload failed', uploadError);
    return error('Image upload failed. Please try again.', 500);
  }
}
