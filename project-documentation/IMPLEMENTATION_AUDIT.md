# IMPLEMENTATION AUDIT
## Tilak Global School Website — Phase 1 Findings
**Audit Date:** 2026-11-10  
**Auditor:** Kiro (Senior Full-Stack AI Engineer)  
**Status:** Read-only audit. No code or data was modified.

---

## 1. PROJECT STRUCTURE OVERVIEW

```
tilak-global-school/
├── backend/              Node.js + Express 5 + Mongoose 9 (Render)
├── frontend/             Next.js 15 + React 19 + Tailwind v4 (Vercel)
├── admin/                Next.js 15 + React 19 + Tailwind v4 (Vercel, separate app)
├── Content-Files/        Client-provided DOCX + images + video
└── project-documentation/
```

---

## 2. BACKEND AUDIT

### 2.1 Framework & Configuration

| Item | Detail |
|---|---|
| Framework | Express 5.3.0 (ESM, `type: module`) |
| Database | Mongoose 9.11.1 → MongoDB Atlas |
| Auth | JWT (jsonwebtoken 9.0.3) + httpOnly cookie |
| File Upload | Multer 2.4.0 → **disk storage only** (NO Cloudinary) |
| Validation | Zod 4.6.7 |
| Security | Helmet 8.3.0, bcryptjs 3.0.3, rate-limit 8.7.1 |
| Email | **None** — no nodemailer, no SMTP |
| Cloudinary | **NOT integrated** — not in package.json, no env vars |

### 2.2 Environment Variables (from `.env.example`)

| Variable | Required | Note |
|---|---|---|
| `MONGO_URI` | YES | Atlas only — localhost rejected |
| `JWT_SECRET` | YES (prod) | Strong secret required in prod |
| `JWT_EXPIRES_IN` | No | Default 7d |
| `PORT` | No | Default 5000 |
| `NODE_ENV` | No | development/production |
| `UPLOAD_DIR` | No | Default `uploads/` |
| `MAX_FILE_SIZE_MB` | No | Default 10 |
| `CLIENT_URL` | No | Documented but **unused** by CORS |
| `COOKIE_DOMAIN` | No | Empty in dev, `.tilakglobalschool.com` in prod |
| `RENDER_URL` | No | Backend keep-alive URL |
| `ADMIN_EMAIL` | Seed only | For seed script |
| `ADMIN_PASSWORD` | Seed only | For seed script |
| `ADMIN_NAME` | Seed only | For seed script |

**Missing from `.env.example` (need to add for Cloudinary Phase 2):**
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 2.3 Database Models

| Model | Key Fields | Status |
|---|---|---|
| `AdminUser` | name, email, passwordHash, role, permissions, isActive | ✅ Complete |
| `SiteSettings` | Singleton, 30+ fields covering all school identity/contact/media | ✅ Complete |
| `Content` | key (dot-notation), page, section, label, type, value, draftValue, hasDraft, status | ✅ Complete |
| `AdmissionApplication` | applicationId, source, status, studentName, classApplying, parentName, phone, statusHistory | ✅ Complete |
| `ContactEnquiry` | name, email, phone, subject, message, status | ✅ Complete |
| `GalleryImage` | imageUrl, thumbnailUrl, caption, category, albumName, order, status | ✅ — missing Cloudinary fields |
| `NewsPost` | title, slug, category, date, summary, body, imageUrl, isFeatured, status | ✅ — missing Cloudinary fields |
| `Document` | title, category, page, fileUrl, fileType, fileSizeKb, status | ✅ — missing Cloudinary fields |
| `FeeRow` | classGroup (4 groups), admissionFee, tuitionFeePerTerm, otherCharges, notes, order | ⚠️ Only 4 groups — needs redesign for actual fee structure |
| `Faq` | question, answer, order, isActive | ✅ Complete |
| `ActivityLog` | adminUser, action, module, detail, TTL 180d | ✅ Complete |
| `Counter` | seq, formatApplicationId | ✅ Complete |

**FeeRow Issue — Important:** The model currently has only 4 class groups (`Nursery–UKG`, `I–V`, `VI–VIII`, `IX–XII`) as an enum. The actual client fee chart has **8 distinct rows** (Play Group–Prep, I–II, III–V, VI–VIII, IX, X, XI, XII) with different admission fees and tuition amounts per group. This model will need restructuring to match the real fee data.

