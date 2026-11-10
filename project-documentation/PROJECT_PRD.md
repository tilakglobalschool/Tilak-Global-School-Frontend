# Product Requirements Document (PRD)
## Tilak Global School — Website & CMS Platform

> **Version:** 1.0 (Post-Phase-1 Build)  
> **Date:** November 2026  
> **Developer:** Dishant Saini, Code Craft IT Solution  
> **Client:** Tilak Global School, Jaipur, Rajasthan

---

## 1. Project Overview

Tilak Global School is a co-educational CBSE English-medium school in Jaipur offering classes from Nursery to Class XII, established in 2016 as a venture of the Tilak Group. This project delivers:

1. **A public-facing website** that showcases the school, accepts admission enquiries, and publishes news, gallery and documents.
2. **A staff admin panel** (CMS) allowing school staff to manage all website content without developer involvement.
3. **A REST API backend** that serves both applications and stores all data in MongoDB Atlas.

---

## 2. Product Vision

Build a professional, mobile-first school website that:
- Acts as the school's digital front door, converting website visitors into admission enquiries.
- Gives school staff complete control over content through a secure, role-based admin panel.
- Requires zero developer intervention for day-to-day content management.

---

## 3. Problem Statement

Before this project:
- The school had no modern digital presence capable of handling online admission enquiries.
- Content changes required developer involvement every time.
- No centralised system existed for managing applications, news, gallery, or documents.

---

## 4. Project Objectives

