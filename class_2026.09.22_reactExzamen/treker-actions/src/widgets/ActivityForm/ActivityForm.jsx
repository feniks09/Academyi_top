import { useNavigate } from 'react-router-dom';
import { useActivityForm } from '../../features/validateForm/useActivityForm';
import { ACTIVITY_TYPES } from '../../entities/activity/lib/generateName';
import Input from '../../shared/ui/Input/Input';
import Select from '../../shared/ui/Select/Select';
import Textarea from '../../shared/ui/Textarea/Textarea';
import Button from '../../shared/ui/Button/Button';
import styles from './ActivityForm.module.css';

export default function ActivityForm({ mode, initialValues, onSubmit }) {
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useActivityForm({
    initialValues,
    onSubmit,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Select
        label="Тип активности *"
        value={values.type}
        error={errors.type}
        options={ACTIVITY_TYPES}
        onChange={(e) => handleChange('type', e.target.value)}
      />

      <Input
        label="Дистанция (км) *"
        type="number"
        step="0.01"
        min="0"
        value={values.distance}
        error={errors.distance}
        onChange={(e) => handleChange('distance', e.target.value)}
      />

      <Input
        label="Дата и время начала *"
        type="datetime-local"
        value={values.startTime}
        error={errors.startTime}
        onChange={(e) => handleChange('startTime', e.target.value)}
      />

      <Input
        label="Продолжительность (ЧЧ:ММ:СС) *"
        placeholder="00:30:00"
        value={values.duration}
        error={errors.duration}
        onChange={(e) => handleChange('duration', e.target.value)}
      />

      <Input
        label="Название (необязательно)"
        placeholder="Оставьте пустым для автогенерации"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />

      <Textarea
        label="Описание"
        value={values.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={() => navigate('/')}>
          Отмена
        </Button>
        <Button type="submit">
          {mode === 'edit' ? 'Сохранить изменения' : 'Добавить тренировку'}
        </Button>
      </div>
    </form>
  );
}