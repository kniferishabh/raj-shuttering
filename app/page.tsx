import { safeReadArray } from '@/lib/db';
import { getSettings } from '@/lib/settings';
import type { Service, GalleryItem, Testimonial } from '@/lib/types';
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

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const settings = getSettings();
  const services = safeReadArray<Service>('services.json').filter((s) => s.isActive);
  const gallery = safeReadArray<GalleryItem>('gallery.json');
  const testimonials = safeReadArray<Testimonial>('testimonials.json');

  return (
    <div className={styles.page}>
      <Hero headline={settings.heroHeadline} subheadline={settings.heroSubheadline} />

      <StatsBar />

      <Reveal>
        <ServicesGrid services={services} limit={6} />
      </Reveal>

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
        <GalleryGrid items={gallery} showFilters={false} showFooterCta featuredOnly />
      </section>

      <Reveal>
        <Testimonials testimonials={testimonials} />
      </Reveal>

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />

      <section className={`${styles.contactSection} blueprint-grid`} id="contact">
        <div className={styles.contactInner}>
          <Reveal>
            <SectionHeader
              eyebrow="Get in Touch"
              heading="Talk to Our Team"
              subtitle="Send us your requirements - we typically respond within 2 working hours."
            />
          </Reveal>
          <div className={styles.contactGrid}>
            <ContactForm />
            <MapEmbed label={`${settings.address}, ${settings.city}`} />
          </div>
        </div>
      </section>
    </div>
  );
}
