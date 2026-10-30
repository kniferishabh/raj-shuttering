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
import { createPageMetadata } from '@/lib/seo';

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICE_LANDING_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const page = getServiceLandingPage(params.slug);
  if (!page) return {};
  const settings = await getSettings();
  return createPageMetadata({ settings, title: `${page.title} | ${settings.businessName}`, description: page.description, path: `/services/${page.slug}`, image: page.image, keywords: [page.shortTitle, `${page.shortTitle} Varanasi`, 'construction equipment rental'] });
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
    areaServed: [
      { '@type': 'City', name: settings.city },
      { '@type': 'Country', name: 'India' },
    ],
    provider: { '@id': `${SITE_URL}/#business` },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: page.shortTitle, item: `${SITE_URL}/services/${page.slug}` },
    ],
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  const relatedGuides = SERVICE_LANDING_PAGES.filter((item) => item.slug !== page.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
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

        <section className={styles.faqSection} aria-labelledby="service-faq-title">
          <div className={styles.sectionHeading}>
            <span>Practical information</span>
            <h2 id="service-faq-title">Frequently asked questions</h2>
          </div>
          <div className={styles.faqList}>
            {page.faqs.map((faq) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className={styles.relatedGuides} aria-label="Related rental guides">
          <strong>Related rental guides</strong>
          <div>
            {relatedGuides.map((guide) => (
              <Link key={guide.slug} href={`/services/${guide.slug}`}>{guide.shortTitle}<ArrowRight size={15} /></Link>
            ))}
          </div>
        </nav>
      </main>

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
    </>
  );
}
