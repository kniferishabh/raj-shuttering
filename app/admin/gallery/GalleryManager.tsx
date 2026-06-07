'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plus, Star, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input/Input';
import { Badge } from '@/components/ui/Badge/Badge';
import type { GalleryItem, GalleryCategory } from '@/lib/types';
import adminStyles from '../admin.module.css';
import styles from './gallery.module.css';

const CATEGORIES: Array<{ value: GalleryCategory; label: string }> = [
  { value: 'shuttering', label: 'Shuttering' },
  { value: 'scaffolding', label: 'Scaffolding' },
  { value: 'project', label: 'Project Site' },
  { value: 'equipment', label: 'Equipment' },
];

interface FormState {
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  isFeatured: boolean;
  sortOrder: number;
}

const EMPTY_FORM: FormState = {
  title: '',
  description: '',
  imageUrl: '',
  category: 'project',
  isFeatured: false,
  sortOrder: 99,
};

export function GalleryManager({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, sortOrder: (items.at(-1)?.sortOrder ?? 0) + 1 });
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description ?? '',
      imageUrl: item.imageUrl,
      category: item.category,
      isFeatured: item.isFeatured,
      sortOrder: item.sortOrder,
    });
    setError(null);
    setModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
    setEditing(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload = {
      ...form,
      description: form.description.trim() || undefined,
    };

    setSaving(true);
    try {
      const res = await fetch(editing ? `/api/gallery/${editing.id}` : '/api/gallery', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || 'Failed');
      }
      const saved: GalleryItem = await res.json();
      setItems((prev) =>
        editing ? prev.map((i) => (i.id === saved.id ? saved : i)) : [...prev, saved]
      );
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async (item: GalleryItem) => {
    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !item.isFeatured }),
      });
      if (!res.ok) throw new Error();
      const updated: GalleryItem = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch {
      // ignore
    }
  };

  const deleteItem = async (item: GalleryItem) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try {
      const res = await fetch(`/api/gallery/${item.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch {
      // ignore
    }
  };

  return (
    <>
      <div className={adminStyles.toolbar}>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          {items.length} item{items.length === 1 ? '' : 's'}
        </span>
        <Button onClick={openCreate} icon={<Plus size={16} />}>Add Photo</Button>
      </div>

      {items.length === 0 ? (
        <div className={`${adminStyles.tableWrap} ${adminStyles.emptyState}`}>
          No gallery items yet.
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={300}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {item.isFeatured && (
                  <span className={styles.featuredBadge}>
                    <Star size={12} fill="currentColor" />
                    Featured
                  </span>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <Badge label={item.category} variant="steel" size="sm" />
                </div>
                {item.description && <p className={styles.desc}>{item.description}</p>}
                <div className={styles.cardFooter}>
                  <span className={styles.order}>#{item.sortOrder}</span>
                  <div className={adminStyles.actions}>
                    <button
                      type="button"
                      className={adminStyles.iconBtn}
                      onClick={() => toggleFeatured(item)}
                      aria-label="Toggle featured"
                    >
                      <Star size={14} fill={item.isFeatured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      type="button"
                      className={adminStyles.iconBtn}
                      onClick={() => openEdit(item)}
                      aria-label="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className={`${adminStyles.iconBtn} ${adminStyles.iconBtnDanger}`}
                      onClick={() => deleteItem(item)}
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={close}
        title={editing ? 'Edit Photo' : 'Add Photo'}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            label="Image URL"
            required
            type="url"
            placeholder="https://..."
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <Textarea
            label="Description (optional)"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className={styles.row}>
            <Select
              label="Category"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as GalleryCategory })}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
            <Input
              label="Sort Order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value || '0', 10) })}
            />
          </div>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            <span>Feature on homepage</span>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formActions}>
            <Button type="button" variant="ghost" onClick={close}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? 'Save Changes' : 'Add Photo'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
