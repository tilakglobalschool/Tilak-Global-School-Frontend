# Tilak Global School — Session Updates Log

> **Last Updated:** October 2026  
> **Developer:** Dishant Saini — Code Craft IT Solution  
> **Repos:**
> - Frontend + Admin: `Tilak-Global-School-Frontend` (GitHub)
> - Backend API: `Tilak-Global-School-Backend` (GitHub)

---

## Overview — Is Session Mein Kya Kiya

1. Backend ka complete audit — 8 bugs fix
2. Admin panel ke hardcoded `localhost:5000` URLs fix
3. Public site ke saare forms real API se connect
4. 3 naye live-data pages: Downloads, News & Events, Gallery
5. Production CORS, cookie (`sameSite`), aur deployment issues fix
6. `NEXT_PUBLIC_` prefix poori codebase se remove
7. **Production login bug fix** — double-hashed password issue resolve (seed.js)
8. Both repos GitHub par push

---

## PART 1 — Backend Audit & 8 Bugs Fix

**Repo:** `Tilak-Global-School-Backend`  
**Commit:** `9af2ab5`

### Bug 1 — `app.js`: ES Module `__dirname` missing

**Problem:** `__dirname` ES modules mein automatically nahi milta — static `/uploads` serve nahi ho raha tha.  
**Fix:** `fileURLToPath` + `path.dirname` se define kiya.

```js
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
```

---

### Bug 2 — `app.js`: CORS incomplete

**Problem:** `*.vercel.app` preview deployments block ho rahi thi. `Cookie` aur `Set-Cookie` headers allowed nahi the.  
**Fix:** Explicit origins list + Vercel wildcard + headers.

```js
const ALLOWED_ORIGINS = [
  'https://tilakglobalschool.com',
  'https://www.tilakglobalschool.com',
  'https://admin-portal.tilakglobalschool.com',
  'http://localhost:3000',
  'http://localhost:3001',
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    if (origin.endsWith('.vercel.app')) return cb(null, true);
    cb(new Error('CORS blocked'));
  },
  credentials:    true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
}));
```

---

### Bug 3 — `env.js`: Missing exports + no production validation

**Problem:** `RENDER_URL` missing. Weak JWT_SECRET se production start ho sakta tha.  
**Fix:** Export add kiya + fail-fast validation.

---

### Bug 4 — `server.js`: Upload subdirectories missing

**Problem:** Render pe fresh deploy mein pehle upload par `ENOENT` error.  
**Fix:** Server start pe auto-create.

```js
const UPLOAD_SUBDIRS = ['gallery', 'news', 'documents', 'media'];
for (const dir of UPLOAD_SUBDIRS) {
  const full = path.join(UPLOAD_DIR, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
}
```

Saath mein: graceful SIGTERM/SIGINT shutdown + keep-alive ping (Render free tier).

---

### Bug 5 — `jwt.js`: Cross-origin cookie kaam nahi kar raha

**Problem:** `sameSite: 'strict'` — Vercel → Render cross-origin mein browser cookie drop kar deta hai. `clearTokenCookie` empty value set karta tha instead of `res.clearCookie()`.  
**Fix:**

```js
sameSite: isProd ? 'none' : 'lax',  // 'none' requires secure:true
secure:   isProd,
// clearCookie bhi fix kiya
res.clearCookie(COOKIE_NAME, getCookieOptions());
```

---

### Bug 6 — `auth.controller.js`: `name` missing from JWT payload

**Problem:** Activity log mein `adminName` blank aa raha tha.  
**Fix:** `buildPayload()` mein `name` add kiya.

---

### Bug 7 — `settings.controller.js`: Wrong file deletion path

**Problem:** Old media file delete karte waqt path galat ban raha tha.  
**Fix:**

```js
// Before (wrong)
path.join(UPLOAD_DIR, '..', oldUrl)

// After (correct)
const relativeFile = oldUrl.replace(/^\/uploads\//, '');
const absPath = path.join(UPLOAD_DIR, relativeFile);
```

---

### Bug 8 — `seed.js`: Email domain + missing counter + deprecation

**Problems:** `.in` instead of `.com`, counter document missing, Mongoose deprecation.  
**Fix:** Sab theek kiya.

---

## PART 2 — Admin Panel: `localhost:5000` URLs Fix

**Repo:** `Tilak-Global-School-Frontend`  
**Commit:** `a9f7766`

`gallery/page.jsx`, `documents/page.jsx`, `settings/page.jsx` mein hardcoded `localhost:5000` tha.

