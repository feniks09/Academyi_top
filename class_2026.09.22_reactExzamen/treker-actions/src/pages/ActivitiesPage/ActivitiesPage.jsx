import { useNavigate } from 'react-router-dom';
import Button from '../../shared/ui/Button/Button';
import ActivityList from '../../widgets/ActivityList/ActivityList';
import styles from './ActivitiesPage.module.css';


export default function ActivitiesPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>История тренировок</h1>
        <Button onClick={() => navigate('/activities/new')}>
          + Добавить
        </Button>
      </header>
      <ActivityList />
    </div>
  );
}