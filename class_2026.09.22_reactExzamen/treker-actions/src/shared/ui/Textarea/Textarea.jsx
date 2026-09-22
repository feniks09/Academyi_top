import styles from './Textarea.module.css';

export default function Textarea({ label, ...props }) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={styles.textarea} rows={3} {...props} />
    </div>
  );
}