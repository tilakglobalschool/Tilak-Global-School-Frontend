# Remaining Work & Development Progress Tracker
## Tilak Global School — Website & CMS Platform

> **Date:** November 2026  
> **Analysis basis:** Direct codebase inspection

---

## Overall Progress Estimate

| Area | Completion |
|---|---|
| Backend API | ~90% |
| Admin Panel | ~85% |
| Public Website (structure + design) | ~80% |
| Public Website (dynamic API integration) | ~50% |
| Deployment & Infrastructure | ~90% |
| **Overall Estimate** | **~78%** |

---

## A. Completed Work

### Backend

| ID | Task | File(s) |
|---|---|---|
| B-01 | Express server with graceful shutdown, keep-alive, upload dir auto-creation | `backend/src/server.js` |
| B-02 | MongoDB Atlas connection with event listeners and Atlas-only validation | `backend/src/config/db.js`, `env.js` |
| B-03 | Full CORS configuration (explicit origins + *.vercel.app) | `backend/src/app.js` |
| B-04 | JWT auth with httpOnly cookie (login, logout, me, change-password) | `backend/src/controllers/auth.controller.js` |
| B-05 | bcrypt password hashing (salt 12), passwordHash select:false | `backend/src/models/AdminUser.model.js` |
| B-06 | RBAC — 3 roles, 11 modules, granular permission flags | `backend/src/models/AdminUser.model.js` |
| B-07 | AdmissionApplication model with APP-0001 auto-ID, status workflow | `backend/src/models/AdmissionApplication.model.js` |
| B-08 | SiteSettings singleton pattern | `backend/src/models/SiteSettings.model.js` |
| B-09 | All 12 Mongoose models | `backend/src/models/` |
| B-10 | Zod validators for all input-accepting routes | `backend/src/validators/` |
| B-11 | Rate limiting (login: 10/15min, forms: 10/15min, global: 200/15min) | `backend/src/middleware/rateLimiter.middleware.js` |
| B-12 | Multer file upload (MIME validation, random filenames, dotfiles deny) | `backend/src/middleware/upload.middleware.js` |
| B-13 | Activity logging on all mutating operations | `backend/src/utils/activityLogger.js` |
| B-14 | ActivityLog TTL (auto-purge after 180 days) | `backend/src/models/ActivityLog.model.js` |
| B-15 | Dashboard stats, trend, by-class, activity endpoints | `backend/src/controllers/dashboard.controller.js` |
| B-16 | All public + admin routes for every module | `backend/src/routes/` |
| B-17 | Seed script (admin user reset via $set, default data) | `backend/src/seed/seed.js` |
| B-18 | Content seed script (27 CMS blocks) | `backend/src/seed/contentSeed.js` |
| B-19 | Health check with uptime, DB status, env | `backend/src/routes/health.js` |
| B-20 | Error handler with Mongoose error normalization | `backend/src/middleware/errorHandler.js` |

### Admin Panel

