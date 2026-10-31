import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Manrope, Space_Grotesk } from 'next/font/google';
import { getSettings } from '@/lib/settings';
import { ThemeStyles } from '@/components/theme/ThemeStyles';
import { PublicChrome } from '@/components/layout/PublicChrome/PublicChrome';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat/WhatsAppFloat';
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress';
import { NavigationLoader } from '@/components/ui/NavigationLoader/NavigationLoader';
import { SITE_URL } from '@/lib/site';
import './globals.css';
import { mergeSiteContent } from '@/lib/site-content';

// Public data is cached and explicitly invalidated by admin edits.
export const revalidate = 300;

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-display',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-body',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  preload: false,
  variable: '--font-accent',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${settings.businessName}`,
      default: settings.metaTitle,
    },
    description: settings.metaDescription,
    applicationName: settings.businessName,
    category: 'Construction equipment rental and wholesale',
    creator: settings.businessName,
    publisher: settings.businessName,
    alternates: { canonical: '/' },
    keywords: settings.metaKeywords?.split(',').map((keyword) => keyword.trim()).filter(Boolean),
    openGraph: {
      type: 'website',
      url: SITE_URL,
      locale: 'en_IN',
      title: settings.metaTitle,
      description: settings.metaDescription,
      siteName: settings.businessName,
      images: [{ url: '/images/project-modern.jpg', alt: `${settings.businessName} construction equipment` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.metaTitle,
      description: settings.metaDescription,
      images: ['/images/project-modern.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    icons: {
      icon: '/images/brand/raj-circular-logo.png',
      apple: '/images/brand/raj-circular-logo.png',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const content = mergeSiteContent(settings.siteContent);
  const siteUrl = SITE_URL;
  const verifiedSocialProfiles = Object.values(settings.socialLinks).filter((url): url is string => {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.pathname !== '/' && parsed.pathname !== '';
    } catch {
      return false;
    }
  });
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: settings.businessName,
        description: settings.metaDescription,
        inLanguage: 'en-IN',
        publisher: { '@id': `${siteUrl}/#business` },
      },
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': `${siteUrl}/#business`,
        name: settings.businessName,
        description: settings.metaDescription,
        url: siteUrl,
        logo: `${siteUrl}/images/brand/raj-circular-logo.png`,
        image: `${siteUrl}/images/project-modern.jpg`,
        telephone: settings.phone[0],
        email: settings.email,
        priceRange: '₹₹',
        currenciesAccepted: 'INR',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:30',
          closes: '19:00',
        },
        foundingDate: String(settings.establishedYear),
        slogan: settings.tagline,
        knowsAbout: [
          'Steel shuttering plates',
          'Scaffolding pipes and clamps',
          'Adjustable steel props',
          'U-head jacks and base jacks',
          'Concrete formwork equipment',
          'Construction equipment rental',
        ],
        areaServed: [
          { '@type': 'City', name: settings.city },
          { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
          { '@type': 'Country', name: 'India' },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: settings.phone[0],
          contactType: 'sales',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Shuttering and scaffolding equipment',
          itemListElement: ['Shuttering plates', 'Scaffolding pipes and clamps', 'Adjustable steel props', 'Base jacks and U-head jacks'].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.address,
          addressLocality: settings.city,
          addressRegion: 'Uttar Pradesh',
          postalCode: settings.pincode,
          addressCountry: 'IN',
        },
        ...(verifiedSocialProfiles.length > 0 ? { sameAs: verifiedSocialProfiles } : {}),
      },
    ],
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${instrument.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c') }}
        />
        <ThemeStyles paletteId={settings.colorPalette} customColors={settings.customColors} />
        <NavigationLoader />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <PublicChrome
          header={
            <>
              <ScrollProgress />
              <Navbar businessName={settings.businessName} phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} labels={{ home:content['nav.home'], about:content['nav.about'], services:content['nav.services'], gallery:content['nav.gallery'], contact:content['nav.contact'], quote:content['nav.quote'] }} />
            </>
          }
          footer={
            <>
              <Footer settings={settings} />
              <WhatsAppFloat whatsapp={settings.whatsapp} />
            </>
          }
        >
          {children}
        </PublicChrome>
      </body>
    </html>
  );
}