### 2.4 API Routes (complete map)

**Public (no auth required):**
```
GET  /api/health
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
POST /api/auth/change-password
GET  /api/settings
GET  /api/content/:page
GET  /api/gallery
GET  /api/news/featured
GET  /api/news
GET  /api/news/:slug
GET  /api/documents
GET  /api/fees
GET  /api/faqs
POST /api/contact
POST /api/applications
```

**Admin (auth required, permission-gated):**
```
# Dashboard
GET /api/admin/dashboard/stats
GET /api/admin/dashboard/stats/trend
GET /api/admin/dashboard/stats/by-class
GET /api/admin/dashboard/activity

# Applications
GET    /api/admin/applications
GET    /api/admin/applications/:id
PATCH  /api/admin/applications/:id/status
DELETE /api/admin/applications/:id

# Content CMS
GET    /api/admin/content
GET    /api/admin/content/page/:page
POST   /api/admin/content
GET    /api/admin/content/block?key=
PUT    /api/admin/content/block?key=
PATCH  /api/admin/content/block/publish?key=
PATCH  /api/admin/content/block/unpublish?key=
DELETE /api/admin/content/block?key=

# Gallery
GET    /api/admin/gallery
POST   /api/admin/gallery          (multipart — uploadImage)
GET    /api/admin/gallery/:id
PUT    /api/admin/gallery/:id
DELETE /api/admin/gallery/:id

# News & Events
GET    /api/admin/news
POST   /api/admin/news             (multipart — uploadNewsImage)
GET    /api/admin/news/:id
PUT    /api/admin/news/:id         (multipart — uploadNewsImage)
PATCH  /api/admin/news/:id/publish
PATCH  /api/admin/news/:id/unpublish
PATCH  /api/admin/news/:id/featured
DELETE /api/admin/news/:id

# Documents
GET    /api/admin/documents
POST   /api/admin/documents        (multipart — uploadDocument)
GET    /api/admin/documents/:id
PUT    /api/admin/documents/:id    (multipart — uploadDocument)
DELETE /api/admin/documents/:id

# Fee Structure
GET    /api/admin/fees
POST   /api/admin/fees
PUT    /api/admin/fees/:id
DELETE /api/admin/fees/:id

# FAQs
GET    /api/admin/faqs
POST   /api/admin/faqs
PATCH  /api/admin/faqs/reorder
PUT    /api/admin/faqs/:id
DELETE /api/admin/faqs/:id

# Settings
GET  /api/admin/settings
PUT  /api/admin/settings
POST /api/admin/settings/logo
POST /api/admin/settings/favicon
POST /api/admin/settings/director-photo

# Contact Enquiries
GET    /api/admin/contact
GET    /api/admin/contact/:id
PATCH  /api/admin/contact/:id/status
DELETE /api/admin/contact/:id

# Users
GET    /api/admin/users
POST   /api/admin/users
GET    /api/admin/users/:id
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
POST   /api/admin/users/:id/reset-password
PATCH  /api/admin/users/:id/permissions
```

### 2.5 Authentication & Authorization

| Mechanism | Detail |
|---|---|
| Token type | JWT, signed with `JWT_SECRET` |
| Token storage | httpOnly cookie `adminToken` (primary) + Bearer header (fallback) |
| Cookie flags | `secure: true`, `sameSite: 'none'` in prod; `secure: false`, `sameSite: 'lax'` in dev |
| Cookie TTL | 7 days |
| Token payload | `{ id, email, name, role, permissions }` — permissions embedded |
| Token revocation | None — logout clears cookie, token stays technically valid until expiry |
| Permission check | `requirePermission(module, action)` reads from JWT payload (not DB) |
| Permission lag | If permissions changed in DB, old JWT still carries stale permissions until re-login |

### 2.6 File Upload — Current State

