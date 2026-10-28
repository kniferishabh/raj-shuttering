import { getSettings } from '@/lib/settings';
import { ContentManager } from './ContentManager';
import adminStyles from '../admin.module.css';

export default async function AdminContentPage() {
  const settings = await getSettings();
  return <div>
    <header className={adminStyles.pageHead}>
      <h1 className={adminStyles.pageTitle}>Website Content</h1>
      <p className={adminStyles.pageSubtitle}>Edit public page headings, descriptions, labels and calls to action.</p>
    </header>
    <ContentManager initialSettings={settings} />
  </div>;
}
