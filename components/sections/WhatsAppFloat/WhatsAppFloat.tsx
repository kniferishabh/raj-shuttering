'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon/WhatsAppIcon';
import styles from './WhatsAppFloat.module.css';

interface WhatsAppFloatProps {
  whatsapp: string;
}

const SCROLL_THRESHOLD = 80;

export function WhatsAppFloat({ whatsapp }: WhatsAppFloatProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cleanWa = whatsapp.replace(/[^\d]/g, '');
  const msg = encodeURIComponent(
    'Hello Raj Shuttering, I need a quote for shuttering / scaffolding.'
  );

  if (scrolled) {
    return (
      <button
        type="button"
        className={[styles.floatBtn, styles.scrollTopBtn].join(' ')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ChevronUp size={28} strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <a
      className={styles.floatBtn}
      href={`https://wa.me/${cleanWa}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
