import Image from "next/image";
import Link from "next/link";
import { ourJourney as d } from "@/data/about";

/**
 * OurJourney — server component.
 * Two-column editorial layout: text left, layered image composition right.
 * Zero literal text — all content from data/about.js → ourJourney.
 *
 * Design notes:
 *  • Blue backing plate behind photo  (+offset top-left)
 *  • Red outline frame behind photo   (+offset bottom-right)
 *  • NO rounded corners anywhere — photo, plates, frame, badge all sharp.
 *  • Stats badge overlaps photo bottom-right on desktop,
 *    sits below photo as a full-width bar on mobile.
 *  • Faint large serif year watermark floats behind the image column.
 *  • Hover: subtle zoom (scale-105) + red tint on the photo.
 */
export default function OurJourney({ showCta = true }) {
  return (
    <section className="relative bg-white pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8
                      grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

        {/* ════════════════════════════════════════════════════════════════
            LEFT COLUMN — text content
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col">

          {/* Eyebrow label */}
          <span className="inline-flex items-center gap-2
                           text-[11px] md:text-xs font-semibold uppercase
                           tracking-[0.2em] text-red-600">
            <span className="w-8 h-[2px] bg-red-600 shrink-0" aria-hidden="true" />
            {d.label}
          </span>

          {/* Heading */}
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]
                         font-serif font-bold text-[#0B3D91] leading-tight">
            {d.heading}
          </h2>

          {/* Paragraphs with editorial left rule */}
          <div className="mt-6 border-l-4 border-[#0B3D91]/80 pl-5 md:pl-6
                          space-y-4 md:space-y-5
                          text-sm md:text-base text-gray-700 leading-relaxed">
            {d.paragraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-base md:text-lg text-gray-800 leading-relaxed"
                    : ""
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* CTA — hidden when showCta is false (e.g. on the Our School page itself) */}
          {showCta && (
          <div className="mt-8 md:mt-10">
            <Link
              href={d.cta.href}
              className="group inline-flex items-center
                         bg-[#0B3D91] hover:bg-red-600 text-white font-semibold
                         text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3
                         shadow-md hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300"
            >
              {d.cta.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4
                           transition-transform duration-300 group-hover:translate-x-1"
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
          )}

        </div>

        {/* ════════════════════════════════════════════════════════════════
            RIGHT COLUMN — layered image composition
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 xl:col-span-5">

          {/*
            Outer wrapper — provides the coordinate space for all absolutely
            positioned layers. On mobile: max-w-sm, smaller offsets.
            On desktop: full column width, standard offsets.
            pb-10 on mobile leaves room for the stats bar below.
            lg:pb-10 leaves room for the overlapping stats badge.
          */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-none mb-8 md:mb-10">

            {/* ── Faint year watermark — behind everything ── */}
            <span
              aria-hidden="true"
              className="absolute -top-10 right-0
                         text-[7rem] md:text-[9rem] font-serif font-bold
                         text-[#0B3D91]/5 leading-none
                         select-none pointer-events-none z-0"
            >
              {d.stats[0].value}
            </span>

            {/* ── Backing plate: solid navy, offset top-left ── */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 md:-top-6 md:-left-6
                         w-full h-full bg-[#0B3D91] z-0"
            />

            {/* ── Outline frame: red border, offset bottom-right ── */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6
                         w-full h-full border-2 border-red-600 z-0"
            />

            {/* ── Main photo block ── */}
            <div className="relative z-10 w-full aspect-square md:aspect-[4/5]
                            overflow-hidden shadow-2xl group">

              <Image
                src={d.image.src}
                alt={d.image.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out
                           group-hover:scale-105"
              />

              {/* Bottom gradient — creates contrast for caption text */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2
                           bg-gradient-to-t from-[#0B3D91]/80 to-transparent
                           pointer-events-none"
              />

              {/* Red hover tint */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-red-600 opacity-0
                           group-hover:opacity-15 transition-opacity duration-500
                           mix-blend-multiply pointer-events-none"
              />

              {/* Caption — pinned bottom-left inside photo */}
              <p className="absolute bottom-4 left-4
                            text-white text-[11px] md:text-xs uppercase tracking-wider
                            border-l-2 border-red-500 pl-2">
                {d.image.caption}
              </p>

            </div>{/* end photo block */}

            {/* ── Stats badge ──
                Desktop: absolute, overlaps photo bottom-right edge (z-20).
                Mobile: static, sits in normal flow below photo, full-width.
                Controlled by hidden/block utilities at the lg breakpoint.
            ── */}

            {/* DESKTOP badge — absolutely positioned */}
            <div
              className="hidden lg:grid
                         absolute z-20 -bottom-6 -right-8
                         bg-white shadow-xl
                         grid-cols-3 divide-x divide-gray-200
                         border-t-4 border-red-600"
              aria-label="School at a glance"
            >
              {d.stats.map((stat) => (
                <div key={stat.label} className="px-3 md:px-5 py-3 md:py-4 text-center">
                  <p className="text-sm md:text-lg font-bold text-[#0B3D91] whitespace-nowrap">
                    {stat.value}
                  </p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-wide text-gray-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* MOBILE stats bar — static, sits below the photo in flow */}
            <div
              className="lg:hidden mt-4 w-full
                         grid grid-cols-3 divide-x divide-gray-200
                         bg-white shadow-md border-t-4 border-red-600"
              aria-label="School at a glance"
            >
              {d.stats.map((stat) => (
                <div key={stat.label} className="px-3 py-3 text-center">
                  <p className="text-sm font-bold text-[#0B3D91] whitespace-nowrap">
                    {stat.value}
                  </p>
                  <p className="text-[9px] uppercase tracking-wide text-gray-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>{/* end outer wrapper */}
        </div>{/* end right column */}

      </div>
    </section>
  );
}
