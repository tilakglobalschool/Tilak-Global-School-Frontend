import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.tilakglobalschool.com"),
  title: {
    default: "Tilak Global School | CBSE School Jaipur — Nursery to Class XII",
    template: "%s | Tilak Global School",
  },
  description:
    "Tilak Global School is an English-medium, co-educational CBSE-affiliated school in Jaipur offering classes from Play Group to Class XII. Admissions open for session 2026-27.",
  keywords: [
    "Tilak Global School",
    "CBSE school Jaipur",
    "English medium school Jaipur",
    "Nursery to Class 12 Jaipur",
    "Bindayaka school Jaipur",
    "admission 2026-27",
  ],
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         "https://www.tilakglobalschool.com",
    siteName:    "Tilak Global School",
    title:       "Tilak Global School | CBSE School Jaipur",
    description: "English-medium CBSE school in Jaipur — Play Group to Class XII. Admissions open for 2026-27.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Tilak Global School | CBSE School Jaipur",
    description: "English-medium CBSE school in Jaipur — Play Group to Class XII.",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
