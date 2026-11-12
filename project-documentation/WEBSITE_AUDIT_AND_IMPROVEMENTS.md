# Website Audit & Improvement Recommendations
## Tilak Global School — Complete Honest Audit

> **Date:** November 2026  
> **Reviewer perspectives applied:** Senior UI/UX Designer, Senior Frontend Dev, Senior Backend Dev, Product Manager, Security Reviewer, Real End User

---

## Section 1: Existing Website Problems

### Design & UI Issues

| Issue ID | Page/Component | Exact Problem | Why It's a Problem | User Impact | Recommended Solution | Priority | File |
|---|---|---|---|---|---|---|---|
| UI-01 | Homepage | Diwali seasonal sections have no expiry mechanism. DiwaliHero and DiwaliWishes are permanently rendered. | Post-festival, the site shows festive branding indefinitely, harming professional credibility. | Confusion — parents visiting in January 2027 see Diwali greeting. | Add date-based conditional: `if (new Date() <= new Date('2026-11-15'))` | Critical | `frontend/src/app/(user)/page.jsx` |
| UI-02 | Homepage Hero | Unsplash stock photo used as hero background. It has no connection to the actual school. | Breaks trust — parents expect to see the actual school building, students, classrooms. | Reduces authenticity and conversion from visitor to enquiry. | Replace with real school building photo | High | `frontend/src/data/home.js` |
| UI-03 | Everywhere | Logo placeholder "TG" text in circular div used as logo across Header, Footer, Admin panel. | Looks like a development placeholder on a live school website. Completely unprofessional. | First impression is poor; parents may distrust the website. | Upload real school logo. Implement `<Image>` from settings.logoUrl | High | `frontend/src/components/layout/Header.jsx` |
| UI-04 | Contact Us | Contact page shows no phone number or email. `siteConfig.phone` and `siteConfig.email` are empty strings. | Parents who want to call the school find no number anywhere on the page. | Directly impacts enquiries — parents leave the site. | Populate from live settings API (settings.phone / settings.email) | High | `frontend/src/app/(user)/contact-us/page.jsx` |
| UI-05 | Footer | Google Maps section shows `[Google Map Embed]` placeholder text in a styled container. | Looks like an error or broken element to any website visitor. | Creates impression that the website is broken or incomplete. | Either render actual iframe embed from settings.mapEmbedUrl or hide the section until populated | High | `frontend/src/components/layout/Footer.jsx` |
| UI-06 | Admissions | Fee structure table shows all values as "To be announced" with no actual amounts. | Parents specifically visit this page to understand costs — they find nothing useful. | High bounce rate on fee-structure page; parents go to competitor schools. | Admin must populate fee amounts immediately after launch | High | Admin: Fee Structure |
| UI-07 | Homepage FAQ | FAQ section on homepage shows static FAQ data (`data/home.js`) even when API returns real FAQs from DB. API fallback is correct, but static FAQs contain "2025-26 Admissions" reference — will be outdated. | Outdated content makes the school look unattentive. | Minor confusion; erodes trust. | Update static FAQ data as an emergency fix; long-term: CMS manages these | Medium | `frontend/src/data/home.js` |
| UI-08 | Director Message | Unsplash man-in-suit photo used as director photo. | Director is "R.S. Tanwar" but image is an unrelated stock photo. | Factually incorrect visual representation. | Upload real director photo via admin Settings | High | Admin: Settings → Director |
| UI-09 | Homepage About/Why Choose | "Achievements & Results" section says: "Board results, achievements and awards — to be updated once verified by the school." This developer note is visible on the live website. | Public-facing developer note is extremely unprofessional. | Parents see unfinished content; damages credibility. | Remove this card or replace with verified content before launch | High | `frontend/src/data/home.js` |
| UI-10 | News & Events | Individual news post body rendered via `dangerouslySetInnerHTML` with no prose styling. If body contains HTML (`<p>`, `<strong>`, `<ul>`), it appears unstyled. | Poor reading experience for news articles. | Users may abandon news posts. | Add `@tailwindcss/typography` plugin + `prose` class | Medium | `frontend/src/app/(user)/news-events/[slug]/page.jsx` |
| UI-11 | All pages (mobile) | Academic Stages, Facilities, Why Choose sections use swipeable horizontal scroll on mobile with tiny invisible pagination dots. No visual cue that content is scrollable. | Mobile users may never discover additional content. | Important school information (academics, facilities) hidden from mobile users. | Add visible scroll indicators, arrow buttons, or convert to vertical stack on mobile | Medium | Multiple home components |
| UI-12 | Admissions Form | 3-field quick enquiry form asks only for `parentMobile` but phone validation requires Indian format `^(\+91)?[6-9]\d{9}$`. Input is labeled "Mobile Number" but placeholder says "10-digit mobile number" — doesn't mention +91 format. | Parents with +91 prefix may get validation error without understanding why. | Form abandonment; lost enquiries. | Update placeholder to show accepted format; accept both 10-digit and +91 format | Medium | `frontend/src/components/admissions/AdmissionEnquiryForm.jsx` |
| UI-13 | Homepage News accordion | Date badge is from static data (`data/newsEvents.js`) and shows hardcoded dates like "4 Apr" and "Mar". When API returns real news, dates come from ISO string but map correctly — however the old static data still shows if API has no posts. | Static news items reference "Session 2025-26" which is now outdated. | Dated content visible to live visitors. | Update or remove static news items from `data/newsEvents.js` | Medium | `frontend/src/data/newsEvents.js` |
| UI-14 | Admin Dashboard | No loading skeleton for charts and stat cards. Shows blank white area while Promise.all fetches. | Jarring blank flash before content loads. | Poor perceived performance for admin staff. | Add Spinner or skeleton placeholders while loading | Low | `admin/src/app/page.jsx` |
| UI-15 | Admin - All pages | Toast success messages say generic things like "Post created." without the post title. | Staff working quickly can't confirm which item was affected. | Minor confusion in high-volume operations. | Include item name in toast: `toast.success('Post "${post.title}" created.')` | Low | Admin news/gallery/docs pages |

