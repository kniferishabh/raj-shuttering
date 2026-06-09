import type { Enquiry } from '@/lib/types';
import {
  getSupabaseAdmin,
  preferPrisma,
  preferSupabaseRest,
  prisma,
  readJsonArrayFile,
  writeJsonFile,
  withFallback,
} from './client';
import {
  enquiryFromPrisma,
  enquiryFromSupabase,
  enquiryToPrisma,
  enquiryToSupabase,
} from './mappers';

async function listFromPrisma(): Promise<Enquiry[]> {
  const rows = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map(enquiryFromPrisma);
}

async function listFromSupabase(): Promise<Enquiry[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => enquiryFromSupabase(row));
}

async function listFromFile(): Promise<Enquiry[]> {
  return readJsonArrayFile<Enquiry>('enquiries.json');
}

export async function listEnquiries(): Promise<Enquiry[]> {
  if (preferSupabaseRest()) {
    return withFallback(listFromSupabase, async () => {
      if (preferPrisma()) {
        return withFallback(listFromPrisma, listFromFile);
      }
      return listFromFile();
    });
  }

  if (preferPrisma()) {
    return withFallback(listFromPrisma, listFromFile);
  }

  return listFromFile();
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const items = await listEnquiries();
  return items.find((item) => item.id === id) ?? null;
}

export async function createEnquiry(item: Enquiry): Promise<Enquiry> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('enquiries').insert(enquiryToSupabase(item));
    if (error) {
      throw error;
    }
    return item;
  }

  if (preferPrisma()) {
    const row = await prisma.enquiry.create({ data: enquiryToPrisma(item) });
    return enquiryFromPrisma(row);
  }

  const items = await listFromFile();
  items.push(item);
  writeJsonFile('enquiries.json', items);
  return item;
}

export async function updateEnquiry(id: string, patch: Partial<Enquiry>): Promise<Enquiry | null> {
  const existing = await getEnquiryById(id);
  if (!existing) {
    return null;
  }

  const updated: Enquiry = { ...existing, ...patch, id };

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('enquiries').update(enquiryToSupabase(updated)).eq('id', id);
    if (error) {
      throw error;
    }
    return updated;
  }

  if (preferPrisma()) {
    const row = await prisma.enquiry.update({
      where: { id },
      data: enquiryToPrisma(updated),
    });
    return enquiryFromPrisma(row);
  }

  const items = await listFromFile();
  const index = items.findIndex((item) => item.id === id);
  items[index] = updated;
  writeJsonFile('enquiries.json', items);
  return updated;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (!(await getEnquiryById(id))) {
    return false;
  }

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('enquiries').delete().eq('id', id);
    if (error) {
      throw error;
    }
    return true;
  }

  if (preferPrisma()) {
    await prisma.enquiry.delete({ where: { id } });
    return true;
  }

  const items = await listFromFile();
  writeJsonFile(
    'enquiries.json',
    items.filter((item) => item.id !== id),
  );
  return true;
}

export async function replaceAllEnquiries(items: Enquiry[]): Promise<void> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    await supabase.from('enquiries').delete().neq('id', '');
    if (items.length > 0) {
      const { error } = await supabase.from('enquiries').insert(items.map(enquiryToSupabase));
      if (error) {
        throw error;
      }
    }
    return;
  }

  if (preferPrisma()) {
    await prisma.$transaction([
      prisma.enquiry.deleteMany(),
      ...items.map((item) => prisma.enquiry.create({ data: enquiryToPrisma(item) })),
    ]);
    return;
  }

  writeJsonFile('enquiries.json', items);
}
