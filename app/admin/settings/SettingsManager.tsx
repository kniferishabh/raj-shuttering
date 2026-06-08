'use client';

import { useState } from 'react';
import { Save, Plus, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { Input, Textarea } from '@/components/ui/Input/Input';
import {
  HERO_VIDEO_MOBILE_PUBLIC_URL,
  HERO_VIDEO_PUBLIC_URL,
  HERO_VIDEO_UPLOAD_PATH,
} from '@/lib/media';
import type { BusinessSettings } from '@/lib/types';
import styles from './settings.module.css';

export function SettingsManager({ initialSettings }: { initialSettings: BusinessSettings }) {
  const [settings, setSettings] = useState<BusinessSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof BusinessSettings>(key: K, value: BusinessSettings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const updateSocial = (key: keyof BusinessSettings['socialLinks'], value: string) => {
    setSettings((s) => ({
      ...s,
      socialLinks: { ...s.socialLinks, [key]: value },
    }));
  };

  const updatePhone = (idx: number, value: string) => {
    setSettings((s) => ({
      ...s,
      phone: s.phone.map((p, i) => (i === idx ? value : p)),
    }));
  };

  const addPhone = () => setSettings((s) => ({ ...s, phone: [...s.phone, ''] }));
  const removePhone = (idx: number) =>
    setSettings((s) => ({ ...s, phone: s.phone.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      const payload = {
        ...settings,
        phone: settings.phone.map((p) => p.trim()).filter(Boolean),
      };
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || 'Save failed');
      }
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {success && (
        <div className={styles.successToast} role="status" aria-live="polite">
          <CheckCircle2 size={18} />
          <span>Settings saved successfully.</span>
        </div>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Business Info</h2>
        <div className={styles.row2}>
          <Input
            label="Business Name"
            required
            value={settings.businessName}
            onChange={(e) => update('businessName', e.target.value)}
          />
          <Input
            label="Established Year"
            type="number"
            value={settings.establishedYear}
            onChange={(e) => update('establishedYear', parseInt(e.target.value || '2008', 10))}
          />
        </div>
        <Input
          label="Tagline"
          value={settings.tagline}
          onChange={(e) => update('tagline', e.target.value)}
        />
        <Input
          label="GST Number (optional)"
          value={settings.gstNumber ?? ''}
          onChange={(e) => update('gstNumber', e.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact Details</h2>
        <div>
          <label className={styles.label}>Phone Numbers</label>
          <div className={styles.phoneList}>
            {settings.phone.map((p, idx) => (
              <div key={idx} className={styles.phoneRow}>
                <input
                  className={styles.phoneInput}
                  value={p}
                  onChange={(e) => updatePhone(idx, e.target.value)}
                  placeholder="+91-XXXXXXXXXX"
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removePhone(idx)}
                  disabled={settings.phone.length === 1}
                  aria-label="Remove phone"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <Button type="button" variant="ghost" size="sm" onClick={addPhone} icon={<Plus size={14} />}>
              Add Phone
            </Button>
          </div>
        </div>
        <div className={styles.row2}>
          <Input
            label="WhatsApp Number"
            value={settings.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
            placeholder="+919876543210"
          />
          <Input
            label="Email"
            type="email"
            required
            value={settings.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
        <Input
          label="Address"
          required
          value={settings.address}
          onChange={(e) => update('address', e.target.value)}
        />
        <div className={styles.row2}>
          <Input
            label="City"
            required
            value={settings.city}
            onChange={(e) => update('city', e.target.value)}
          />
          <Input
            label="Pincode"
            required
            value={settings.pincode}
            onChange={(e) => update('pincode', e.target.value)}
          />
        </div>
        <Input
          label="Opening Hours"
          value={settings.openingHours}
          onChange={(e) => update('openingHours', e.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Hero & About</h2>
        <Input
          label="Hero Headline"
          required
          value={settings.heroHeadline}
          onChange={(e) => update('heroHeadline', e.target.value)}
        />
        <Textarea
          label="Hero Subheadline"
          required
          rows={2}
          value={settings.heroSubheadline}
          onChange={(e) => update('heroSubheadline', e.target.value)}
        />
        <Textarea
          label="About Text"
          required
          rows={6}
          value={settings.aboutText}
          onChange={(e) => update('aboutText', e.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Hero Banner Video</h2>
        <p className={styles.helpText}>
          <strong>Option 1 — Upload to project folder:</strong> Copy your MP4 file to{' '}
          <code>{HERO_VIDEO_UPLOAD_PATH}</code> (desktop) and optionally{' '}
          <code>public/videos/hero-mobile.mp4</code> (mobile). Then set the URLs below to{' '}
          <code>{HERO_VIDEO_PUBLIC_URL}</code> and <code>{HERO_VIDEO_MOBILE_PUBLIC_URL}</code>.
          Redeploy to Vercel after adding the file.
        </p>
        <p className={styles.helpText}>
          <strong>Option 2 — Hosted URL:</strong> Upload to{' '}
          <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer">
            Cloudinary
          </a>{' '}
          (free), Google Drive (direct MP4 link), or any CDN — then paste the direct MP4 link below.
          Leave blank to use the default stock video.
        </p>
        <Input
          label="Banner Video URL (Desktop)"
          value={settings.heroVideoUrl ?? ''}
          onChange={(e) => update('heroVideoUrl', e.target.value)}
          placeholder={HERO_VIDEO_PUBLIC_URL}
        />
        <Input
          label="Banner Video URL (Mobile — optional)"
          value={settings.heroVideoUrlMobile ?? ''}
          onChange={(e) => update('heroVideoUrlMobile', e.target.value)}
          placeholder={HERO_VIDEO_MOBILE_PUBLIC_URL}
        />
        <Input
          label="Video Poster Image URL"
          value={settings.heroVideoPoster ?? ''}
          onChange={(e) => update('heroVideoPoster', e.target.value)}
          placeholder="/images/shuttering-slab.jpg"
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>SEO</h2>
        <Input
          label="Meta Title"
          required
          value={settings.metaTitle}
          onChange={(e) => update('metaTitle', e.target.value)}
        />
        <Textarea
          label="Meta Description"
          required
          rows={3}
          value={settings.metaDescription}
          onChange={(e) => update('metaDescription', e.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Social Links</h2>
        <Input
          label="Facebook URL"
          value={settings.socialLinks.facebook ?? ''}
          onChange={(e) => updateSocial('facebook', e.target.value)}
        />
        <Input
          label="Instagram URL"
          value={settings.socialLinks.instagram ?? ''}
          onChange={(e) => updateSocial('instagram', e.target.value)}
        />
        <Input
          label="YouTube URL"
          value={settings.socialLinks.youtube ?? ''}
          onChange={(e) => updateSocial('youtube', e.target.value)}
        />
      </section>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <Button type="submit" variant="primary" size="lg" loading={saving} icon={<Save size={16} />}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