| Aspect | Detail |
|---|---|
| Library | Multer 2.4.0 |
| Storage | **Disk storage** (`multer.diskStorage`) |
| Subdirectories | `uploads/gallery/`, `uploads/documents/`, `uploads/media/`, `uploads/news/` |
| Naming | `${Date.now()}-${randomHex8}.${ext}` — secure, no client filenames |
| MIME validation | Yes — by MIME type, not extension |
| Size limit | `MAX_FILE_SIZE_MB` (default 10MB) |
| Persistence | **CRITICAL: Render ephemeral disk — files lost on restart/redeploy** |
| URL in DB | Relative path e.g. `/uploads/gallery/xxx.jpg` |
| URL resolution | Frontend `getUploadUrl()` — relative on client, absolute on server |

### 2.7 Seed Scripts

| Script | Command | What it does |
|---|---|---|
| `seed.js` | `npm run seed` | Creates super_admin user, SiteSettings singleton, 4 FeeRow stubs, 5 FAQ stubs, Counter doc |
| `contentSeed.js` | `npm run seed:content` | Upserts 30+ Content CMS blocks (home, about, academics, admissions, contact, downloads) — skips existing keys |

---

## 3. ADMIN PANEL AUDIT

### 3.1 Admin Tech Stack

| Item | Detail |
|---|---|
| Framework | Next.js 15 + React 19 (all `'use client'` pages) |
| Auth | AuthContext using httpOnly cookie — no token in localStorage |
| API calls | All client-side via `adminApi.js` + `fetchWithRetry` |
| URL strategy | `/api/*` → Vercel rewrite → Render backend |
| Upload URL | `/uploads/*` → Vercel rewrite → Render backend |

### 3.2 Admin Module Status

| Module | Page | Status | Missing Features |
|---|---|---|---|
| **Login** | `/login` | ✅ Fully functional | — |
| **Dashboard** | `/` | ✅ Fully functional | — |
| **Admissions** | `/admissions` | ✅ Fully functional | — |
| **Content CMS** | `/content` | ✅ Functional | Cannot CREATE or DELETE blocks from UI |
| **Gallery** | `/gallery` | ✅ Functional | Edit modal has no image replacement (metadata only) |
| **News & Events** | `/news` | ⚠️ Partial | **No image upload in create/edit form** — backend supports it, admin sends JSON |
| **Documents** | `/documents` | ⚠️ Partial | **No edit/update UI** — only upload and delete; `PUT /admin/documents/:id` exists but unused |
| **Fee Structure** | `/fees` | ⚠️ Partial | Only edits existing 4 rows; no create/delete UI; **model mismatch with actual 8-row fee chart** |
| **FAQs** | `/faqs` | ✅ Functional | Drag-to-reorder UI not implemented (backend `PATCH /reorder` exists) |
| **Contact Enquiries** | `/contact` | ✅ Fully functional | — |
| **Settings** | `/settings` | ✅ Fully functional | — |
| **Users** | `/users` | ⚠️ Bug | "Hard delete" button calls `updateUser({isActive:false})` instead of `deleteUser()` — soft deactivate, not delete |

### 3.3 Admin Bugs

| ID | Location | Severity | Description |
|---|---|---|---|
| BUG-01 | `users/page.jsx` — `handleHardDelete` | Medium | Calls `adminApi.updateUser(id, {isActive:false})` instead of `adminApi.deleteUser(id)`. UI says "permanently remove" but only deactivates. |
| BUG-02 | `gallery/page.jsx` — Edit modal | Low | Image replacement not possible from admin — only caption/category/status editable. Must re-upload to replace an image. |
| BUG-03 | `news/page.jsx` — Create/Edit form | High | No image upload field in admin news form. Backend requires multipart but admin sends plain JSON. News images can never be attached via current admin UI. |
| BUG-04 | `faqs/page.jsx` — Reorder | Low | GripVertical drag handle renders but no drag handler is wired. `PATCH /admin/faqs/reorder` exists but is never called. |

---

## 4. FRONTEND AUDIT

### 4.1 Frontend Tech Stack

| Item | Detail |
|---|---|
| Framework | Next.js 15 + React 19 |
| Styling | Tailwind CSS v4 |
| API | Server Components fetch from `API_URL` env (private) |
| Client API | `/api/*` → Vercel rewrite |
| Upload URL | `/uploads/*` → Vercel rewrite |
| Images | next/image, remote patterns: Render backend + Unsplash |

### 4.2 Pages — Dynamic vs Static Status

