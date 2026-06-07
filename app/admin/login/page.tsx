import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { LoginForm } from './LoginForm';
import styles from './login.module.css';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; callbackUrl?: string };
}) {
  const session = await auth();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>RS</span>
          <div>
            <h1 className={styles.brandTitle}>Raj Shuttering</h1>
            <p className={styles.brandSub}>Admin Panel</p>
          </div>
        </div>

        <h2 className={styles.heading}>Sign In</h2>
        <p className={styles.subheading}>Enter your credentials to manage the website.</p>

        <LoginForm error={searchParams.error} callbackUrl={searchParams.callbackUrl} />

        <p className={styles.hint}>
          For admin access only. Public visitors can return to the{' '}
          <a href="/">main site</a>.
        </p>
      </div>
    </div>
  );
}
