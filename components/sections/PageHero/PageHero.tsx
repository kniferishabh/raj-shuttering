import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  currentLabel: string;
}

export function PageHero({ title, subtitle, currentLabel }: PageHeroProps) {
  return (
    <section className={styles.hero}>
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
