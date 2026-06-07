import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { signOut } from '@/lib/auth';
import { safeReadArray } from '@/lib/db';
import { AdminSidebar } from '@/components/layout/AdminSidebar/AdminSidebar';
import type { Enquiry } from '@/lib/types';
import styles from './admin.module.css';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

async function handleSignOut() {
  'use server';
  await signOut({ redirectTo: '/admin/login' });
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isLoginRoute = pathname === '/admin/login';

  if (isLoginRoute) {
    return <>{children}</>;
  }

  const enquiries = safeReadArray<Enquiry>('enquiries.json');
  const unreadCount = enquiries.filter((e) => !e.isRead).length;

  return (
    <div className={styles.shell}>
      <AdminSidebar unreadCount={unreadCount} signOutAction={handleSignOut} />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