### Technical / Backend Issues

| Issue ID | Component | Problem | Impact | Fix | Priority | File |
|---|---|---|---|---|---|---|
| TECH-01 | File Storage | All uploads stored on Render ephemeral filesystem. Every redeploy or restart destroys all uploaded files. | Complete data loss of gallery, documents, logos on every redeploy. | **Critical** — migrate to Cloudinary or S3 immediately. | Critical | `backend/src/middleware/upload.middleware.js` |
| TECH-02 | Admin Users | "Delete User" UI says "permanently removed" but code calls `updateUser({isActive: false})` — identical to deactivate. | Staff may believe user is gone when they can be reactivated. Admin can't actually permanently remove users. | Change label to "Deactivate" or implement true deletion. | Medium | `admin/src/app/users/page.jsx` |
| TECH-03 | Settings contact | Public `GET /api/settings` returns `phone`, `email` but only if populated. Frontend fallback to `siteConfig` which has empty strings. Contact page doesn't use settings API. | No contact info on live site until admin fills settings AND contact page is fixed. | Fix contact page to use settings API data. | High | `frontend/src/app/(user)/contact-us/page.jsx` |
| TECH-04 | Image URLs | `process.env.API_URL?.replace("/api", "")` used to prefix relative upload paths. `API_URL` is undefined on client-side by design. The logic `typeof window !== 'undefined' ? '' : backend_url` is correct but scattered across multiple components inconsistently. | Potential broken images in some components. | Create a shared `getUploadBase()` utility function. | Medium | Multiple files |
| TECH-05 | No caching | Every public page fetch has `credentials: 'include'` which prevents browser and CDN caching. | Each page refresh re-fetches all API data. Performance impact on Render free tier. | Use `credentials: 'omit'` for public GET requests (settings, news, gallery, etc.). Only admission forms need `include`. | Medium | `frontend/src/lib/api.js` |
| TECH-06 | No next/Image for gallery | Gallery page uses `<img>` tag, not Next.js `<Image>` component. No lazy loading optimization. | Slower gallery page on mobile; layout shift possible. | Convert to `<Image>` with `fill` or explicit dimensions. | Low | `frontend/src/app/(user)/gallery/page.jsx` |

### Security Issues

