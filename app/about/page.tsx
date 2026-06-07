import type { Metadata } from 'next';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { StatsBar } from '@/components/sections/StatsBar/StatsBar';
import { ContactCTA } from '@/components/sections/ContactCTA/ContactCTA';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { ShieldCheck, Award, HeartHandshake, Truck } from 'lucide-react';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Raj Shuttering & Scaffolding, Varanasi\'s trusted shuttering and scaffolding supplier since 2008.',
};

const TIMELINE = [
  { year: '2008', title: 'Founded in Pandeypur', desc: 'Started with a small inventory serving local Varanasi contractors.' },
  { year: '2012', title: 'Expanded Inventory', desc: 'Added aluminium scaffolding and H-frame systems to our catalogue.' },
  { year: '2016', title: 'Pan-Purvanchal Reach', desc: 'Began serving customers in Chandauli, Mirzapur, Jaunpur and beyond.' },
  { year: '2020', title: 'Wholesale Operations', desc: 'Launched wholesale supply for sub-dealers and contractors across UP.' },
  { year: '2024', title: '500+ Projects Strong', desc: 'Trusted by 500+ contractors with a 4.5-star rating from 61+ reviews.' },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Quality',
    text: 'Every plate, every frame is inspected. IS-compliant materials only.',
  },
  {
    icon: HeartHandshake,
    title: 'Trust',
    text: 'Transparent pricing, GST invoices, and honest dealings with every customer.',
  },
  {
    icon: Truck,
    title: 'Service',
    text: 'Same-day dispatch across Varanasi. On-time delivery is non-negotiable.',
  },
  {
    icon: Award,
    title: 'Experience',
    text: '16+ years of helping shape Varanasi\'s skyline. We know construction.',
  },
];

export default function AboutPage() {
  const settings = getSettings();

  return (
    <>
      <PageHero
        title="About Us"
        subtitle={`The story of ${settings.businessName} - a Pandeypur, ${settings.city} family business serving construction since ${settings.establishedYear}.`}
        currentLabel="About"
      />

      <section className={styles.storySection}>
        <div className={styles.inner}>
          <div className={styles.storyGrid}>
            <div>
              <SectionHeader
                eyebrow="Our Story"
                heading="From a Small Yard to Varanasi's Trusted Name"
              />
              <p className={styles.storyText}>{settings.aboutText}</p>
              <p className={styles.storyText}>
                What began as a small operation in Pandeypur has grown into one of Varanasi&apos;s most
                reliable shuttering and scaffolding suppliers. Through every project, our focus has
                stayed the same - deliver quality materials, on time, at fair prices.
              </p>
            </div>

            <ol className={styles.timeline}>
              {TIMELINE.map((item) => (
                <li key={item.year} className={styles.timelineItem}>
                  <span className={styles.timelineDot} aria-hidden="true" />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineDesc}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.inner}>
          <SectionHeader
            eyebrow="What We Stand For"
            heading="Our Core Values"
            subtitle="The principles that guide every decision and every delivery."
            align="center"
          />
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={styles.valueCard}>
                  <span className={styles.valueIcon}>
                    <Icon size={26} />
                  </span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <StatsBar />

      <ContactCTA phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
    </>
  );
}
