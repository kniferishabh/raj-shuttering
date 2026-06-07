import { type ReactNode, type CSSProperties } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  className?: string;
  accentColor?: string;
  style?: CSSProperties;
}

export function Card({
  children,
  hoverable = false,
  className = '',
  accentColor,
  style,
}: CardProps) {
  const classes = [styles.card, hoverable ? styles.hoverable : '', className]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: CSSProperties = accentColor
    ? { ...style, ['--accent' as string]: accentColor }
    : style ?? {};

  return (
    <div className={classes} style={mergedStyle}>
      {hoverable && (
        <span
          className={styles.accentBar}
          style={accentColor ? { background: accentColor } : undefined}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
