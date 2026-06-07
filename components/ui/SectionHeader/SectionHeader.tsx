import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = 'left',
  theme = 'dark',
  className = '',
}: SectionHeaderProps) {
  const classes = [
    styles.wrap,
    align === 'center' ? styles.alignCenter : styles.alignLeft,
    theme === 'light' ? styles.light : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.heading}>{heading}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
