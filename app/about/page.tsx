import type { Metadata } from 'next';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { StatsBar } from '@/components/sections/StatsBar/StatsBar';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { ShieldCheck, Award, HeartHandshake, Truck } from 'lucide-react';
import styles from './about.module.css';
import { interpolateContent, mergeSiteContent, parseRows } from '@/lib/site-content';
import { createPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return createPageMetadata({ settings, title: `About ${settings.businessName} | Since ${settings.establishedYear}`, description: `Learn about ${settings.businessName}, supplying shuttering, scaffolding and formwork equipment from ${settings.city} for rental and wholesale projects across India.`, path: '/about', image: '/images/equipment-worker.jpg', keywords: ['shuttering supplier India', 'scaffolding supplier Varanasi', 'construction equipment company'] });
}

export default async function AboutPage() {
  const settings = await getSettings();
  const c = mergeSiteContent(settings.siteContent);
  const vars = { year: settings.establishedYear, city: settings.city, businessName: settings.businessName };
  const timeline = parseRows(c['about.timeline'], 3).map(([year,title,desc]) => ({ year,title,desc }));
  const valueIcons = [ShieldCheck, HeartHandshake, Truck, Award];
  const values = parseRows(c['about.values'], 2).map(([title,text], index) => ({ title, text, icon: valueIcons[index] ?? ShieldCheck }));

  return (
    <>
      <PageHero
        title={c['about.heroTitle']}
        subtitle={interpolateContent(c['about.heroSubtitle'], vars)}
        currentLabel="About"
        path="/about"
      />

      <section className={styles.storySection}>
        <div className={styles.inner}>
          <div className={styles.storyGrid}>
            <div>
              <SectionHeader
                eyebrow={c['about.storyEyebrow']}
                heading={c['about.storyTitle']}
              />
              <p className={styles.storyText}>{settings.aboutText}</p>
              <p className={styles.storyText}>
                {c['about.storyText2']}
              </p>
            </div>

            <ol className={styles.timeline}>
              {timeline.map((item) => (
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
            eyebrow={c['about.valuesEyebrow']}
            heading={c['about.valuesTitle']}
            subtitle={c['about.valuesSubtitle']}
            align="center"
          />
          <div className={styles.valuesGrid}>
            {values.map((v) => {
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
