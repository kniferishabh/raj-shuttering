'use client';

import { useState } from 'react';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { Badge } from '@/components/ui/Badge/Badge';
import { Input, Textarea, Select } from '@/components/ui/Input/Input';
import type { Service, ServiceCategory, AvailableFor } from '@/lib/types';
import adminStyles from '../admin.module.css';
import styles from './services.module.css';

const ICON_OPTIONS = [
  'Square',
  'Layers',
  'ArrowUpDown',
  'LayoutGrid',
  'Grid3X3',
  'Package',
  'Wrench',
  'Building2',
  'Hammer',
  'HardHat',
];

const CATEGORIES: Array<{ value: ServiceCategory; label: string }> = [
  { value: 'shuttering', label: 'Shuttering' },
  { value: 'scaffolding', label: 'Scaffolding' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'other', label: 'Other / Wholesale' },
];

interface FormState {
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ServiceCategory;
  availableFor: AvailableFor[];
  features: string[];
  icon: string;
  images: string[];
  isActive: boolean;
  sortOrder: number;
}

const EMPTY_FORM: FormState = {
  name: '',
  shortDescription: '',
  fullDescription: '',
  category: 'shuttering',
  availableFor: ['rent'],
  features: [''],
  icon: 'Wrench',
  images: [''],
  isActive: true,
  sortOrder: 99,
};

