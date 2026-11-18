/**
 * robots.js — Next.js 15 App Router Robots.txt
 * Auto-generated at build time and served at /robots.txt
 *
 * Tells search engines:
 *   - Allow indexing of the entire public site
 *   - Disallow admin panel paths
 *   - Point to sitemap
 */

export default function robots() {
  return {
    rules: [
      {
        // Allow all search engine bots to crawl the public site
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",          // Admin panel (also has noindex header)
          "/api/",           // Backend API endpoints
          "/_next/",         // Next.js internal chunks
        ],
      },
    ],
    sitemap: "https://www.tilakglobalschool.com/sitemap.xml",
    host:    "https://www.tilakglobalschool.com",
  };
}
