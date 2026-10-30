import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './PageHero.module.css';
import { SITE_URL } from '@/lib/site';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  currentLabel: string;
  path: string;
}

export function PageHero({ title, subtitle, currentLabel, path }: PageHeroProps) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: currentLabel, item: `${SITE_URL}${path}` },
    ],
  };
  return (
    <section className={styles.hero}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} />
      <div className={styles.gridPattern} aria-hidden="true" />
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span className={styles.breadcrumbCurrent}>{currentLabel}</span>
        </nav>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
