import { useState, useCallback } from 'react';
import { hmsToSeconds, secondsToHMS } from '../../entities/activity/lib/formatTime';

const EMPTY_FORM = {
  type: 'running',
  distance: '',
  startTime: new Date().toISOString().slice(0, 16),
  duration: '00:30:00',
  name: '',
  description: '',
};

export function useActivityForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(() => ({
    ...EMPTY_FORM,
    ...initialValues,
    distance: initialValues?.distance?.toString() ?? '',
  }));
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    const dist = Number(values.distance);

    if (!values.type) newErrors.type = 'Выберите тип активности';
    if (!values.distance || isNaN(dist) || dist <= 0)
      newErrors.distance = 'Введите положительное число';
    if (!values.startTime) newErrors.startTime = 'Укажите дату и время';
    if (!values.duration || hmsToSeconds(values.duration) <= 0)
      newErrors.duration = 'Введите продолжительность';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (!validate()) return;

      const durationSec = hmsToSeconds(values.duration);
      const distanceKm = Number(values.distance);

      onSubmit({
        type: values.type,
        distance: distanceKm,
        startTime: values.startTime,
        duration: durationSec,
        name: values.name.trim(),
        description: values.description.trim(),
      });
    },
    [values, validate, onSubmit]
  );

  return { values, errors, handleChange, handleSubmit, setValues };
}