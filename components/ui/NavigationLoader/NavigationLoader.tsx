'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './NavigationLoader.module.css';

export function NavigationLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = () => {
    setLoading(true);
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    safetyTimer.current = setTimeout(() => setLoading(false), 15000);
  };

  useEffect(() => {
    setLoading(false);
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
  }, [pathname]);

  useEffect(() => {
    if (!loading) return;
    const pageElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && !element.hasAttribute('data-navigation-loader'),
    );
    const changedElements = pageElements.filter((element) => !element.inert);
    changedElements.forEach((element) => { element.inert = true; });

    return () => {
      changedElements.forEach((element) => { element.inert = false; });
    };
  }, [loading]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) return;

      event.preventDefault();
      startLoading();
      router.push(`${destination.pathname}${destination.search}${destination.hash}`);
    };

    const handleHistoryNavigation = () => startLoading();
    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handleHistoryNavigation);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handleHistoryNavigation);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Loading page" data-navigation-loader>
      <span className={styles.logoStage} aria-hidden="true">
        <img src="/images/brand/raj-circular-logo.png" alt="" width={76} height={76} />
      </span>
    </div>
  );
}
