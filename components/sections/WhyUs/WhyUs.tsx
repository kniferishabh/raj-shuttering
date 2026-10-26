import { ArrowRight, Check, Calendar, MapPin, ClipboardCheck, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import styles from './WhyUs.module.css';

interface WhyUsProps {
  aboutText: string;
  establishedYear: number;
  city: string;
  area: string;
}

const BULLETS = [
  { title: 'Inspected Inventory', desc: 'Equipment checked before supply' },
  { title: 'Local Coordination', desc: 'Practical support for Varanasi sites' },
  { title: 'Clear Quotations', desc: 'Discuss quantities, duration and pricing upfront' },
  { title: 'Serving Since 2008', desc: 'Local construction equipment experience' },
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
            {BULLETS.map((b, idx) => (
              <Reveal key={b.title} delay={idx * 0.08} y={24} scale={0.97}>
              <div className={styles.bullet}>
                <span className={styles.checkIcon}>
                  <Check size={18} strokeWidth={3} />
                </span>
                <span className={styles.bulletText}>
                  <span className={styles.bulletTitle}>{b.title}</span>
                  <span className={styles.bulletDesc}>{b.desc}</span>
                </span>
              </div>
              </Reveal>
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
                <PackageCheck size={22} />
              </span>
              <div className={styles.bulletText}>
                <span className={styles.infoLabel}>Flexible Supply</span>
                <span className={styles.bulletTitle}>
                  Rental & Wholesale Options
                </span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <ClipboardCheck size={22} />
              </span>
              <div className={styles.bulletText}>
                <span className={styles.infoLabel}>Before Dispatch</span>
                <span className={styles.bulletTitle}>
                  Inventory Condition Checked
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
