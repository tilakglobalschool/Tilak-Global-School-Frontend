import Image from "next/image";
import Link  from "next/link";
import { getUploadUrl } from "@/lib/uploadUrl";
import { featuredEvent as d } from "@/data/newsEvents";

/**
 * FeaturedEvent — server component.
 * Accepts apiPost from the news-events page. Falls back to static data
 * when no published featured post exists in the database.
 *
 * Props:
 *   apiPost — NewsPost document from the API (may be null)
 */
export default function FeaturedEvent({ apiPost = null }) {
  // Prefer live API post; fall back to static placeholder
  const title       = apiPost?.title       || d.title;
  const description = apiPost?.summary     || d.description;
  const date        = apiPost
    ? new Date(apiPost.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : d.date;
  const imageSrc    = apiPost?.imageUrl
    ? getUploadUrl(apiPost.imageUrl)
    : d.image.src;
  const imageAlt    = apiPost?.title ? `${apiPost.title} — Tilak Global School` : d.image.alt;
  const href        = apiPost?.slug ? `/news-events/${apiPost.slug}` : null;
  const label       = "Featured Event";

  if (!apiPost && !d) return null;

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Full-width cinematic banner */}
        <div
          className="group relative overflow-hidden
                     min-h-[300px] md:min-h-[380px] lg:min-h-[420px]
                     shadow-xl border-t-4 border-red-600"
        >
          {/* Background image */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center
                       transition-transform duration-[1200ms] ease-out
                       group-hover:scale-105"
            style={{ zIndex: 0 }}
          />

          {/* Left-to-right gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              background:
                "linear-gradient(90deg," +
                "#0B3D91 0%,rgba(11,61,145,0.98) 25%,rgba(11,61,145,0.85) 40%," +
                "rgba(11,61,145,0.55) 58%,rgba(11,61,145,0.25) 75%,rgba(11,61,145,0.05) 100%)",
            }}
          />

          {/* Mobile overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 md:hidden pointer-events-none"
            style={{ zIndex: 2, background: "rgba(11,61,145,0.82)" }}
          />

          {/* Bottom depth gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ zIndex: 2, background: "linear-gradient(to top, rgba(6,31,77,0.60) 0%, transparent 100%)" }}
          />

          {/* Left accent */}
          <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" style={{ zIndex: 3 }} />
          <div aria-hidden="true" className="absolute top-0 left-0 w-16 h-1 bg-red-600" style={{ zIndex: 4 }} />

          {/* Content */}
          <div
            className="relative z-20 max-w-xl lg:max-w-2xl
                       px-5 py-8 md:px-10 md:py-14 lg:pl-14
                       min-h-[300px] md:min-h-[380px] lg:min-h-[420px]
                       flex flex-col justify-center"
          >
            <span
              className="inline-flex items-center gap-2 bg-red-600 text-white
                         text-[10px] md:text-xs font-semibold uppercase tracking-wider
                         px-3 py-1.5 border-l-4 border-white/70 self-start"
            >
              {label}
            </span>

            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {title}
            </h2>

            <div aria-hidden="true" className="w-12 h-[2px] bg-red-600 mt-4" />

            <p className="mt-4 text-xs sm:text-sm md:text-lg text-blue-100 leading-relaxed max-w-lg">
              {description}
            </p>

            <p className="mt-3 text-[11px] md:text-xs uppercase tracking-wider text-red-300">
              {date}
            </p>

            {href && (
              <Link href={href}
                className="mt-6 self-start inline-flex items-center gap-2
                           bg-white text-[#0B3D91] text-xs font-semibold px-5 py-2.5
                           hover:bg-red-600 hover:text-white transition-colors duration-200">
                Read More →
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
