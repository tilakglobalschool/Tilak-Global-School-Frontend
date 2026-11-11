import Image from "next/image";
import { facultyPage as d } from "@/data/academics";

/**
 * FacultyIntroduction — server component.
 * Two-column editorial layout: text left, school image right.
 * All content from data/academics.js → facultyPage.
 * Zero rounded-*. Zero literal text.
 */
export default function FacultyIntroduction() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Left: text content ── */}
          <div className="lg:col-span-6 xl:col-span-7">

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {d.introHeading}
            </span>

            {/* Heading */}
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0B3D91] leading-tight">
              {d.heading}
            </h2>

            {/* Red rule */}
            <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-4" />

            {/* Lead paragraph */}
            <p className="mt-5 text-base md:text-lg text-gray-800 font-medium leading-relaxed">
              {d.introLead}
            </p>

            {/* Remaining paragraphs */}
            <div className="mt-4 space-y-4 border-l-4 border-[#0B3D91]/20 pl-5 text-sm md:text-base text-gray-700 leading-relaxed">
              {d.introParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Note */}
            <p className="mt-6 text-[11px] text-red-700 border-l-2 border-red-600 pl-3">
              {d.introNote}
            </p>
          </div>

          {/* ── Right: image ── */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative w-full overflow-hidden shadow-xl group" style={{ aspectRatio: "4/3" }}>
              <Image
                src={d.introImage.src}
                alt={d.introImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle bottom gradient */}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B3D91]/40 via-transparent to-transparent pointer-events-none" />
              {/* Red top-left corner accent */}
              <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600 z-10" />
              <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600 z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