| ID | Task | File(s) |
|---|---|---|
| A-01 | Login page with form, error display | `admin/src/app/login/page.jsx` |
| A-02 | JWT session via httpOnly cookie, session restore on refresh | `admin/src/app/AuthContext.jsx` |
| A-03 | Auth guard redirecting unauthenticated users to /login | `admin/src/app/AdminShell.jsx` |
| A-04 | Dark mode toggle (class-based, localStorage persisted) | `admin/src/app/AdminShell.jsx` |
| A-05 | Collapsible sidebar with permission-filtered nav | `admin/src/app/components/Sidebar.jsx` |
| A-06 | TopBar with notifications, dark mode, profile, logout | `admin/src/app/components/TopBar.jsx` |
| A-07 | Dashboard with 3 Recharts (donut, bar, line) + stat cards | `admin/src/app/page.jsx` |
| A-08 | Admissions: table, search, filters, pagination, detail modal, status update | `admin/src/app/admissions/page.jsx` |
| A-09 | Gallery: grid, upload (FormData), edit modal, delete, category filter | `admin/src/app/gallery/page.jsx` |
| A-10 | News: list, create/edit modal, publish/unpublish, set featured, delete | `admin/src/app/news/page.jsx` |
| A-11 | Documents: table, upload (FormData), filters, delete | `admin/src/app/documents/page.jsx` |
| A-12 | Content CMS: page tabs, block list, draft/publish workflow | `admin/src/app/content/page.jsx` |
| A-13 | Fees: per-row inline edit with individual save state | `admin/src/app/fees/page.jsx` |
| A-14 | FAQs: create/edit modal, delete | `admin/src/app/faqs/page.jsx` |
| A-15 | Settings: all sections, media file uploads | `admin/src/app/settings/page.jsx` |
| A-16 | Contact: enquiry list, detail modal, status update | `admin/src/app/contact/page.jsx` |
| A-17 | Users: CRUD, permissions matrix, reset password, deactivate/reactivate | `admin/src/app/users/page.jsx` |
| A-18 | AdminApi client with retry, error classification, credentials | `admin/src/lib/adminApi.js` |
| A-19 | react-hot-toast notifications on all actions | All admin pages |
| A-20 | Vercel deployment config (noindex headers, API rewrite) | `admin/vercel.json` |

### Public Website

| ID | Task | File(s) |
|---|---|---|
| P-01 | Homepage with all sections | `frontend/src/app/(user)/page.jsx` |
| P-02 | Header (dynamic from API + static fallback) | `frontend/src/components/layout/Header.jsx` + `HeaderServer.jsx` |
| P-03 | Footer (dynamic from API + static fallback) | `frontend/src/components/layout/Footer.jsx` + `FooterServer.jsx` |
| P-04 | HeroSection (dynamic badge + title from API/CMS) | `frontend/src/components/home/HeroSection.jsx` |
| P-05 | WelcomeSection (dynamic body from CMS) | `frontend/src/components/home/WelcomeSection.jsx` |
| P-06 | DirectorMessage (dynamic from settings API) | `frontend/src/app/(user)/page.jsx` |
| P-07 | NewsGallerySection (live API news + gallery) | `frontend/src/components/home/NewsGallerySection.jsx` |
| P-08 | FaqSection (live API FAQs + fallback) | `frontend/src/components/home/FaqSection.jsx` |
| P-09 | Gallery page with category filter (live API) | `frontend/src/app/(user)/gallery/page.jsx` |
| P-10 | News & Events page (live API) | `frontend/src/app/(user)/news-events/page.jsx` |
| P-11 | Individual news post page with generateMetadata | `frontend/src/app/(user)/news-events/[slug]/page.jsx` |
| P-12 | Downloads page grouped by category (live API) | `frontend/src/app/(user)/downloads/page.jsx` |
| P-13 | Admission enquiry form with API submission | `frontend/src/components/admissions/AdmissionEnquiryForm.jsx` |
| P-14 | 4-step online admission form with API submission | `frontend/src/components/admissions/OnlineAdmissionForm.jsx` |
| P-15 | Fee structure from API | `frontend/src/components/admissions/FeeStructureSection.jsx` |
| P-16 | FAQ accordion from API | `frontend/src/components/admissions/AdmissionsFaqWrapper.jsx` |
| P-17 | Contact form with API submission | `frontend/src/app/(user)/contact-us/page.jsx` |
| P-18 | Vercel deployment config (API rewrite, security headers) | `frontend/vercel.json` |
| P-19 | /admin route returns 404 | `frontend/src/app/admin/page.jsx` |
| P-20 | Static fallback for all API calls | All server components |

---

## B. Partially Completed Work

