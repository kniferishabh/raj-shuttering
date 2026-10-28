'use client';

import { useState } from 'react';
import { CheckCircle2, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { CONTENT_GROUPS, DEFAULT_SITE_CONTENT, mergeSiteContent } from '@/lib/site-content';
import type { BusinessSettings } from '@/lib/types';
import styles from './content.module.css';

export function ContentManager({ initialSettings }: { initialSettings: BusinessSettings }) {
  const [content, setContent] = useState(() => mergeSiteContent(initialSettings.siteContent));
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    setSaving(true); setSuccess(false); setError(null);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...initialSettings, siteContent: content }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json?.error || 'Content could not be saved.');
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 3500);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Content could not be saved.');
    } finally { setSaving(false); }
  };

  return <div className={styles.wrap}>
    {success && <div className={styles.success}><CheckCircle2 size={18} /> Website content saved and cache refreshed.</div>}
    {error && <div className={styles.error} role="alert">{error}</div>}
    <div className={styles.toolbar}>
      <p>Changes become visible after saving. Placeholders such as <code>{'{year}'}</code>, <code>{'{city}'}</code> and <code>{'{businessName}'}</code> are replaced automatically.</p>
      <div className={styles.actions}>
        <Button type="button" variant="ghost" icon={<RotateCcw size={16} />} onClick={() => setContent(DEFAULT_SITE_CONTENT)}>Restore Defaults</Button>
        <Button type="button" icon={<Save size={16} />} loading={saving} onClick={save}>Save Content</Button>
      </div>
    </div>
    {CONTENT_GROUPS.map((group) => <section className={styles.group} key={group.title}>
      <div className={styles.groupHead}><h2>{group.title}</h2><p>{group.description}</p></div>
      <div className={styles.fields}>{group.fields.map((field) => <label className={field.multiline ? styles.fullField : ''} key={field.key}>
        <span>{field.label.replace(/([A-Z])/g, ' $1')}</span>
        {field.multiline
          ? <textarea rows={field.key === 'about.timeline' || field.key === 'about.values' ? 7 : 3} value={content[field.key] ?? ''} onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))} />
          : <input value={content[field.key] ?? ''} onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))} />}
      </label>)}</div>
    </section>)}
    <div className={styles.bottomAction}><Button type="button" size="lg" icon={<Save size={17} />} loading={saving} onClick={save}>Save Content</Button></div>
  </div>;
}
