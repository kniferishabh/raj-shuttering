import type { Metadata } from 'next';
import { safeReadArray } from '@/lib/db';
import { getSettings } from '@/lib/settings';
import type { Service } from '@/lib/types';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ServicesGrid } from '@/components/sections/ServicesGrid/ServicesGrid';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our complete range of shuttering, scaffolding, and construction formwork equipment available for rent and wholesale in Varanasi.',
};

export default function ServicesPage() {
  const settings = getSettings();
  const services = safeReadArray<Service>('services.json').filter((s) => s.isActive);

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="A complete catalogue of shuttering, scaffolding, and construction equipment - available on rent or for wholesale purchase."
        currentLabel="Services"
      />

      <ServicesGrid services={services} showFooter={false} />

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
    </>
  );
}
