import Link from "next/link";
import NewsAccordion from "@/components/home/NewsAccordion";
import { newsEvents as staticNews } from "@/data/newsEvents";
import { galleryPreview as staticGallery } from "@/data/gallery";
import Image from "next/image";

/**
 * NewsGallerySection — server component.
 * Props:
 *   news    — array from /api/news  (optional, falls back to static)
 *   gallery — array from /api/gallery (optional, falls back to static)
 */
export default function NewsGallerySection({ news = [], gallery = [] }) {
  // Build accordion items from API news or static fallback
  const newsItems = news.length > 0
    ? news.map((post) => {
        const d = post.date ? new Date(post.date) : null;
        return {
          id:      post._id,
          day:     d ? String(d.getDate()).padStart(2, "0") : "--",
          month:   d ? d.toLocaleString("en-IN", { month: "short" }).toUpperCase() : "---",
          title:   post.title,
          summary: post.summary || post.title,
          content: post.body   || post.summary || "",
          type:    post.category || "News",
          slug:    post.slug,
        };
      })
    : staticNews.items;

  // Build gallery items from API or static fallback
  const galleryItems = gallery.length > 0
    ? gallery.slice(0, 4).map((img, i) => ({
        id:    img._id,
        title: img.caption || img.category || `Photo ${i + 1}`,
        image: {
          src: img.imageUrl?.startsWith("http")
            ? img.imageUrl
            : `${process.env.API_URL?.replace("/api", "") || "https://tilak-global-school-backend-0xwt.onrender.com"}${img.imageUrl}`,
          alt: img.caption || img.category || "Gallery photo",
        },
      }))
    : staticGallery.items;

  return (
    <section
      className="relative overflow-hidden w-full bg-[#EEF3FB] py-16 md:py-24"
      style={{ backgroundImage: "radial-gradient(rgba(11,61,145,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        {/* ── LEFT: News & Events ── */}
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-red-600">
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {staticNews.heading}
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-serif font-bold text-[#0B3D91]">
            {staticNews.heading}
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-3 mb-6" />

          {newsItems.length > 0
            ? <NewsAccordion items={newsItems} />
            : <p className="text-sm text-gray-500 italic">No news published yet.</p>
          }

          <span className="inline-block mt-5 text-[10px] uppercase tracking-wider text-red-700 border-l-2 border-red-600 pl-2">
            {staticNews.note}
          </span>
          <div className="mt-4">
            <Link href={staticNews.viewAll.href}
              className="group inline-flex items-center text-[11px] uppercase tracking-wider font-semibold text-[#0B3D91] hover:text-red-600 border-l-2 border-[#0B3D91] hover:border-red-600 pl-2 transition-colors duration-200">
              {staticNews.viewAll.label}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Gallery Preview ── */}
        <div className="self-start lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-red-600">
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {staticGallery.heading}
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-serif font-bold text-[#0B3D91]">
            {staticGallery.heading}
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-3 mb-6" />

          {/* Gallery grid — dynamic or static */}
          <DynamicGalleryGrid items={galleryItems} viewAllHref={staticGallery.viewAll.href} />

          <div className="mt-8">
            <Link href={staticGallery.viewAll.href}
              className="group inline-flex items-center border-2 border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white font-semibold text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3 transition-all duration-300">
              {staticGallery.viewAll.label}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Gallery tile grid (server) ── */
function DynamicGalleryGrid({ items, viewAllHref }) {
  return (
    <div className="relative mt-4 mb-6 pt-3 pl-3 pb-3 md:pt-4 md:pl-4 md:pb-4 pr-3 md:pr-4">
      {/* Backing plate */}
      <div aria-hidden="true" className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full bg-[#0B3D91] z-0" />
      {/* Outline frame */}
      <div aria-hidden="true" className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border-2 border-red-600 z-0" />

      <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4">
        {items.slice(0, 4).map((item, i) => (
          <Link key={item.id || i} href={viewAllHref}
            className="group relative block aspect-square overflow-hidden shadow-lg border border-[#0B3D91]/10"
            aria-label={item.title}>
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B3D91]/85 via-[#0B3D91]/20 to-transparent pointer-events-none" />
            <div aria-hidden="true" className="absolute inset-0 bg-red-600 opacity-0 md:group-hover:opacity-20 transition-opacity duration-500 mix-blend-multiply pointer-events-none" />
            <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600" />
            <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600" />
            <span aria-hidden="true" className="absolute top-3 right-4 text-3xl md:text-4xl font-serif font-bold text-white/15 leading-none select-none pointer-events-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="absolute bottom-3 left-3 text-white text-[10px] md:text-xs uppercase tracking-wider border-l-2 border-red-500 pl-2">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
