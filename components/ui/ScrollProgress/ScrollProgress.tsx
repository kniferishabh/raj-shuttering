'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
