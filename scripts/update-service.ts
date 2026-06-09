/**
 * Update a single service row in Supabase from data/services.json by id.
 *
 *   npm run db:update-service -- svc-001
 */
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { serviceToSupabase } from '../lib/data/mappers';
import type { Service } from '../lib/types';

const serviceId = process.argv[2];
if (!serviceId) {
  console.error('Usage: npm run db:update-service -- <service-id>');
  process.exit(1);
}

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

async function main() {
  const filePath = path.join(process.cwd(), 'data', 'services.json');
  const services = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Service[];
  const service = services.find((item) => item.id === serviceId);

  if (!service) {
    throw new Error(`Service not found in services.json: ${serviceId}`);
  }

  const supabase = getSupabase();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { error } = await supabase
    .from('services')
    .update(serviceToSupabase(service))
    .eq('id', serviceId);

  if (error) {
    throw error;
  }

  console.log(`Updated ${serviceId}: ${service.name}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
