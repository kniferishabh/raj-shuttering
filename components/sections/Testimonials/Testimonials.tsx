import { Star } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import type { Testimonial } from '@/lib/types';
import styles from './Testimonials.module.css';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          fill={n <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
      ))}
    </div>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const approved = testimonials.filter((t) => t.isApproved);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Client Stories"
          heading="What Our Clients Say"
          subtitle="Real reviews from contractors and builders across Varanasi and Purvanchal."
          align="center"
        />

        {approved.length === 0 ? (
          <div className={styles.empty}>No reviews yet.</div>
        ) : (
          <div className={styles.grid}>
            {approved.map((t) => (
              <article key={t.id} className={styles.card}>
                <StarRow rating={t.rating} />
                <p className={styles.review}>&ldquo;{t.review}&rdquo;</p>
                <div className={styles.author}>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{t.clientName}</span>
                    <span className={styles.authorMeta}>
                      {t.company ? `${t.company}, ` : ''}
                      {t.location}
                    </span>
                  </div>
                  <span className={styles.projectBadge}>{t.projectType}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
