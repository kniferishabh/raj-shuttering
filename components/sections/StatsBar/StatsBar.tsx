import styles from './StatsBar.module.css';

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 'Since 2008', label: 'Serving Contractors' },
  { value: 'Varanasi', label: 'Local Service Area' },
  { value: 'Rent & Sale', label: 'Flexible Supply' },
  { value: 'Mon–Sat', label: 'Open for Enquiries' },
];

export function StatsBar() {
  return (
    <section className={styles.bar} aria-label="Business statistics">
      <div className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value}>
              {stat.value}
            </span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