| Page | Dynamic (API) | Static (Hardcoded) | Notes |
|---|---|---|---|
| **Home** `/` | ✅ Partial | ⚠️ Partial | Settings/Content/News/Gallery/FAQs fetched. StatsBar, AcademicStages, FacilitiesSection, WhyChooseSection are STATIC. |
| **About Us** `/about-us` | ❌ Fully static | `data/about.js` | WhoWeAre, VisionMission, DirectorMessage, ManagementSection all static |
| **About — Our School** | ❌ Fully static | `data/about.js` | — |
| **About — Vision/Mission** | ❌ Fully static | `data/about.js` | — |
| **About — Principal's Message** | ❌ Fully static | `data/about.js` | — |
| **About — Infrastructure** | ❌ Fully static | `data/about.js` | — |
| **Academics** | ❌ Fully static | `data/academics.js` | — |
| **Admissions** | ⚠️ Partial | Partial | FAQs dynamic; process steps from CMS; most copy static |
| **Fee Structure** | ✅ Dynamic | Fallback to `data/admissions.js` | `FeeStructureSection` calls `getFees()` |
| **Online Admission Form** | ✅ Dynamic | — | Submits to `POST /api/applications` |
| **Gallery** | ✅ Dynamic | Fallback to `dummyGalleryItems` | Calls `getGallery()` |
| **Downloads** | ✅ Dynamic | Empty state | Calls `getDocuments()` |
| **News & Events** `/news-events` | ❌ Fully static | `data/newsEvents.js` | **FeaturedEvent, UpcomingEvents, NewsNoticesLayout, PreviousEvents — ALL from static data file** |
| **News — Single Post** `/news-events/[slug]` | ✅ Dynamic | — | Calls `getNewsBySlug(slug)` |
| **Contact Us** | ⚠️ Partial | `siteConfig.js` | Form submits dynamically but phone/email/address HARDCODED from `siteConfig.js`, not API |
| **Careers** | ❌ Fully static | — | Placeholder page |
| **Privacy Policy** | ❌ Fully static | — | Placeholder page |
| **Header** | ✅ Dynamic | Fallback to `siteConfig.js` | `HeaderServer` fetches settings for phone/email/social |
| **Footer** | ✅ Dynamic | Fallback to `siteConfig.js` | `FooterServer` fetches settings |

### 4.3 Hardcoded Data Issues

| ID | Location | Issue | Impact |
|---|---|---|---|
| HC-01 | `data/siteConfig.js` | `phone: ""`, `email: ""`, `whatsapp: ""` — blank placeholders | Contact Us page shows blank phone/email (uses siteConfig, not API) |
| HC-02 | `data/siteConfig.js` | `address: "Bindayaka, Mukandpura Road"` — missing "Bhutawali" and pin code | Wrong address displayed on Contact Us page |
| HC-03 | `data/siteConfig.js` | `social` links all set to `"#"` | Footer/header social links broken |
| HC-04 | `data/home.js` → `directorMessage` | `name: "R. S. Tanwar"` — conflicts with CF-01 (Abhay Tanwar in new documents) | Wrong director name displayed (pending client confirmation) |
| HC-05 | `data/home.js` → `hero.imageSrc` | Unsplash stock photo — not a real school photo | Hero section shows irrelevant stock image |
| HC-06 | `data/home.js` → `welcome.image.src` | Unsplash stock photo | Welcome section shows irrelevant stock image |
| HC-07 | `data/home.js` → `stats` | "Since 2016" and "Tilak Group" hardcoded | Fine if confirmed with client — no DB source |
| HC-08 | `data/newsEvents.js` | Fully static news/events content | News & Events page never shows admin-created posts |
| HC-09 | `frontend/src/app/(user)/page.jsx` line ~44 | `https://tilak-global-school-backend-0xwt.onrender.com` hardcoded as fallback for director photo URL | Will break if Render URL changes |
| HC-10 | `frontend/next.config.mjs` image patterns | `tilak-global-school-backend.onrender.com` (note: missing `-0xwt` suffix — may be wrong URL) | Could cause next/image to fail loading uploaded photos |
| HC-11 | `data/about.js`, `management.js` | Management/Chairman/Director details static with placeholder images | About page shows stock photos, placeholder management bios |
| HC-12 | `components/home/FacilitiesSection.jsx` | Facility images likely from Unsplash | Static, not client photos |

