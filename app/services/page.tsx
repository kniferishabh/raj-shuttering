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
import { mergeSiteContent } from '@/lib/site-content';

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
  const c = mergeSiteContent(settings.siteContent);

  return (
    <>
      <PageHero
        title={c['services.heroTitle']}
        subtitle={c['services.heroSubtitle']}
        currentLabel="Services"
      />

      <section className={styles.popular} aria-labelledby="popular-services-title">
        <div className={styles.inner}>
          <span className={styles.eyebrow}>{c['services.popularEyebrow']}</span>
          <h2 id="popular-services-title">{c['services.popularTitle']}</h2>
          <p className={styles.intro}>{c['services.popularText']}</p>
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

      <ServicesGrid services={services} showFooter={false} content={{ eyebrow:c['services.gridEyebrow'], heading:c['services.gridTitle'], subtitle:c['services.gridText'] }} />

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} content={{ eyebrow:c['shared.ctaEyebrow'], heading:c['shared.ctaTitle'], call:c['shared.callLabel'], whatsapp:c['shared.whatsappLabel'] }} />
    </>
  );
}
