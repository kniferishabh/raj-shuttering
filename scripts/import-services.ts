/**
 * Replaces all services in Supabase / Prisma / JSON from data/services.json.
 *
 *   npm run db:import-services
 */
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import { serviceToPrisma, serviceToSupabase } from '../lib/data/mappers';
import type { Service } from '../lib/types';

const dataDir = path.join(process.cwd(), 'data');

function getSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) {
    return null;
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function importToSupabase(services: Service[]) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { error: deleteError } = await supabase.from('services').delete().neq('id', '');
  if (deleteError) {
    throw deleteError;
  }

  if (services.length > 0) {
    const { error: insertError } = await supabase
      .from('services')
      .insert(services.map(serviceToSupabase));
    if (insertError) {
      throw insertError;
    }
  }
}

async function importToPrisma(services: Service[]) {
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction([
      prisma.service.deleteMany(),
      ...services.map((service) =>
        prisma.service.create({ data: serviceToPrisma(service) }),
      ),
    ]);
  } finally {
    await prisma.$disconnect();
  }
}

function importToJson(services: Service[]) {
  fs.writeFileSync(
    path.join(dataDir, 'services.json'),
    JSON.stringify(services, null, 2),
    'utf-8',
  );
}

async function main() {
  const filePath = path.join(dataDir, 'services.json');
  const services = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Service[];

  if (!Array.isArray(services) || services.length === 0) {
    throw new Error('services.json must be a non-empty array');
  }

  const supabase = getSupabase();
  const hasDatabase = Boolean(process.env.DATABASE_URL?.trim());

  if (supabase) {
    await importToSupabase(services);
    console.log(`Imported ${services.length} services to Supabase.`);
    return;
  }

  if (hasDatabase) {
    await importToPrisma(services);
    console.log(`Imported ${services.length} services to PostgreSQL via Prisma.`);
    return;
  }

  importToJson(services);
  console.log(`Wrote ${services.length} services to data/services.json.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
