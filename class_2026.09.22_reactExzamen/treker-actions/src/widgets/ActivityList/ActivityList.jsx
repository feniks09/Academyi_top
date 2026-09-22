import { useActivityStore, selectActivities } from '../../entities/activity/model/store.js';
import ActivityCard from '../ActivityCard/ActivityCard';
import Button from '../../shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './ActivityList.module.css';

export default function ActivityList() {
  const activities = useActivityStore(selectActivities);
  const navigate = useNavigate();

  if (activities.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Тренировки ещё не добавлены</p>
        <Button onClick={() => navigate('/activities/new')}>
          Добавить тренировку
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}