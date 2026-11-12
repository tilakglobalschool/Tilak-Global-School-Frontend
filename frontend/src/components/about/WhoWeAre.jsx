import Image from "next/image";
import Link from "next/link";
import { whoWeAre as d } from "@/data/about";

/**
 * WhoWeAre — server component.
 * Props:
 *   content — CMS content blocks from /api/content/about (optional)
 */
export default function WhoWeAre({ content = {} }) {
  // CMS overrides for key text blocks
  const cmsBody    = content?.["about.intro.body"]?.value || null;

  // Split CMS body into paragraphs (separated by double newline or \n)
  const cmsParagraphs = cmsBody
    ? cmsBody.split(/\n+/).map(p => p.trim()).filter(Boolean)
    : null;
  return (
    <section
      className="relative overflow-hidden bg-white pt-10 md:pt-16 pb-16 md:pb-24"
    >

      {/* ── Decorative dot pattern ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,61,145,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Soft blurred glow — top-right ── */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem]
                   bg-[#0B3D91]/5 blur-3xl pointer-events-none"
      />

      {/* ════════════════════════════════════════════════════════════════
          BLOCK A — INTRO (eyebrow / heading / lead | paragraphs / quote / CTA)
      ════════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8
                   grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
      >

        {/* ── Left: eyebrow + heading + red rule + lead ── */}
        <div className="lg:col-span-5">

          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2
                       text-[11px] md:text-xs font-semibold uppercase
                       tracking-[0.2em] text-red-600"
          >
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {d.eyebrow}
          </span>

          {/* Heading */}
          <h2
            className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]
                       font-serif font-bold text-[#0B3D91] leading-tight"
          >
            {d.heading}
          </h2>

          {/* Red rule */}
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mt-4"
          />

          {/* Lead paragraph */}
          <p className="mt-5 text-base md:text-xl text-gray-800 font-medium leading-relaxed">
            {d.lead}
          </p>

        </div>

        {/* ── Right: paragraphs + pull-quote + CTA ── */}
        <div
          className="lg:col-span-7 lg:pl-10
                     lg:border-l border-[#0B3D91]/15"
        >

          {/* Two-column editorial text on xl */}
          <div
            className="columns-1 xl:columns-2 gap-10
                       text-sm md:text-base text-gray-700 leading-relaxed
                       space-y-4 [&>p]:break-inside-avoid"
          >
            {(cmsParagraphs || d.paragraphs).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Pull-quote */}
          <blockquote
            className="mt-6 bg-[#EEF3FB] border-l-4 border-red-600
                       px-5 py-4 font-serif italic text-sm md:text-lg text-[#0B3D91]"
          >
            {d.quote}
          </blockquote>

          {/* CTA */}
          <Link
            href={d.cta.href}
            className="group inline-flex items-center mt-6
                       bg-[#0B3D91] hover:bg-red-600 text-white font-semibold
                       text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3
                       shadow-md hover:-translate-y-0.5 transition-all duration-300"
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
          BLOCK B — PHOTO + PILLARS + FACTS
      ════════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8
                   mt-12 md:mt-16
                   grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
      >

        {/* ── Left: wide photo ── */}
        <div className="lg:col-span-6">
          <div
            className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full
                       min-h-[280px] overflow-hidden shadow-2xl group"
          >
            <Image
              src={d.image.src}
              alt={d.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out
                         group-hover:scale-105"
            />

            {/* Bottom gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2
                         bg-gradient-to-t from-[#0B3D91]/85 to-transparent
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

            {/* Red top-left corner accent — horizontal */}
            <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600" />
            {/* Red top-left corner accent — vertical */}
            <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600" />

            {/* Caption — bottom-left */}
            <p
              className="absolute bottom-4 left-4
                         text-white text-[11px] md:text-xs uppercase tracking-wider
                         border-l-2 border-red-500 pl-2"
            >
              {d.image.caption}
            </p>
          </div>
        </div>

        {/* ── Right: pillars + facts strip ── */}
        <div className="lg:col-span-6 flex flex-col">

          {/* Numbered pillars */}
          <div
            className="flex-1 grid grid-rows-3 divide-y divide-gray-200
                       border-y border-gray-200"
          >
            {d.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr]
                           gap-4 items-center py-4 md:py-5
                           group hover:bg-[#EEF3FB] transition-colors px-3"
              >
                {/* Number */}
                <span
                  className="text-2xl md:text-3xl font-serif font-bold text-red-600
                             leading-none"
                >
                  {pillar.number}
                </span>

                {/* Title + text */}
                <div>
                  <p className="text-base md:text-lg font-serif font-bold text-[#0B3D91]">
                    {pillar.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mt-0.5 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Facts strip — navy bar */}
          <div
            className="mt-6 bg-[#0B3D91] text-white
                       grid grid-cols-2 sm:grid-cols-4
                       divide-x divide-white/15 border-t-4 border-red-600"
          >
            {d.facts.map((fact) => (
              <div key={fact.label} className="px-3 py-4 text-center">
                <p className="text-sm md:text-lg font-serif font-bold whitespace-nowrap">
                  {fact.value}
                </p>
                <p
                  className="text-[9px] md:text-[10px] uppercase tracking-wide
                             text-blue-200 mt-1"
                >
                  {fact.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
