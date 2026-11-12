import Image from "next/image";
import Link from "next/link";
import { welcome as d } from "@/data/home";

/**
 * WelcomeSection — server component.
 * Props: content — from /api/content/home (optional, falls back to static)
 */
export default function WelcomeSection({ content }) {
  // Dynamic overrides from CMS
  const label   = content?.["home.welcome.title"]?.value || d.label;
  const heading = content?.["home.welcome.title"]?.value || d.heading;
  const body    = content?.["home.welcome.body"]?.value  || null;
  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 pb-10 md:pb-14">
      <div
        className="max-w-7xl mx-auto px-4 md:px-8
                   grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >

        {/* ════════════════════════════════════════════════════════════════
            LEFT COLUMN — text content
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 flex flex-col">

          {/* Eyebrow label */}
          <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {label}
          </span>

          {/* Heading */}
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-bold text-[#0B3D91] leading-tight">
            {heading}
          </h2>

          {/* Paragraphs — dynamic body OR static paragraphs */}
          <div className="mt-6 border-l-4 border-[#0B3D91]/80 pl-5 md:pl-6 space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
            {body ? (
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">{body}</p>
            ) : (
              d.paragraphs.map((para, i) => (
                <p key={i} className={i === 0 ? "text-base md:text-lg text-gray-800 leading-relaxed" : ""}>{para}</p>
              ))
            )}
          </div>

          {/* Highlights row */}
          <div
            className="mt-8 grid grid-cols-3 divide-x divide-gray-200
                       border-y border-gray-200 py-4"
          >
            {d.highlights.map((h, i) => (
              <div
                key={h.label}
                className={`${i === 0 ? "pl-0 pr-3" : "px-3"}`}
              >
                <p className="text-base md:text-xl font-serif font-bold
                              text-[#0B3D91] whitespace-nowrap">
                  {h.value}
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-wide
                              text-gray-500 mt-1">
                  {h.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA — square corners */}
          <div className="mt-8">
            <Link
              href={d.cta.href}
              className="group inline-flex items-center
                         bg-[#0B3D91] hover:bg-red-600 text-white font-semibold
                         text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3
                         shadow-md hover:-translate-y-0.5
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

        </div>

        {/* ════════════════════════════════════════════════════════════════
            RIGHT COLUMN — layered image composition
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">

          {/*
            Outer wrapper — coordinate space for all decorative layers.
            Mobile: max-w-sm centred, smaller offsets.
            Desktop: max-w-lg, pushed to the right edge of the column.
            pb-4/pb-6 reserves space for the bottom-right red frame offset.
          */}
          <div
            className="relative w-full max-w-sm lg:max-w-lg mx-auto lg:ml-auto
                       mb-6 md:mb-8"
          >

            {/* ── Decorative circle — large soft navy, top-right ── */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -right-3 md:-top-14 md:-right-14
                         w-32 h-32 md:w-64 md:h-64
                         rounded-full bg-[#0B3D91]/10 z-0 pointer-events-none"
            />

            {/* ── Decorative circle — smaller filled red, bottom-left ── */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 md:-bottom-10 md:-left-10
                         w-20 h-20 md:w-36 md:h-36
                         rounded-full bg-red-600/15 z-0 pointer-events-none"
            />

            {/* ── Decorative circle — ring only, mid-left ── */}
            <div
              aria-hidden="true"
              className="absolute top-1/3 -left-6
                         w-20 h-20 md:w-24 md:h-24
                         rounded-full border-2 border-[#0B3D91]/20
                         z-0 pointer-events-none"
            />

            {/* ── Dot-pattern patch — top-left ── */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 w-28 h-28 z-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(11,61,145,0.25) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* ── Red outline frame — square, offset bottom-right ── */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6
                         w-full h-full border-2 border-red-600 z-0"
            />

            {/* ── Main photo block — sharp corners, no rounded-* ── */}
            <div
              className="relative z-10 w-full aspect-[4/3] md:aspect-[5/4]
                         overflow-hidden shadow-2xl group"
            >
              <Image
                src={d.image.src}
                alt={d.image.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out
                           group-hover:scale-105"
              />

              {/* Bottom gradient — legibility for caption */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2
                           bg-gradient-to-t from-[#0B3D91]/80 to-transparent
                           pointer-events-none"
              />

              {/* Red hover tint — desktop only */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-red-600 opacity-0
                           md:group-hover:opacity-15
                           transition-opacity duration-500
                           mix-blend-multiply pointer-events-none"
              />

              {/* Red top-left corner accent — horizontal bar */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 w-10 h-1 bg-red-600"
              />
              {/* Red top-left corner accent — vertical bar */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 w-1 h-10 bg-red-600"
              />

              {/* Caption — pinned bottom-left */}
              <p
                className="absolute bottom-4 left-4
                           text-white text-[11px] md:text-xs uppercase tracking-wider
                           border-l-2 border-red-500 pl-2"
              >
                {d.image.caption}
              </p>

            </div>{/* end photo block */}
          </div>{/* end outer wrapper */}
        </div>{/* end right column */}

      </div>
    </section>
  );
}
