/** Hetzner Object Storage – Free-Kurs-Videos (Bucket: pumpitclub) */
export const HETZNER_VIDEO_BASE = "https://pumpitclub.nbg1.your-objectstorage.com";

export function getVideoUrl(videoKey: string): string {
  // Wenn videoKey bereits eine volle URL ist (beginnt mit http), verwende sie direkt
  if (videoKey.startsWith('http://') || videoKey.startsWith('https://')) {
    return videoKey;
  }
  // Sonst baue die URL aus Base + Dateiname
  return `${HETZNER_VIDEO_BASE}/${encodeURIComponent(videoKey)}`;
}
