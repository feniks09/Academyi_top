import { useParams, useNavigate } from 'react-router-dom';
import { useActivityStore, selectActivityById } from '../../entities/activity/model/store';
import { secondsToHMS } from '../../entities/activity/lib/formatTime';
import ActivityForm from '../../widgets/ActivityForm/ActivityForm';
import styles from './ActivityFormPage.module.css';

export default function ActivityFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const addActivity = useActivityStore((s) => s.addActivity);
  const updateActivity = useActivityStore((s) => s.updateActivity);
  const existing = useActivityStore(selectActivityById(id));

  if (mode === 'edit' && !existing) {
    navigate('/', { replace: true });
    return null;
  }

  const initialValues = existing
    ? {
        ...existing,
        distance: existing.distance,
        duration: secondsToHMS(existing.duration),
        startTime: new Date(existing.startTime).toISOString().slice(0, 16),
      }
    : undefined;

  const handleSubmit = (data) => {
    if (mode === 'edit') {
      updateActivity(id, data);
    } else {
      addActivity({
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
    }
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {mode === 'edit' ? 'Редактирование активности' : 'Добавление новой активности'}
      </h1>
      <ActivityForm mode={mode} initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
}