import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MapPin, Phone } from 'lucide-react';
import { listServices } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import { getServiceLandingPage, SERVICE_LANDING_PAGES } from '@/lib/service-landing-pages';
import { SITE_URL } from '@/lib/site';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';
import styles from './service-detail.module.css';

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICE_LANDING_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const page = getServiceLandingPage(params.slug);
  if (!page) return {};

  return {
    title: { absolute: `${page.title} | Raj Shuttering` },
    description: page.description,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      images: [{ url: page.image, alt: page.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const page = getServiceLandingPage(params.slug);
  if (!page) notFound();

  const [settings, allServices] = await Promise.all([getSettings(), listServices()]);
  const relatedServices = page.serviceIds
    .map((id) => allServices.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service?.isActive));
  const cleanPhone = settings.phone[0]?.replace(/[^\d+]/g, '') ?? '';
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.description,
    url: `${SITE_URL}/services/${page.slug}`,
    areaServed: { '@type': 'City', name: 'Varanasi' },
    provider: { '@id': `${SITE_URL}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c') }}
      />
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{page.shortTitle}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}><MapPin size={14} /> Available in Varanasi</span>
              <h1>{page.title}</h1>
              <p>{page.intro}</p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryAction}>Request a Quote <ArrowRight size={18} /></Link>
                <a href={`tel:${cleanPhone}`} className={styles.secondaryAction}><Phone size={18} /> Call {settings.phone[0]}</a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.benefits} aria-labelledby="rental-details">
          <div className={styles.sectionHeading}>
            <span>What to expect</span>
            <h2 id="rental-details">Plan the right equipment requirement</h2>
          </div>
          <div className={styles.benefitGrid}>
            {page.benefits.map((benefit) => (
              <article key={benefit.title} className={styles.benefitCard}>
                <Check size={20} aria-hidden="true" />
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.detailsGrid}>
          <div>
            <span className={styles.sectionLabel}>Common applications</span>
            <h2>Where this equipment is used</h2>
            <ul className={styles.applicationList}>
              {page.applications.map((application) => <li key={application}><Check size={17} />{application}</li>)}
            </ul>
          </div>
          <div>
            <span className={styles.sectionLabel}>Related inventory</span>
            <h2>Equipment to discuss with our team</h2>
            <div className={styles.inventoryList}>
              {relatedServices.map((service) => (
                <article key={service.id}>
                  <h3>{service.name}</h3>
                  <p>{service.shortDescription}</p>
                  <span>{service.availableFor.map((item) => item === 'rent' ? 'Rental' : 'Sale').join(' · ')}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className={styles.note}>
          <strong>Before ordering:</strong> Availability, quantities, sizes, rental duration and transport requirements should be confirmed directly with our team for your project.
        </aside>
      </main>

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
    </>
  );
}
