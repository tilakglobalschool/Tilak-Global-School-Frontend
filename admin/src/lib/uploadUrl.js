/**
 * getUploadUrl — centralized helper for resolving uploaded file URLs.
 *
 * Strategy:
 *   • In the browser (client-side): use relative path so the Vercel rewrite
 *     /uploads/:path* → backend handles it. Works in both dev and production.
 *   • On the server (SSR): prepend the absolute backend origin so Next.js
 *     can reach the file during server-side rendering.
 *   • Already-absolute URLs (https://...) are returned unchanged.
 *   • null / undefined / empty string → returns '' (caller renders nothing).
 *
 * No /uploads/uploads/ duplication — the path already starts with /uploads/
 * and this function never prepends another /uploads prefix.
 *
 * Usage:
 *   import { getUploadUrl } from '@/lib/uploadUrl';
 *   <img src={getUploadUrl(item.imageUrl)} alt="..." />
 */
export function getUploadUrl(relativePath) {
  if (!relativePath) return '';

  // Already absolute (e.g. https://api.tilakglobalschool.com/uploads/...)
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Client-side: use relative path — Vercel rewrite forwards to backend
  if (typeof window !== 'undefined') {
    return relativePath; // e.g. /uploads/gallery/xxx.png
  }

  // Server-side: prepend absolute backend origin for SSR fetches
  const backendOrigin = (process.env.API_URL || 'https://api.tilakglobalschool.com/api')
    .replace('/api', '');
  return `${backendOrigin}${relativePath}`;
}
