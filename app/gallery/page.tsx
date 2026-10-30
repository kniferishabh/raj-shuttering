import type { Metadata } from 'next';
import { listGalleryItems } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { GalleryGrid } from '@/components/sections/Gallery/GalleryGrid';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';
import { mergeSiteContent } from '@/lib/site-content';
import { createPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return createPageMetadata({ settings, title: `Shuttering & Scaffolding Project Gallery | ${settings.businessName}`, description: `View shuttering plates, scaffolding systems, steel props and formwork equipment used on real construction project sites supported by ${settings.businessName}.`, path: '/gallery', image: '/images/project-skyline.jpg', keywords: ['shuttering project gallery', 'scaffolding project photos', 'formwork equipment India'] });
}

export default async function GalleryPage() {
  const [settings, items] = await Promise.all([getSettings(), listGalleryItems()]);
  const c = mergeSiteContent(settings.siteContent);

  return (
    <>
      <PageHero
        title={c['gallery.heroTitle']}
        subtitle={c['gallery.heroSubtitle']}
        currentLabel="Gallery"
        path="/gallery"
      />

      <GalleryGrid items={items} />

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} content={{ eyebrow:c['shared.ctaEyebrow'], heading:c['shared.ctaTitle'], call:c['shared.callLabel'], whatsapp:c['shared.whatsappLabel'] }} />
    </>
  );
}
