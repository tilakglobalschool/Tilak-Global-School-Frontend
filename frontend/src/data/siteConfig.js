/**
 * siteConfig.js
 * Global school identity — fallback values for Header, Footer, and page metadata.
 * These are used when the API is unavailable or slow.
 *
 * Primary data source: /api/settings (SiteSettings MongoDB document).
 * Keep this in sync with what is set in the admin Settings panel.
 *
 * Confirmed by client (2026-11-10):
 *   Phone/WhatsApp: 9119112335
 *   Landline: 0141-2945793
 *   Email: schooltilak@gmail.com
 *   Address: Bindayaka (Bhutawali), Mukundpura Road, Jaipur - 302041
 *   Office timings: 8:00 AM to 2:00 PM
 *   CBSE Affiliation No: 1730870
 *   School Code: 11224
 *   Admission session: 2026-27
 */

export const siteConfig = {
  name:       "Tilak Global School",
  tagline:    "CBSE Affiliated · Nursery to XII · English Medium",
  description:
    "Tilak Global School is an English-medium, co-educational CBSE school in Jaipur offering classes from Nursery to Class XII.",

  address:       "Bindayaka (Bhutawali), Mukundpura Road, Jaipur - 302041",
  addressShort:  "Bindayaka, Mukundpura Road, Jaipur",
  phone:         "9119112335",
  phoneHref:     "tel:+919119112335",
  landline:      "0141-2945793",
  landlineHref:  "tel:01412945793",
  email:         "schooltilak@gmail.com",
  emailHref:     "mailto:schooltilak@gmail.com",
  whatsapp:      "9119112335",

  cbseAffiliationNo: "1730870",
  schoolCode:        "11224",
  admissionSession:  "2026-27",
  officeTimings:     "8:00 AM – 2:00 PM",

  // Social media — pending CF-14 (not yet confirmed by client)
  social: {
    facebook:  "",
    instagram: "",
    youtube:   "",
    twitter:   "",
  },

  copyright:  "© 2026 Tilak Global School. All Rights Reserved.",

  logoInitials: "TGS",
  mapEmbed:     "", // CF-11 — Google Maps URL not yet provided by client
};
