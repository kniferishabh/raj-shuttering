'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronRight, Inbox, Phone, Mail, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge/Badge';
import type { Enquiry } from '@/lib/types';
import adminStyles from '../admin.module.css';
import styles from './enquiries.module.css';

type Filter = 'all' | 'unread' | 'read';

export function EnquiriesManager({ initialItems }: { initialItems: Enquiry[] }) {
  const [items, setItems] = useState<Enquiry[]>(initialItems);
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    if (filter === 'unread') return items.filter((e) => !e.isRead);
    return items.filter((e) => e.isRead);
  }, [items, filter]);

  const markRead = async (item: Enquiry, isRead: boolean) => {
    try {
      const res = await fetch(`/api/enquiries/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead }),
      });
      if (!res.ok) throw new Error();
      const updated: Enquiry = await res.json();
      setItems((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    } catch {
      // ignore
    }
  };

  const deleteItem = async (item: Enquiry) => {
    if (!item.isRead) {
      alert('Mark this enquiry as read before deleting.');
      return;
    }
    if (!confirm(`Delete enquiry from "${item.name}"?`)) return;
    try {
      const res = await fetch(`/api/enquiries/${item.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((e) => e.id !== item.id));
    } catch {
      // ignore
    }
  };

  const unreadCount = items.filter((e) => !e.isRead).length;

  return (
    <>
      <div className={styles.filterBar}>
        {([
          { value: 'all' as const, label: `All (${items.length})` },
          { value: 'unread' as const, label: `Unread (${unreadCount})` },
          { value: 'read' as const, label: `Read (${items.length - unreadCount})` },
        ]).map((f) => (
          <button
            key={f.value}
            type="button"
            className={[styles.filterBtn, filter === f.value ? styles.filterActive : ''].filter(Boolean).join(' ')}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={`${adminStyles.tableWrap} ${adminStyles.emptyState}`}>
          <Inbox size={32} style={{ color: 'var(--color-text-secondary)', margin: '0 auto var(--space-md)' }} />
          No enquiries to show.
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map((e) => {
            const isExpanded = expanded === e.id;
            return (
              <article
                key={e.id}
                className={[styles.item, !e.isRead ? styles.unread : ''].filter(Boolean).join(' ')}
              >
                <button
                  type="button"
                  className={styles.itemHead}
                  onClick={() => setExpanded(isExpanded ? null : e.id)}
                  aria-expanded={isExpanded}
                >
                  <div className={styles.itemMain}>
                    <span className={styles.chev}>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                    <div>
                      <div className={styles.itemTopRow}>
                        <strong>{e.name}</strong>
                        {!e.isRead && <Badge label="New" variant="amber" size="sm" />}
                        <Badge label={e.projectType} variant="steel" size="sm" />
                      </div>
                      <div className={styles.itemMeta}>
                        {e.phone} {e.email ? ` · ${e.email}` : ''}
                        <span className={styles.dotSep}>·</span>
                        {new Date(e.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </div>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className={styles.itemBody}>
                    <p className={styles.message}>{e.message}</p>
                    <div className={styles.itemActions}>
                      <a href={`tel:${e.phone}`} className={styles.actionLink}>
                        <Phone size={14} /> Call
                      </a>
                      {e.email && (
                        <a href={`mailto:${e.email}`} className={styles.actionLink}>
                          <Mail size={14} /> Email
                        </a>
                      )}
                      <button
                        type="button"
                        className={styles.actionLink}
                        onClick={() => markRead(e, !e.isRead)}
                      >
                        <Check size={14} /> Mark as {e.isRead ? 'Unread' : 'Read'}
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionLink} ${styles.danger}`}
                        onClick={() => deleteItem(e)}
                        disabled={!e.isRead}
                        title={!e.isRead ? 'Mark as read first' : 'Delete'}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
