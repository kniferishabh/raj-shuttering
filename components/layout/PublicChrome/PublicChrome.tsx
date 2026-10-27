'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

interface PublicChromeProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export function PublicChrome({ header, footer, children }: PublicChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main id="main-content">{children}</main>
      {footer}
    </>
  );
}
