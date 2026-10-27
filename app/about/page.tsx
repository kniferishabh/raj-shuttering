import type { Metadata } from 'next';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { StatsBar } from '@/components/sections/StatsBar/StatsBar';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { ShieldCheck, Award, HeartHandshake, Truck } from 'lucide-react';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: { absolute: 'About Raj Shuttering & Scaffolding | Varanasi' },
  description:
    'Learn about Raj Shuttering & Scaffolding, serving construction projects in Varanasi since 2008 with rental and wholesale shuttering equipment.',
  alternates: { canonical: '/about' },
};

const TIMELINE = [
  { year: '2008', title: 'Founded in Pandeypur', desc: 'Started with a small inventory serving local Varanasi contractors.' },
  { year: '2012', title: 'Expanded Inventory', desc: 'Added aluminium scaffolding and H-frame systems to our catalogue.' },
  { year: '2016', title: 'Pan-Purvanchal Reach', desc: 'Began serving customers in Chandauli, Mirzapur, Jaunpur and beyond.' },
  { year: '2020', title: 'Wholesale Operations', desc: 'Launched wholesale supply for sub-dealers and contractors across UP.' },
  { year: '2024', title: 'Expanded Product Range', desc: 'Added more formwork, access and construction equipment options for local projects.' },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Quality',
    text: 'Equipment condition is checked before it is supplied for a project.',
  },
  {
    icon: HeartHandshake,
    title: 'Trust',
    text: 'Transparent pricing, GST invoices, and honest dealings with every customer.',
  },
  {
    icon: Truck,
    title: 'Service',
    text: 'Clear coordination for collection or delivery based on current availability.',
  },
  {
    icon: Award,
    title: 'Experience',
    text: 'Serving Varanasi construction projects since 2008.',
  },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        title="About Raj Shuttering & Scaffolding"
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

    </>
  );
}
