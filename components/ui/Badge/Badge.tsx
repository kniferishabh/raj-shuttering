import { type ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'amber' | 'steel' | 'success' | 'neutral' | 'outline';

export interface BadgeProps {
  label?: string;
  children?: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  label,
  children,
  variant = 'amber',
  size = 'md',
  icon,
  className = '',
}: BadgeProps) {
  const classes = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {icon}
      <span>{label ?? children}</span>
    </span>
  );
}
