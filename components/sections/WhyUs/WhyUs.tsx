import { ArrowRight, Check, Calendar, MapPin, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './WhyUs.module.css';

interface WhyUsProps {
  aboutText: string;
  establishedYear: number;
  city: string;
  area: string;
}

const BULLETS = [
  { title: 'Certified Materials', desc: 'IS-compliant quality you can trust' },
  { title: 'On-Time Delivery', desc: 'Same-day dispatch in Varanasi' },
  { title: 'Transparent Pricing', desc: 'Fair rates with GST invoices' },
  { title: '16+ Years Local', desc: 'Deep Purvanchal market roots' },
];

export function WhyUs({ aboutText, establishedYear, city, area }: WhyUsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={styles.eyebrow}>Why Choose Raj Shuttering</span>
          <h2 className={styles.heading}>Built on Trust,<br />Delivered with Quality</h2>
          <p className={styles.intro}>{aboutText}</p>

          <div className={styles.bullets}>
            {BULLETS.map((b) => (
              <div key={b.title} className={styles.bullet}>
                <span className={styles.checkIcon}>
                  <Check size={18} strokeWidth={3} />
                </span>
                <span className={styles.bulletText}>
                  <span className={styles.bulletTitle}>{b.title}</span>
                  <span className={styles.bulletDesc}>{b.desc}</span>
                </span>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <Button href="/about" variant="primary" icon={<ArrowRight size={18} />}>
              About Our Story
            </Button>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.accentSquare} />
          <div className={styles.cardStack}>
            <div className={`${styles.infoCard} ${styles.infoCardLarge}`}>
              <span className={styles.infoLabel}>Established</span>
              <span className={styles.infoValue}>{establishedYear}</span>
              <span className={styles.infoSub}>
                <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
                {area}, {city}
              </span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <Star size={22} fill="currentColor" />
              </span>
              <div className={styles.bulletText}>
                <span className={styles.infoLabel}>4.5 Rating</span>
                <span className={styles.bulletTitle}>
                  61+ Verified Reviews
                </span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <ShieldCheck size={22} />
              </span>
              <div className={styles.bulletText}>
                <span className={styles.infoLabel}>Quality Assured</span>
                <span className={styles.bulletTitle}>
                  IS Compliant Materials
                </span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <Calendar size={22} />
              </span>
              <div className={styles.bulletText}>
                <span className={styles.infoLabel}>Open Mon-Sat</span>
                <span className={styles.bulletTitle}>
                  8:30 AM - 7:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
