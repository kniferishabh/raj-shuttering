'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowRight, Check, Images, type LucideIcon } from 'lucide-react';
import type { Service } from '@/lib/types';
import styles from './ServicesGrid.module.css';

const CATEGORY_LABELS: Record<Service['category'], string> = {
  shuttering: 'Shuttering',
  scaffolding: 'Scaffolding',
  equipment: 'Equipment',
  other: 'Wholesale',
};

const SERVICE_DETAIL_LINKS: Record<string, string> = {
  'svc-023': '/services/shuttering-plates-on-rent-varanasi',
  'svc-027': '/services/scaffolding-on-rent-varanasi',
  'svc-015': '/services/scaffolding-on-rent-varanasi',
  'svc-013': '/services/steel-props-on-rent-varanasi',
};

interface ServiceCardProps {
  service: Service;
  index: number;
  Icon: LucideIcon;
  images: string[];
  onOpen: () => void;
}

export function ServiceCard({ service, index, Icon, images, onOpen }: ServiceCardProps) {
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

  return (
    <article
      className={cardClass}
      style={{ '--card-index': index % 6 } as CSSProperties}
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

function CardContent({
  service,
  Icon,
  cover,
  photoCount,
  clickable,
}: {
  service: Service;
  Icon: LucideIcon;
  cover?: string;
  photoCount: number;
  clickable: boolean;
}) {
  const showMedia = Boolean(cover);
  const detailHref = SERVICE_DETAIL_LINKS[service.id];

  return (
    <>
      {showMedia && (
        <div className={styles.cardMedia}>
          <div className={styles.cardMediaInner}>
            <Image
              src={cover!}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className={styles.cardMediaImg}
            />
          </div>
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
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className={styles.featurePill}>
              <Check size={12} className={styles.featureIcon} aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className={styles.cardBottom}>
          <div className={styles.availability}>
            {service.availableFor.map((av) => (
              <span key={av} className={styles.availChip}>{av}</span>
            ))}
          </div>
          {detailHref && (
            <Link
              href={detailHref}
              className={styles.detailsLink}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              Details <ArrowRight size={16} />
            </Link>
          )}
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
