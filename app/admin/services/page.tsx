import { safeReadArray } from '@/lib/db';
import type { Service } from '@/lib/types';
import { ServicesManager } from './ServicesManager';
import adminStyles from '../admin.module.css';

export default async function AdminServicesPage() {
  const services = (await safeReadArray<Service>('services.json')).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <header className={adminStyles.pageHead}>
        <h1 className={adminStyles.pageTitle}>Services</h1>
        <p className={adminStyles.pageSubtitle}>
          Add, edit, and reorder the services displayed on your website.
        </p>
      </header>

      <ServicesManager initialServices={services} />
    </div>
  );
}
