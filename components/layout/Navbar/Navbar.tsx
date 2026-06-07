'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navbar.module.css';

interface NavbarProps {
  phone: string;
  whatsapp: string;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar({ phone, whatsapp }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const cleanWa = whatsapp.replace(/[^\d]/g, '');

  return (
    <>
      <nav className={[styles.navbar, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label="Raj Shuttering home">
            <span className={styles.logoMark} aria-hidden="true">
              <img className={styles.logoIcon} src="/logo-mark.svg" alt="" width={26} height={26} />
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoTitle}>Raj Shuttering</span>
              <span className={styles.logoSub}>Est. 2008 &middot; Varanasi</span>
            </span>
          </Link>

          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[styles.navLink, isActive(link.href) ? styles.navLinkActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.cta}>
            <a className={styles.callBtn} href={`tel:${cleanPhone}`} aria-label="Call us">
              <Phone size={16} />
              <span>{phone}</span>
            </a>
            <span className={styles.desktopCta}>
              <Button href="/contact" variant="primary" size="sm">
                Get a Quote
              </Button>
            </span>

            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMenuOpen((s) => !s)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={[styles.mobileMenu, menuOpen ? styles.mobileMenuOpen : ''].filter(Boolean).join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[styles.mobileLink, isActive(link.href) ? styles.mobileLinkActive : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.mobileContact}>
          <Button href="/contact" variant="primary" size="lg" fullWidth>
            Get a Quote
          </Button>
          <a className={styles.mobilePhone} href={`tel:${cleanPhone}`}>
            {phone}
          </a>
          <a
            className={styles.mobileWhatsapp}
            href={`https://wa.me/${cleanWa}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
