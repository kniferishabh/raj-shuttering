import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { listServices } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ServicesGrid } from '@/components/sections/ServicesGrid/ServicesGrid';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';
import { SERVICE_LANDING_PAGES } from '@/lib/service-landing-pages';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Shuttering & Scaffolding Equipment in Varanasi | Raj Shuttering' },
  description:
    'Explore shuttering plates, scaffolding pipes, clamps, steel props, jacks and construction equipment for rent or purchase in Varanasi.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Shuttering & Scaffolding Equipment in Varanasi | Raj Shuttering',
    description: 'Explore shuttering plates, scaffolding pipes, clamps, steel props, jacks and construction equipment for rent or purchase in Varanasi.',
    url: '/services',
  },
};

export default async function ServicesPage() {
  const [settings, allServices] = await Promise.all([getSettings(), listServices()]);
  const services = allServices.filter((s) => s.isActive);

  return (
    <>
      <PageHero
        title="Shuttering & Scaffolding Equipment in Varanasi"
        subtitle="A complete catalogue of shuttering, scaffolding, and construction equipment - available on rent or for wholesale purchase."
        currentLabel="Services"
      />

      <section className={styles.popular} aria-labelledby="popular-services-title">
        <div className={styles.inner}>
          <span className={styles.eyebrow}>Popular rental requirements</span>
          <h2 id="popular-services-title">Explore equipment by project need</h2>
          <p className={styles.intro}>Practical information for frequently requested shuttering and scaffolding equipment in Varanasi.</p>
          <div className={styles.linkGrid}>
            {SERVICE_LANDING_PAGES.map((page) => (
              <Link key={page.slug} href={`/services/${page.slug}`} className={styles.linkCard}>
                <span>Rental guide</span>
                <h3>{page.shortTitle}</h3>
                <p>{page.description}</p>
                <strong>View details <ArrowRight size={17} /></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid services={services} showFooter={false} />

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
    </>
  );
}
