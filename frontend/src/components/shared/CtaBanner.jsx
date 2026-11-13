import Image from "next/image";
import Link from "next/link";
import { ctaBanner as defaultData } from "@/data/home";

/**
 * CtaBanner — shared server component.
 * Used on the homepage (default ctaBanner data) and the About page
 * (aboutCta data from data/about.js).
 *
 * Props:
 *   data?  — CTA data object; defaults to ctaBanner from data/home.js
 *            Shape: { eyebrow, heading, subtext, sessionYear, points,
 *                     primary: { label, href },
 *                     secondary: { label, href },
 *                     image: { src, alt } }
 *
 * Design rules:
 *   • Zero rounded-* anywhere.
 *   • Zero literal text — all strings from data prop.
 *   • Layered red outline frame (top-left) + navy backing plate (bottom-right).
 *   • Right-half background image at opacity-20, lg+ only.
 */
export default function CtaBanner({ data = defaultData, settings }) {
  // Override session year from settings if available
  const d = settings?.admissionSession
    ? {
        ...defaultData,
        ...data,
        eyebrow: settings.admissionBannerText
          ? `Admissions ${settings.admissionSession}`
          : data.eyebrow || defaultData.eyebrow,
        subtext: settings.admissionBannerText
          ? `${settings.admissionBannerText} · Session ${settings.admissionSession}`
          : data.subtext || defaultData.subtext,
      }
    : (data || defaultData);

  return (
    <section className="relative overflow-hidden bg-white
                        pt-6 md:pt-10 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/*
          Composition wrapper — padding reserves visual space for the
          absolute plates/frames that extend beyond the card edges.
        */}
        <div className="relative pt-3 pl-3 pb-3 pr-3
                        md:pt-4 md:pl-4 md:pb-4 md:pr-4">

          {/* ── Red outline frame — offset top-left ── */}
          <div
            aria-hidden="true"
            className="absolute -top-3 -left-3 md:-top-4 md:-left-4
                       w-full h-full border-2 border-red-600 z-0"
          />

          {/* ── Navy backing plate — offset bottom-right ── */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4
                       w-full h-full bg-[#0B3D91]/15 z-0"
          />

          {/* ── Main banner card ── */}
          <div
            className="relative z-10 overflow-hidden bg-[#0B3D91] shadow-2xl
                       border-t-4 border-red-600
                       px-5 py-8 sm:px-10 md:px-14 md:py-14
                       grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12
                       items-center"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >

            {/* ── Right half background image — lg+ only ── */}
            {d.image && (
              <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 w-1/2 hidden lg:block"
              >
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  fill
                  sizes="50vw"
                  className="object-cover opacity-20"
                />
                <div
                  className="absolute inset-0
                             bg-gradient-to-r from-[#0B3D91] to-transparent"
                />
              </div>
            )}

            {/* ── Red top-left corner accent — horizontal ── */}
            <div aria-hidden="true" className="absolute top-0 left-0 w-12 h-1 bg-red-600" />
            {/* ── Red top-left corner accent — vertical ── */}
            <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-12 bg-red-600" />

            {/* ── Faint serif year watermark — bottom-right (hidden when empty) ── */}
            {d.sessionYear && d.sessionYear.trim() && (
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-4
                           text-[6rem] md:text-[8rem] font-serif font-bold
                           text-white/5 leading-none select-none pointer-events-none"
              >
                {d.sessionYear}
              </span>
            )}

            {/* ── Text block ── */}
            <div className="relative lg:col-span-7">

              {/* Eyebrow */}
              <span
                className="inline-flex items-center gap-2
                           text-[11px] md:text-xs font-semibold uppercase
                           tracking-[0.2em] text-red-300"
              >
                <span aria-hidden="true" className="w-8 h-[2px] bg-red-500 shrink-0" />
                {d.eyebrow}
              </span>

              {/* Heading */}
              <h2
                className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]
                           font-serif font-bold text-white leading-tight"
              >
                {d.heading}
              </h2>

              {/* Subtext */}
              <p
                className="mt-3 text-xs sm:text-sm md:text-base text-blue-100
                           border-l-2 border-red-500/70 pl-4"
              >
                {d.subtext}
              </p>

              {/* Points row */}
              {d.points && d.points.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Key facts">
                  {d.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2
                                 text-[10px] md:text-xs uppercase tracking-wider
                                 text-blue-100"
                    >
                      <span aria-hidden="true" className="w-1.5 h-1.5 bg-red-500 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

            </div>

            {/* ── Action block ── */}
            <div
              className="relative lg:col-span-5
                         flex flex-row flex-wrap lg:justify-end
                         gap-3 md:gap-4"
            >
              {/* Primary — solid red, square */}
              <Link
                href={d.primary.href}
                className="group inline-flex items-center
                           bg-red-600 hover:bg-red-700 text-white font-semibold
                           text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3.5
                           shadow-lg hover:-translate-y-0.5
                           transition-all duration-300 whitespace-nowrap"
              >
                {d.primary.label}
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

              {/* Secondary — white outline, square */}
              <Link
                href={d.secondary.href}
                className="inline-flex items-center
                           border-2 border-white/80 text-white
                           hover:bg-white hover:text-[#0B3D91] font-semibold
                           text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3.5
                           transition-all duration-300 whitespace-nowrap"
              >
                {d.secondary.label}
              </Link>

            </div>

          </div>{/* end main banner card */}
        </div>{/* end composition wrapper */}
      </div>
    </section>
  );
}