| ID | Title | What Works | What's Missing | Priority | Files |
|---|---|---|---|---|---|
| PW-01 | About Us page | Structure, design, 5 sub-pages exist | Not connected to CMS; uses only static `data/about.js` | High | `frontend/src/app/(user)/about-us/page.jsx`, About components |
| PW-02 | Academics page | Structure, design, 4 sub-pages exist | Not connected to CMS; uses only static `data/academics.js` | Medium | `frontend/src/app/(user)/academics/page.jsx` |
| PW-03 | Admissions sub-pages | /fee-structure and /online-admission-form exist | /admission-process uses static data, eligibility table static | Medium | `frontend/src/app/(user)/admissions/` |
| PW-04 | CMS → Public site | home hero + welcome connected | Remaining pages (about, academics, facilities, whyChoose, etc.) still static | High | `frontend/src/app/(user)/page.jsx` |
| PW-05 | Admin change-password | Backend endpoint complete | No UI page in admin panel | Medium | `backend/src/controllers/auth.controller.js` |
| PW-06 | FAQ reorder | Drag handle UI exists in admin | Not wired to `reorderFaqs` API endpoint | Low | `admin/src/app/faqs/page.jsx` |
| PW-07 | Admin "hard delete" user | UI says "Delete user" and "permanently removed" | Actually calls `updateUser({isActive:false})` — same as deactivate, not true deletion | Low | `admin/src/app/users/page.jsx` |
| PW-08 | Contact-us page settings data | Form and submission work | Phone, email shown from `siteConfig` (static), not live settings | Medium | `frontend/src/app/(user)/contact-us/page.jsx` |
| PW-09 | Gallery sub-pages | Main `/gallery` works | `/gallery/photo-gallery` and `/gallery/video-gallery` are empty stubs | Low | `frontend/src/app/(user)/gallery/` |
| PW-10 | News/Events individual post | `/news-events/[slug]` works | No `prose` CSS loaded for body HTML rendering | Low | `frontend/src/app/(user)/news-events/[slug]/page.jsx` |

---

## C. Pending Work

| ID | Title | Description | Priority | Status | Suggested Approach |
|---|---|---|---|---|---|
| TODO-01 | Cloud file storage | Uploaded files stored on Render ephemeral filesystem — lost on redeploy/restart | **Critical** | Pending | Integrate Cloudinary (free tier) or AWS S3. Modify upload.middleware.js to upload to cloud, store URL. |
| TODO-02 | Email notifications | No email sent to parent after application submission | High | Pending | Add nodemailer or SendGrid. Send confirmation email with applicationId. Backend trigger in submitApplication controller. |
| TODO-03 | Real school logo | "TG" text initials used as logo | High | Pending | Upload school logo PNG via admin Settings. |
| TODO-04 | Real school photos | All images from Unsplash placeholders | High | Pending | Replace in admin Settings and Gallery. |
| TODO-05 | Populate settings | Phone, email, address, WhatsApp, office timings empty | High | Pending | Admin must fill via Settings page. |
| TODO-06 | Admin change-password page | Backend exists, no UI | Medium | Pending | Add `/settings/security` or modal in TopBar profile dropdown. |
| TODO-07 | FAQ drag-reorder wiring | Backend exists, UI has drag handle but not wired | Low | Pending | Implement `onDragEnd` using `reorderFaqs` API. |
| TODO-08 | About page CMS connection | Fully static | Medium | Pending | Add `getContent('about')` fetch. Map CMS blocks to components. |
| TODO-09 | Academics page CMS connection | Fully static | Medium | Pending | Same pattern as About. |
| TODO-10 | Facilities section CMS | Static data/home.js | Medium | Pending | Add CMS content block fetching for facilities. |
| TODO-11 | WhyChooseSection CMS | Static data/home.js | Low | Pending | Add CMS content block fetching. |
| TODO-12 | CTA Banner CMS | Partial (session from settings) | Low | Pending | Full banner text from CMS. |
| TODO-13 | CBSE Mandatory Disclosure page | Required by CBSE for affiliated schools | High | Pending | Create dedicated `/mandatory-disclosure` page. Upload documents via admin. |
| TODO-14 | CSV/Excel export of applications | Mentioned in project brief | Medium | Pending | Add `GET /api/admin/applications/export` endpoint (json2csv package). |
| TODO-15 | Sitemap.xml | No auto-generated sitemap | Medium | Pending | Add `frontend/src/app/sitemap.js` using Next.js built-in sitemap support. |
| TODO-16 | robots.txt | Not present | Medium | Pending | Add `frontend/src/app/robots.js`. |
| TODO-17 | Google Analytics / GTM | No analytics | Medium | Pending | Add `@next/third-parties/google` for GA4. |
| TODO-18 | WhatsApp floating button | Public site has WhatsApp contact link | Low | Pending | Add fixed floating WhatsApp button on all pages. |
| TODO-19 | Print/PDF application | No way to print or download application | Low | Pending | Add print styles or jsPDF for application detail view in admin. |
| TODO-20 | Search functionality | No global search on public site | Low | Future | — |

