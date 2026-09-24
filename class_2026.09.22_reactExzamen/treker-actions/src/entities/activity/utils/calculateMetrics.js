/**
 * Возвращает { pace, averageSpeed }
 * @param {number} distanceKm — километры
 * @param {number} durationSec — секунды
 */
export function calculateMetrics(distanceKm, durationSec) {
  if (!distanceKm || !durationSec) return { pace: null, averageSpeed: null };

  const averageSpeed = (distanceKm / (durationSec / 3600)); // км/ч
  const pace = (durationSec / 60) / distanceKm; // мин/км

  return {
    averageSpeed: Number(averageSpeed.toFixed(2)),
    pace: formatPace(pace),
  };
}

function formatPace(paceMinutes) {
  if (!isFinite(paceMinutes)) return '—';
  const min = Math.floor(paceMinutes);
  const sec = Math.round((paceMinutes - min) * 60);
  return `${min}:${String(sec).padStart(2, '0')}`;
}