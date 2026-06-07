'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Wrench,
  Image as ImageIcon,
  MessageSquare,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

interface AdminSidebarProps {
  unreadCount: number;
  signOutAction: () => Promise<void>;
}

const ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Inbox, badgeKey: 'unread' as const },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar({ unreadCount, signOutAction }: AdminSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((s) => !s)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />}

      <aside className={[styles.sidebar, open ? styles.open : ''].filter(Boolean).join(' ')}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">RS</span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>Raj Shuttering</span>
            <span className={styles.brandSub}>Admin Panel</span>
          </span>
        </div>

        <nav className={styles.nav} aria-label="Admin navigation">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[styles.navItem, active ? styles.active : ''].filter(Boolean).join(' ')}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badgeKey === 'unread' && unreadCount > 0 && (
                  <span className={styles.badge}>{unreadCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <form action={signOutAction}>
          <button type="submit" className={styles.signOut}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </form>
      </aside>
    </>
  );
}
