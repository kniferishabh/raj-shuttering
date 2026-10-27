import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} />
    </div>
  );
}