### 4.4 Components — API Connection Status

| Component | API Connected | Hardcoded Fallback | Notes |
|---|---|---|---|
| `HeroSection` | ✅ Partial | `data/home.js` | Badge + CMS text dynamic; hero image STATIC (Unsplash) |
| `StatsBar` | ❌ | `data/home.js` | Fully hardcoded |
| `WelcomeSection` | ✅ Partial | `data/home.js` | CMS body text dynamic; image STATIC |
| `DirectorMessage` | ✅ Partial | `data/home.js` | Name/message/photo from Settings; falls back to static R.S. Tanwar |
| `FacilitiesSection` | ❌ | `data/home.js` | Fully static; no API |
| `WhyChooseSection` | ❌ | Likely static | No API calls |
| `AcademicStages` | ❌ | Likely static | No API calls |
| `NewsGallerySection` | ✅ | Graceful empty state | News + gallery from API |
| `FaqSection` | ✅ | Graceful fallback | FAQs from API |
| `CtaBanner` | ✅ Partial | Fallback | Settings-driven |
| `HeaderServer` | ✅ | `siteConfig.js` | Phone/email/social from Settings |
| `FooterServer` | ✅ | `siteConfig.js` | Same as header |
| `GallerySection` | ✅ | `dummyGalleryItems` | Category filter works |
| `FeeStructureSection` | ✅ | Static rows | Calls `getFees()` |

---

## 5. CONTENT CMS AUDIT

### 5.1 Existing CMS Keys (from contentSeed.js)

| Key | Page | Type | Current Value |
|---|---|---|---|
| `home.hero.title` | home | text | "A stress-free place where every child grows with character." |
| `home.hero.subtitle` | home | text | "English-medium, CBSE school..." |
| `home.hero.badge` | home | text | "Admissions Open · Session [to be confirmed]" |
| `home.welcome.title` | home | text | "Welcome to Tilak Global School" |
| `home.welcome.body` | home | richtext | Established 2016, Tilak Group... |
| `home.director.quote` | home | text | Director quote |
| `home.cta.title` | home | text | "Give your child the best start." |
| `home.cta.subtitle` | home | text | "Admissions open for session [to be confirmed]..." |
| `about.intro.body` | about | richtext | Who We Are |
| `about.vision.text` | about | text | Vision statement |
| `about.mission.text` | about | text | "[Mission statement — to be confirmed]" |
| `about.values.list` | about | list | 5 values |
| `about.director.message` | about | richtext | Director full message |
| `about.director.name` | about | text | "R. S. Tanwar" (CF-01 conflict) |
| `about.director.designation` | about | text | "Director" |
| `academics.kg.description` | academics | text | Kindergarten description |
| `academics.primary.description` | academics | text | Primary description |
| `academics.middle.description` | academics | text | Middle description |
| `academics.senior.description` | academics | text | Senior description |
| `admissions.process.step1–step4` | admissions | text | 4 process steps |
| `admissions.eligibility.note` | admissions | text | "[to be confirmed]" |
| `admissions.docs.list` | admissions | list | 6 required documents |
| `contact.intro.text` | contact | text | Contact intro |
| `downloads.intro.text` | downloads | text | Downloads intro |

**CMS Coverage Gap:** The `about-us` subpages, `facilities` page, `careers`, `privacy-policy` have **NO CMS blocks** — they are 100% hardcoded.

### 5.2 CMS Draft/Publish Workflow

The workflow is: Edit → "Save Draft" (PUT) → "Save & Publish" (PUT + PATCH/publish). The public API (`GET /api/content/:page`) returns **only published records**. The draft value never reaches the public site until explicitly published. ✅ Correctly implemented.

---

## 6. SITE SETTINGS — CURRENT STATE

The Settings model has all required fields. Key fields that need populating:

