import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';
import type { BusinessSettings } from '@/lib/types';
import styles from './Footer.module.css';

interface FooterProps {
  settings: BusinessSettings;
}

export function Footer({ settings }: FooterProps) {
  const cleanPhone = settings.phone[0]?.replace(/[^\d+]/g, '') ?? '';
  const cleanWa = settings.whatsapp.replace(/[^\d]/g, '');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={`${styles.column} ${styles.brand}`}>
            <Link href="/" className={styles.brandLogo}>
              <span className={styles.logoMark} aria-hidden="true">RS</span>
              <span className={styles.brandName}>{settings.businessName}</span>
            </Link>
            <p className={styles.tagline}>&ldquo;{settings.tagline}&rdquo;</p>
            <span className={styles.established}>
              Established {settings.establishedYear} &middot; {settings.city}
            </span>
            <div className={styles.social}>
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {settings.socialLinks.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          <div className={styles.column}>
            <h4>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Services</h4>
            <ul className={styles.linkList}>
              <li><Link href="/services">Steel Shuttering Plates</Link></li>
              <li><Link href="/services">Aluminium Scaffolding</Link></li>
              <li><Link href="/services">Steel Props</Link></li>
              <li><Link href="/services">H-Frame Scaffolding</Link></li>
              <li><Link href="/services">Centering Equipment</Link></li>
              <li><Link href="/services">Wholesale Supply</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Contact</h4>
            <ul className={styles.linkList}>
              <li>
                <a href={`tel:${cleanPhone}`}>
                  <span className={styles.icon}><Phone size={14} /></span>
                  {settings.phone[0]}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer">
                  <span className={styles.icon} style={{ color: '#25D366' }}><MessageCircle size={14} /></span>
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`}>
                  <span className={styles.icon}><Mail size={14} /></span>
                  {settings.email}
                </a>
              </li>
              <li>
                <span>
                  <span className={styles.icon}><MapPin size={14} /></span>
                  {settings.address}, {settings.city} - {settings.pincode}
                </span>
              </li>
              <li>
                <span>
                  <span className={styles.icon}><Clock size={14} /></span>
                  {settings.openingHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>&copy; {year} {settings.businessName}. All rights reserved.</span>
          <span>{settings.city}, UP - {settings.pincode}</span>
        </div>
      </div>
    </footer>
  );
}
