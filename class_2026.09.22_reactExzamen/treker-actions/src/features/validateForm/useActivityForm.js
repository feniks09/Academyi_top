import { useState, useCallback } from 'react';
import { hmsToSeconds } from '../../entities/activity/lib/formatTime';
import { sanitizeDecimal, sanitizeHMS } from '../../entities/activity/lib/validation';

const EMPTY_FORM = {
  type: 'running',
  distance: '',
  startTime: new Date().toISOString().slice(0, 16),
  duration: '00:30:00',
  name: '',
  description: '',
};

const DURATION_REGEX = /^\d{1,2}:\d{2}:\d{2}$/;

export function useActivityForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(() => ({
    ...EMPTY_FORM,
    ...initialValues,
    distance: initialValues?.distance?.toString() ?? '',
  }));
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    switch (field) {
      case 'type':
        return value ? null : 'Выберите тип активности';

      case 'distance': {
        if (!value) return 'Введите дистанцию';
        const num = Number(value);
        if (isNaN(num) || !isFinite(num)) return 'Введите корректное число';
        if (num <= 0) return 'Дистанция должна быть > 0';
        if (num > 1000) return 'Слишком большая дистанция';
        return null;
      }

      case 'startTime':
        return value ? null : 'Укажите дату и время';

      case 'duration': {
        if (!value) return 'Введите продолжительность';
        if (!DURATION_REGEX.test(value)) return 'Формат: ЧЧ:ММ:СС';
        const seconds = hmsToSeconds(value);
        if (seconds <= 0) return 'Продолжительность должна быть > 0';
        return null;
      }

      default:
        return null;
    }
  };

  const handleChange = useCallback((field, value) => {
    let clean = value;
    if (field === 'distance') clean = sanitizeDecimal(value);
    if (field === 'duration') clean = sanitizeHMS(value);

    setValues((prev) => ({ ...prev, [field]: clean }));

    setErrors((prev) => {
      const next = { ...prev };
      const fieldError = validateField(field, clean);
      if (fieldError) next[field] = fieldError;
      else delete next[field];
      return next;
    });
  }, []);

  const validate = useCallback(() => {
    const fields = ['type', 'distance', 'startTime', 'duration'];
    const newErrors = {};
    fields.forEach((field) => {
      const err = validateField(field, values[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (!validate()) return;

      onSubmit({
        type: values.type,
        distance: Number(values.distance),
        startTime: values.startTime,
        duration: hmsToSeconds(values.duration),
        name: values.name.trim(),
        description: values.description.trim(),
      });
    },
    [values, validate, onSubmit]
  );

  return { values, errors, handleChange, handleSubmit, setValues };
}