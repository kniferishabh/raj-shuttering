import { Phone, MessageCircle } from 'lucide-react';
import styles from './ContactCTA.module.css';

interface ContactCTAProps {
  phone: string;
  whatsapp: string;
}

export function ContactCTA({ phone, whatsapp }: ContactCTAProps) {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const cleanWa = whatsapp.replace(/[^\d]/g, '');
  const waMessage = encodeURIComponent(
    'Hello Raj Shuttering, I would like to get a quote for shuttering / scaffolding.'
  );

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={styles.eyebrow}>Ready to Build?</span>
          <h2 className={styles.heading}>Ready to Start Your Project?</h2>
          <a className={styles.phone} href={`tel:${cleanPhone}`}>{phone}</a>
        </div>

        <div className={styles.actions}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={`tel:${cleanPhone}`}>
            <Phone size={18} />
            Call Now
          </a>
          <a
            className={`${styles.btn} ${styles.whatsappBtn}`}
            href={`https://wa.me/${cleanWa}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