| Issue ID | Component | Problem | Impact | Fix | Priority |
|---|---|---|---|---|---|
| SEC-01 | News body | `dangerouslySetInnerHTML` on `post.body` without sanitization. If CMS body contains malicious `<script>` tags, they would execute in visitor's browser. | XSS vulnerability if admin account compromised. | Install `dompurify` on client or sanitize in backend before saving. | High |
| SEC-02 | Contact form | No honeypot field in `AdmissionEnquiryForm`. Only `OnlineAdmissionForm` and `ContactForm` have Zod `_hp` honeypot. | Enquiry form slightly more susceptible to bot submissions. | Add hidden `_hp` input field. | Low |
| SEC-03 | Activity log | `ActivityLog.ipAddress` not stored. Good for privacy but means no IP-based fraud detection on admin actions. | Cannot trace suspicious admin activity by IP. | Acceptable trade-off for now. | Info |

---

## Section 2: UI/UX Improvement Suggestions

### 2.1 Homepage

**Current:** Impressive editorial design with layered compositions and deep navy/red palette. Technically sophisticated but heavy.

**Suggestions:**

1. **Above-fold CTA clarity**: The admission CTA button "Enquire for Admission" is in the hero but parents scrolling on mobile may miss it. Add a sticky mobile bottom bar: `📋 Enquire for Admission` button that appears after scrolling past the hero.

2. **School at a glance strip**: Immediately after the hero, consider a prominent "School at a Glance" strip with actual counts — total students, years established, board affiliations. Currently static and needs real data.

3. **Social proof section**: Schools competing for admissions benefit from testimonial sections. A "What parents say" section (even with 2-3 real quotes) dramatically improves conversion.

4. **Principal's message teaser**: Director message currently shows a stock photo. Once real photo + message is added, this section will be excellent. Currently it's the weakest trust element.

5. **Gallery preview improvement**: The 2×2 static image grid is elegant but always shows the same 4 images. Dynamic loading from admin would make this feel fresh on each visit.

### 2.2 Navigation

