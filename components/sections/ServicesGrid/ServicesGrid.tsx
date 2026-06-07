'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  Square,
  Layers,
  ArrowUpDown,
  LayoutGrid,
  Grid3X3,
  Package,
  Wrench,
  Building2,
  Hammer,
  HardHat,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Modal } from '@/components/ui/Modal/Modal';
import type { Service, ServiceCategory } from '@/lib/types';
import styles from './ServicesGrid.module.css';

function imagesOf(service: Service): string[] {
  if (service.images && service.images.length) return service.images;
  return service.imageUrl ? [service.imageUrl] : [];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Square,
  Layers,
  ArrowUpDown,
  LayoutGrid,
  Grid3X3,
  Package,
  Wrench,
  Building2,
  Hammer,
  HardHat,
};

const TABS: Array<{ value: 'all' | ServiceCategory; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'shuttering', label: 'Shuttering' },
  { value: 'scaffolding', label: 'Scaffolding' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'other', label: 'Wholesale' },
];

interface ServicesGridProps {
  services?: Service[];
  limit?: number;
  showFooter?: boolean;
  fetchOnClient?: boolean;
}

export function ServicesGrid({
  services: initial,
  limit,
  showFooter = true,
  fetchOnClient = false,
}: ServicesGridProps) {
  const [services, setServices] = useState<Service[]>(initial ?? []);
  const [loading, setLoading] = useState(fetchOnClient && !initial);
  const [tab, setTab] = useState<'all' | ServiceCategory>('all');
  const [active, setActive] = useState<Service | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const activeImages = active ? imagesOf(active) : [];

  const openGallery = useCallback((service: Service) => {
    if (imagesOf(service).length === 0) return;
    setActive(service);
    setImgIdx(0);
  }, []);

  const closeGallery = useCallback(() => setActive(null), []);

  const goPrev = useCallback(() => {
    setImgIdx((i) => (i - 1 + activeImages.length) % activeImages.length);
  }, [activeImages.length]);

  const goNext = useCallback(() => {
    setImgIdx((i) => (i + 1) % activeImages.length);
  }, [activeImages.length]);

  useEffect(() => {
    if (!fetchOnClient || initial) return;
    setLoading(true);
    fetch('/api/services')
      .then((r) => r.json())
      .then((data: Service[]) => setServices(data ?? []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [fetchOnClient, initial]);

  const filtered = useMemo(() => {
    const sorted = [...services].sort((a, b) => a.sortOrder - b.sortOrder);
    const filteredItems = tab === 'all' ? sorted : sorted.filter((s) => s.category === tab);
    return limit ? filteredItems.slice(0, limit) : filteredItems;
  }, [services, tab, limit]);

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        <div className={styles.headRow}>
          <SectionHeader
            eyebrow="What We Offer"
            heading={'Complete Shuttering &\nScaffolding Solutions'}
            subtitle="From small residential slabs to multi-storey commercial projects - we have the right materials and the right expertise."
          />

          <div className={styles.tabs} role="tablist" aria-label="Service category filter">
            {TABS.map((t) => (
              <button
                key={t.value}
                role="tab"
                aria-selected={tab === t.value}
                className={[styles.tab, tab === t.value ? styles.tabActive : ''].filter(Boolean).join(' ')}
                onClick={() => setTab(t.value)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {loading
            ? Array.from({ length: limit ?? 6 }).map((_, i) => <div key={i} className={styles.skeleton} />)
            : filtered.length === 0
              ? <div className={styles.emptyState}>No services available in this category.</div>
              : filtered.map((service) => {
                  const Icon = ICON_MAP[service.icon] ?? Wrench;
                  const photoCount = imagesOf(service).length;
                  return (
                    <article
                      key={service.id}
                      className={[styles.card, photoCount > 0 ? styles.cardClickable : '']
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => openGallery(service)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openGallery(service);
                        }
                      }}
                      role={photoCount > 0 ? 'button' : undefined}
                      tabIndex={photoCount > 0 ? 0 : undefined}
                      aria-label={photoCount > 0 ? `View ${photoCount} photos of ${service.name}` : undefined}
                    >
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
                      <h3 className={styles.cardTitle}>{service.name}</h3>
                      <p className={styles.cardDesc}>{service.shortDescription}</p>
                      <ul className={styles.features}>
                        {service.features.slice(0, 3).map((f) => (
                          <li key={f} className={styles.featurePill}>{f}</li>
                        ))}
                      </ul>
                      <div className={styles.cardBottom}>
                        <div className={styles.availability}>
                          {service.availableFor.map((av) => (
                            <span key={av} className={styles.availChip}>{av}</span>
                          ))}
                        </div>
                        {photoCount > 0 && (
                          <span className={styles.viewPhotos}>
                            View Photos <ArrowRight size={14} />
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
        </div>

        {showFooter && (
          <div className={styles.footRow}>
            <Button href="/services" variant="ghost" size="lg" icon={<ArrowRight size={18} />}>
              View All Services
            </Button>
          </div>
        )}
      </div>

      {active && activeImages.length > 0 && (
        <Modal isOpen onClose={closeGallery} title={active.name} size="lg">
          <div className={styles.gallery}>
            <div className={styles.galleryMain}>
              <Image
                key={activeImages[imgIdx]}
                src={activeImages[imgIdx]}
                alt={`${active.name} — photo ${imgIdx + 1}`}
                fill
                className={styles.galleryImg}
                sizes="(max-width: 768px) 100vw, 720px"
                priority
              />
              {activeImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.galleryNav} ${styles.galleryPrev}`}
                    onClick={goPrev}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.galleryNav} ${styles.galleryNext}`}
                    onClick={goNext}
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <span className={styles.galleryCount}>
                    {imgIdx + 1} / {activeImages.length}
                  </span>
                </>
              )}
            </div>

            {activeImages.length > 1 && (
              <div className={styles.thumbs}>
                {activeImages.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    className={[styles.thumb, i === imgIdx ? styles.thumbActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setImgIdx(i)}
                    aria-label={`Show photo ${i + 1}`}
                  >
                    <Image src={src} alt="" fill sizes="120px" className={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}

            <p className={styles.galleryDesc}>{active.fullDescription}</p>
          </div>
        </Modal>
      )}
    </section>
  );
}
