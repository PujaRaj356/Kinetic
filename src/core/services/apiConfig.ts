/**
 * Dynamic API Base URL resolver:
 * - Uses VITE_API_URL if configured.
 * - In local development on localhost/127.0.0.1, points directly to http://127.0.0.1:5000
 *   so requests never fail even if the local Vite dev proxy isn't reloaded.
 * - In production (e.g. on Vercel), uses relative '' so requests go through Vercel's /api service rewrites.
 */
export const getApiBase = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return 'http://127.0.0.1:5000';
  }
  return '';
};
