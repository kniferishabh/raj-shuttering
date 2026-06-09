import { listServices } from '@/lib/data';
import { ServicesManager } from './ServicesManager';
import adminStyles from '../admin.module.css';

export default async function AdminServicesPage() {
  const services = (await listServices()).sort((a, b) => a.sortOrder - b.sortOrder);

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
