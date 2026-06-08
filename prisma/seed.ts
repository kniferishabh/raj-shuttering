import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const DOCUMENT_KEYS = ['settings', 'services', 'gallery', 'testimonials', 'enquiries'] as const;

async function main() {
  const dataDir = path.join(process.cwd(), 'data');

  for (const key of DOCUMENT_KEYS) {
    const filePath = path.join(dataDir, `${key}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skip seed — missing ${filePath}`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    await prisma.appDocument.upsert({
      where: { key },
      create: { key, data },
      update: { data },
    });
    console.log(`Seeded: ${key}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