**Current issues:**
- No breadcrumbs on inner pages (About → Our School doesn't show "Home > About > Our School")
- Mobile menu is functional but long — all items in a vertical list
- No search functionality

**Suggestions:**
1. Add breadcrumb component using the `PageHero` section
2. Consider grouping mobile nav items with visual separators
3. Add WhatsApp quick-contact button in mobile nav (floating)

### 2.3 Admissions Flow

**Current:** Multi-page admissions section with good process breakdown. Forms work correctly.

**Suggestions:**
1. **Fee structure**: Table currently shows all "To be announced". Until real data is populated, replace with "Contact us for fee details: [phone]" message.
2. **Application confirmation**: Success state shows the application ID. Consider adding: "Screenshot this ID for your records" or "Save Application ID" button that copies to clipboard.
3. **Progress indicator**: 4-step form has a progress bar but on mobile it's cramped. Consider numbering above the form: "Step 2 of 4: Parent Details".

### 2.4 Admin Panel

**Current:** Clean, functional, good dark mode. Well-organized sidebar. Forms work well.

**Suggestions:**

1. **Dashboard empty state**: When no applications exist yet, stat cards show 0s. Add a "No applications yet — share the admission form link to get started" prompt.

2. **Bulk actions in admissions**: Currently no bulk status update. As applications grow (50+), admissions staff need "Select all Pending → Mark as Info Requested" capability.

3. **Rich text editor for news body**: Currently a plain `<textarea>`. News body supports HTML but staff have to write raw HTML. A lightweight rich text editor (Quill, TipTap) would dramatically improve content quality.

4. **Gallery drag-to-reorder**: Currently not wired despite having the UI. This is a small fix that would greatly improve gallery management experience.

5. **Keyboard shortcut for save**: Power users (content editors) expect Ctrl+S to save. Currently only the button works.

6. **Quick stats in list pages**: Below the page header in Admissions, show: "42 total • 15 pending • 20 approved" at a glance without needing to go to dashboard.

### 2.5 Mobile Experience

1. **WhatsApp floating button**: Most Indian school websites have a prominent green WhatsApp button floating on the right. This is expected by parents and highly effective for conversions.

2. **Click-to-call on mobile**: Phone number in header utility bar on mobile shows "Call" text — good. But on the Contact page, the phone is not shown at all (bug). Fix this.

3. **Image optimization**: Gallery page loads all images without lazy loading. On mobile with slow connection, this is severe.

---

## Section 3: New Feature Recommendations

### Must Have

| Feature | What It Does | Why Useful | Frontend | Backend | Complexity | Priority |
|---|---|---|---|---|---|---|
| Cloud file storage (Cloudinary) | Store uploaded images/docs in cloud, not on server | Current approach loses all files on restart — blocking issue | Minimal change (URL update) | Modify upload.middleware.js | Low | 🔴 Critical |
| Email confirmation | Auto-send email to parent when application received | Parents need confirmation; reduces follow-up calls to school | No change | Add nodemailer + template | Medium | 🔴 High |
| Mandatory Disclosure page | CBSE-required disclosure page with specific documents | CBSE affiliation requirement; legal compliance | New route `/mandatory-disclosure` | Documents API (exists) | Low | 🔴 High |
| WhatsApp floating button | Fixed bottom-right WhatsApp button on all public pages | Expected by Indian website visitors; high conversion | Add to `(user)/layout.jsx` | None | Very Low | 🔴 High |

### Should Have

| Feature | What It Does | Why Useful | Complexity | Priority |
|---|---|---|---|---|
| Rich text editor (Quill/TipTap) | WYSIWYG editor for news body and CMS richtext blocks | Staff can't write raw HTML; content quality is poor without it | Medium | Should Have |
| Sitemap.xml auto-generation | Auto-generated from published news/pages | SEO — Google can't index pages it doesn't know about | Very Low | Should Have |
| PDF download of application | Staff can print/save application as PDF | Needed for physical filing, parent meetings | Low | Should Have |
| CSV export of applications | Export all/filtered applications to Excel | School may need to import into their own system | Low | Should Have |
| Application deletion confirm | Currently delete has ConfirmDialog but no "type to confirm" for critical deletions | Prevents accidental permanent data loss | Very Low | Should Have |
| Robots.txt | Explicit crawler instructions | SEO best practice | Very Low | Should Have |

### Nice to Have

| Feature | Complexity | Priority |
|---|---|---|
| Google Analytics integration | Very Low | Medium |
| Parent application status portal (read-only, with application ID lookup) | High | Low |
| Bulk status update for applications | Medium | Low |
| News categories filter on public page | Low | Low |
| Print-friendly application form | Low | Low |
| Staff activity log view in admin | Very Low (data exists in ActivityLog) | Low |
| Notification system (new application badge in sidebar) | Medium | Low |

### Future Scope

| Feature | Notes |
|---|---|
| Online fee payment (Razorpay) | Phase 2 |
| Student login portal | Phase 3 |
| SMS notifications (Twilio) | Phase 2 |
| Parent portal with application tracking | Phase 2 |
| Academic calendar with iCal download | Phase 3 |
| Multi-language support (Hindi/English) | Phase 3 |

---

## Section 4: Competitor & Industry-Level Suggestions

> *Note: These recommendations are based on observed patterns in CBSE school websites in India and educational institutions globally. No specific competitor URLs were accessed.*

### Common Patterns in Successful Indian School Websites

1. **Admission enquiry chatbot / WhatsApp integration**  
   Many schools now use a simple chatbot or automated WhatsApp reply to handle initial enquiries 24/7. Parents expect instant response.

2. **Virtual school tour**  
   Schools with premium positioning include a YouTube embed or 360° virtual tour of campus. Tilak Global School could add a YouTube video gallery category.

3. **Academic results board**  
   CBSE board result notifications are high-traffic events. A dedicated "Results" section with Class X/XII topper photos (once CBSE compliance approves) drives significant engagement.

4. **Event calendar**  
   An academic calendar with upcoming events (annual day, sports day, etc.) keeps parents engaged year-round and reduces phone enquiries.

5. **Fee payment portal**  
   Online fee payment via Razorpay/PayU is increasingly expected. Currently out of scope but highly requested by parents.

6. **Social media feed integration**  
   Embedding Instagram or Facebook feed shows school is active. Many schools use this to showcase recent events without requiring separate website updates.

7. **Transportation route map**  
   Schools with bus routes typically show an interactive map. Mentioned as "to be confirmed" in current site.

8. **Admission session countdown timer**  
   "X days left for admissions" creates urgency and increases conversion. Very easy to implement.

---

## Section 5: Performance and Technical Improvements

### 5.1 Rendering Performance

| Issue | Current | Recommended | Effort |
|---|---|---|---|
| No ISR/static caching | Every request hits Render backend | Add `export const revalidate = 3600` (1 hour cache) to public pages | Low |
| `credentials: 'include'` on public GETs | Prevents browser and CDN caching | Use `credentials: 'omit'` for public read requests | Low |
| No loading.jsx boundaries | Blank flash while async components load | Add `loading.jsx` files in route segments | Low |
| No error.jsx boundaries | Full page crash if API fails | Add `error.jsx` files with retry UI | Low |
| Heavy homepage | 5 parallel API calls on first load | Cache settings + content separately; use static for stable data | Medium |

### 5.2 Image Optimization

| Issue | Fix |
|---|---|
| Gallery uses `<img>` not `<Image>` | Convert to Next.js `<Image>` with lazy loading |
| No image dimensions in gallery | Causes layout shift (CLS); add explicit height/width or use `fill` |
| Unsplash images at full resolution | Already using `?w=800&q=80` params — good |
| No responsive image sizes | Add `sizes` prop to all `<Image>` components |
| No image compression at upload | Add sharp.js resize in upload middleware; store multiple sizes |

### 5.3 API Optimization

| Issue | Fix |
|---|---|
| Dashboard loads all 4 endpoints on mount (fine) | — already parallel |
| No pagination on gallery admin (fetches 100 items default) | Already paginated; acceptable |
| Text search index on applications | Already implemented — good |
| Activity log query hits collection without time filter | Add `createdAt: { $gte: last7days }` default filter |

### 5.4 SEO

| Issue | Current | Fix |
|---|---|---|
| No sitemap.xml | Missing | Add `app/sitemap.js` |
| No robots.txt | Missing | Add `app/robots.js` |
| News post metadata | generateMetadata() ✅ | Good |
| Homepage metadata | Static ✅ | Good |
| FAQ JSON-LD | Implemented ✅ | Good |
| Semantic HTML | Good overall | — |
| Alt text | Exists but many are generic | Use meaningful descriptions |

### 5.5 Bundle Size

- Recharts (charts library) is loaded only in admin panel — ✅ correct isolation
- No unnecessary client-side dependencies in public site
- `lucide-react` tree-shaken per import — ✅
- Tailwind CSS v4 — optimized, no purge needed

### 5.6 Security

| Check | Status | Notes |
|---|---|---|
| Passwords hashed (bcrypt 12) | ✅ | — |
| Token in httpOnly cookie | ✅ | — |
| CORS whitelist | ✅ | Includes `*.vercel.app` — monitor |
| Zod input validation | ✅ | — |
| Rate limiting | ✅ | — |
| File upload MIME validation | ✅ | — |
| XSS via news body HTML | ⚠️ | Need DOMPurify sanitization |
| No secrets in frontend bundle | ✅ | No NEXT_PUBLIC_ env vars |
| Admin panel noindex | ✅ | — |
| SQL injection risk | N/A | MongoDB ODM |
| Stack traces in production | ✅ Hidden | errorHandler masks 500s |

---

## Section 6: Final Recommendations

### Top 10 Improvements to Implement First

| # | Improvement | Reason |
|---|---|---|
| 1 | Migrate uploads to Cloudinary | Uploaded files are lost on every Render restart. Launch-blocking. |
| 2 | Populate school settings (phone, email, address, WhatsApp) | Site shows no contact info without this. |
| 3 | Upload real school logo + photos | "TG" placeholder and stock photos destroy credibility. |
| 4 | Remove Diwali sections (or add date expiry) | Post-festival sections running permanently looks unprofessional. |
| 5 | Fix contact page phone/email (use settings API) | Parents can't find contact details on the contact page. |
| 6 | Fix "Achievements & Results" developer note in public site | Developer note is live on the website — unprofessional. |
| 7 | Add DOMPurify to news body HTML rendering | XSS vulnerability in news post body. |
| 8 | Add WhatsApp floating button | Standard on all Indian school sites; high conversion impact. |
| 9 | Add sitemap.xml + robots.txt | Basic SEO; Google can't discover pages without sitemap. |
| 10 | Fix Footer map embed placeholder | `[Google Map Embed]` text looks broken to every visitor. |

### Top 10 New Features Worth Adding

| # | Feature | Value |
|---|---|---|
| 1 | Cloudinary/S3 integration | Data durability |
| 2 | Email notifications (application confirmation) | Parent trust + UX |
| 3 | CBSE Mandatory Disclosure page | Legal compliance |
| 4 | Rich text editor in admin | Content quality |
| 5 | Sitemap.xml | SEO visibility |
| 6 | PDF download of applications | Admin workflow |
| 7 | Bulk application status update | Admin efficiency |
| 8 | Admission countdown timer | Conversion increase |
| 9 | Virtual tour YouTube embed | Premium positioning |
| 10 | Google Analytics | Business intelligence |

### Things That Should Be Removed or Redesigned

| Item | Reason |
|---|---|
| Diwali sections (after festival) | Seasonal content that overstays its welcome |
| `[Google Map Embed]` placeholder | Shows broken UI; hide until real embed added |
| "Achievements & Results" note ("to be updated...") | Developer note visible on live site |
| Static newsEvents.js items with 2025-26 references | Will become stale; replace with CMS-driven content |
| `/gallery/photo-gallery` and `/gallery/video-gallery` stubs | Empty pages that exist in nav dropdown but have no content |

### Things That Are Unnecessary or Overcomplicated

1. **Dual route for gallery sub-pages** — `/gallery/photo-gallery` and `/gallery/video-gallery` add nav complexity for no benefit. The main `/gallery` page already handles all photos. Remove these or build them out.

2. **CMS draft workflow for simple text blocks** — The `draftValue`/`value`/`hasDraft` three-field workflow is powerful but overwhelming for school staff editing simple text like "hero title". A simpler "Edit + Save" without draft would reduce confusion.

3. **11-module permission system** — For a school with ~3-5 staff users, the granular per-action permission matrix (view/edit/publish/delete per module) may be over-engineered. The three default role presets should be sufficient; the per-permission override is rarely needed.

### Major Risks in Current Website

| Risk | Severity | Description |
|---|---|---|
| Render ephemeral filesystem | Critical | All uploaded files lost on redeploy. Must be fixed before go-live. |
| No real school content | High | Stock photos + empty contact fields create an unfinished appearance. |
| XSS in news body | Medium | `dangerouslySetInnerHTML` without sanitization. |
| Render free-tier cold starts | Medium | 15-second delay on first visit after inactivity. Keep-alive partially mitigates but not perfectly. |
| Single admin account | Medium | If the super_admin password is forgotten/compromised, there's no password reset flow (email-based). Manual seed re-run required. |
| No backup strategy | Medium | No automated MongoDB Atlas backup schedule documented. |

### Recommended Future Architecture Improvements

1. **Cloud storage migration** (Cloudinary/S3) — Non-negotiable for production reliability.

2. **Redis caching layer** — When traffic grows, cache `/api/settings`, `/api/faqs`, `/api/fees` (rarely changing data) in Redis with TTL. Dramatically reduces MongoDB reads.

3. **Next.js ISR (Incremental Static Regeneration)** — Add `revalidate: 3600` to public server components. Pages serve from CDN cache, re-generate in background every hour.

4. **Email service** — SendGrid or AWS SES for transactional emails. Queue-based to handle spikes.

5. **Cloudinary transformations** — Auto-resize uploaded images to multiple sizes (thumbnail, medium, full) at upload time.

### Prioritized Improvement Roadmap

```
WEEK 1 (Before Launch):
  ├── Migrate file storage to Cloudinary
  ├── Populate all school settings via admin
  ├── Upload real logo + photos
  └── Fix: contact page settings data, Diwali expiry, map placeholder

WEEK 2-4 (After Launch):
  ├── Add email notifications
  ├── DOMPurify for news body
  ├── WhatsApp floating button
  ├── Sitemap.xml + robots.txt
  └── Add change-password UI in admin

MONTH 2:
  ├── Rich text editor (TipTap/Quill) for news/CMS
  ├── Connect About + Academics pages to CMS
  ├── Wire FAQ reorder
  └── Add Google Analytics

MONTH 3-6:
  ├── Redis caching for public API
  ├── Next.js ISR for public pages
  ├── PDF application download
  ├── CSV export
  └── CBSE Mandatory Disclosure page

PHASE 2 (6+ months):
  ├── Parent status portal
  ├── Online fee payment (Razorpay)
  └── SMS notifications
```
