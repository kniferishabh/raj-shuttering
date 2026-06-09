import { listEnquiries } from '@/lib/data';
import { EnquiriesManager } from './EnquiriesManager';
import adminStyles from '../admin.module.css';

export default async function AdminEnquiriesPage() {
  const enquiries = (await listEnquiries()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <header className={adminStyles.pageHead}>
        <h1 className={adminStyles.pageTitle}>Enquiries</h1>
        <p className={adminStyles.pageSubtitle}>
          Customer enquiries submitted via the contact form.
        </p>
      </header>

      <EnquiriesManager initialItems={enquiries} />
    </div>
  );
}
