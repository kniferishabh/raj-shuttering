import { safeReadArray } from '@/lib/db';
import type { Testimonial } from '@/lib/types';
import { TestimonialsManager } from './TestimonialsManager';
import adminStyles from '../admin.module.css';

export default function AdminTestimonialsPage() {
  const items = safeReadArray<Testimonial>('testimonials.json');

  return (
    <div>
      <header className={adminStyles.pageHead}>
        <h1 className={adminStyles.pageTitle}>Testimonials</h1>
        <p className={adminStyles.pageSubtitle}>
          Approve client reviews and manage what appears on the website.
        </p>
      </header>

      <TestimonialsManager initialItems={items} />
    </div>
  );
}