| Field | Current DB Value | Should Be |
|---|---|---|
| `schoolName` | "Tilak Global School" ✅ | — |
| `phone` | "" (empty) | 9119112335 |
| `whatsappNumber` | "" (empty) | 9119112335 |
| `email` | "" (empty) | schooltilak@gmail.com |
| `address` | "Bindayaka, Mukandpura Road..." | Full confirmed address |
| `officeTimings` | "" (empty) | 8:00 AM to 2:00 PM |
| `admissionSession` | "" (empty) | 2026-27 |
| `cbseAffiliationNo` | "" (empty) | 1730870 |
| `cbseSchoolCode` | "" (empty) | 11224 |
| `directorName` | "R. S. Tanwar" | ⚠️ CF-01 — awaiting confirmation |
| `logoUrl` | "" (empty) | Needs Cloudinary upload |
| `directorPhotoUrl` | "" (empty) | Needs Cloudinary upload |
| `mapEmbedUrl` | "" (empty) | ⚠️ CF-11 — not provided |
| `socialLinks.*` | "" (all empty) | ⚠️ CF-14 — not provided |

---

## 7. BUGS AND ISSUES SUMMARY

### 7.1 Critical Issues (Blockers)

| ID | Severity | Description | Phase to Fix |
|---|---|---|---|
| CRIT-01 | 🔴 Critical | **Render ephemeral disk** — All uploaded files (gallery, documents, logo, favicon, news images, director photo) will be PERMANENTLY LOST on every Render restart or redeploy. No persistent storage exists. | Phase 2 |
| CRIT-02 | 🔴 Critical | **FeeRow model mismatch** — Model has 4 groups (`Nursery–UKG`, `I–V`, `VI–VIII`, `IX–XII`) but actual fee chart has 8 distinct rows. Enum restriction prevents adding correct data without schema change. | Phase 3 |
| CRIT-03 | 🔴 Critical | **News & Events page fully static** — Despite a complete News API, the `/news-events` page renders entirely from `data/newsEvents.js`. Admin-created posts never appear on this page. | Phase 3 |

### 7.2 High Issues

| ID | Severity | Description | Phase to Fix |
|---|---|---|---|
| HIGH-01 | 🟠 High | Admin news form cannot upload images — backend requires multipart but admin sends JSON | Phase 3 |
| HIGH-02 | 🟠 High | Contact Us page reads phone/email/address from `siteConfig.js` (blank), not from API Settings | Phase 3 |
| HIGH-03 | 🟠 High | Director name conflict (CF-01): static data says R.S. Tanwar, client doc says Abhay Tanwar | Client confirmation required |
| HIGH-04 | 🟠 High | Hero section uses Unsplash stock photo — no real school photograph | Phase 4/6 |
| HIGH-05 | 🟠 High | `next.config.mjs` image hostname: `tilak-global-school-backend.onrender.com` — missing `-0xwt` suffix vs actual URL `tilak-global-school-backend-0xwt.onrender.com` — may cause next/image failures | Phase 2 |

### 7.3 Medium Issues

| ID | Severity | Description | Phase to Fix |
|---|---|---|---|
| MED-01 | 🟡 Medium | Admin users page "hard delete" actually calls soft-deactivate (BUG-01) | Phase 3 |
| MED-02 | 🟡 Medium | Documents admin: no edit/update UI — only upload and delete | Phase 3 |
| MED-03 | 🟡 Medium | Gallery admin: no image replacement in edit modal | Phase 3 |
| MED-04 | 🟡 Medium | CORS origins hardcoded in `app.js` — `CLIENT_URL` env var ignored | Phase 2 |
| MED-05 | 🟡 Medium | All About Us subpages fully static — no CMS backing | Phase 3/5 |
| MED-06 | 🟡 Medium | `DiwaliHero`/`DiwaliWishes` always rendered — no feature flag or admin toggle | Phase 6 |
| MED-07 | 🟡 Medium | `siteConfig.js` phone/email/whatsapp all blank — Contact Us page shows nothing | Phase 3 |
| MED-08 | 🟡 Medium | No Gallery subcategories in model — current enum is `Campus/Classrooms/Sports/Events/Activities` but client has 14 distinct event categories | Phase 3/4 |
| MED-09 | 🟡 Medium | Hardcoded Render URL as fallback in `page.jsx` and `next.config.mjs` | Phase 2/3 |

### 7.4 Low Issues

