'use client';

import { useState } from 'react';
import { Plus, Star, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input/Input';
import { Badge } from '@/components/ui/Badge/Badge';
import type { Testimonial } from '@/lib/types';
import adminStyles from '../admin.module.css';
import servicesStyles from '../services/services.module.css';

interface FormState {
  clientName: string;
  company: string;
  location: string;
  rating: number;
  review: string;
  projectType: string;
  isApproved: boolean;
}

const EMPTY_FORM: FormState = {
  clientName: '',
  company: '',
  location: '',
  rating: 5,
  review: '',
  projectType: '',
  isApproved: true,
};

export function TestimonialsManager({ initialItems }: { initialItems: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initialItems);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({
      clientName: item.clientName,
      company: item.company ?? '',
      location: item.location,
      rating: item.rating,
      review: item.review,
      projectType: item.projectType,
      isApproved: item.isApproved,
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
      company: form.company.trim() || undefined,
    };
    setSaving(true);
    try {
      const res = await fetch(editing ? `/api/testimonials/${editing.id}` : '/api/testimonials', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || 'Save failed');
      }
      const saved: Testimonial = await res.json();
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

  const toggleApproved = async (item: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !item.isApproved }),
      });
      if (!res.ok) throw new Error();
      const updated: Testimonial = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch {
      // ignore
    }
  };

  const deleteItem = async (item: Testimonial) => {
    if (!confirm(`Delete review from "${item.clientName}"?`)) return;
    try {
      const res = await fetch(`/api/testimonials/${item.id}`, { method: 'DELETE' });
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
          {items.length} testimonial{items.length === 1 ? '' : 's'}
        </span>
        <Button onClick={openCreate} icon={<Plus size={16} />}>Add Testimonial</Button>
      </div>

      <div className={adminStyles.tableWrap}>
        {items.length === 0 ? (
          <div className={adminStyles.emptyState}>No testimonials yet.</div>
        ) : (
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Client</th>
                <th style={{ width: 110 }}>Rating</th>
                <th>Review</th>
                <th style={{ width: 110 }}>Approved</th>
                <th style={{ width: 110 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.clientName}</strong>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', marginTop: 2 }}>
                      {t.company ? `${t.company}, ` : ''}{t.location}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'inline-flex', gap: 2, color: 'var(--color-accent-primary)' }}>
                      {[1,2,3,4,5].map((n) => (
                        <Star key={n} size={14} fill={n <= t.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                    &ldquo;{t.review.slice(0, 80)}{t.review.length > 80 ? '...' : ''}&rdquo;
                    <div style={{ marginTop: 4 }}>
                      <Badge label={t.projectType} variant="outline" size="sm" />
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => toggleApproved(t)}
                      className={[adminStyles.toggle, t.isApproved ? adminStyles.toggleOn : ''].filter(Boolean).join(' ')}
                      aria-label={t.isApproved ? 'Unapprove' : 'Approve'}
                    />
                  </td>
                  <td>
                    <div className={adminStyles.actions}>
                      <button
                        type="button"
                        className={adminStyles.iconBtn}
                        onClick={() => openEdit(t)}
                        aria-label="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        className={`${adminStyles.iconBtn} ${adminStyles.iconBtnDanger}`}
                        onClick={() => deleteItem(t)}
                        aria-label="Delete"
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
        isOpen={modalOpen}
        onClose={close}
        title={editing ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <form onSubmit={handleSubmit} className={servicesStyles.form}>
          <div className={servicesStyles.row}>
            <Input
              label="Client Name"
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            />
            <Input
              label="Company (optional)"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div className={servicesStyles.row}>
            <Input
              label="Location"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <Input
              label="Project Type"
              required
              placeholder="e.g. Residential Slab"
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            />
          </div>
          <Select
            label="Rating"
            required
            value={String(form.rating)}
            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value, 10) })}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} Star{n === 1 ? '' : 's'}</option>
            ))}
          </Select>
          <Textarea
            label="Review"
            required
            rows={5}
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
          />
          <label className={servicesStyles.check}>
            <input
              type="checkbox"
              checked={form.isApproved}
              onChange={(e) => setForm({ ...form, isApproved: e.target.checked })}
            />
            <span>Approved (show on website)</span>
          </label>

          {error && <p className={servicesStyles.error}>{error}</p>}

          <div className={servicesStyles.formActions}>
            <Button type="button" variant="ghost" onClick={close}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? 'Save Changes' : 'Add Testimonial'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
