import fs from 'fs';
import path from 'path';
import { getSupabaseAdmin, isSupabaseRestEnabled } from '@/lib/supabase-admin';
import { isDatabaseEnabled, prisma } from '@/lib/prisma';

const dataDir = path.join(process.cwd(), 'data');

export function preferSupabaseRest(): boolean {
  return isSupabaseRestEnabled();
}

export function preferPrisma(): boolean {
  return isDatabaseEnabled();
}

export { getSupabaseAdmin, prisma };

export function readJsonFile<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filename}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

export function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readJsonArrayFile<T>(filename: string): Promise<T[]> {
  const data = readJsonFile<T[]>(filename);
  return Array.isArray(data) ? data : [];
}

export async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
): Promise<T> {
  try {
    return await primary();
  } catch {
    return fallback();
  }
}