```js
// Before
const IMG_BASE = 'http://localhost:5000';

// After — environment-aware
function getFileBase() {
  if (typeof window !== 'undefined') return ''; // browser: Vercel proxy
  return process.env.API_URL?.replace('/api', '') || 'https://api.tilakglobalschool.com';
}
```

Settings mein logo, favicon, director photo teeno image tags fix kiye.

---

## PART 3 — Public Site: Forms Real API Se Connect

**Commit:** `a9f7766`

### AdmissionEnquiryForm.jsx

**Before:** Demo message — koi data save nahi hota tha.  
**After:** `POST /api/applications` — applicationId return hota hai.

- Indian phone validation: `/^(\+91)?[6-9]\d{9}$/`
- 429 → "Too many submissions" message
- Loading spinner + success state with App ID

### OnlineAdmissionForm.jsx

**Before:** Frontend-only 4-step demo.  
**After:** Real API submission with all fields (name, DOB, gender, class, parent, phone, email, address, previous school).

### contact-us/page.jsx

**Before:** Sirf heading tha.  
**After:** Poora contact page:

- Contact info cards (address, phone, email, timings)
- WhatsApp button
- Full form → `POST /api/contact`
- Validation + toast notifications

---

## PART 4 — Public Site: 3 New Live-Data Pages

**Commit:** `cf8a780`

### downloads/page.jsx

- `GET /api/documents` → category-wise groups
- File type badge, size, date
- Download + external link

### news-events/page.jsx + `[slug]/page.jsx`

- `GET /api/news` → card grid
- Individual post page: `GET /api/news/:slug`
- `generateMetadata()` for SEO

### gallery/page.jsx

- `GET /api/gallery` with category filter
- URL-based filter tabs (server-side, no useState)
- Masonry layout + hover caption

### FeeStructureSection.jsx

- Async server component — `GET /api/fees`
- Live amounts formatted as `₹ XX,XXX`
- Falls back to static data if not seeded yet

### AdmissionsFaqWrapper.jsx + AdmissionsFaqSection.jsx

- Server wrapper fetches `GET /api/faqs`
- Passes to client accordion component
- Static fallback if API empty

### ToasterProvider.jsx + (user)/layout.jsx

- Global toast notifications for all public pages
- No duplicate `<Toaster>` needed per page

---

## PART 5 — API URL Strategy (`NEXT_PUBLIC_` Remove)

**Commits:** `1c8e6f2`, `8b0c2c3`

```
Server-side → process.env.API_URL  (private, never in browser bundle)
Client-side → '/api'               (relative, Vercel rewrite proxies to backend)
```

`src/lib/apiUrl.js` dono apps mein:

```js
export function getApiBase() {
  if (typeof window !== 'undefined') return '/api';
  return process.env.API_URL || 'https://api.tilakglobalschool.com/api';
}
```

`vercel.json` dono apps mein:

```json
{ "rewrites": [{ "source": "/api/(.*)", "destination": "https://api.tilakglobalschool.com/api/$1" }] }
```

---

## PART 6 — Production Login Bug Fix (Double-Hashed Password)

**Repo:** `Tilak-Global-School-Backend`  
**Commit:** `9e89c91`

### Problem

```
Production mein:
  Seed: "Admin user already exists" → skip → purana hash raha
  Login: 401 Unauthorized

Root cause:
  Purana code mein AdminUser model ka pre-save hook
  bcrypt.hash() dobara karta tha:
    seed → hash('ChangeMe123!') → "$2b$12$ABC"
    pre-save → hash("$2b$12$ABC") → "$2b$12$XYZ"  ← double hashed!
    login → compare('ChangeMe123!', "$2b$12$XYZ") → ❌ FAIL
```

### Fix

Seed ab **hamesha** password reset karta hai `findByIdAndUpdate + $set` se — koi bhi pre-save hook nahi chalta:

```js
// New seed logic — existing user ho ya naya, ALWAYS reset hash
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
const existing = await AdminUser.findOne({ email: ADMIN_EMAIL });

if (existing) {
  // $set bypasses ALL pre-save hooks — guaranteed correct hash
  await AdminUser.findByIdAndUpdate(
    existing._id,
    { $set: { passwordHash, name, role, permissions, isActive: true } },
    { runValidators: false }
  );
  console.log(`✅ Admin user password reset: ${ADMIN_EMAIL}`);
  return;
}
// else: create fresh
```

### Render Par Steps

1. Push ke baad Render auto-deploy hoga
2. Render Shell mein: `npm run seed`
3. Output: `✅ Admin user password reset: admin@tilakglobalschool.com`
4. Login test: `POST /api/auth/login` → 200 ✅

