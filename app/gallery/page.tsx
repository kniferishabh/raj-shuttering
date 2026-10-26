import type { Metadata } from 'next';
import { listGalleryItems } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { GalleryGrid } from '@/components/sections/Gallery/GalleryGrid';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';

export const metadata: Metadata = {
  title: { absolute: 'Shuttering & Scaffolding Project Gallery | Varanasi' },
  description:
    'View shuttering plates, scaffolding systems and construction site photos from Raj Shuttering & Scaffolding in Varanasi and nearby areas.',
  alternates: { canonical: '/gallery' },
};

export default async function GalleryPage() {
  const [settings, items] = await Promise.all([getSettings(), listGalleryItems()]);

  return (
    <>
      <PageHero
        title="Our Shuttering & Scaffolding Projects"
        subtitle="Real projects, real materials. A visual record of the work we've supported across Purvanchal."
        currentLabel="Gallery"
      />

      <GalleryGrid items={items} />

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
    </>
  );
}
