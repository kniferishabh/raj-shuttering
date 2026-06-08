import { getSettings } from '@/lib/settings';
import { SettingsManager } from './SettingsManager';
import adminStyles from '../admin.module.css';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <header className={adminStyles.pageHead}>
        <h1 className={adminStyles.pageTitle}>Settings</h1>
        <p className={adminStyles.pageSubtitle}>
          Business information, contact details, color theme, and SEO content.
        </p>
      </header>

      <SettingsManager initialSettings={settings} />
    </div>
  );
}
