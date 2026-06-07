'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StatsBar.module.css';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

const STATS: Stat[] = [
  { value: 16, suffix: '+', label: 'Years in Business' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 4.5, suffix: '\u2605', label: 'Customer Rating', decimals: 1 },
  { value: 50, suffix: '+', label: 'Equipment Types' },
];

function CountUp({ to, decimals = 0, suffix = '', prefix = '' }: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1500;
            const start = performance.now();
            const animate = (t: number) => {
              const progress = Math.min((t - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setVal(to * eased);
              if (progress < 1) requestAnimationFrame(animate);
              else setVal(to);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className={styles.bar} aria-label="Business statistics">
      <div className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value}>
              <CountUp
                to={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            </span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
