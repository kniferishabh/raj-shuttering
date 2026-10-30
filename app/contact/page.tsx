import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon/WhatsAppIcon';
import { getSettings } from '@/lib/settings';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ContactForm } from '@/components/sections/ContactForm/ContactForm';
import { MapEmbed } from '@/components/sections/MapEmbed/MapEmbed';
import styles from './contact.module.css';
import { mergeSiteContent } from '@/lib/site-content';
import { createPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return createPageMetadata({ settings, title: `Contact ${settings.businessName} | Request a Quote`, description: `Contact ${settings.businessName} in ${settings.city} for shuttering, scaffolding and formwork equipment rental, wholesale supply, availability and quotations.`, path: '/contact', image: '/images/shuttering-steel.jpg', keywords: ['shuttering quotation', 'scaffolding rental contact', `construction equipment ${settings.city}`] });
}

export default async function ContactPage() {
  const settings = await getSettings();
  const cleanPhone = settings.phone[0]?.replace(/[^\d+]/g, '') ?? '';
  const cleanWa = settings.whatsapp.replace(/[^\d]/g, '');
  const waMessage = encodeURIComponent('Hello Raj Shuttering, I need a quote.');
  const c = mergeSiteContent(settings.siteContent);

  const contactCards = [
    {
      icon: Phone,
      label: 'Call Us',
      value: settings.phone[0] ?? '',
      action: { href: `tel:${cleanPhone}`, text: 'Call now' },
    },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: settings.whatsapp,
      action: {
        href: `https://wa.me/${cleanWa}?text=${waMessage}`,
        text: 'Chat on WhatsApp',
        external: true,
      },
    },
    {
      icon: Mail,
      label: 'Email',
      value: settings.email,
      action: { href: `mailto:${settings.email}`, text: 'Send email' },
    },
  ];

  return (
    <>
      <PageHero
        title={c['contact.heroTitle']}
        subtitle={c['contact.heroSubtitle']}
        currentLabel="Contact"
        path="/contact"
      />

      <section className={styles.cardSection}>
        <div className={styles.inner}>
          <div className={styles.cardGrid}>
            {contactCards.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.action.href}
                  className={styles.contactCard}
                  target={c.action.external ? '_blank' : undefined}
                  rel={c.action.external ? 'noopener noreferrer' : undefined}
                >
                  <span className={styles.cardIcon}>
                    <Icon size={24} />
                  </span>
                  <span className={styles.cardLabel}>{c.label}</span>
                  <span className={styles.cardValue}>{c.value}</span>
                  <span className={styles.cardAction}>{c.action.text} &rarr;</span>
                </a>
              );
            })}
          </div>

          <div className={styles.formGrid}>
            <ContactForm content={{ title:c['contact.formTitle'], subtitle:c['contact.formSubtitle'], successTitle:c['contact.successTitle'], successText:c['contact.successText'] }} />
            <div className={styles.sideCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>{c['contact.visitTitle']}</h3>
                <ul className={styles.infoList}>
                  <li>
                    <MapPin size={16} />
                    <span>
                      {settings.address}
                      <br />
                      {settings.city} - {settings.pincode}
                    </span>
                  </li>
                  <li>
                    <Clock size={16} />
                    <span>{settings.openingHours}</span>
                  </li>
                  <li>
                    <Phone size={16} />
                    <a href={`tel:${cleanPhone}`}>{settings.phone[0]}</a>
                  </li>
                </ul>
              </div>
              <MapEmbed label={`${settings.address}, ${settings.city}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
