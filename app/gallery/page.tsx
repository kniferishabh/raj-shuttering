import type { Metadata } from 'next';
import { listGalleryItems } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { GalleryGrid } from '@/components/sections/Gallery/GalleryGrid';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our work - photos from project sites, equipment in action, and the materials we supply across Varanasi.',
};

export default async function GalleryPage() {
  const settings = await getSettings();
  const items = await listGalleryItems();

  return (
    <>
      <PageHero
        title="Project Gallery"
        subtitle="Real projects, real materials. A visual record of the work we've supported across Purvanchal."
        currentLabel="Gallery"
      />

      <GalleryGrid items={items} />

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
    </>
  );
}
