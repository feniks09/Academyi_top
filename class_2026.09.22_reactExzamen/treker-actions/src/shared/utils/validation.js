/**
 * Разрешает только цифры и одну точку.
 * Используется для поля "Дистанция".
 */
export function sanitizeDecimal(value) {
  let v = String(value).replace(',', '.');
  v = v.replace(/[^\d.]/g, '');

  const parts = v.split('.');
  if (parts.length > 2) {
    v = parts[0] + '.' + parts.slice(1).join('');
  }
  return v;
}

/**
 * Маска для времени ЧЧ:ММ:СС.
 * Оставляет только цифры, разбивает по 2 через двоеточие.
 */
export function sanitizeHMS(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 6);
  const parts = digits.match(/.{1,2}/g) || [];
  return parts.join(':');
}