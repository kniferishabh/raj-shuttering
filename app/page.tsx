import type { Metadata } from 'next';
import Link from 'next/link';
import { listServices, listGalleryItems, listTestimonials } from '@/lib/data';
import { getHeroVideoConfig } from '@/lib/media';
import { getSettings } from '@/lib/settings';
import { Hero } from '@/components/sections/Hero/Hero';
import { StatsBar } from '@/components/sections/StatsBar/StatsBar';
import { ServicesGrid } from '@/components/sections/ServicesGrid/ServicesGrid';
import { WhyUs } from '@/components/sections/WhyUs/WhyUs';
import { GalleryGrid } from '@/components/sections/Gallery/GalleryGrid';
import { Testimonials } from '@/components/sections/Testimonials/Testimonials';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';
import { ContactForm } from '@/components/sections/ContactForm/ContactForm';
import { MapEmbed } from '@/components/sections/MapEmbed/MapEmbed';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Shuttering & Scaffolding on Rent in Varanasi | Raj Shuttering' },
  description:
    'Shuttering plates, scaffolding pipes, steel props and formwork equipment for rent or wholesale in Varanasi. Contact Raj Shuttering for availability.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [settings, allServices, gallery, testimonials] = await Promise.all([
    getSettings(),
    listServices(),
    listGalleryItems(),
    listTestimonials(),
  ]);
  const homepagePriority = ['svc-023', 'svc-027', 'svc-013', 'svc-005', 'svc-006', 'svc-015'];
  const services = allServices
    .filter((service) => service.isActive)
    .sort((a, b) => {
      const aPriority = homepagePriority.indexOf(a.id);
      const bPriority = homepagePriority.indexOf(b.id);
      if (aPriority === -1 && bPriority === -1) return a.sortOrder - b.sortOrder;
      if (aPriority === -1) return 1;
      if (bPriority === -1) return -1;
      return aPriority - bPriority;
    });

  return (
    <div className={styles.page}>
      <Hero
        headline="Shuttering & Scaffolding Rental in Varanasi"
        subheadline={settings.heroSubheadline}
        video={getHeroVideoConfig(settings)}
      />

      <Reveal y={20}>
        <StatsBar />
      </Reveal>

      <section className={styles.serviceIntro} aria-labelledby="home-services-title">
        <div className={styles.serviceIntroInner}>
          <p className={styles.serviceIntroEyebrow}>Construction equipment in Varanasi</p>
          <h2 id="home-services-title">Shuttering and scaffolding for local projects</h2>
          <p>
            Explore our guides for <Link href="/services/shuttering-plates-on-rent-varanasi">steel shuttering plates</Link>,{' '}
            <Link href="/services/scaffolding-on-rent-varanasi">scaffolding pipes and clamps</Link>, and{' '}
            <Link href="/services/steel-props-on-rent-varanasi">adjustable steel props</Link>. Contact our team to confirm current sizes,
            quantities, rental duration and delivery requirements for your site.
          </p>
        </div>
      </section>

      <ServicesGrid services={services} limit={6} preserveOrder />

      <Reveal>
        <WhyUs
          aboutText={settings.aboutText}
          establishedYear={settings.establishedYear}
          city={settings.city}
          area="Pandeypur"
        />
      </Reveal>

      <section className={`${styles.gallerySection} blueprint-grid`}>
        <div className={styles.galleryInner}>
          <Reveal>
            <SectionHeader
              eyebrow="Our Work"
              heading="See Our Work in Action"
              subtitle="A glimpse into the projects we've supported across Varanasi and Purvanchal."
            />
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <GalleryGrid items={gallery} showFilters={false} showFooterCta featuredOnly />
        </Reveal>
      </section>

      <Reveal>
        <Testimonials testimonials={testimonials} />
      </Reveal>

      <Reveal scale={0.96}>
        <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
      </Reveal>

      <section className={`${styles.contactSection} blueprint-grid`} id="contact">
        <div className={styles.contactInner}>
          <Reveal>
            <SectionHeader
              eyebrow="Get in Touch"
              heading="Talk to Our Team"
              subtitle="Send us your equipment requirements and our team will respond as soon as possible."
            />
          </Reveal>
          <div className={styles.contactGrid}>
            <Reveal delay={0.05} x={-24}>
              <ContactForm />
            </Reveal>
            <Reveal delay={0.15} x={24}>
              <MapEmbed label={`${settings.address}, ${settings.city}`} />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
