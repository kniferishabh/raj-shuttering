import type { Testimonial } from '@/lib/types';
import {
  getSupabaseAdmin,
  preferPrisma,
  preferSupabaseRest,
  prisma,
  readJsonArrayFile,
  readFromBackend,
  writeJsonFile,
} from './client';
import {
  testimonialFromPrisma,
  testimonialFromSupabase,
  testimonialToPrisma,
  testimonialToSupabase,
} from './mappers';

async function listFromPrisma(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map(testimonialFromPrisma);
}

async function listFromSupabase(): Promise<Testimonial[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => testimonialFromSupabase(row));
}

async function listFromFile(): Promise<Testimonial[]> {
  return readJsonArrayFile<Testimonial>('testimonials.json');
}

export async function listTestimonials(): Promise<Testimonial[]> {
  return readFromBackend(listFromSupabase, listFromPrisma, listFromFile);
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const items = await listTestimonials();
  return items.find((item) => item.id === id) ?? null;
}

export async function createTestimonial(item: Testimonial): Promise<Testimonial> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('testimonials').insert(testimonialToSupabase(item));
    if (error) {
      throw error;
    }
    return item;
  }

  if (preferPrisma()) {
    const row = await prisma.testimonial.create({ data: testimonialToPrisma(item) });
    return testimonialFromPrisma(row);
  }

  const items = await listFromFile();
  items.push(item);
  writeJsonFile('testimonials.json', items);
  return item;
}

export async function updateTestimonial(
  id: string,
  patch: Partial<Testimonial>,
): Promise<Testimonial | null> {
  const existing = await getTestimonialById(id);
  if (!existing) {
    return null;
  }

  const updated: Testimonial = { ...existing, ...patch, id };

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase
      .from('testimonials')
      .update(testimonialToSupabase(updated))
      .eq('id', id);
    if (error) {
      throw error;
    }
    return updated;
  }

  if (preferPrisma()) {
    const row = await prisma.testimonial.update({
      where: { id },
      data: testimonialToPrisma(updated),
    });
    return testimonialFromPrisma(row);
  }

  const items = await listFromFile();
  const index = items.findIndex((item) => item.id === id);
  items[index] = updated;
  writeJsonFile('testimonials.json', items);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (!(await getTestimonialById(id))) {
    return false;
  }

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      throw error;
    }
    return true;
  }

  if (preferPrisma()) {
    await prisma.testimonial.delete({ where: { id } });
    return true;
  }

  const items = await listFromFile();
  writeJsonFile(
    'testimonials.json',
    items.filter((item) => item.id !== id),
  );
  return true;
}

export async function replaceAllTestimonials(items: Testimonial[]): Promise<void> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    await supabase.from('testimonials').delete().neq('id', '');
    if (items.length > 0) {
      const { error } = await supabase.from('testimonials').insert(items.map(testimonialToSupabase));
      if (error) {
        throw error;
      }
    }
    return;
  }

  if (preferPrisma()) {
    await prisma.$transaction([
      prisma.testimonial.deleteMany(),
      ...items.map((item) => prisma.testimonial.create({ data: testimonialToPrisma(item) })),
    ]);
    return;
  }

  writeJsonFile('testimonials.json', items);
}
