/**
 * sectionImages.js
 * Utility for resolving admin-assigned images with static-data fallback.
 *
 * Usage in a component:
 *   const src = resolveImage(sectionImages, 'academicStages', 'kindergarten', stage.image.src);
 *   const alt = resolveAlt(sectionImages, 'academicStages', 'kindergarten', stage.image.alt);
 */

/**
 * Returns the admin-assigned image URL for a slot, or falls back to staticSrc.
 * @param {object}  sectionImages - The map returned by GET /api/section-images
 * @param {string}  sectionKey
 * @param {string}  slotKey
 * @param {string}  staticSrc    - Fallback image URL from data/*.js
 */
export function resolveImage(sectionImages, sectionKey, slotKey, staticSrc) {
  const assigned = sectionImages?.[sectionKey]?.[slotKey];
  if (assigned?.imageUrl) return assigned.imageUrl;
  return staticSrc;
}

/**
 * Returns the alt text for a slot, or falls back to staticAlt.
 */
export function resolveAlt(sectionImages, sectionKey, slotKey, staticAlt) {
  const assigned = sectionImages?.[sectionKey]?.[slotKey];
  if (assigned?.alt) return assigned.alt;
  return staticAlt;
}

/**
 * Returns the objectPosition for a slot, or falls back to staticPos.
 */
export function resolvePosition(sectionImages, sectionKey, slotKey, staticPos = 'center') {
  const assigned = sectionImages?.[sectionKey]?.[slotKey];
  if (assigned?.objectPosition) return assigned.objectPosition;
  return staticPos;
}
