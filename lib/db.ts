import fs from 'fs';
import path from 'path';
import { isDatabaseEnabled, prisma } from './prisma';

const dataDir = path.join(process.cwd(), 'data');

const FILE_KEYS = new Set([
  'settings',
  'services',
  'gallery',
  'testimonials',
  'enquiries',
]);

function toKey(filename: string): string {
  return filename.replace(/\.json$/i, '');
}

function assertKnownKey(key: string) {
  if (!FILE_KEYS.has(key)) {
    throw new Error(`Unknown data key: ${key}`);
  }
}

function readFromFile<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filename}`);
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeToFile<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function readFromDatabase<T>(filename: string): Promise<T> {
  const key = toKey(filename);
  assertKnownKey(key);

  const doc = await prisma.appDocument.findUnique({ where: { key } });
  if (!doc) {
    throw new Error(`Data not found in database: ${filename}`);
  }
  return doc.data as T;
}

async function writeToDatabase<T>(filename: string, data: T): Promise<void> {
  const key = toKey(filename);
  assertKnownKey(key);

  await prisma.appDocument.upsert({
    where: { key },
    create: { key, data: data as object },
    update: { data: data as object },
  });
}

export async function readData<T>(filename: string): Promise<T> {
  if (isDatabaseEnabled()) {
    return readFromDatabase<T>(filename);
  }
  return readFromFile<T>(filename);
}

export async function writeData<T>(filename: string, data: T): Promise<void> {
  if (isDatabaseEnabled()) {
    await writeToDatabase(filename, data);
    return;
  }
  writeToFile(filename, data);
}

export async function safeReadArray<T>(filename: string): Promise<T[]> {
  try {
    const data = await readData<T[]>(filename);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
