import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppFloat.module.css';

interface WhatsAppFloatProps {
  whatsapp: string;
}

export function WhatsAppFloat({ whatsapp }: WhatsAppFloatProps) {
  const cleanWa = whatsapp.replace(/[^\d]/g, '');
  const msg = encodeURIComponent(
    'Hello Raj Shuttering, I need a quote for shuttering / scaffolding.'
  );

  return (
    <a
      className={styles.floatBtn}
      href={`https://wa.me/${cleanWa}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} fill="currentColor" />
    </a>
  );
}