---

## D. Bugs and Issues

| ID | Severity | Component | Issue | Impact | Fix | File |
|---|---|---|---|---|---|---|
| BUG-01 | High | Admin Users page | "Hard delete" is actually soft deactivation (`updateUser({isActive:false})`). UI says "permanently removed" which is misleading. | Staff may believe user is deleted when they can be reactivated | Either implement true deletion or change UI label to "Deactivate" | `admin/src/app/users/page.jsx` |
| BUG-02 | High | File storage | Uploaded files (`uploads/`) stored on Render's ephemeral filesystem. Files deleted on every Render service restart/redeploy. | All gallery photos, documents, logos lost on restart | Migrate to Cloudinary or S3 | `backend/src/middleware/upload.middleware.js`, `backend/src/server.js` |
| BUG-03 | Medium | News post body | `post.body` rendered via `dangerouslySetInnerHTML`. No `prose` CSS class applied. HTML formatting (bold, lists, etc.) not visible. | News body may appear unstyled | Add Tailwind `@tailwindcss/typography` plugin or inline prose styles | `frontend/src/app/(user)/news-events/[slug]/page.jsx` |
| BUG-04 | Medium | Contact page | Phone, email from static `siteConfig` (empty strings) not from live settings API. Contact page shows no phone/email even after admin updates them. | Public sees no contact details | Fetch settings in contact page or use FooterServer data | `frontend/src/app/(user)/contact-us/page.jsx` |
| BUG-05 | Medium | Gallery image URLs | `img.imageUrl` relative paths prefixed with Render base URL in `NewsGallerySection` and gallery page, but inconsistently. Some code uses `process.env.API_URL?.replace("/api", "")` which may be undefined client-side. | Broken images in gallery preview on homepage | Centralize URL construction; use a shared `getUploadUrl(path)` helper consistently | `frontend/src/components/home/NewsGallerySection.jsx`, `frontend/src/app/(user)/gallery/page.jsx` |
| BUG-06 | Medium | Admin `.env` | `.env` was set to `NODE_ENV=production` with `COOKIE_DOMAIN=.tilakglobalschool.com` on dev machine. This breaks local login (sameSite:none requires HTTPS). | Dev login fails | Rule: `.env` always uses `NODE_ENV=development`, `PORT=5000`, blank `COOKIE_DOMAIN` | `backend/.env` |
| BUG-07 | Low | Admin FAQ | Reorder drag handle (`GripVertical` icon) is decorative only. No `onDragStart`/`onDrop` handlers. | Staff expect to reorder by dragging but nothing happens | Wire to `adminApi.reorderFaqs()` | `admin/src/app/faqs/page.jsx` |
| BUG-08 | Low | Admin NewsAccordion homepage | Static `newsEvents.items` from `data/newsEvents.js` are always shown as fallback even when API returns real posts. The API data check in `NewsGallerySection` is correct, but the accordion date format assumes `item.day`/`item.month` from static data format while API returns ISO date strings — potential display issue if static fallback triggers when API has no posts. | Mixed data format if API returns empty | Ensure fallback uses same format; normalize date in map function | `frontend/src/components/home/NewsGallerySection.jsx` |
| BUG-09 | Low | Diwali sections | `DiwaliHero` and `DiwaliWishes` are marked "seasonal" in `page.jsx` comments but are permanently in the codebase. No feature flag or date-based toggle. | Post-festival, site shows Diwali branding permanently | Add date check or remove after festival | `frontend/src/app/(user)/page.jsx` |
| BUG-10 | Low | Admin TopBar | Notifications fetched on every page navigation (`useEffect([user, pathname])`). No caching — API hit on every route change. | Minor: unnecessary API requests | Throttle or cache activity fetch | `admin/src/app/components/TopBar.jsx` |
| BUG-11 | Info | siteConfig.js | `phone`, `email`, `whatsapp` are empty strings. If admin hasn't filled Settings, Header and Footer show no contact info, WhatsApp button href is `wa.me/` with no number. | Broken WhatsApp link; no contact info visible | Admin must populate Settings | `frontend/src/data/siteConfig.js` |
| BUG-12 | Info | Footer mapEmbed | Shows `[Google Map Embed]` text if not set. Not a real map. | Looks unprofessional | Admin must add real Google Maps embed URL | `frontend/src/components/layout/Footer.jsx` |

