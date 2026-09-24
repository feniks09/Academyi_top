import React, { useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateMetrics } from '../../entities/activity/lib/calculateMetrics';
import { formatDateTime, secondsToHMS } from '../../entities/activity/lib/formatTime';
import { generateName } from '../../entities/activity/lib/generateName';
import ActivityTypeBadge from '../../entities/activity/ui/ActivityTypeBadge';
import Button from '../../shared/ui/Button/Button';
import { useActivityStore } from '../../entities/activity/model/store';
import styles from './ActivityCard.module.css';

function ActivityCard({ activity }) {
  const navigate = useNavigate();
  const removeActivity = useActivityStore((s) => s.removeActivity);

  const { pace, averageSpeed } = useMemo(
    () => calculateMetrics(activity.distance, activity.duration),
    [activity.distance, activity.duration]
  );

  const title = useMemo(
    () => activity.name || generateName(activity.type, activity.startTime),
    [activity.name, activity.type, activity.startTime]
  );

  const handleEdit = useCallback(
    () => navigate(`/activities/edit/${activity.id}`),
    [navigate, activity.id]
  );

  const handleDelete = useCallback(() => {
    const confirmed = window.confirm('Удалить эту тренировку?');
    if (!confirmed) return;
    removeActivity(activity.id);
  }, [removeActivity, activity.id]);

  return (
      <article className={styles.card}>
      <header className={styles.header}>
        <h3 onClick={() => navigate(`/activity/${activity.id}`)} className={styles.title}>{title}</h3>
        <ActivityTypeBadge type={activity.type} />
      </header>

      <div className={styles.metrics}>
        <div>
          <span className={styles.label}>Дистанция</span>
          <span className={styles.value}>{activity.distance} км</span>
        </div>
        <div>
          <span className={styles.label}>Начало</span>
          <span className={styles.value}>{formatDateTime(activity.startTime)}</span>
        </div>
        <div>
          <span className={styles.label}>Длительность</span>
          <span className={styles.value}>{secondsToHMS(activity.duration)}</span>
        </div>
      </div>

      <div className={styles.derived}>
        <span>Темп: <b>{pace ?? '—'} мин/км</b></span>
        <span>Скорость: <b>{averageSpeed ?? '—'} км/ч</b></span>
      </div>

      {activity.description && (
        <p className={styles.description}>{activity.description}</p>
      )}

      <div className={styles.actions}>
        <Button variant="danger" onClick={handleDelete}>
          Удалить
        </Button>
        <Button variant="secondary" onClick={handleEdit}>
          Редактировать
        </Button>
      </div>
    </article>
  );
}

export default React.memo(ActivityCard);