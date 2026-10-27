import type { CSSProperties, ReactNode } from 'react';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  className,
}: RevealProps) {
  return (
    <div
      className={[styles.reveal, className].filter(Boolean).join(' ')}
      style={{
        '--reveal-x': `${x}px`,
        '--reveal-y': `${y}px`,
        '--reveal-scale': scale,
        '--reveal-delay': `${Math.max(0, delay)}s`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
