/**
 * getUploadUrl — resolve uploaded image paths to full URLs.
 * Mirrors admin/src/lib/uploadUrl.js — same logic, separate file.
 *
 * • Already-absolute URLs → returned unchanged.
 * • Relative /uploads/ paths in browser → relative (Vercel rewrite handles it).
 * • Relative /uploads/ paths on server → absolute with backend origin.
 * • null / undefined / empty → returns '' (caller renders nothing).
 */
export function getUploadUrl(relativePath) {
  if (!relativePath) return '';
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  if (typeof window !== 'undefined') {
    return relativePath;
  }
  const backendOrigin = (process.env.API_URL || 'https://api.tilakglobalschool.com/api')
    .replace('/api', '');
  return `${backendOrigin}${relativePath}`;
}
