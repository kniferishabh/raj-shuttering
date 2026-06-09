import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import type {
  BusinessSettings,
  Enquiry,
  GalleryItem,
  Service,
  Testimonial,
} from '../lib/types';
import {
  settingsToPrisma,
  serviceToPrisma,
  galleryToPrisma,
  testimonialToPrisma,
  enquiryToPrisma,
} from '../lib/data/mappers';

const prisma = new PrismaClient();
const dataDir = path.join(process.cwd(), 'data');

async function seedFromJson() {
  const settingsPath = path.join(dataDir, 'settings.json');
  if (fs.existsSync(settingsPath)) {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8')) as BusinessSettings;
    await prisma.siteSettings.upsert({
      where: { id: 'default' },
      create: settingsToPrisma(settings),
      update: settingsToPrisma(settings),
    });
    console.log('Seeded: site_settings');
  }

  const collections: Array<{
    file: string;
    label: string;
    seed: (items: unknown[]) => Promise<void>;
  }> = [
    {
      file: 'services.json',
      label: 'services',
      seed: async (items) => {
        await prisma.service.deleteMany();
        for (const item of items as Service[]) {
          await prisma.service.create({ data: serviceToPrisma(item) });
        }
      },
    },
    {
      file: 'gallery.json',
      label: 'gallery_items',
      seed: async (items) => {
        await prisma.galleryItem.deleteMany();
        for (const item of items as GalleryItem[]) {
          await prisma.galleryItem.create({ data: galleryToPrisma(item) });
        }
      },
    },
    {
      file: 'testimonials.json',
      label: 'testimonials',
      seed: async (items) => {
        await prisma.testimonial.deleteMany();
        for (const item of items as Testimonial[]) {
          await prisma.testimonial.create({ data: testimonialToPrisma(item) });
        }
      },
    },
    {
      file: 'enquiries.json',
      label: 'enquiries',
      seed: async (items) => {
        await prisma.enquiry.deleteMany();
        for (const item of items as Enquiry[]) {
          await prisma.enquiry.create({ data: enquiryToPrisma(item) });
        }
      },
    },
  ];

  for (const { file, label, seed } of collections) {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skip seed — missing ${filePath}`);
      continue;
    }

    const items = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!Array.isArray(items)) {
      console.warn(`Skip seed — ${file} is not an array`);
      continue;
    }

    await seed(items);
    console.log(`Seeded: ${label} (${items.length} rows)`);
  }
}

async function main() {
  const exists = await prisma.siteSettings.findUnique({ where: { id: 'default' } });
  if (exists) {
    console.log('Skipped seed — site_settings already populated');
    return;
  }

  await seedFromJson();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
