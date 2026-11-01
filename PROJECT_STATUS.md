# Tilak Global School — Project Status Document

> **Last Updated:** October 2026  
> **Developer:** Dishant Saini — Code Craft IT Solution  
> **Teammate:** Kartik Maru (public site), Aman (admin panel)

---

## 1. Project Overview

CBSE English medium school website — public-facing site + separate admin panel + REST API backend.

| Layer | Tech | Dev Port | Production |
|---|---|---|---|
| Public Website | Next.js 15, React 19, Tailwind CSS v4 | `3000` | `tilakglobalschool.com` |
| Admin Panel | Next.js 15, React 19, Tailwind CSS v4 | `3001` | `admin-portal.tilakglobalschool.com` |
| Backend API | Express.js 5, Mongoose | `5000` | `api.tilakglobalschool.com` |
| Database | MongoDB Atlas | `27017` (local) | Atlas cluster |

---

## 2. Folder Structure

```
tilak-global-school/
├── package.json                  ← Root scripts (concurrently)
├── .gitignore
├── PROJECT_BRIEF.md              ← Client requirements (source of truth)
├── PROJECT_STATUS.md             ← This file
├── UPDATES.md                    ← Session changelog
├── README.md
│
├── frontend/                     ← Public website (port 3000)
│   ├── package.json
│   ├── next.config.mjs           ← Dev rewrites /api/* → localhost:5000
│   ├── vercel.json               ← Prod rewrites /api/* → api.tilakglobalschool.com
│   ├── postcss.config.mjs
│   ├── jsconfig.json
│   ├── .env.example              ← API_URL=https://api.tilakglobalschool.com/api
│   └── src/
│       ├── app/
│       │   ├── (user)/
│       │   │   ├── page.jsx                    ← Home (static data)
│       │   │   ├── about-us/
│       │   │   ├── academics/
│       │   │   ├── admissions/page.jsx          ← Fees + FAQs from API
│       │   │   ├── gallery/page.jsx             ← Live API + category filter
│       │   │   ├── news-events/page.jsx         ← Live API
│       │   │   ├── news-events/[slug]/page.jsx  ← Individual post (NEW)
│       │   │   ├── contact-us/page.jsx          ← Full form → API
│       │   │   ├── downloads/page.jsx           ← Live API grouped by category
│       │   │   ├── careers/
│       │   │   └── privacy-policy/
│       │   ├── admin/page.jsx    ← Hard 404 (security)
│       │   ├── globals.css
│       │   ├── layout.jsx
│       │   └── not-found.jsx
│       ├── components/
│       │   ├── layout/Header.jsx + Footer.jsx
│       │   ├── home/             ← Homepage section components
│       │   ├── about/
│       │   ├── academics/
│       │   ├── admissions/       ← Forms wired to API
│       │   ├── shared/
│       │   └── ToasterProvider.jsx  ← Global toast (NEW)
│       ├── data/                 ← Static fallback data
│       └── lib/
│           ├── api.js            ← Public API client
│           └── apiUrl.js         ← getApiBase() — server vs client URL
│
├── admin/                        ← Admin panel (port 3001)
│   ├── package.json
│   ├── next.config.mjs
│   ├── vercel.json
│   ├── .env.example
│   └── src/
│       ├── app/
│       │   ├── layout.jsx        ← AuthProvider + AdminShell
│       │   ├── globals.css
│       │   ├── AuthContext.jsx
│       │   ├── AdminShell.jsx    ← Auth guard, sidebar, dark mode
│       │   ├── page.jsx          ← Dashboard (charts + stats)
│       │   ├── login/page.jsx
│       │   ├── admissions/page.jsx
│       │   ├── gallery/page.jsx
│       │   ├── news/page.jsx
│       │   ├── content/page.jsx
│       │   ├── documents/page.jsx
│       │   ├── fees/page.jsx
│       │   ├── faqs/page.jsx
│       │   ├── contact/page.jsx
│       │   ├── settings/page.jsx
│       │   ├── users/page.jsx
│       │   └── components/
│       │       ├── Sidebar.jsx
│       │       ├── TopBar.jsx
│       │       ├── Badge.jsx
│       │       ├── Modal.jsx
│       │       ├── ConfirmDialog.jsx
│       │       ├── EmptyState.jsx
│       │       ├── PageHeader.jsx
│       │       ├── Spinner.jsx
│       │       └── StatCard.jsx
│       └── lib/
│           ├── adminApi.js       ← Complete admin API client
│           └── apiUrl.js         ← getApiBase()
│
├── backend/                      ← Express REST API (port 5000)
│   ├── package.json              ← type: module (ES Modules)
│   ├── .env                      ← git-ignored
│   ├── .env.example
│   └── src/
│       ├── server.js             ← DB connect → listen → upload dirs → keep-alive
│       ├── app.js                ← Express: helmet, CORS, routes, error handler
│       ├── config/db.js + env.js
│       ├── models/               ← 12 Mongoose models
│       ├── routes/               ← 13 route files (public + admin exports)
│       ├── controllers/          ← 13 controller files
│       ├── middleware/           ← auth, errorHandler, notFound, rateLimiter, upload
│       ├── validators/           ← 11 Zod schemas
│       ├── seed/
│       │   ├── seed.js           ← Admin user (always resets hash), settings, fees, FAQs
│       │   └── contentSeed.js    ← CMS default content blocks
│       └── utils/
│           ├── asyncHandler.js
│           ├── response.js
│           ├── jwt.js            ← sameSite:none prod, clearCookie fix
│           ├── activityLogger.js
│           └── AppError.js
│
└── nginx/
    └── tilakglobalschool.conf    ← Production Nginx config
```

