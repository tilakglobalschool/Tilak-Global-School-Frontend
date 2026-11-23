/**
 * Public site API client — Tilak Global School
 *
 * URL strategy (no NEXT_PUBLIC_ prefix):
 *   Server-side → process.env.API_URL (private, full Render URL)
 *   Client-side → '/api' (relative, Vercel rewrite → backend)
 *
 * All functions return { data, error } — never throw.
 * Includes retry logic for Render free-tier cold starts (502/503).
 */

import { getApiBase } from './apiUrl';

// ── Fetch with retry (handles Render cold-start 502/503) ─────────────────────
async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeout    = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const res = await fetch(url, {
        ...options,
        credentials: 'include',
        signal:      controller.signal,
      });

      clearTimeout(timeout);

      // Retry on gateway errors (Render cold-start or crash)
      if ((res.status === 502 || res.status === 503) && i < retries) {
        await new Promise(r => setTimeout(r, 5000)); // wait 5s before retry
        continue;
      }

      return res;
    } catch (err) {
      if (i < retries) {
        await new Promise(r => setTimeout(r, 5000));
        continue;
      }
      throw err;
    }
  }
}

async function apiFetch(path, options = {}) {
  const url = `${getApiBase()}${path}`;

  try {
    const res = await fetchWithRetry(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        data:  null,
        error: {
          message: json.message || `Request failed (${res.status})`,
          status:  res.status,
        },
      };
    }

    return { data: json.data ?? json, error: null };

  } catch (err) {
    return {
      data:  null,
      error: {
        message: err.name === 'AbortError'
          ? 'Request timed out — backend may be starting up, please try again'
          : (err.message || 'Network error'),
        status: 0,
      },
    };
  }
}

// ── Public read-only endpoints ────────────────────────────────────────────────

/** Site settings: school name, contact, director message, banner text */
export function getSettings() {
  return apiFetch('/settings');
}

/** CMS content blocks for a given page e.g. 'home', 'about' */
export function getContent(page) {
  return apiFetch(`/content/${page}`);
}

/** Published news/events list. Optional query string e.g. '?category=News' */
export function getNews(query = '') {
  return apiFetch(`/news${query}`);
}

/** Single news/event post by slug */
export function getNewsBySlug(slug) {
  return apiFetch(`/news/${slug}`);
}

/** Published gallery images. Optional query string e.g. '?category=Sports' */
export function getGallery(query = '') {
  return apiFetch(`/gallery${query}`);
}

/** Published documents/downloads */
export function getDocuments(query = '') {
  return apiFetch(`/documents${query}`);
}

/** Fee structure rows */
export function getFees() {
  return apiFetch('/fees');
}

/** Published FAQs */
export function getFaqs() {
  return apiFetch('/faqs');
}

/** Submit admission enquiry / application (rate-limited on backend) */
export function submitApplication(data) {
  return apiFetch('/applications', {
    method: 'POST',
    body:   JSON.stringify(data),
  });
}

/** Submit contact form (rate-limited on backend) */
export function submitContact(data) {
  return apiFetch('/contact', {
    method: 'POST',
    body:   JSON.stringify(data),
  });
}

/**
 * Section images — admin-assigned images grouped by section and slot.
 * Returns { sectionKey: { slotKey: { imageUrl, alt, objectPosition } } }
 * Falls back gracefully to {} on error so static data-file images are used.
 */
export function getSectionImages() {
  return apiFetch('/section-images');
}

export default apiFetch;
