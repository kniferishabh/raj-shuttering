import styles from './loading.module.css';

export default function Loading() {
  return <div className={styles.loader} role="status" aria-live="polite" aria-label="Loading page">
    <span className={styles.mark} aria-hidden="true"><i /><i /><i /></span>
    <span className={styles.text}>Loading</span>
  </div>;
}
