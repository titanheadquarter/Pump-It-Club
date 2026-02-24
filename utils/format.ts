/**
 * Formatiert eine Dauer in Minuten (Dezimal) zu einem lesbaren String
 * Beispiel: 4.39 -> "4:23"
 */
export function formatDuration(minutes: number): string {
  const totalSeconds = Math.round(minutes * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formatiert eine Dauer in Sekunden zu einem lesbaren String
 * Beispiel: 263 -> "4:23"
 */
export function formatDurationFromSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formatiert ein Datum zu einem lesbaren String
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}