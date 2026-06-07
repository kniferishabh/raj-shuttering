import fs from 'fs';
import path from 'path';

/**
 * Simple JSON-flatfile data store.
 *
 * NOTE: For production deployment on Vercel (serverless), filesystem writes
 * are ephemeral and will NOT persist across deployments or cold starts.
 * For production, swap this layer for Vercel KV, Postgres (Neon),
 * Supabase, or any managed database.
 */

const dataDir = path.join(process.cwd(), 'data');

export function readData<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filename}`);
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export function writeData<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function safeReadArray<T>(filename: string): T[] {
  try {
    return readData<T[]>(filename);
  } catch {
    return [];
  }
}