| ID | Severity | Description | Phase to Fix |
|---|---|---|---|
| LOW-01 | 🟢 Low | FAQ reorder drag handle displayed but not wired | Phase 3 |
| LOW-02 | 🟢 Low | No email notifications for contact/admission submissions | Phase 7 / post-launch |
| LOW-03 | 🟢 Low | JWT not blacklisted on logout (stateless — acceptable trade-off) | Accept |
| LOW-04 | 🟢 Low | Stale JWT permissions until re-login after permission change | Accept |
| LOW-05 | 🟢 Low | `about.mission.text` CMS block says "[to be confirmed]" — placeholder text visible | Phase 5 |
| LOW-06 | 🟢 Low | `home.hero.badge` CMS block says "Session [to be confirmed]" | Phase 5 |
| LOW-07 | 🟢 Low | `data/siteConfig.js` copyright says "© 2025" — should be "© 2026" | Phase 5 |

---

## 8. SECURITY AUDIT

| Item | Status | Note |
|---|---|---|
| API secrets in source code | ✅ None found | Env vars only |
| `.env` in `.gitignore` | ✅ | Confirmed |
| JWT hardcoded secret | ✅ Dev only | Env-required in production; guard in `env.js` |
| Password stored as hash | ✅ | bcryptjs, `select: false` |
| SQL/NoSQL injection | ✅ | Mongoose parameterized, no raw queries |
| MIME-type file validation | ✅ | Extension not trusted |
| File path traversal | ✅ | Crypto random filenames |
| Rate limiting | ✅ | Login 10/15min, forms 10/15min, general 200/15min |
| Helmet headers | ✅ | CSP disabled (intentionally), CORP cross-origin |
| Admin portal SEO blocked | ✅ | `X-Robots-Tag: noindex,nofollow` in vercel.json |
| CORS | ⚠️ | Origins hardcoded in app.js — `CLIENT_URL` env unused |
| Cookie `sameSite: none` | ⚠️ | Required for cross-domain cookie — acceptable for this architecture |
| Upload path | ✅ | UPLOAD_DIR resolved with `path.resolve()` |
| Auth on all admin routes | ✅ | `authenticate` on all `/api/admin/*` |
| Cloudinary secret exposure | N/A | Not integrated yet |

---

## 9. DEPLOYMENT CONFIGURATION

### 9.1 Frontend (Vercel)

| Item | Status |
|---|---|
| Build command | `next build` (default) |
| Output | `.next/` |
| Env var needed | `API_URL=https://tilak-global-school-backend-0xwt.onrender.com/api` |
| Rewrites | `/api/*` → Render backend, `/uploads/*` → Render backend |
| Security headers | X-Frame-Options, X-Content-Type-Options, Referrer-Policy |

### 9.2 Admin (Vercel — separate app)

| Item | Status |
|---|---|
| Env var needed | `API_URL=https://tilak-global-school-backend-0xwt.onrender.com/api` (unused — all client-side) |
| Rewrites | `/api/*` → Render backend, `/uploads/*` → Render backend |
| Security headers | X-Robots-Tag: noindex,nofollow + X-Frame-Options + X-Content-Type-Options |

### 9.3 Backend (Render)

