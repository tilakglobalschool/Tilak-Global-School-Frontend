/**
 * sitemap.js — Next.js 15 App Router Sitemap
 * Auto-generated at build time and served at /sitemap.xml
 *
 * Google Search Console: https://search.google.com/search-console
 * Submit: https://www.tilakglobalschool.com/sitemap.xml
 */

const BASE_URL = "https://www.tilakglobalschool.com";

/** Static pages with priority and change frequency */
const STATIC_ROUTES = [
  // ── Core pages ────────────────────────────────────────────
  { path: "/",                              priority: 1.0,  changeFrequency: "weekly"  },
  { path: "/about-us",                      priority: 0.9,  changeFrequency: "monthly" },
  { path: "/about-us/our-school",           priority: 0.8,  changeFrequency: "monthly" },
  { path: "/about-us/vision-mission",       priority: 0.8,  changeFrequency: "monthly" },
  { path: "/about-us/principals-message",   priority: 0.8,  changeFrequency: "monthly" },
  { path: "/about-us/infrastructure",       priority: 0.7,  changeFrequency: "monthly" },

  // ── Academics ─────────────────────────────────────────────
  { path: "/academics",                     priority: 0.8,  changeFrequency: "monthly" },
  { path: "/academics/curriculum",          priority: 0.7,  changeFrequency: "monthly" },
  { path: "/academics/faculty",             priority: 0.7,  changeFrequency: "monthly" },
  { path: "/academics/academic-calendar",   priority: 0.6,  changeFrequency: "monthly" },

  // ── Admissions ────────────────────────────────────────────
  { path: "/admissions",                    priority: 0.95, changeFrequency: "weekly"  },
  { path: "/admissions/admission-process",  priority: 0.85, changeFrequency: "monthly" },
  { path: "/admissions/fee-structure",      priority: 0.85, changeFrequency: "monthly" },
  { path: "/admissions/online-admission-form", priority: 0.9, changeFrequency: "weekly" },

  // ── Gallery & News ────────────────────────────────────────
  { path: "/gallery",                       priority: 0.7,  changeFrequency: "weekly"  },
  { path: "/news-events",                   priority: 0.75, changeFrequency: "weekly"  },

  // ── Contact & Downloads ───────────────────────────────────
  { path: "/contact-us",                    priority: 0.8,  changeFrequency: "monthly" },
  { path: "/downloads",                     priority: 0.6,  changeFrequency: "monthly" },

  // ── Other ─────────────────────────────────────────────────
  { path: "/privacy-policy",                priority: 0.3,  changeFrequency: "yearly"  },
  { path: "/careers",                       priority: 0.4,  changeFrequency: "monthly" },
];

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static routes
  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url:            `${BASE_URL}${path}`,
    lastModified:   now,
    changeFrequency,
    priority,
  }));

  // Dynamic news/events pages — fetch from API
  let newsEntries = [];
  try {
    const res = await fetch(
      `${process.env.API_URL || "https://tilak-global-school-backend-0xwt.onrender.com/api"}/news?limit=100&status=published`,
      { next: { revalidate: 3600 } }   // revalidate every hour
    );
    if (res.ok) {
      const json = await res.json();
      const posts = json?.data?.posts || [];
      newsEntries = posts.map(post => ({
        url:            `${BASE_URL}/news-events/${post.slug}`,
        lastModified:   new Date(post.updatedAt || post.createdAt || now).toISOString(),
        changeFrequency: "weekly",
        priority:       0.6,
      }));
    }
  } catch {
    // Sitemap still works even if news fetch fails
  }

  return [...staticEntries, ...newsEntries];
}
