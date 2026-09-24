const TYPE_LABELS = {
  running: 'Пробежка',
  walking: 'Прогулка',
  cycling: 'Велосипед',
  swimming: 'Плавание',
};

/**
 * Автогенерация названия по типу и времени начала.
 */
export function generateName(type, startTime) {
  const label = TYPE_LABELS[type] || 'Тренировка';
  const date = new Date(startTime);

  const hour = date.getHours();
  let period = 'Днём';
  if (hour < 6) period = 'Ночью';
  else if (hour < 12) period = 'Утренняя';
  else if (hour < 18) period = 'Дневная';
  else period = 'Вечерняя';

  // «Утренняя пробежка», «Дневная прогулка» и т.п.
  if (type === 'running' || type === 'walking') {
    const suffix = label.replace(/а$/, 'а'); // без изменений, но оставим логику
    const feminine = `${period} ${label.toLowerCase().replace('пробежка', 'пробежка').replace('прогулка', 'прогулка')}`;
    return `${period} ${label.toLowerCase()}`;
  }
  return `${label} ${date.toLocaleDateString('ru-RU')}`;
}

export const ACTIVITY_TYPES = Object.entries(TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));