| # | Objective | Status |
|---|---|---|
| 1 | Public-facing school website, responsive, with all sections | ✅ Implemented |
| 2 | Online admission enquiry and application forms | ✅ Implemented |
| 3 | Secure staff CMS with role-based access | ✅ Implemented |
| 4 | Admission application tracking with status workflow | ✅ Implemented |
| 5 | Gallery, news, documents, fees, FAQs fully manageable | ✅ Implemented |
| 6 | Site settings (phone, email, director message) live-editable | ✅ Implemented |
| 7 | Deployment on Vercel (frontend + admin) + Render (backend) | ✅ Deployed |
| 8 | MongoDB Atlas (client's own account) | ✅ Connected |

---

## 5. Target Audience

### Primary (Public Website)
- **Parents in Jaipur** researching schools for children (Nursery–Class XII)
- **Students** looking for CBSE school information
- **General visitors** searching for school contact, facilities, events

### Secondary (Admin Panel)
- **School management staff** — principal, director, office staff
- **Content editors** — teachers managing news and gallery
- **Admissions team** — processing and responding to applications

---

## 6. User Personas

### Persona 1 — Parent (Priya Sharma)
- Jaipur resident, child aged 4–5
- Searches Google for "CBSE school Jaipur nursery admission"
- Wants: quick overview, fee structure, admission process, contact number
- Action: fills admission enquiry form

### Persona 2 — Super Admin (R.S. Tanwar / Office Staff)
- School director or designated staff member
- Manages all school content including settings, users, all modules
- Technical comfort: moderate (non-developer)

### Persona 3 — Content Editor (Teacher)
- Creates news posts, uploads gallery photos, manages documents
- Cannot access admission data or settings
- Technical comfort: basic

### Persona 4 — Admissions Staff
- Views and processes admission applications
- Updates application status, adds notes
- Cannot modify content or settings

---

## 7. Core Value Proposition

| Stakeholder | Value |
|---|---|
| School management | Full control over website without calling a developer |
| Admissions team | Centralized application tracking with status workflow |
| Parents | Easy online admission enquiry, transparent information |
| Developer | Clean separation of concerns; scalable MERN stack |

---

## 8. Technology Stack

| Layer | Technology | Version | Deployment |
|---|---|---|---|
| Public Website | Next.js (App Router) | 15.4.0 | Vercel |
| Admin Panel | Next.js (App Router) | 15.5.28 | Vercel |
| UI Framework | React | 19.0.0 | — |
| Styling | Tailwind CSS | v4 | — |
| Backend API | Express.js | 5.3.0 | Render |
| ODM | Mongoose | 9.11.1 | — |
| Database | MongoDB Atlas | — | Atlas (client account) |
| Auth | JWT + bcryptjs | 9.0.3 / 3.0.3 | — |
| File Upload | Multer | 2.4.0 | Render filesystem |
| Validation | Zod | 4.6.7 | — |
| Charts | Recharts | 2.15.0 | — |
| Toasts | react-hot-toast | 2.6.1 | — |
| Icons | Lucide React | 1.58.0 | — |

---

## 9. System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                                  │
│                                                                     │
│  tilakglobalschool.com        admin-portal.tilakglobalschool.com   │
│  (Vercel — frontend/)         (Vercel — admin/)                    │
│         │                              │                            │
│         └──── /api/* rewrite ──────────┘                           │
│                       │                                             │
│          tilak-global-school-backend-0xwt.onrender.com             │
│                 Express 5 + Node.js LTS                             │
│                       │                                             │
│              MongoDB Atlas (tilakglobalschool DB)                   │
│            Cluster: ac-e5vv9kz.8twg9yw.mongodb.net                 │
└─────────────────────────────────────────────────────────────────────┘
```

### API URL Strategy
- **Server-side (Next.js Server Components):** Uses `process.env.API_URL` — full Render URL, never exposed in browser bundle.
- **Client-side ("use client" components):** Uses `/api` relative URL — Vercel rewrites proxy to Render backend.
- **No `NEXT_PUBLIC_` env vars** — eliminates browser bundle security risk.

---

## 10. Frontend Architecture

```
frontend/
├── src/app/
│   ├── (user)/          ← Route group for all public pages
│   │   ├── layout.jsx   ← Server: HeaderServer + FooterServer + ToasterProvider
│   │   ├── page.jsx     ← Homepage (async Server Component)
│   │   ├── admissions/  ← Admission pages (async + client form components)
│   │   ├── gallery/     ← Gallery (async Server Component)
│   │   ├── news-events/ ← News list + [slug] dynamic route
│   │   ├── downloads/   ← Documents (async Server Component)
│   │   ├── contact-us/  ← Contact form (Client Component)
│   │   └── about-us/    ← About pages (mostly static)
│   └── admin/page.jsx   ← Returns Next.js notFound() — hard 404
├── src/components/
│   ├── layout/          ← Header (client) + HeaderServer + Footer + FooterServer
│   ├── home/            ← Section components (mostly Server)
│   ├── admissions/      ← Forms (Client) + wrappers (Server)
│   └── shared/          ← DirectorMessage, CtaBanner, PageHero
├── src/lib/
│   ├── api.js           ← Public API client ({ data, error })
│   └── apiUrl.js        ← getApiBase() — environment-aware URL
└── src/data/            ← Static fallback data (home, about, navigation, etc.)
```

**Key Patterns:**
- Server Components fetch API data at render time; Client Components handle user interaction.
- Every API call has a static data fallback — site renders even if backend is down.
- Header and Footer are server-wrapped to fetch live settings from `/api/settings`.

---

## 11. Backend Architecture

```
backend/src/
├── server.js         ← Bootstrap: upload dirs, DB connect, listen, keep-alive
├── app.js            ← Express: middleware stack, all routes mounted
├── config/
│   ├── env.js        ← Env exports + Atlas-only validation
│   └── db.js         ← Mongoose connect with event listeners
├── models/           ← 12 Mongoose schemas (see §20)
├── routes/           ← Dual-export pattern: publicXxxRouter + adminXxxRouter
├── controllers/      ← Business logic (13 controller files)
├── middleware/       ← auth, rateLimiter, upload, errorHandler, notFound
├── validators/       ← Zod schemas for every route that accepts input
├── utils/            ← asyncHandler, response helpers, jwt, activityLogger, AppError
└── seed/             ← seed.js (admin user + defaults) + contentSeed.js (CMS blocks)
```

**Route Namespace Pattern:**
```
/api/*           → Public routes (no auth)
/api/admin/*     → Admin routes (JWT cookie required)
```

---

## 12. Database Architecture

**Atlas Database:** `tilakglobalschool`  
**Cluster:** `ac-e5vv9kz-shard-00-00.8twg9yw.mongodb.net`

### Collections

| Collection | Model | Purpose |
|---|---|---|
| `adminusers` | AdminUser | Staff accounts with RBAC |
| `admissionapplications` | AdmissionApplication | Online enquiries and applications |
| `sitesettings` | SiteSettings | Singleton school configuration |
| `newsposts` | NewsPost | News, events, notices |
| `galleryimages` | GalleryImage | Uploaded school photos |
| `documents` | Document | Downloadable files |
| `feerows` | FeeRow | Fee structure by class group |
| `faqs` | Faq | Frequently asked questions |
| `contactenquiries` | ContactEnquiry | Contact form submissions |
| `contents` | Content | CMS content blocks (key-value) |
| `activitylogs` | ActivityLog | Admin action audit trail |
| `counters` | Counter | Sequence generator for APP-XXXX |

---

## 13. Authentication and Authorization

### Admin Authentication
- **Mechanism:** JWT stored in `httpOnly` cookie named `adminToken`
- **Algorithm:** HS256 (jsonwebtoken)
- **Expiry:** 7 days (configurable via `JWT_EXPIRES_IN`)
- **Cookie flags:**
  - Dev: `sameSite: 'lax'`, `secure: false`
  - Production: `sameSite: 'none'`, `secure: true` (required for cross-origin Vercel→Render)
- **Token payload:** `{ id, email, name, role, permissions }`
- **Fallback:** `Authorization: Bearer <token>` header also accepted

### Password Security
- bcrypt with salt rounds 12
- `passwordHash` field has `select: false` (never returned in queries by default)
- `toJSON` transform strips passwordHash from all serialization
- Seed script uses `findByIdAndUpdate` with `$set` to bypass pre-save hooks (prevents double-hashing)

### Session Management
- `GET /api/auth/me` re-fetches from DB on each page load (fresh permissions)
- Cookie cleared on logout
- Token rotated (re-issued) on password change

---

## 14. User Roles and Permissions

### Roles

| Role | Description |
|---|---|
| `super_admin` | Full access to all modules including user management and settings |
| `content_editor` | Can manage content, gallery, news, documents, fees, FAQs |
| `admissions_staff` | Can view applications and update status; can view contact enquiries |

### Permission Matrix

| Module | super_admin | content_editor | admissions_staff |
|---|---|---|---|
| dashboard.view | ✅ | ✅ | ✅ |
| admissions.view | ✅ | ❌ | ✅ |
| admissions.updateStatus | ✅ | ❌ | ✅ |
| admissions.delete | ✅ | ❌ | ❌ |
| content.view | ✅ | ✅ | ❌ |
| content.edit | ✅ | ✅ | ❌ |
| content.publish | ✅ | ✅ | ❌ |
| gallery.view | ✅ | ✅ | ❌ |
| gallery.edit | ✅ | ✅ | ❌ |
| gallery.delete | ✅ | ✅ | ❌ |
| news.view/edit/publish/delete | ✅ | ✅ | ❌ |
| documents.view/edit/delete | ✅ | ✅ | ❌ |
| fees.view/edit | ✅ | ✅ | ❌ |
| faqs.view/edit | ✅ | ✅ | ❌ |
| settings.view/edit | ✅ | ❌ | ❌ |
| contactEnquiries.view | ✅ | ❌ | ✅ |
| userManagement.view/edit | ✅ | ❌ | ❌ |

---

## 15. Complete Feature List

### Public Website Features
1. Homepage with dynamic content (hero, news, gallery, FAQs, director message)
2. Online admission enquiry form (3-field quick form)
3. Full 4-step online application form
4. Live fee structure table from database
5. Live FAQ accordion from database
6. Gallery with category filter
7. News & Events with individual post pages
8. Downloads / Mandatory Disclosure page
9. Contact form with submission to backend
10. About Us pages (static + partial dynamic)
11. Academics pages (static)
12. School settings (phone, email, address) live from admin

### Admin Panel Features
1. Login / Logout / Session persistence
2. Dashboard with stats, charts, activity log
3. Admission applications — table, filters, status workflow
4. CMS Content editor — draft/publish workflow
5. Gallery management — upload, edit, delete
6. News & Events — CRUD, publish, featured
7. Documents — upload, manage
8. Fee structure — per-class-group editing
9. FAQs — CRUD
10. Contact enquiries — view, mark read/replied
11. Site Settings — all school info + media uploads
12. User management — CRUD, permissions, password reset
13. Dark mode toggle
14. Activity log in TopBar notifications

---

## 16. Detailed Feature Descriptions

### Feature: Admission Application System

| Attribute | Detail |
|---|---|
| **Purpose** | Capture parent/student admission interest digitally |
| **Public form 1** | AdmissionEnquiryForm — studentName, classApplying, parentMobile |
| **Public form 2** | OnlineAdmissionForm — 4-step: student details, parent details, previous school, review |
| **Auto-generated ID** | APP-0001 format (Counter model, atomic increment) |
| **Status workflow** | pending → approved / rejected / info_requested |
| **Status history** | Each change logged with admin name, timestamp, optional note |
| **Admin view** | Table with search (name/ID), filters (status, class), pagination 20/page |
| **Detail modal** | Full fields, PII visible to admin, status history timeline |
| **Rate limiting** | 10 submissions per 15 minutes per IP (production) |
| **API** | `POST /api/applications` (public), `GET/PATCH/DELETE /api/admin/applications` |
| **Models** | AdmissionApplication, Counter |
| **Status** | ✅ Fully implemented |

### Feature: CMS Content Management

| Attribute | Detail |
|---|---|
| **Purpose** | Let school staff edit website text without code changes |
| **Key format** | Dot-notation: `page.section.field` (e.g., `home.hero.title`) |
| **Workflow** | Edit → Save Draft (`draftValue`) → Publish (copies to `value`) |
| **Page tabs** | home, about, academics, admissions, facilities, gallery, news, results, contact, downloads |
| **Types** | text, richtext, image, list, number |
| **Seeded blocks** | 27 default blocks covering home, about, academics, admissions, contact, downloads |
| **API** | `GET /api/content/:page` (public), full CRUD via `/api/admin/content` |
| **Models** | Content |
| **Status** | ✅ Backend fully implemented; frontend partially reads CMS (home hero, welcome only) |

### Feature: Site Settings

| Attribute | Detail |
|---|---|
| **Purpose** | Single admin-editable source for all school contact and identity data |
| **Pattern** | Singleton document (_id: 'site_settings') |
| **Fields** | schoolName, tagline, phone, email, address, officeTimings, whatsapp, mapEmbed, directorName/Message/Photo, admissionSession, admissionBannerText, socialLinks, logo, favicon, CBSE codes |
| **Public endpoint** | `GET /api/settings` returns safe fields only (excludes updatedBy, privacyPolicy) |
| **Admin endpoint** | `GET/PUT /api/admin/settings` + 3 upload endpoints |
| **Live on public site** | ✅ Header phone/email, Footer, Hero badge, Director Message, News/Gallery section |
| **Status** | ✅ Fully implemented |

### Feature: Gallery Management

| Attribute | Detail |
|---|---|
| **Categories** | Campus, Classrooms, Sports, Events, Activities |
| **Upload** | FormData with 'image' field; Multer validates MIME, generates crypto-random filename |
| **Files stored** | `uploads/gallery/` on Render filesystem |
| **Public API** | `GET /api/gallery` with optional `?category=&limit=` |
| **Admin CRUD** | List/upload/edit caption-category-status/delete |
| **File deletion** | Physical file deleted from disk when record deleted |
| **Image URLs** | Relative paths (e.g., `/uploads/gallery/xxx.jpg`) served via express.static + Vercel rewrite |
| **Status** | ✅ Fully implemented |

### Feature: News & Events

| Attribute | Detail |
|---|---|
| **Categories** | News, Event, Notice |
| **Slug** | Auto-generated from title (uniqueSlug handles collisions) |
| **Featured** | Single featured post at a time; setting featured auto-publishes if draft |
| **Individual post page** | `/news-events/[slug]` with `generateMetadata()` |
| **Admin actions** | Create, edit, publish/unpublish, set featured, delete |
| **Status** | ✅ Fully implemented |

### Feature: Document Management

| Attribute | Detail |
|---|---|
| **Categories** | 10 (Disclosure, Notice, Academic, Policy, Certificate, Form, Timetable, Syllabus, Calendar, Results) |
| **Pages** | academics, admissions, news, results, downloads |
| **File types** | PDF, DOC, DOCX, XLS, XLSX |
| **File size** | Stored in KB; displayed in downloads page |
| **Issue date** | Stored separately from upload date |
| **Status** | ✅ Fully implemented |

---

## 17. Functional Requirements

### FR-001: Public Website
- FR-001.1: All public pages must load with graceful fallback if API unavailable
- FR-001.2: Admission forms must validate client-side before API call
- FR-001.3: Form submissions must display applicationId on success
- FR-001.4: Rate limiting must block excessive form submissions (10/15min/IP)
- FR-001.5: `/admin` route on public domain must return HTTP 404

### FR-002: Admin Authentication
- FR-002.1: Login must set httpOnly cookie; never expose token in localStorage or URL
- FR-002.2: Session must persist across page refresh (cookie-based)
- FR-002.3: Unauthenticated access to any `/api/admin/*` route must return 401 JSON
- FR-002.4: Admin panel routes must redirect to `/login` if not authenticated
- FR-002.5: Logout must clear cookie server-side

### FR-003: Admin CRUD
- FR-003.1: Every admin section must have create, read, update, delete where applicable
- FR-003.2: Status changes must be recorded in statusHistory with timestamp and admin name
- FR-003.3: Activity log must record every mutating admin action
- FR-003.4: File deletions must remove physical file from disk

### FR-004: Role-Based Access
- FR-004.1: Super admin can access all modules
- FR-004.2: Content editor cannot access admissions, settings, users
- FR-004.3: Admissions staff cannot access content, gallery, news, documents, settings, users
- FR-004.4: Sidebar must hide items user lacks permission for

---

## 18. Non-Functional Requirements

### NFR-001: Performance
- Homepage must load from server in < 3 seconds on average connection
- API responses for GET requests must return within 2 seconds (non-cold-start)
- Render keep-alive ping prevents cold starts (14-minute interval)

### NFR-002: Security
- Passwords hashed with bcrypt, salt rounds 12
- JWT in httpOnly cookie (not accessible to JS)
- CORS whitelist — no wildcard `*` in production
- Input sanitized via Zod schemas before DB operations
- Rate limiting on all public form submissions
- File upload: MIME validation, random filenames, dotfiles denied

### NFR-003: Availability
- Static fallback data ensures public site renders even when backend is unavailable
- Render free tier with keep-alive strategy

### NFR-004: Scalability
- MongoDB Atlas with connection pooling (maxPoolSize: 10)
- Stateless JWT authentication (horizontally scalable)

---

## 19. API Requirements

### Standard Response Format
```json
// Success
{ "success": true, "message": "...", "data": {...}, "meta": {...} }

// Error
{ "success": false, "message": "...", "errors": [...] }
```

### Public Endpoints (no auth)
| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check with DB status, uptime, env |
| POST | `/api/auth/login` | Admin login |
| GET | `/api/settings` | Safe public school settings |
| GET | `/api/content/:page` | Published CMS blocks |
| GET | `/api/news` | Published posts |
| GET | `/api/news/:slug` | Single post |
| GET | `/api/gallery` | Published images |
| GET | `/api/documents` | Published documents |
| GET | `/api/fees` | Fee structure |
| GET | `/api/faqs` | Published FAQs |
| POST | `/api/applications` | Submit admission (rate-limited) |
| POST | `/api/contact` | Submit contact form (rate-limited) |

### Admin Endpoints (JWT required)
| Method | Path | Description |
|---|---|---|
| GET | `/api/auth/me` | Current user profile |
| POST | `/api/auth/logout` | Clear session |
| POST | `/api/auth/change-password` | Change own password |
| GET | `/api/admin/dashboard/stats` | Admission stats |
| GET | `/api/admin/dashboard/stats/trend` | 30-day trend |
| GET | `/api/admin/dashboard/stats/by-class` | By class distribution |
| GET | `/api/admin/dashboard/activity` | Recent activity log |
| GET/PATCH/DELETE | `/api/admin/applications` + `/:id/status` | Application management |
| GET/POST/PUT/PATCH/DELETE | `/api/admin/content` | CMS block management |
| GET/POST/PUT/DELETE | `/api/admin/gallery` | Gallery management |
| GET/POST/PUT/PATCH/DELETE | `/api/admin/news` | News management |
| GET/POST/PUT/DELETE | `/api/admin/documents` | Document management |
| GET/POST/PUT/DELETE | `/api/admin/fees` | Fee management |
| GET/POST/PUT/DELETE/PATCH | `/api/admin/faqs` + `/reorder` | FAQ management |
| GET/PUT/POST | `/api/admin/settings` + logo/favicon/director-photo | Settings |
| GET/PATCH/DELETE | `/api/admin/contact` | Contact enquiries |
| GET/POST/PUT/DELETE/POST/PATCH | `/api/admin/users` | User management |

---

## 20. Database Models and Relationships

```
AdminUser ─────────────────────── creates ──→ AdminUser (createdBy ref)
AdminUser ─── logs ──→ ActivityLog (adminUser ref)
AdminUser ─── changes ──→ AdmissionApplication.statusHistory.changedBy
AdminUser ─── uploads ──→ GalleryImage.uploadedBy
AdminUser ─── uploads ──→ Document.uploadedBy
AdminUser ─── creates ──→ NewsPost.createdBy
AdminUser ─── edits ──→ Content.updatedBy
AdminUser ─── edits ──→ FeeRow.updatedBy
AdminUser ─── edits ──→ Faq.updatedBy
AdminUser ─── edits ──→ SiteSettings.updatedBy
Counter ────── provides seq ──→ AdmissionApplication.applicationId
```

**Key Design Decisions:**
- `SiteSettings` is a singleton (single document, never duplicated)
- `ActivityLog` uses denormalized `adminName` to survive admin account deletion
- `AdmissionApplication` uses embedded `statusHistory` array (not separate collection)
- `Content` uses `draftValue` + `value` fields for draft/publish workflow
- `Counter` uses MongoDB atomic `findByIdAndUpdate + $inc + upsert` for sequence safety

---

## 21. Business Logic and Workflows

### Admission Application Workflow
1. Parent fills form → validated by Zod → `POST /api/applications`
2. Backend: Counter atomic increment → `formatApplicationId(seq)` → APP-0001
3. Application saved with `status: 'pending'`, empty `statusHistory`
4. Admin views in table → clicks row → opens detail modal
5. Admin selects new status (approved/rejected/info_requested) + optional note
6. `PATCH /api/admin/applications/:id/status` → updates status, pushes to statusHistory
7. Activity log records: who changed, from→to, note

### Content Publishing Workflow
1. Admin selects page tab → views all blocks for that page
2. Admin clicks edit → modal opens with current value
3. Admin edits → "Save Draft" → stores in `draftValue`, sets `hasDraft: true`
4. Admin reviews draft → "Publish" → copies `draftValue` to `value`, clears draft
5. OR: Admin edits → "Save & Publish" → updates `value` directly, skips draft

### News Featured Post Workflow
1. Admin clicks "Set Featured" on a news post
2. Backend: `updateMany({ isFeatured: true }, { $set: { isFeatured: false } })` — unsets all others
3. Sets this post's `isFeatured: true`
4. Auto-publishes if post was still a draft

---

## 22. Security Requirements

| Requirement | Implementation | Status |
|---|---|---|
| Passwords hashed | bcrypt, salt 12 | ✅ |
| Token in httpOnly cookie | JWT, `httpOnly: true` | ✅ |
| CORS whitelist | Explicit origin list | ✅ |
| Input validation | Zod on all POST/PUT | ✅ |
| Rate limiting | express-rate-limit | ✅ |
| File upload sanitization | MIME validation, random filenames | ✅ |
| Dotfiles denied | express.static `dotfiles: 'deny'` | ✅ |
| SQL/NoSQL injection prevention | Mongoose ODM + Zod parsing | ✅ |
| Admin panel noindex | `X-Robots-Tag` header + metadata | ✅ |
| HTTPS only in production | `secure: true` cookie flag | ✅ |
| XSS protection | Helmet headers | ✅ |
| Stack traces hidden | errorHandler masks in production | ✅ |
| Sensitive fields hidden | `select: false`, `toJSON` transform | ✅ |

---

## 23. Performance Requirements

| Metric | Target | Approach |
|---|---|---|
| Homepage server render | < 3s | Parallel Promise.all fetches |
| API GET responses | < 2s | MongoDB Atlas, indexed queries |
| Cold start recovery | Transparent to user | fetchWithRetry + keep-alive ping |
| Image loading | Lazy where possible | Next.js Image component |
| Bundle size | Minimal | No unnecessary dependencies |

---

## 24. SEO Requirements

- Server-rendered pages with `generateMetadata()` for dynamic routes (`/news-events/[slug]`)
- FAQ JSON-LD schema (`FAQPage`) on homepage FAQ section
- `<meta name="robots" content="noindex, nofollow">` on admin panel (all routes)
- Semantic HTML (section, article, nav, h1-h2 hierarchy)
- Alt text on all images
- Canonical domain via HTTPS

---

## 25. Responsive Design Requirements

- Mobile: 360px minimum
- Tablet: 768px (md breakpoint)
- Desktop: 1024px+ (lg breakpoint)
- Max content width: 1280px (max-w-7xl)
- Mobile-specific: horizontal snap-scroll for stats bar, gallery preview, academic stages, facilities

---

## 26. Third-Party Dependencies

### Production
| Package | Version | Purpose |
|---|---|---|
| next | 15.x | Frontend framework |
| react/react-dom | 19.x | UI library |
| tailwindcss | v4 | Styling |
| express | 5.x | API framework |
| mongoose | 9.x | MongoDB ODM |
| bcryptjs | 3.x | Password hashing |
| jsonwebtoken | 9.x | JWT auth |
| multer | 2.x | File upload |
| zod | 4.x | Input validation |
| helmet | 8.x | Security headers |
| cors | 2.x | CORS middleware |
| express-rate-limit | 8.x | Rate limiting |
| recharts | 2.x | Dashboard charts |
| react-hot-toast | 2.x | Toast notifications |
| lucide-react | latest | Icons |

### Infrastructure
| Service | Purpose |
|---|---|
| Vercel | Frontend + Admin hosting |
| Render | Backend API hosting |
| MongoDB Atlas | Cloud database |

---

## 27. Current Project Limitations

1. **No email notifications** — No SMTP setup; parents receive no email confirmation after application submission.
2. **No WhatsApp integration** — WhatsApp button links to `wa.me` manually; no automated messages.
3. **Render file storage is ephemeral** — Uploaded files (`uploads/`) are lost on Render service restart. No cloud storage (S3/Cloudinary) implemented.
4. **No image compression** — Images uploaded at original size; no server-side resize or optimization.
5. **Static placeholder images** — Homepage hero, facilities, why-choose sections use Unsplash placeholder images.
6. **School contact data not populated** — `siteConfig.js` has empty `phone`, `email`, `whatsapp` — requires admin Settings to be filled.
7. **Logo is text initials "TG"** — No real school logo uploaded.
8. **About, Academics pages mostly static** — Not connected to CMS (only home hero + welcome are dynamic).
9. **FAQ reorder not wired** — Drag handle UI exists in admin but not connected to `reorderFaqs` API.
10. **No CSV export** — Application export feature mentioned in brief but not implemented.
11. **No admission fee payment** — Online payments explicitly out of scope.
12. **Admin change-password** — API exists, no dedicated UI page in admin panel.

---

## 28. Future Scope

| Feature | Priority | Notes |
|---|---|---|
| Cloud file storage (Cloudinary/S3) | High | Current Render storage is ephemeral |
| Email notifications (SMTP) | High | Application confirmation to parents |
| WhatsApp API integration | Medium | Status update notifications |
| PDF application download | Medium | Generate PDF of application detail |
| CSV/Excel export of applications | Medium | Requested in brief |
| Parent application status portal | Low | Phase 2 |
| Online fee payment (Razorpay) | Low | Phase 2 |
| Student login portal | Low | Phase 3 |
| SMS notifications | Low | Phase 2 |
| Advanced gallery (albums, lightbox) | Low | — |
| Multi-language support (Hindi/English) | Low | — |
| CBSE compliance disclosure page | Medium | Legally required for CBSE schools |
| Sitemap.xml auto-generation | Medium | SEO |
| Google Analytics integration | Medium | — |
