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
    'Rent shuttering plates, scaffolding, steel props and construction formwork equipment in Varanasi. Contact Raj Shuttering & Scaffolding for a quote.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [settings, allServices, gallery, testimonials] = await Promise.all([
    getSettings(),
    listServices(),
    listGalleryItems(),
    listTestimonials(),
  ]);
  const services = allServices.filter((s) => s.isActive);

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

      <ServicesGrid services={services} limit={6} />

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
import type { Metadata } from 'next';
