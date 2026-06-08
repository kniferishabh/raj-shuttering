import { ArrowRight, ChevronDown, HardHat, Layers, Square, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import type { HeroVideoConfig } from '@/lib/media';
import { HeroVideo } from './HeroVideo';
import styles from './Hero.module.css';

interface HeroProps {
  headline: string;
  subheadline: string;
  video: HeroVideoConfig;
}

function formatHeadline(text: string) {
  const parts = text.split(/(\.|\?|!)/);
  if (parts.length < 2) return <>{text}</>;
  const mid = Math.floor(parts.length / 2);
  const first = parts.slice(0, mid + 1).join('').trim();
  const second = parts.slice(mid + 1).join('').trim();
  return (
    <>
      {first}
      {second && (
        <>
          <br />
          <span className={styles.headlineAccent}>{second}</span>
        </>
      )}
    </>
  );
}

const MATERIAL_BADGES = [
  { icon: Layers, label: 'Aluminium Scaffolding' },
  { icon: Square, label: 'Steel Shuttering' },
  { icon: HardHat, label: 'On-Site Support' },
];

function formatMobileHeadline(text: string) {
  const parts = text.split(/(\.|\?|!)/).filter(Boolean);
  if (parts.length < 2) return text;
  const first = parts.slice(0, 2).join('').trim();
  const second = parts.slice(2).join('').trim();
  if (!second) return first;
  return (
    <>
      {first}
      <br />
      <span className={styles.mobileHeadlineAccent}>{second}</span>
    </>
  );
}

export function Hero({ headline, subheadline, video }: HeroProps) {
  return (
    <section className={styles.hero} id="hero" aria-label="Hero banner">
      <div className={styles.videoWrap}>
        <HeroVideo video={video} />
        <div className={styles.videoOverlay} aria-hidden="true" />

        <span className={styles.mobileEyebrow}>
          <Zap size={11} />
          Trusted Since 2008
        </span>

        <div className={styles.mobileOverlay}>
          <h1 className={styles.mobileHeadline}>{formatMobileHeadline(headline)}</h1>
          <Button
            href="/contact"
            variant="primary"
            size="md"
            fullWidth
            icon={<ArrowRight size={16} />}
            className={styles.mobileCta}
          >
            Get Free Quote
          </Button>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <Zap size={12} />
            Varanasi&apos;s Trusted Since 2008
          </span>

          <h1 className={styles.headline}>{formatHeadline(headline)}</h1>

          <p className={styles.subhead}>{subheadline}</p>

          <div className={styles.ctas}>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
            >
              Get Free Quote
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              View Services
            </Button>
          </div>

          <ul className={styles.materialBadges} aria-label="Materials we supply">
            {MATERIAL_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <li key={badge.label} className={styles.materialBadge}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{badge.label}</span>
                </li>
              );
            })}
          </ul>

          <div className={styles.trust}>
            <div className={styles.trustItem}>
              <span className={styles.trustValue}>
                <span>&#9733;</span> 4.5
              </span>
              <span className={styles.trustLabel}>Customer Rating</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustValue}>
                16<span>+</span>
              </span>
              <span className={styles.trustLabel}>Years Experience</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustValue}>
                500<span>+</span>
              </span>
              <span className={styles.trustLabel}>Projects Done</span>
            </div>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={`${styles.floatCard} ${styles.card1}`}>
            <span className={styles.cardIcon}>
              <Layers size={20} />
            </span>
            <span className={styles.cardSub}>Premium Material</span>
            <span className={styles.cardTitle}>Aluminium Scaffolding</span>
          </div>

          <div className={`${styles.floatCard} ${styles.card2}`}>
            <span className={styles.cardIcon}>
              <Square size={20} />
            </span>
            <span className={styles.cardSub}>Heavy Duty Steel</span>
            <span className={styles.cardTitle}>Steel Shuttering Plates</span>
          </div>

          <div className={`${styles.floatCard} ${styles.card3}`}>
            <span className={styles.cardIcon}>
              <Star size={20} fill="currentColor" />
            </span>
            <span className={styles.cardSub}>61+ Reviews</span>
            <span className={styles.cardRating}>4.5 &#9733; Rating</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