---

## 3. How to Run (Development)

### Prerequisites
- Node.js LTS v20+
- MongoDB Community Server on `localhost:27017`

### Start all 3 (from root)

```bash
npm install
npm run dev        # frontend :3000 + admin :3001 + backend :5000
```

### Or individually

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev

# Terminal 3
cd admin && npm install && npm run dev
```

### First-time seed

```bash
cd backend
npm run seed        # creates admin + default data
npm run seed:content  # seeds CMS content blocks (optional)
```

---

## 4. Admin Login Credentials

| Field | Value |
|---|---|
| Dev URL | `http://localhost:3001/login` |
| Prod URL | `https://admin-portal.tilakglobalschool.com/login` |
| Email | `admin@tilakglobalschool.com` |
| Password | `ChangeMe123!` |

> ⚠️ Seed ab **hamesha** password reset karta hai via `$set` — no pre-save hook interference.

---

## 5. Environment Variables

### `backend/.env` (Development)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tilak_school
NODE_ENV=development
JWT_SECRET=tilak_school_dev_secret_change_before_production
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=10
CLIENT_URL=http://localhost:3000,http://localhost:3001
COOKIE_DOMAIN=
RENDER_URL=https://api.tilakglobalschool.com
ADMIN_EMAIL=admin@tilakglobalschool.com
ADMIN_PASSWORD=ChangeMe123!
```

### `frontend/.env.local` (Development)

```env
API_URL=http://localhost:5000/api
```

### `admin/.env.local` (Development)

```env
API_URL=http://localhost:5000/api
```

### Vercel (Production — both projects)

```
API_URL = https://api.tilakglobalschool.com/api
```

### Render (Production — backend)

```
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=(strong 32+ char random string)
JWT_EXPIRES_IN=7d
CLIENT_URL=https://tilakglobalschool.com,https://admin-portal.tilakglobalschool.com
COOKIE_DOMAIN=.tilakglobalschool.com
RENDER_URL=https://api.tilakglobalschool.com
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=10
ADMIN_EMAIL=admin@tilakglobalschool.com
ADMIN_PASSWORD=(strong password)
```

---

## 6. API Routes Summary

### Public (no auth required)

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health + DB status + uptime |
| POST | `/api/auth/login` | Login → JWT httpOnly cookie |
| GET | `/api/settings` | School contact, director, banner |
| GET | `/api/content/:page` | CMS published blocks |
| GET | `/api/news` | Published news/events |
| GET | `/api/news/:slug` | Single post |
| GET | `/api/gallery` | Published images |
| GET | `/api/documents` | Published downloads |
| GET | `/api/fees` | Fee structure |
| GET | `/api/faqs` | Published FAQs |
| POST | `/api/applications` | Submit admission (rate-limited) |
| POST | `/api/contact` | Submit contact form (rate-limited) |

### Admin (JWT cookie required)

| Method | Path |
|---|---|
| GET | `/api/auth/me` |
| POST | `/api/auth/logout` |
| POST | `/api/auth/change-password` |
| GET | `/api/admin/dashboard/stats` |
| GET | `/api/admin/dashboard/stats/trend` |
| GET | `/api/admin/dashboard/stats/by-class` |
| GET | `/api/admin/dashboard/activity` |
| CRUD | `/api/admin/applications` + `/:id/status` |
| CRUD | `/api/admin/content` |
| CRUD | `/api/admin/gallery` |
| CRUD | `/api/admin/news` + publish/unpublish/featured |
| CRUD | `/api/admin/documents` |
| CRUD | `/api/admin/fees` |
| CRUD | `/api/admin/faqs` + reorder |
| GET+PUT | `/api/admin/settings` + logo/favicon/director-photo |
| CRUD | `/api/admin/users` + permissions + reset-password |
| CRUD | `/api/admin/contact` |

---

## 7. Data Flow

```
Browser                           Browser
(tilakglobalschool.com)           (admin-portal.tilakglobalschool.com)
        │                                   │
        │  fetch('/api/...')                │  fetch('/api/...')
        │  + credentials: 'include'        │  + credentials: 'include'
        ▼                                   ▼
  Vercel rewrite                      Vercel rewrite
  /api/* → api.tilakglobalschool.com  /api/* → api.tilakglobalschool.com
                      │
              Express.js (Render)
                      │
          ┌───────────┴───────────┐
    JWT middleware           Public routes
    (adminToken cookie)      (no auth)
          │                       │
    Admin controllers       Public controllers
          └───────────┬───────────┘
                      │
              MongoDB Atlas
```

### Auth Flow

1. Admin → `POST /api/auth/login` → bcrypt compare → JWT sign
2. Cookie: `adminToken`, `httpOnly: true`, `sameSite: 'none'`, `secure: true` (prod)
3. Har admin request mein browser automatically cookie bhejta hai
4. `auth.middleware.js` — cookie **ya** `Authorization: Bearer` dono accept karta hai
5. Logout → `POST /api/auth/logout` → `res.clearCookie()`

---

## 8. Database Models

| Model | Collection | Key Fields |
|---|---|---|
| `AdminUser` | `adminusers` | name, email, passwordHash (select:false), role, permissions, isActive |
| `AdmissionApplication` | `admissionapplications` | applicationId (APP-0001), studentName, classApplying, status, statusHistory[] |
| `SiteSettings` | `sitesettings` | Singleton (`_id: 'site_settings'`) — schoolName, phone, email, director*, admissionSession |
| `Content` | `contents` | key (e.g. `home.hero.title`), value, draftValue, page, status |
| `NewsPost` | `newsposts` | title, slug (unique), category, date, body, isFeatured, status |
| `GalleryImage` | `galleryimages` | imageUrl, caption, category, order, status |
| `Document` | `documents` | title, category, page, fileUrl, fileType, fileSizeKb, status |
| `FeeRow` | `feerows` | classGroup (unique), admissionFee, tuitionFeePerTerm, otherCharges |
| `Faq` | `faqs` | question, answer, order, isActive |
| `ContactEnquiry` | `contactenquiries` | name, email, phone, subject, message, status |
| `ActivityLog` | `activitylogs` | adminUser, adminName, action, module, detail — TTL 180 days |
| `Counter` | `counters` | `_id: 'application'`, seq — for APP-0001 auto-increment |

---

## 9. Design System

### Colors (Tailwind v4 `@theme`)

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0F2A5C` | Headers, nav, primary buttons |
| `navy-2` | `#1B3C7A` | Hover, gradients |
| `blue` | `#3E7BC4` | Accents |
| `sky` / `sky-2` | `#E8F1FB` / `#CFE2F6` | Backgrounds, borders |
| `gold` / `gold-2` | `#C9A24A` / `#F6EBCB` | CTA, highlights |
| `ink` | `#1F2A44` | Body text |
| `muted` | `#5B6785` | Secondary text |
| `line` | `#E3E9F2` | Borders |
| `success` | `#2E8B57` | Status badges |
| `warning` | `#D98A1F` | Status badges |
| `danger` | `#C0392B` | Status badges |

### Fonts
- Headings: **Lora** (serif)
- Body: **Poppins**

### Dark Mode (Admin only)
- Tailwind v4: `@variant dark (&:where(.dark, .dark *))`
- `AdminShell` adds `.dark` class on root wrapper div
- Toggle persists in `localStorage`

---

## 10. Git Repositories

| Repo | URL | Contains |
|---|---|---|
| Frontend + Admin | `Tilak-Global-School-Frontend` | `frontend/`, `admin/`, `nginx/`, root config |
| Backend | `Tilak-Global-School-Backend` | `backend/` only |

`backend/` has its own `.git` — root `.gitignore` excludes it entirely.

---

## 11. ✅ What Is Working

### Backend
- ✅ Server starts, MongoDB connects, upload dirs auto-created on boot
- ✅ `GET /api/health` → `{ success, db, env, uptime, timestamp }`
- ✅ Login/logout/me/change-password
- ✅ JWT httpOnly cookie — cross-origin ready (`sameSite:none` + `secure:true`)
- ✅ Auth reads cookie AND `Authorization: Bearer` header
- ✅ All 12 admin CRUD route groups protected by JWT
- ✅ All 10 public read routes
- ✅ Rate limiting (login: 10/15min, forms: 10/15min, global: 200/15min)
- ✅ Multer file uploads — gallery, news, documents, settings media
- ✅ Activity logging with TTL (auto-delete after 180 days)
- ✅ Seed: admin user (always resets hash via `$set`), SiteSettings, FeeRows, FAQs, Counter
- ✅ CORS: explicit origins + `*.vercel.app` wildcard for preview deploys

### Admin Panel
- ✅ Login page — form, error, redirect
- ✅ Session persistence (JWT cookie across page refresh)
- ✅ Auth guard → redirect to `/login` if not authenticated
- ✅ Sidebar — nav, permission-based visibility, collapse toggle
- ✅ TopBar — breadcrumb, dark mode, notifications bell, profile/logout
- ✅ Dashboard — 4 stat cards, donut chart, bar chart, line chart, activity log
- ✅ Admissions — table, search, status filter, class filter, pagination, detail modal, status update, delete
- ✅ Gallery — photo grid, upload (FormData), edit, delete, category filter
- ✅ News — list, create/edit modal, publish/unpublish/featured toggle
- ✅ Documents — upload, list, delete, category + page filters
- ✅ Fees — fee row cards, per-row inline edit
- ✅ FAQs — create/edit/delete/reorder
- ✅ Content (CMS) — edit/draft/publish blocks per page
- ✅ Settings — all sections (identity, contact, director, media uploads, social links)
- ✅ Users — create, edit, permissions matrix, reset password, deactivate
- ✅ Contact — enquiries list, mark read/replied, delete
- ✅ All image/file URLs environment-aware (no localhost hardcoding)
- ✅ `next build` → 0 errors

### Public Site
- ✅ Home page (static data, all sections complete)
- ✅ About Us, Academics (static data)
- ✅ Admissions — fee table from `/api/fees`, FAQs from `/api/faqs`, both forms POST to API
- ✅ Gallery — live data from `/api/gallery`, category filter (URL-based)
- ✅ News & Events — live from `/api/news`, individual post `/news-events/[slug]`
- ✅ Downloads — live from `/api/documents`, grouped by category
- ✅ Contact — full form → `POST /api/contact`
- ✅ `/admin` → hard 404 (public domain cannot access admin)
- ✅ Global toast notifications (ToasterProvider in layout)
- ✅ `next build` → 0 errors

---

## 12. ❌ What Is NOT Done Yet

| Item | Priority | Notes |
|---|---|---|
| Home page live data | High | Still static — `data/home.js`. Need to connect `/api/settings` + `/api/news` + `/api/gallery` |
| About page live data | Medium | Still `data/about.js` |
| Academics page live data | Medium | Still `data/academics.js` |
| Content seed run | High | `npm run seed:content` nahi chala — CMS page empty hai |
| Admin change-password UI | Medium | API ready, no page yet |
| CSV export for applications | Low | Not implemented |
| Email notifications | Low | Phase 2 |
| Sitemap / robots.txt | Low | Not done |
| Production deploy | Pending | Domain + Render + Vercel setup |

---

## 13. Known Bugs / Resolved

| # | Issue | Status |
|---|---|---|
| 1 | Double-hashed admin password → 401 on login | ✅ **FIXED** — seed uses `$set` always |
| 2 | Upload dirs missing → ENOENT on first file upload | ✅ **FIXED** — server.js auto-creates on boot |
| 3 | `sameSite:strict` → cookie dropped cross-origin | ✅ **FIXED** — `none` + `secure` in prod |
| 4 | `localhost:5000` hardcoded in admin pages | ✅ **FIXED** — `getFileBase()` / `fileUrl()` |
| 5 | Public forms no API calls | ✅ **FIXED** — real `POST /api/applications` + `/api/contact` |
| 6 | CMS content blocks not seeded | ⚠️ Pending — run `npm run seed:content` |
| 7 | Home/About/Academics still static | ⚠️ Pending — next task |
| 8 | ESLint version conflict | Low — build works, lint warnings only |

---

## 14. Next Steps (In Order)

```
1. Render par npm run seed chalao (production password fix)
2. npm run seed:content chalao (CMS default blocks)
3. Home page ko API se connect karo:
     getSettings() → hero, director message, school name
     getNews()     → news preview section
     getGallery()  → gallery preview section
4. About + Academics pages ko API se connect karo
5. Real school content admin panel mein add karo
6. Production deploy karo:
     - Render pe backend deploy (auto from GitHub)
     - Vercel pe frontend project (Root: frontend/)
     - Vercel pe admin project (Root: admin/)
     - Custom domains set karo
7. SSL certificates (Vercel auto-handles, Render bhi)
8. Handover + admin training
```

---

## 15. Tech Stack

| Layer | Package | Version |
|---|---|---|
| Frontend | Next.js | 15.4.0 |
| Admin | Next.js | 15.5.28 |
| UI | React | 19.0.0 |
| Styling | Tailwind CSS | v4 |
| Icons | lucide-react | 1.58.0 |
| Charts | recharts | 2.15.0 |
| Toasts | react-hot-toast | 2.6.1 |
| Backend | Express | 5.x |
| ODM | Mongoose | 9.x |
| Auth | jsonwebtoken + bcryptjs | 9.x / 3.x |
| Upload | multer | 2.x |
| Validation | zod | 4.x |
| Security | helmet, cors, express-rate-limit | — |
| Dev runner | nodemon | 3.x |
| Monorepo | concurrently | 9.x |

---

## 16. Team

| Person | Role |
|---|---|
| Dishant Saini | Lead Developer — Code Craft IT Solution |
| Kartik Maru | Frontend Developer |
| Aman | Admin Panel Developer |

> **Client:** Tilak Global School, Bindayaka, Mukandpura Road, Jaipur, Rajasthan  
> **Free support:** 6 months post go-live. After: ₹2,500/month.
