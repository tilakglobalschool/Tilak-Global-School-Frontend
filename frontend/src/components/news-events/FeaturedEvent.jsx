import Image from "next/image";
import { featuredEvent as d } from "@/data/newsEvents";

/**
 * FeaturedEvent — server component.
 * Full-width cinematic banner for the featured event.
 *
 * Design:
 *   • Image covers the entire banner (fill, object-cover, object-center)
 *   • Multi-stop left-to-right navy gradient keeps left 35-40% readable
 *     while gradually revealing the image toward the right
 *   • No hard vertical boundary between gradient and image
 *   • Sharp corners, border-t-4 red, thin vertical red line on left
 *   • Subtle hover zoom on desktop only
 *   • Mobile: stronger flat overlay for readability
 *
 * Zero rounded-*. Zero literal text. All from data/newsEvents.js.
 */
export default function FeaturedEvent() {
  if (!d) return null;

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Full-width cinematic banner */}
        <div
          className="group relative overflow-hidden
                     min-h-[300px] md:min-h-[380px] lg:min-h-[420px]
                     shadow-xl border-t-4 border-red-600"
        >
          {/* Background image — covers entire banner */}
          <Image
            src={d.image.src}
            alt={d.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center
                       transition-transform duration-[1200ms] ease-out
                       group-hover:scale-105"
            style={{ zIndex: 0 }}
          />

          {/* Multi-stop left-to-right gradient — no hard boundary */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              background:
                "linear-gradient(90deg," +
                "#0B3D91 0%," +
                "rgba(11,61,145,0.98) 25%," +
                "rgba(11,61,145,0.85) 40%," +
                "rgba(11,61,145,0.55) 58%," +
                "rgba(11,61,145,0.25) 75%," +
                "rgba(11,61,145,0.05) 100%)",
            }}
          />

          {/* Mobile: stronger flat overlay for readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 md:hidden pointer-events-none"
            style={{ zIndex: 2, background: "rgba(11,61,145,0.82)" }}
          />

          {/* Subtle bottom gradient for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{
              zIndex: 2,
              background: "linear-gradient(to top, rgba(6,31,77,0.60) 0%, transparent 100%)",
            }}
          />

          {/* Thin vertical red accent line — left edge */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"
            style={{ zIndex: 3 }}
          />

          {/* Short horizontal red accent — top-left corner */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-16 h-1 bg-red-600"
            style={{ zIndex: 4 }}
          />

          {/* Content — z-20 above all overlays */}
          <div
            className="relative z-20 max-w-xl lg:max-w-2xl
                       px-5 py-8 md:px-10 md:py-14 lg:pl-14
                       min-h-[300px] md:min-h-[380px] lg:min-h-[420px]
                       flex flex-col justify-center"
          >
            {/* Featured label ribbon */}
            <span
              className="inline-flex items-center gap-2
                         bg-red-600 text-white
                         text-[10px] md:text-xs font-semibold uppercase tracking-wider
                         px-3 py-1.5 border-l-4 border-white/70
                         self-start"
            >
              {d.label}
            </span>

            {/* Title */}
            <h2
              className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                         font-serif font-bold text-white leading-tight"
            >
              {d.title}
            </h2>

            {/* Red rule */}
            <div aria-hidden="true" className="w-12 h-[2px] bg-red-600 mt-4" />

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm md:text-lg text-blue-100 leading-relaxed max-w-lg">
              {d.description}
            </p>

            {/* Date */}
            <p className="mt-3 text-[11px] md:text-xs uppercase tracking-wider text-red-300">
              {d.date}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
