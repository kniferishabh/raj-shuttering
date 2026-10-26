import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, DM_Sans, Instrument_Serif } from 'next/font/google';
import { getSettings } from '@/lib/settings';
import { ThemeStyles } from '@/components/theme/ThemeStyles';
import { PublicChrome } from '@/components/layout/PublicChrome/PublicChrome';
import './globals.css';

// Supabase's authenticated REST client is intentionally request-time, while the
// repository layer below it caches public data and is explicitly invalidated by admin edits.
export const dynamic = 'force-dynamic';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  variable: '--font-accent',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      template: `%s | ${settings.businessName}`,
      default: settings.metaTitle,
    },
    description: settings.metaDescription,
    applicationName: settings.businessName,
    alternates: { canonical: '/' },
    keywords: [
      'shuttering varanasi',
      'scaffolding varanasi',
      'shuttering on rent varanasi',
      'scaffolding on rent',
      'steel shuttering plates',
      'aluminium scaffolding',
      'acrow props',
      'centering plates',
      'construction equipment varanasi',
      'pandeypur shuttering',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      title: settings.metaTitle,
      description: settings.metaDescription,
      siteName: settings.businessName,
      images: ['/og-image.svg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.metaTitle,
      description: settings.metaDescription,
    },
    robots: { index: true, follow: true },
    icons: {
      icon: '/logo.svg',
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#business`,
    name: settings.businessName,
    description: settings.metaDescription,
    url: siteUrl,
    telephone: settings.phone[0],
    email: settings.email,
    foundingDate: String(settings.establishedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: settings.city,
      postalCode: settings.pincode,
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} ${instrument.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c') }}
        />
        <ThemeStyles paletteId={settings.colorPalette} customColors={settings.customColors} />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <PublicChrome settings={settings}>{children}</PublicChrome>
      </body>
    </html>
  );
}
