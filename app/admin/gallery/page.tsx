import { listGalleryItems } from '@/lib/data';
import { GalleryManager } from './GalleryManager';
import adminStyles from '../admin.module.css';

export default async function AdminGalleryPage() {
  const items = (await listGalleryItems()).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <header className={adminStyles.pageHead}>
        <h1 className={adminStyles.pageTitle}>Gallery</h1>
        <p className={adminStyles.pageSubtitle}>
          Manage the photos shown in the website gallery.
        </p>
      </header>

      <GalleryManager initialItems={items} />
    </div>
  );
}
