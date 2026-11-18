import "./globals.css";

const BASE_URL = "https://www.tilakglobalschool.com";

export const metadata = {
  // ── Base URL for relative paths in metadata ──────────────────────────────
  metadataBase: new URL(BASE_URL),

  // ── Title ─────────────────────────────────────────────────────────────────
  title: {
    default:  "Tilak Global School | CBSE Affiliated School Jaipur — Nursery to Class XII",
    template: "%s | Tilak Global School, Jaipur",
  },

  // ── Description ───────────────────────────────────────────────────────────
  description:
    "Tilak Global School is an English-medium, co-educational CBSE-affiliated school in Jaipur (CBSE Affiliation No. 1730870) offering classes from Play Group to Class XII. Established 2016. Admissions open for session 2027-28.",

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    "Tilak Global School",
    "CBSE school Jaipur",
    "English medium school Jaipur",
    "Nursery to Class 12 Jaipur",
    "Bindayaka school Jaipur",
    "Mukundpura Road school Jaipur",
    "CBSE affiliated school Rajasthan",
    "co-educational school Jaipur",
    "admission 2027-28 Jaipur",
    "best school Jaipur",
    "NCERT school Jaipur",
    "Play Group to Class 12 Jaipur",
    "Tilak Group school",
    "school near Bindayaka Jaipur",
    "1730870 CBSE affiliation",
  ],

  // ── Authors & Publisher ───────────────────────────────────────────────────
  authors:   [{ name: "Tilak Global School", url: BASE_URL }],
  publisher: "Tilak Global School",
  creator:   "Tilak Global School",

  // ── Canonical URL ─────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph (Facebook, WhatsApp previews) ──────────────────────────────
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         BASE_URL,
    siteName:    "Tilak Global School",
    title:       "Tilak Global School | CBSE Affiliated School Jaipur",
    description:
      "English-medium, co-educational CBSE school in Jaipur — Play Group to Class XII. CBSE Affiliation No. 1730870. Admissions open for 2027-28.",
    images: [
      {
        url:    "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
        width:  1200,
        height: 630,
        alt:    "Tilak Global School — CBSE School Jaipur",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       "Tilak Global School | CBSE School Jaipur",
    description: "English-medium CBSE school in Jaipur — Nursery to Class XII. Admissions open for 2027-28.",
    images:      ["https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg"],
  },

  // ── Verification (add Google Search Console verification key here) ─────────
  // verification: {
  //   google: "your-google-site-verification-code",
  // },

  // ── Icons / Favicon ───────────────────────────────────────────────────────
  // Static fallback favicon from public/ folder.
  // When admin uploads a favicon via Settings panel, it overrides via <head> inject.
  icons: {
    icon:        "/favicon.ico",
    shortcut:    "/favicon.ico",
    apple:       "/apple-touch-icon.png",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // ── Category ──────────────────────────────────────────────────────────────
  category: "education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
