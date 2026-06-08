'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Images, type LucideIcon } from 'lucide-react';
import type { Service } from '@/lib/types';
import styles from './ServicesGrid.module.css';

const CATEGORY_LABELS: Record<Service['category'], string> = {
  shuttering: 'Shuttering',
  scaffolding: 'Scaffolding',
  equipment: 'Equipment',
  other: 'Wholesale',
};

interface ServiceCardProps {
  service: Service;
  index: number;
  Icon: LucideIcon;
  images: string[];
  onOpen: () => void;
}

export function ServiceCard({ service, index, Icon, images, onOpen }: ServiceCardProps) {
  const reduce = useReducedMotion();
  const photoCount = images.length;
  const cover = images[0] ?? service.imageUrl;
  const clickable = photoCount > 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  const cardClass = [styles.card, clickable ? styles.cardClickable : '', styles.cardAnimated]
    .filter(Boolean)
    .join(' ');

  if (reduce) {
    return (
      <article
        className={cardClass}
        onClick={clickable ? onOpen : undefined}
        onKeyDown={handleKeyDown}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={clickable ? `View ${photoCount} photos of ${service.name}` : undefined}
      >
        <CardContent
          service={service}
          Icon={Icon}
          cover={cover}
          photoCount={photoCount}
          clickable={clickable}
        />
      </article>
    );
  }

  return (
    <motion.article
      className={cardClass}
      onClick={clickable ? onOpen : undefined}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `View ${photoCount} photos of ${service.name}` : undefined}
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={clickable ? { scale: 0.97 } : undefined}
    >
      <CardContent
        service={service}
        Icon={Icon}
        cover={cover}
        photoCount={photoCount}
        clickable={clickable}
        animated
      />
    </motion.article>
  );
}

function CardContent({
  service,
  Icon,
  cover,
  photoCount,
  clickable,
  animated = false,
}: {
  service: Service;
  Icon: LucideIcon;
  cover?: string;
  photoCount: number;
  clickable: boolean;
  animated?: boolean;
}) {
  const reduce = useReducedMotion();
  const showMedia = Boolean(cover);

  const FeatureTag = animated && !reduce ? motion.li : 'li';
  const featureProps = (i: number) =>
    animated && !reduce
      ? {
          initial: { opacity: 0, x: -14 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { delay: 0.2 + i * 0.07, duration: 0.4 },
        }
      : {};

  const MediaInner = animated && !reduce ? motion.div : 'div';
  const mediaInnerProps =
    animated && !reduce
      ? {
          initial: { scale: 1.08 },
          whileInView: { scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          className: styles.cardMediaInner,
        }
      : { className: styles.cardMediaInner };

  return (
    <>
      {showMedia && (
        <div className={styles.cardMedia}>
          <MediaInner {...mediaInnerProps}>
            <Image
              src={cover!}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className={styles.cardMediaImg}
            />
          </MediaInner>
          <div className={styles.cardMediaShade} aria-hidden="true" />
          <span className={styles.cardCategory}>{CATEGORY_LABELS[service.category]}</span>
          {photoCount > 0 && (
            <span className={styles.photoBadge}>
              <Images size={14} />
              {photoCount} Photos
            </span>
          )}
          <span className={styles.cardMediaIcon}>
            <Icon size={22} />
          </span>
        </div>
      )}

      {!showMedia && (
        <div className={styles.cardTop}>
          <span className={styles.iconCircle}>
            <Icon size={24} />
          </span>
          {photoCount > 0 && (
            <span className={styles.photoBadge}>
              <Images size={14} />
              {photoCount} Photos
            </span>
          )}
        </div>
      )}

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{service.name}</h3>
        <p className={styles.cardDesc}>{service.shortDescription}</p>

        <ul className={styles.features}>
          {service.features.slice(0, 3).map((f, i) => (
            <FeatureTag key={f} className={styles.featurePill} {...featureProps(i)}>
              <Check size={12} className={styles.featureIcon} aria-hidden="true" />
              <span>{f}</span>
            </FeatureTag>
          ))}
        </ul>

        <div className={styles.cardBottom}>
          <div className={styles.availability}>
            {service.availableFor.map((av) => (
              <span key={av} className={styles.availChip}>{av}</span>
            ))}
          </div>
          {clickable && (
            <span className={styles.viewPhotos}>
              View Gallery <ArrowRight size={16} />
            </span>
          )}
        </div>
      </div>
    </>
  );
}