export function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, sortOrder: (services.at(-1)?.sortOrder ?? 0) + 1 });
    setError(null);
    setCreating(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({
      name: service.name,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      category: service.category,
      availableFor: service.availableFor,
      features: service.features.length ? service.features : [''],
      icon: service.icon,
      images: service.images?.length
        ? service.images
        : service.imageUrl
          ? [service.imageUrl]
          : [''],
      isActive: service.isActive,
      sortOrder: service.sortOrder,
    });
    setError(null);
    setCreating(true);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
    setError(null);
  };

  const updateFeature = (idx: number, value: string) => {
    setForm((f) => ({
      ...f,
      features: f.features.map((feat, i) => (i === idx ? value : feat)),
    }));
  };

  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ''] }));
  const removeFeature = (idx: number) =>
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));

  const updateImage = (idx: number, value: string) => {
    setForm((f) => ({
      ...f,
      images: f.images.map((img, i) => (i === idx ? value : img)),
    }));
  };

  const addImage = () => setForm((f) => ({ ...f, images: [...f.images, ''] }));
  const removeImage = (idx: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const toggleAvailable = (val: AvailableFor) => {
    setForm((f) => ({
      ...f,
      availableFor: f.availableFor.includes(val)
        ? f.availableFor.filter((v) => v !== val)
        : [...f.availableFor, val],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanImages = form.images.map((i) => i.trim()).filter(Boolean);
    const payload = {
      ...form,
      features: form.features.map((f) => f.trim()).filter(Boolean),
      images: cleanImages,
      imageUrl: cleanImages[0] || undefined,
    };

    if (payload.availableFor.length === 0) {
      setError('Select at least one availability (Rent or Sale).');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(editing ? `/api/services/${editing.id}` : '/api/services', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Save failed');
      }
      const saved: Service = await res.json();
      setServices((prev) => {
        if (editing) {
          return prev.map((s) => (s.id === saved.id ? saved : s));
        }
        return [...prev, saved];
      });
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      if (!res.ok) throw new Error('Failed');
      const updated: Service = await res.json();
      setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } catch {
      // silent fail
    }
  };

  const deleteService = async (service: Service) => {
    if (!confirm(`Delete "${service.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/services/${service.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      setServices((prev) => prev.filter((s) => s.id !== service.id));
    } catch {
      // silent fail
    }
  };

  const sorted = [...services].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <div className={adminStyles.toolbar}>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          {services.length} service{services.length === 1 ? '' : 's'}
        </span>
        <Button onClick={openCreate} icon={<Plus size={16} />}>Add New Service</Button>
      </div>

      <div className={adminStyles.tableWrap}>
        {sorted.length === 0 ? (
          <div className={adminStyles.emptyState}>No services yet. Add your first.</div>
        ) : (
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th style={{ width: 70 }}>Order</th>
                <th>Name</th>
                <th>Category</th>
                <th>Available For</th>
                <th style={{ width: 100 }}>Active</th>
                <th style={{ width: 130 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((service) => (
                <tr key={service.id}>
                  <td>{service.sortOrder}</td>
                  <td>
                    <strong>{service.name}</strong>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: 2 }}>
                      {service.shortDescription.slice(0, 60)}
                      {service.shortDescription.length > 60 ? '...' : ''}
                    </div>
                  </td>
                  <td><Badge label={service.category} variant="steel" size="sm" /></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {service.availableFor.map((a) => (
                        <Badge key={a} label={a} variant="outline" size="sm" />
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => toggleActive(service)}
                      className={[adminStyles.toggle, service.isActive ? adminStyles.toggleOn : ''].filter(Boolean).join(' ')}
                      aria-label={service.isActive ? 'Set inactive' : 'Set active'}
                    />
                  </td>
                  <td>
                    <div className={adminStyles.actions}>
                      <button
                        type="button"
                        className={adminStyles.iconBtn}
                        onClick={() => openEdit(service)}
                        aria-label={`Edit ${service.name}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        className={`${adminStyles.iconBtn} ${adminStyles.iconBtnDanger}`}
                        onClick={() => deleteService(service)}
                        aria-label={`Delete ${service.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={creating}
        onClose={close}
        title={editing ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Textarea
            label="Short Description"
            required
            rows={2}
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          />
          <Textarea
            label="Full Description"
            required
            rows={4}
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
          />

          <div className={styles.row}>
            <Select
              label="Category"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ServiceCategory })}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
            <Select
              label="Icon"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            >
              {ICON_OPTIONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </Select>
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.fieldLabel}>Available For</label>
              <div className={styles.checkRow}>
                <label className={styles.check}>
                  <input
                    type="checkbox"
                    checked={form.availableFor.includes('rent')}
                    onChange={() => toggleAvailable('rent')}
                  />
                  <span>Rent</span>
                </label>
                <label className={styles.check}>
                  <input
                    type="checkbox"
                    checked={form.availableFor.includes('sale')}
                    onChange={() => toggleAvailable('sale')}
                  />
                  <span>Sale</span>
                </label>
              </div>
            </div>
            <Input
              label="Sort Order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value || '0', 10) })}
            />
          </div>

          <div>
            <label className={styles.fieldLabel}>Features</label>
            <div className={styles.featuresList}>
              {form.features.map((feat, i) => (
                <div key={i} className={styles.featureRow}>
                  <input
                    className={styles.featureInput}
                    value={feat}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    placeholder="e.g. IS compliant"
                  />
                  <button
                    type="button"
                    className={`${adminStyles.iconBtn} ${adminStyles.iconBtnDanger}`}
                    onClick={() => removeFeature(i)}
                    disabled={form.features.length === 1}
                    aria-label="Remove feature"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={addFeature} icon={<Plus size={14} />}>
                Add Feature
              </Button>
            </div>
          </div>

          <div>
            <label className={styles.fieldLabel}>
              Images (shown when a service card is clicked &mdash; first image is the cover)
            </label>
            <div className={styles.featuresList}>
              {form.images.map((img, i) => (
                <div key={i} className={styles.featureRow}>
                  <input
                    className={styles.featureInput}
                    value={img}
                    onChange={(e) => updateImage(i, e.target.value)}
                    placeholder="/images/shuttering-slab.jpg or https://..."
                  />
                  <button
                    type="button"
                    className={`${adminStyles.iconBtn} ${adminStyles.iconBtnDanger}`}
                    onClick={() => removeImage(i)}
                    disabled={form.images.length === 1}
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={addImage} icon={<Plus size={14} />}>
                Add Image
              </Button>
            </div>
          </div>

          <label className={styles.check}>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            <span>Service is active (shown on website)</span>
          </label>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <div className={styles.formActions}>
            <Button type="button" variant="ghost" onClick={close}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
