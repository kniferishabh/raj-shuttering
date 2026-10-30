import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  Hammer,
  House,
  Images,
  Landmark,
  Layers3,
  MapPin,
  PackageCheck,
  Phone,
  Plane,
  School,
  ShieldCheck,
  Star,
  TrainFront,
  Truck,
  Wrench,
  Factory,
  type LucideIcon,
} from 'lucide-react';
import { listGalleryItems, listServices, listTestimonials } from '@/lib/data';
import { getHeroVideoConfig } from '@/lib/media';
import { getSettings } from '@/lib/settings';
import { HeroVideo } from '@/components/sections/Hero/HeroVideo';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon/WhatsAppIcon';
import { interpolateContent, mergeSiteContent } from '@/lib/site-content';
import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: { absolute: settings.metaTitle },
    description: settings.metaDescription,
    keywords: settings.metaKeywords?.split(',').map((keyword) => keyword.trim()).filter(Boolean),
    alternates: { canonical: '/' },
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      url: '/',
    },
    twitter: {
      title: settings.metaTitle,
      description: settings.metaDescription,
    },
  };
}

const serviceIcons: LucideIcon[] = [Layers3, Building2, Wrench, Hammer, PackageCheck, ShieldCheck];
const priorityIds = ['svc-023', 'svc-027', 'svc-013', 'svc-005', 'svc-006', 'svc-015'];

function serviceHref(id: string) {
  if (id === 'svc-023') return '/services/shuttering-plates-on-rent-varanasi';
  if (id === 'svc-027' || id === 'svc-015') return '/services/scaffolding-on-rent-varanasi';
  if (id === 'svc-013') return '/services/steel-props-on-rent-varanasi';
  if (id === 'svc-005') return '/services/u-head-jack-on-rent-varanasi';
  if (id === 'svc-006') return '/services/base-jack-on-rent-varanasi';
  return '/services';
}

