'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import type { GalleryCategory, GalleryItem } from '@/lib/types';
import styles from './GalleryGrid.module.css';

interface GalleryGridProps {
  items: GalleryItem[];
  showFilters?: boolean;
  showFooterCta?: boolean;
  featuredOnly?: boolean;
}

const TABS: Array<{ value: 'all' | GalleryCategory; label: string }> = [
  { value: 'all', label: 'All Work' },
  { value: 'shuttering', label: 'Shuttering' },
  { value: 'scaffolding', label: 'Scaffolding' },
  { value: 'project', label: 'Project Sites' },
  { value: 'equipment', label: 'Equipment' },
];

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  shuttering: 'Shuttering',
  scaffolding: 'Scaffolding',
  project: 'Project Site',
  equipment: 'Equipment',
};

export function GalleryGrid({
  items,
  showFilters = true,
  showFooterCta = false,
  featuredOnly = false,
}: GalleryGridProps) {
  const [tab, setTab] = useState<'all' | GalleryCategory>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
    const base = featuredOnly ? sorted.filter((i) => i.isFeatured) : sorted;
    return tab === 'all' ? base : base.filter((i) => i.category === tab);
  }, [items, featuredOnly, tab]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIdx(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goPrev = useCallback(() => {
    setLightboxIdx((idx) => (idx === null ? null : (idx - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIdx((idx) => (idx === null ? null : (idx + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIdx, closeLightbox, goNext, goPrev]);

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {showFilters && (
          <div className={styles.tabs} role="tablist" aria-label="Gallery filter">
            {TABS.map((t) => (
              <button
                key={t.value}
                role="tab"
                aria-selected={tab === t.value}
                type="button"
                className={[styles.tab, tab === t.value ? styles.tabActive : ''].filter(Boolean).join(' ')}
                onClick={() => setTab(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className={styles.empty}>No items found.</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                className={styles.item}
                onClick={() => openLightbox(idx)}
                type="button"
                aria-label={`View ${item.title}`}
              >
                <span className={styles.imageWrap}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.img}
                  />
                  <span className={styles.viewIcon} aria-hidden="true">
                    <Maximize2 size={18} />
                  </span>
                </span>
                <span className={styles.overlay}>
                  <span className={styles.itemCategory} data-cat={item.category}>
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  <span className={styles.itemTitle}>{item.title}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {showFooterCta && (
          <div className={styles.footRow}>
            <Button href="/gallery" variant="ghost" size="lg" icon={<ArrowRight size={18} />}>
              View Full Gallery
            </Button>
          </div>
        )}
      </div>

      {active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImage}>
              <Image
                src={active.imageUrl}
                alt={active.title}
                width={1200}
                height={800}
                priority
              />
            </div>
            <div className={styles.lightboxInfo}>
              <h3 className={styles.lightboxTitle}>{active.title}</h3>
              {active.description && <p className={styles.lightboxDesc}>{active.description}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
