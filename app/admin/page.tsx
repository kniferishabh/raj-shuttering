import Link from 'next/link';
import { Wrench, Image as ImageIcon, Inbox, MessageSquare, Plus, ArrowRight } from 'lucide-react';
import { safeReadArray } from '@/lib/db';
import type { Service, GalleryItem, Testimonial, Enquiry } from '@/lib/types';
import { Badge } from '@/components/ui/Badge/Badge';
import styles from './dashboard.module.css';
import adminStyles from './admin.module.css';

export default function AdminDashboardPage() {
  const services = safeReadArray<Service>('services.json');
  const gallery = safeReadArray<GalleryItem>('gallery.json');
  const testimonials = safeReadArray<Testimonial>('testimonials.json');
  const enquiries = safeReadArray<Enquiry>('enquiries.json').sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const unread = enquiries.filter((e) => !e.isRead).length;
  const approved = testimonials.filter((t) => t.isApproved).length;
  const recent = enquiries.slice(0, 5);

  const stats = [
    { label: 'Total Services', value: services.length, icon: Wrench, href: '/admin/services' },
    { label: 'Gallery Items', value: gallery.length, icon: ImageIcon, href: '/admin/gallery' },
    { label: 'Unread Enquiries', value: unread, icon: Inbox, href: '/admin/enquiries', highlight: unread > 0 },
    { label: 'Approved Reviews', value: approved, icon: MessageSquare, href: '/admin/testimonials' },
  ];

  return (
    <div>
      <header className={adminStyles.pageHead}>
        <h1 className={adminStyles.pageTitle}>Dashboard</h1>
        <p className={adminStyles.pageSubtitle}>
          Welcome back. Here&apos;s what&apos;s happening on the site.
        </p>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className={[styles.statCard, s.highlight ? styles.statHighlight : ''].filter(Boolean).join(' ')}
            >
              <span className={styles.statIcon}>
                <Icon size={22} />
              </span>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statArrow}>
                <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>

      <div className={styles.row}>
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Recent Enquiries</h2>
            <Link href="/admin/enquiries" className={styles.panelLink}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className={adminStyles.emptyState}>No enquiries yet.</div>
          ) : (
            <table className={adminStyles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.projectType}</td>
                    <td>{new Date(e.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      {e.isRead ? (
                        <Badge label="Read" variant="neutral" size="sm" />
                      ) : (
                        <Badge label="New" variant="amber" size="sm" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <aside className={styles.quickActions}>
          <h2 className={styles.panelTitle}>Quick Actions</h2>
          <Link href="/admin/services" className={styles.action}>
            <Plus size={16} />
            <span>Add Service</span>
          </Link>
          <Link href="/admin/gallery" className={styles.action}>
            <Plus size={16} />
            <span>Upload Photo</span>
          </Link>
          <Link href="/admin/testimonials" className={styles.action}>
            <Plus size={16} />
            <span>Add Testimonial</span>
          </Link>
          <Link href="/admin/enquiries" className={styles.action}>
            <Inbox size={16} />
            <span>View Enquiries</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
