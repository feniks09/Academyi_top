import styles from './ActivityTypeBadge.module.css';

export default function ActivityTypeBadge({ type }) {
  const labels = {
    running: '🏃 Бег',
    walking: '🚶 Ходьба',
    cycling: '🚴 Велосипед',
    swimming: '🏊 Плавание',
  };
  return <span className={styles.badge}>{labels[type] || type}</span>;
}