| Item | Status |
|---|---|
| Start command | `node src/server.js` |
| Required env vars | `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `COOKIE_DOMAIN=.tilakglobalschool.com` |
| Upload directory | ephemeral — ⚠️ **CRITICAL RISK** |
| Keep-alive | Render keep-alive ping configured via `RENDER_URL` |
| CORS | Hardcoded origins — allows all `*.vercel.app` |

---

## 10. CONTENT ASSETS — READINESS

| Asset Type | Count | Status | Blocking Issue |
|---|---|---|---|
| School logo | 1 (logo.jpeg, 1254×1254px) | Ready to upload | Need Cloudinary (Phase 2) |
| Director portrait | 1 (DirectorImage.png, 978×1609px) | Ready | CF-01 director name conflict |
| Chairman+Director photo | 1 (chairman_and_director_tilak_global_school_backdrop.webp) | Ready | CF-10 chairman name missing |
| School building photos | 4 WebP | Ready | Need Cloudinary |
| Facility photos | ~12 WebP (labs, library, ground, computer lab) | Ready | Need Cloudinary |
| Annual Day photos | 15 WebP | Ready | cms gallery category mismatch |
| Janmashtami photos | 15+ WebP | Ready | cms gallery category mismatch |
| Other event photos | 60+ WebP | Ready | Need Cloudinary |
| MP4 video | 1 (Rakhi designs) | Ready | Need video upload support |
| Fee chart DOCX | 1 | Ready to convert | CF-04/CF-05 conflicts; needs PDF conversion |
| Admission form | ❌ Not provided | Missing | CF-15 — request from client |

---

## 11. UNRESOLVED CLIENT CONFIRMATIONS (from CLIENT_ASSET_MANIFEST.json)

| ID | Topic | Blocking |
|---|---|---|
| CF-01 | Director name: Abhay Tanwar vs R.S. Tanwar | Director section, Settings, About page |
| CF-02 | Streams: Science+Commerce+Humanities vs Arts+Commerce | Academics page, FAQs |
| CF-03 | Total student count | Stats section |
| CF-04 | Class XI fee totals (two conflicting values) | Fee chart data entry |
| CF-05 | Bus fee: ₹250/km vs ₹150/km | Fee chart data entry |
| CF-06 | Tagline spelling: "Nuturing" vs "Nurturing" | Low severity — apply correction unless disputed |
| CF-07 | Founding year | Stats section |
| CF-08 | Teaching staff count | Stats section |
| CF-09 | Principal's full name | Management section |
| CF-10 | Chairman's full name | Management section |
| CF-11 | Google Maps URL | Contact Us page |
| CF-12 | Hostel availability | FAQs |
| CF-13 | School session timings | FAQs |
| CF-14 | Social media handles | Header, Footer, Settings |
| CF-15 | News article content | News & Events page |

---

## 12. PHASE-BY-PHASE READINESS

| Phase | Readiness | Blocking |
|---|---|---|
| Phase 1 — Audit | ✅ Complete | — |
| Phase 2 — Cloudinary | ✅ Ready to start | Need Cloudinary API secret from client |
| Phase 3 — CMS+API Integration | Ready after Phase 2 | FeeRow model redesign required |
| Phase 4 — Asset Upload | Ready after Phase 2+3 | Need CF-01, CF-04, CF-05 resolved |
| Phase 5 — Content Population | Ready after Phase 4 | Need CF-01 through CF-15 resolved |
| Phase 6 — Design QA | Ready after Phase 5 | — |
| Phase 7 — Final QA | Ready after Phase 6 | — |

---

## 13. FILES THAT WILL CHANGE PER PHASE

### Phase 2 (Cloudinary)
- `backend/package.json` — add `cloudinary`, `multer-storage-cloudinary`
- `backend/.env.example` — add Cloudinary vars
- `backend/src/config/cloudinary.js` — NEW
- `backend/src/middleware/upload.middleware.js` — replace disk with Cloudinary storage
- `backend/src/models/GalleryImage.model.js` — add `publicId`, `cloudinaryUrl`
- `backend/src/models/NewsPost.model.js` — add `publicId`, `cloudinaryUrl`
- `backend/src/models/Document.model.js` — add `publicId`, `cloudinaryUrl`
- `backend/src/models/SiteSettings.model.js` — add `logoPublicId`, `faviconPublicId`, `directorPhotoPublicId`
- `backend/src/controllers/gallery.controller.js` — handle Cloudinary delete
- `backend/src/controllers/news.controller.js` — handle Cloudinary delete
- `backend/src/controllers/document.controller.js` — handle Cloudinary delete
- `backend/src/controllers/settings.controller.js` — handle Cloudinary media upload/delete
- `frontend/next.config.mjs` — add `res.cloudinary.com` image pattern

### Phase 3 (CMS+API Integration)
- `backend/src/models/FeeRow.model.js` — redesign class groups enum
- `frontend/src/app/(user)/news-events/page.jsx` — connect to API
- `frontend/src/components/news-events/*.jsx` — connect to API
- `frontend/src/app/(user)/contact-us/page.jsx` — use API settings for phone/email
- `frontend/src/data/siteConfig.js` — populate confirmed data
- `admin/src/app/news/page.jsx` — add image upload field
- `admin/src/app/documents/page.jsx` — add edit/update UI
- Multiple About Us subpages — connect to CMS

---

*End of IMPLEMENTATION_AUDIT.md*
