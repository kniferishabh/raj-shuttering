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

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const settings = await getSettings();
  const services = (await listServices()).filter((s) => s.isActive);
  const gallery = await listGalleryItems();
  const testimonials = await listTestimonials();

  return (
    <div className={styles.page}>
      <Hero
        headline={settings.heroHeadline}
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
              subtitle="Send us your requirements - we typically respond within 2 working hours."
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