export default async function HomePage() {
  const [settings, allServices, allGallery, allTestimonials] = await Promise.all([
    getSettings(), listServices(), listGalleryItems(), listTestimonials(),
  ]);

  const services = allServices.filter((item) => item.isActive).sort((a, b) => {
    const ai = priorityIds.indexOf(a.id);
    const bi = priorityIds.indexOf(b.id);
    if (ai < 0 && bi < 0) return a.sortOrder - b.sortOrder;
    if (ai < 0) return 1;
    if (bi < 0) return -1;
    return ai - bi;
  }).slice(0, 6);
  const gallery = [...allGallery].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.sortOrder - b.sortOrder).slice(0, 4);
  const testimonials = allTestimonials.filter((item) => item.isApproved).slice(0, 3);
  const hero = getHeroVideoConfig(settings);
  const cleanPhone = settings.phone[0]?.replace(/[^\d+]/g, '') ?? '';
  const cleanWhatsapp = settings.whatsapp.replace(/[^\d]/g, '');
  const c = mergeSiteContent(settings.siteContent);
  const vars = { year: settings.establishedYear, city: settings.city, businessName: settings.businessName };
  const locations = c['home.locationsList'].split(',').map((item) => item.trim()).filter(Boolean);
  const industryIcons: LucideIcon[] = [House, Building2, Factory, Landmark, School, TrainFront, Plane];
  const industries = c['home.industriesList'].split(',').map((item) => item.trim()).filter(Boolean);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroMedia}><HeroVideo video={hero} /></div>
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Trusted since {settings.establishedYear} · Serving across India</span>
            <h1 id="home-title">{settings.heroHeadline}</h1>
            <p>{settings.heroSubheadline}</p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryButton}>{c['home.primaryCta']} <ArrowRight size={17} /></Link>
              <Link href="/gallery" className={styles.ghostButton}>{c['home.secondaryCta']}</Link>
            </div>
          </div>

          <div className={styles.serviceShelf}>
            <div className={styles.shelfTitle}><h2>{c['home.equipmentTitle']}</h2><span>{c['home.equipmentSubtitle']}</span></div>
            <div className={styles.serviceGrid}>
              {services.map((service, index) => {
                const Icon = serviceIcons[index] ?? Wrench;
                return <Link href={serviceHref(service.id)} className={styles.serviceCard} key={service.id}>
                  <Icon size={25} /><div><h3>{service.name}</h3><p>{service.shortDescription}</p></div><ArrowRight className={styles.cardArrow} size={16} />
                </Link>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionTitle}><span>{c['home.whyEyebrow']}</span><h2>{c['home.whyTitle']}</h2></div>
          <div className={styles.whyGrid}>
            <div className={styles.whyImage}><Image src="/images/equipment-worker.jpg" alt="Construction professional at an active project site" fill sizes="(max-width: 768px) 100vw, 38vw" /></div>
            <div className={styles.advantages}>
              {[BadgeCheck,ShieldCheck,PackageCheck,Truck,Clock3].map((Icon,index) => <article key={index}><Icon /><div><strong>{interpolateContent(c[`home.advantage${index + 1}Title`], vars)}</strong><span>{c[`home.advantage${index + 1}Text`]}</span></div></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionTitle} ${styles.lightTitle}`}><span>{c['home.workEyebrow']}</span><h2>{c['home.workTitle']}</h2></div>
          {gallery.length ? <div className={styles.projectGrid}>{gallery.map((item) => <Link href="/gallery" key={item.id} className={styles.projectCard}><Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 640px) 100vw, 25vw" /><span><Images size={15} /> {item.title}</span></Link>)}</div> : null}
          <Link href="/gallery" className={styles.outlineButton}>{c['home.workCta']} <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className={styles.coverageSection} aria-labelledby="coverage-title">
        <div className={styles.sectionInner}>
          <div className={styles.coverageGrid}>
            <div className={styles.mapCard} aria-label="Animated map showing Raj Shuttering service coverage across India">
              <div className={styles.mapCopy}><strong>{c['home.mapTitle']}</strong></div>
              <div className={styles.mapVisual}>
                <Image src="/images/india-outline.svg" alt="Geographical outline map of India" fill sizes="(max-width: 640px) 90vw, 430px" />
                <div className={styles.mapMarkers} aria-hidden="true">
                  {[
                    [59,42,'Varanasi'],[42,28,'Delhi'],[40,23,'Chandigarh'],[34,34,'Jaipur'],[29,44,'Ahmedabad'],[31,58,'Mumbai'],[35,62,'Pune'],[39,68,'Goa'],[48,78,'Bengaluru'],[55,80,'Chennai'],[45,85,'Kochi'],[50,66,'Hyderabad'],[42,49,'Bhopal'],[50,54,'Nagpur'],[52,34,'Lucknow'],[67,39,'Patna'],[72,49,'Kolkata'],[80,37,'Guwahati'],[65,56,'Bhubaneswar'],[39,16,'Jammu'],[45,26,'Dehradun'],[58,53,'Raipur'],
                  ].map(([left,top,label], index) => <span className={`${styles.htmlMarker} ${label === 'Varanasi' ? styles.baseMarker : ''}`} style={{ left:`${left}%`, top:`${top}%`, '--delay':`${index * .12}s` } as CSSProperties} key={String(label)} title={String(label)}><i /></span>)}
                </div>
              </div>
              <b className={styles.mapButton}>{c['home.mapButton']}</b>
              <div className={styles.mapLegend}><span><i /> {c['home.mapBase']}</span><span><i /> {c['home.mapCoverage']}</span><a href="https://commons.wikimedia.org/wiki/File:India_outline.svg" target="_blank" rel="noreferrer">Map: CC BY-SA 3.0</a></div>
            </div>

            <div className={styles.locationsPanel}>
              <h2 id="coverage-title">{c['home.locationsTitle']}</h2>
              <p>{c['home.locationsText']}</p>
              <div className={styles.cityGrid}>{locations.map((city) => <span key={city}><MapPin size={17}/>{city}</span>)}</div>
            </div>

            <div className={styles.industriesPanel}>
              <h2>{c['home.industriesTitle']}</h2>
              <p>{c['home.industriesText']}</p>
              <div className={styles.industryList}>
                {industries.map((label,index) => { const IndustryIcon = industryIcons[index] ?? Building2; return <span key={label}><IndustryIcon size={17}/>{label}</span>; })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length ? <section className={styles.testimonialSection}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionTitle} ${styles.lightTitle}`}><span>{c['home.testimonialsEyebrow']}</span><h2>{c['home.testimonialsTitle']}</h2></div>
          <div className={styles.testimonialGrid}>{testimonials.map((item) => <article key={item.id}><div className={styles.stars}>{Array.from({ length: item.rating }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div><p>“{item.review}”</p><strong>{item.clientName}</strong><span>{item.company ? `${item.company} · ` : ''}{item.location}</span></article>)}</div>
        </div>
      </section> : null}

      <section className={styles.ctaSection}>
        <Image src="/images/project-modern.jpg" alt="Modern construction project" fill sizes="100vw" />
        <div className={styles.ctaShade} />
        <div className={styles.ctaContent}><span>{c['home.ctaEyebrow']}</span><h2>{c['home.ctaTitle']}</h2><p>{c['home.ctaText']}</p><div className={styles.heroActions}><a className={styles.primaryButton} href={`tel:${cleanPhone}`}><Phone size={17} /> {c['shared.callLabel']} {settings.phone[0]}</a><a className={styles.whatsappButton} href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noreferrer"><WhatsAppIcon size={17} /> {c['shared.whatsappLabel']}</a></div></div>
      </section>
    </div>
  );
}
