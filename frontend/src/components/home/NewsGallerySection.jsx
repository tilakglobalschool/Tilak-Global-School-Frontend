import Link from "next/link";
import NewsAccordion from "@/components/home/NewsAccordion";
import GalleryPreview from "@/components/home/GalleryPreview";
import { newsEvents as staticNews } from "@/data/newsEvents";
import { galleryPreview as staticGallery } from "@/data/gallery";

/**
 * NewsGallerySection — server component.
 * Tinted background, serif headings, eyebrow labels, dot pattern texture.
 * No rounded-* anywhere in this component.
 *
 * Props:
 *   newsItems    — live news items from API (optional; falls back to static)
 *   galleryItems — live gallery items from API (optional; falls back to static)
 *
 * Zero literal text — all strings from data/newsEvents.js and data/gallery.js.
 */
export default function NewsGallerySection({ newsItems, galleryItems }) {
  const newsEvents    = { ...staticNews,    items: newsItems    || staticNews.items    };
  const galleryPreview = { ...staticGallery, items: galleryItems || staticGallery.items };
  return (
    <section
      className="relative overflow-hidden w-full bg-[#EEF3FB] py-16 md:py-24"
      style={{
        backgroundImage:
          "radial-gradient(rgba(11,61,145,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-4 md:px-8
                   grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
      >

        {/* ════════════════════════════════════════════════════════════════
            LEFT — News & Events
        ════════════════════════════════════════════════════════════════ */}
        <div>
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2
                       text-[11px] uppercase tracking-[0.2em]
                       font-semibold text-red-600"
          >
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {newsEvents.heading}
          </span>

          {/* Heading */}
          <h2 className="mt-3 text-2xl md:text-3xl font-serif font-bold text-[#0B3D91]">
            {newsEvents.heading}
          </h2>

          {/* Red rule */}
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mt-3 mb-6"
          />

          <NewsAccordion items={newsEvents.items} />

          {/* Note — minimal caption with left red border */}
          <span
            className="inline-block mt-5
                       text-[10px] uppercase tracking-wider text-red-700
                       border-l-2 border-red-600 pl-2"
          >
            {newsEvents.note}
          </span>

          {/* View all link — uppercase caption style */}
          <div className="mt-4">
            <Link
              href={newsEvents.viewAll.href}
              className="group inline-flex items-center
                         text-[11px] uppercase tracking-wider font-semibold
                         text-[#0B3D91] hover:text-red-600
                         border-l-2 border-[#0B3D91] hover:border-red-600
                         pl-2 transition-colors duration-200"
            >
              {newsEvents.viewAll.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1.5 w-3 h-3 transition-transform duration-300
                           group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RIGHT — Gallery Preview
        ════════════════════════════════════════════════════════════════ */}
        <div className="self-start lg:sticky lg:top-28">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2
                       text-[11px] uppercase tracking-[0.2em]
                       font-semibold text-red-600"
          >
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {galleryPreview.heading}
          </span>

          {/* Heading */}
          <h2 className="mt-3 text-2xl md:text-3xl font-serif font-bold text-[#0B3D91]">
            {galleryPreview.heading}
          </h2>

          {/* Red rule */}
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mt-3 mb-6"
          />

          <GalleryPreview items={galleryPreview.items} />

          {/* View full gallery — square outline button */}
          <div className="mt-8">
            <Link
              href={galleryPreview.viewAll.href}
              className="group inline-flex items-center
                         border-2 border-[#0B3D91] text-[#0B3D91]
                         hover:bg-[#0B3D91] hover:text-white
                         font-semibold text-xs px-5 py-2.5
                         md:text-sm md:px-7 md:py-3
                         transition-all duration-300"
            >
              {galleryPreview.viewAll.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4
                           transition-transform duration-300
                           group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
