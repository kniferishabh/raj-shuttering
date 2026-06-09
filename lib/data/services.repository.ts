import type { Service } from '@/lib/types';
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
  serviceFromPrisma,
  serviceFromSupabase,
  serviceToPrisma,
  serviceToSupabase,
} from './mappers';

async function listFromPrisma(): Promise<Service[]> {
  const rows = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
  return rows.map(serviceFromPrisma);
}

async function listFromSupabase(): Promise<Service[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => serviceFromSupabase(row));
}

async function listFromFile(): Promise<Service[]> {
  return readJsonArrayFile<Service>('services.json');
}

export async function listServices(): Promise<Service[]> {
  return readFromBackend(listFromSupabase, listFromPrisma, listFromFile);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const services = await listServices();
  return services.find((service) => service.id === id) ?? null;
}

export async function createService(service: Service): Promise<Service> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('services').insert(serviceToSupabase(service));
    if (error) {
      throw error;
    }
    return service;
  }

  if (preferPrisma()) {
    const row = await prisma.service.create({ data: serviceToPrisma(service) });
    return serviceFromPrisma(row);
  }

  const services = await listFromFile();
  services.push(service);
  writeJsonFile('services.json', services);
  return service;
}

export async function updateService(id: string, patch: Partial<Service>): Promise<Service | null> {
  const existing = await getServiceById(id);
  if (!existing) {
    return null;
  }

  const updated: Service = {
    ...existing,
    ...patch,
    id,
    updatedAt: new Date().toISOString(),
  };

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('services').update(serviceToSupabase(updated)).eq('id', id);
    if (error) {
      throw error;
    }
    return updated;
  }

  if (preferPrisma()) {
    const row = await prisma.service.update({
      where: { id },
      data: serviceToPrisma(updated),
    });
    return serviceFromPrisma(row);
  }

  const services = await listFromFile();
  const index = services.findIndex((item) => item.id === id);
  services[index] = updated;
  writeJsonFile('services.json', services);
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  const existing = await getServiceById(id);
  if (!existing) {
    return false;
  }

  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      throw error;
    }
    return true;
  }

  if (preferPrisma()) {
    await prisma.service.delete({ where: { id } });
    return true;
  }

  const services = await listFromFile();
  writeJsonFile(
    'services.json',
    services.filter((item) => item.id !== id),
  );
  return true;
}

export async function replaceAllServices(services: Service[]): Promise<void> {
  if (preferSupabaseRest()) {
    const supabase = getSupabaseAdmin()!;
    await supabase.from('services').delete().neq('id', '');
    if (services.length > 0) {
      const { error } = await supabase.from('services').insert(services.map(serviceToSupabase));
      if (error) {
        throw error;
      }
    }
    return;
  }

  if (preferPrisma()) {
    await prisma.$transaction([
      prisma.service.deleteMany(),
      ...services.map((service) => prisma.service.create({ data: serviceToPrisma(service) })),
    ]);
    return;
  }

  writeJsonFile('services.json', services);
}