---

## E. Technical Debt

| ID | Category | Issue | Severity | Suggested Fix | File(s) |
|---|---|---|---|---|---|
| TD-01 | Architecture | File storage on Render ephemeral filesystem. This is the single biggest technical risk. | Critical | Migrate to Cloudinary (free tier is sufficient) | `backend/src/middleware/upload.middleware.js` |
| TD-02 | Duplication | `DEFAULT_PERMISSIONS` object duplicated in both `backend/src/models/AdminUser.model.js` AND `admin/src/app/users/page.jsx` | Medium | Fetch from API (`GET /api/admin/users` returns role + permissions) | `admin/src/app/users/page.jsx` |
| TD-03 | Duplication | `fetchWithRetry` function copy-pasted in both `frontend/src/lib/api.js` AND `admin/src/lib/adminApi.js` | Low | Could be shared if monorepo shared package added; acceptable for now |  |
| TD-04 | Hardcoding | Render backend URL hardcoded in `frontend/src/components/home/NewsGallerySection.jsx`: `process.env.API_URL?.replace("/api", "") \|\| "https://tilak-global-school-backend-0xwt.onrender.com"` | Medium | Centralize into shared `getUploadBase()` utility | `frontend/src/components/home/NewsGallerySection.jsx` |
| TD-05 | Hardcoding | Same Render URL hardcoded in `frontend/src/app/(user)/page.jsx` for director photo | Medium | Same fix as TD-04 | `frontend/src/app/(user)/page.jsx` |
| TD-06 | Duplication | `fileUrl()` and `getFileBase()` helper functions defined differently in multiple admin pages (settings, gallery, documents) | Low | Extract into `admin/src/lib/uploadUrl.js` shared helper | Admin pages |
| TD-07 | Missing | No `@tailwindcss/typography` plugin. Rich text from CMS (`richtext` type) renders as unstyled HTML via `dangerouslySetInnerHTML`. | Medium | Install plugin, add `prose` class to news body and CMS richtext renders | `frontend/next.config.mjs` |
| TD-08 | Missing | No `sitemap.xml` or `robots.txt` for public site | Medium | Add Next.js built-in sitemap/robots generators | `frontend/src/app/` |
| TD-09 | Inconsistency | Homepage static fallback data (`data/home.js`) uses Unsplash URLs which may change or become 404 | Medium | Replace with actual school photos or stable placeholder | `frontend/src/data/home.js` |
| TD-10 | Missing | No `loading.jsx` files in Next.js route segments. No skeleton UI while async server components fetch data. | Medium | Add route-level `loading.jsx` files | All `(user)` route segments |
| TD-11 | Missing | No `error.jsx` boundary components in routes | Medium | Add `error.jsx` to prevent full page crash on API failure | All `(user)` route segments |
| TD-12 | Performance | Homepage `Promise.all` runs 5 parallel fetches on every request. No caching. | Low | Add `revalidate` or `cache: 'force-cache'` with time-based revalidation | `frontend/src/app/(user)/page.jsx` |
| TD-13 | Security | `maxAge: '1d'` on uploaded static files in express.static | Low | May cause stale images after update. Acceptable for now but consider shorter cache or versioning | `backend/src/app.js` |
| TD-14 | Missing | No honeypot field visible in `AdmissionEnquiryForm.jsx` (only `OnlineAdmissionForm` has the backend honeypot check via Zod `_hp` field) | Low | Add hidden `_hp` field to enquiry form | `frontend/src/components/admissions/AdmissionEnquiryForm.jsx` |