---

## Commit History

### Backend (`Tilak-Global-School-Backend`)

| Commit | Description |
|---|---|
| `9e89c91` | fix: seed always resets admin password (double-hash fix) |
| `9af2ab5` | fix: complete backend audit — all 8 bugs resolved |
| `2ac1d53` | fix: production deployment — CORS, sameSite, uploads, keep-alive |

### Frontend (`Tilak-Global-School-Frontend`)

| Commit | Description |
|---|---|
| `bf0c6d7` | docs: add UPDATES.md |
| `cf8a780` | feat: public site API integration complete |
| `a9f7766` | fix: admin localhost URLs + public forms wired to API |
| `8b0c2c3` | fix: production deployment — CORS, cookies, rewrites |
| `1c8e6f2` | fix: remove NEXT_PUBLIC_ prefix |

---

## Production Environment Variables

### Vercel (both projects)

| Variable | Value |
|---|---|
| `API_URL` | `https://api.tilakglobalschool.com/api` |

### Render (backend)

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGO_URI` | `mongodb+srv://...` (Atlas) |
| `JWT_SECRET` | (strong 32+ char string) |
| `JWT_EXPIRES_IN` | `7d` |
| `CLIENT_URL` | `https://tilakglobalschool.com,https://admin-portal.tilakglobalschool.com` |
| `COOKIE_DOMAIN` | `.tilakglobalschool.com` |
| `RENDER_URL` | `https://api.tilakglobalschool.com` |
| `UPLOAD_DIR` | `uploads` |
| `MAX_FILE_SIZE_MB` | `10` |
| `ADMIN_EMAIL` | `admin@tilakglobalschool.com` |
| `ADMIN_PASSWORD` | (strong password) |

---

## Admin Login Credentials

| Field | Value |
|---|---|
| URL | `https://admin-portal.tilakglobalschool.com/login` |
| Email | `admin@tilakglobalschool.com` |
| Password | `ChangeMe123!` |

> ⚠️ **Pehle login ke baad password zaroor change karo.**

---

## Changed Files Summary

### Backend (10 files)

| File | Change |
|---|---|
| `src/app.js` | `__dirname` fix, CORS explicit origins + Vercel wildcard |
| `src/config/env.js` | `RENDER_URL` export, prod validation |
| `src/server.js` | Upload dirs auto-create, graceful shutdown, keep-alive |
| `src/utils/jwt.js` | `sameSite:none`, `clearCookie()` fix, `name` in payload |
| `src/middleware/auth.middleware.js` | Bearer header fallback, always JSON response |
| `src/controllers/auth.controller.js` | Pass `name` to `logActivity` |
| `src/controllers/settings.controller.js` | Fix file deletion path |
| `src/utils/activityLogger.js` | Support both `id` and `_id` |
| `src/seed/seed.js` | Double-hash fix: always reset via `$set`, `.com` email, counter |
| `.env.example` | Updated with all new vars |

### Frontend / Admin (17 files)

| File | Change |
|---|---|
| `admin/src/app/gallery/page.jsx` | `getFileBase()` replaces `localhost:5000` |
| `admin/src/app/documents/page.jsx` | `getFileBase()` replaces `localhost:5000` |
| `admin/src/app/settings/page.jsx` | `fileUrl()` helper for 3 image tags |
| `frontend/src/app/(user)/contact-us/page.jsx` | Full form, real API |
| `frontend/src/app/(user)/downloads/page.jsx` | Live API data, category groups |
| `frontend/src/app/(user)/gallery/page.jsx` | Live API, category filter, masonry |
| `frontend/src/app/(user)/news-events/page.jsx` | Live API card grid |
| `frontend/src/app/(user)/news-events/[slug]/page.jsx` | **NEW** — individual post |
| `frontend/src/app/(user)/admissions/page.jsx` | Uses `AdmissionsFaqWrapper` |
| `frontend/src/app/(user)/layout.jsx` | Global `ToasterProvider` |
| `frontend/src/components/admissions/AdmissionEnquiryForm.jsx` | Real `POST /api/applications` |
| `frontend/src/components/admissions/OnlineAdmissionForm.jsx` | Real `POST /api/applications` |
| `frontend/src/components/admissions/FeeStructureSection.jsx` | Async server component |
| `frontend/src/components/admissions/AdmissionsFaqSection.jsx` | Accepts `apiFaqs` prop |
| `frontend/src/components/admissions/AdmissionsFaqWrapper.jsx` | **NEW** — server wrapper |
| `frontend/src/components/ToasterProvider.jsx` | **NEW** — client toast wrapper |
