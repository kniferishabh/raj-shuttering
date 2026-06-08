'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat/WhatsAppFloat';
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress';
import type { BusinessSettings } from '@/lib/types';

interface PublicChromeProps {
  settings: BusinessSettings;
  children: ReactNode;
}

export function PublicChrome({ settings, children }: PublicChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar phone={settings.phone[0] ?? ''} whatsapp={settings.whatsapp} />
      <main id="main-content">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
    </>
  );
}