---

## F. Pre-Launch Checklist

### Critical (Must complete before go-live)
- [ ] **Migrate file storage to Cloudinary** (current Render storage is ephemeral)
- [ ] **Upload real school logo** via admin Settings → Media
- [ ] **Populate Settings**: phone, email, address, office timings, WhatsApp number, map embed URL, admission session
- [ ] **Upload real school photos** to Gallery and replace Unsplash placeholders
- [ ] **Upload real director photo** via admin Settings → Director/Principal
- [ ] **Run seed script on production** (Render Shell: `npm run seed && npm run seed:content`)
- [ ] **Verify login works** on production admin panel
- [ ] **Custom domain DNS** pointed to Vercel and Render
- [ ] **SSL certificates** active (Vercel auto-handles)
- [ ] **CBSE Mandatory Disclosure** documents uploaded

### High Priority
- [ ] Fill all CMS content blocks via admin Content page (home hero, welcome text, admissions process steps)
- [ ] Publish at least one News post for the homepage news section
- [ ] Add FAQs if not seeded
- [ ] Verify contact form submission reaches admin Contact page
- [ ] Verify admission form creates application in admin Admissions page
- [ ] Test file uploads (gallery photo, document) work end-to-end
- [ ] Update `frontend/src/data/siteConfig.js` copyright year to current year

### Medium Priority
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test all forms with invalid data to confirm error messages show
- [ ] Add Google Analytics or similar tracking

### Low Priority
- [ ] Remove Diwali sections from homepage (after festival)
- [ ] Wire FAQ reorder drag-and-drop

---

## G. Post-Launch Checklist

- [ ] Monitor Render logs for errors in first 48 hours
- [ ] Verify keep-alive ping is working (check Render logs for `💓 Keep-alive ping sent`)
- [ ] Confirm emails are reaching parents (once email feature added)
- [ ] Check admission applications are being received correctly
- [ ] Train school staff on admin panel usage
- [ ] Document any new credentials or access details for client
- [ ] Plan Cloudinary migration if file uploads needed before next deploy

---

## H. Recommended Development Sequence

```
Priority 1 (Immediate — before launch):
  1. Migrate uploads to Cloudinary [CRITICAL]
  2. Populate Settings (phone, email, etc.) [Admin task]
  3. Upload real photos + logo [Admin task]
  4. Fill CMS content blocks [Admin task]
  5. Add sitemap.xml + robots.txt

Priority 2 (Within 1-2 weeks post-launch):
  6. Email notifications for admission applications
  7. Fix contact page settings data (BUG-04)
  8. Connect About + Academics pages to CMS
  9. Add change-password UI in admin
  10. Fix news body prose styling (BUG-03)

Priority 3 (Nice to have):
  11. Wire FAQ reorder
  12. Add loading.jsx skeleton screens
  13. Add error.jsx boundaries
  14. PDF download for applications
  15. CSV export
```

---

## I. Suggested Milestones

| Milestone | Description | Target |
|---|---|---|
| M1 — Full Launch Ready | Cloud storage + settings populated + content filled | Before go-live |
| M2 — Email Integration | Auto-confirmation emails to parents | 2 weeks post-launch |
| M3 — Full CMS Coverage | About + Academics connected to CMS | 1 month post-launch |
| M4 — Enhanced Admin | Change-password UI, FAQ reorder, CSV export | 2 months post-launch |
| M5 — Phase 2 Scope | Parent status portal, online payments, SMS | 6 months post-launch |
