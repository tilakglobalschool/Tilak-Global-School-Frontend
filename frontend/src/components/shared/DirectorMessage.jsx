import Image from "next/image";
import Link from "next/link";
import { resolveImage, resolveAlt } from "@/lib/sectionImages";

export default function DirectorMessage({ data, bg = "bg-[#EAF0FB]", sectionImages = {} }) {
  // Portrait: prefer admin-assigned image, then data.image.src
  const portraitSrc = resolveImage(sectionImages, 'directorMessage', 'portrait', data.image.src);
  const portraitAlt = resolveAlt(sectionImages,   'directorMessage', 'portrait', data.image.alt);
  return (
    <section
      className={`relative overflow-hidden ${bg} py-16 md:py-24`}
      style={{
        backgroundImage:
          "radial-gradient(rgba(11,61,145,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── Decorative blurred glows (purely visual, no content) ── */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-80 h-80
                   bg-[#0B3D91]/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -right-20 w-96 h-96
                   bg-red-600/5 blur-3xl pointer-events-none"
      />

      {/* ── Main grid ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8
                   grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >

        {/* ══════════════════════════════════════════════════════════════
            LEFT COLUMN — layered portrait composition
        ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">

          {/*
            Outer wrapper — coordinate space for all offset layers.
            Width steps up from mobile → tablet → full column on desktop.
            pb-3/pb-6 reserves space so the red outline frame never clips.
          */}
          <div
            className="relative w-56 sm:w-64 md:w-80 lg:w-full max-w-sm mx-auto
                       pb-3 md:pb-6"
          >

            {/* Faint large serif opening-quote mark — behind everything */}
            <span
              aria-hidden="true"
              className="absolute -top-10 -right-6
                         text-[8rem] md:text-[10rem] font-serif
                         text-[#0B3D91]/[0.08] leading-none
                         select-none pointer-events-none z-0"
            >
              &ldquo;
            </span>

            {/* Backing plate — solid navy, offset top-left */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 md:-top-6 md:-left-6
                         w-full h-full bg-[#0B3D91] z-0"
            />

            {/* Outline frame — red border, offset bottom-right */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6
                         w-full h-full border-2 border-red-600 z-0"
            />

            {/* Portrait block */}
            <div
              className="relative z-10 w-full aspect-[4/5]
                         overflow-hidden shadow-2xl group"
            >
              <Image
                src={portraitSrc}
                alt={portraitAlt}
                fill
                sizes="(max-width: 1024px) 70vw, 35vw"
                className="object-cover object-top
                           transition-transform duration-700 group-hover:scale-105"
              />

              {/* Bottom gradient — contrast for the name block */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2
                           bg-gradient-to-t from-[#0B3D91]/85 to-transparent
                           pointer-events-none"
              />

              {/* Red hover tint — disabled on touch via md: prefix */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-red-600 opacity-0
                           md:group-hover:opacity-15
                           transition-opacity duration-500
                           mix-blend-multiply pointer-events-none"
              />

              {/* Name block — pinned bottom-left inside photo */}
              <div className="absolute bottom-4 left-4 border-l-2 border-red-500 pl-2">
                <p className="text-sm md:text-base font-serif font-bold text-white">
                  {data.name}
                </p>
                <p
                  className="text-[10px] md:text-xs uppercase tracking-wider
                             text-red-200 mt-0.5"
                >
                  {data.image.caption}
                </p>
              </div>

            </div>{/* end portrait block */}
          </div>{/* end outer wrapper */}
        </div>{/* end left column */}

        {/* ══════════════════════════════════════════════════════════════
            RIGHT COLUMN — white content card
        ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7">

          {/* White card with sharp corners and brand outline */}
          <div
            className="relative bg-white border border-[#0B3D91]/15
                       shadow-lg p-5 sm:p-8 md:p-10"
          >
            {/* Red top rule */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 w-24 h-1 bg-red-600"
            />

            {/* Thin inner offset outline */}
            <div
              aria-hidden="true"
              className="absolute inset-2 border border-[#0B3D91]/10
                         pointer-events-none"
            />

            {/* Eyebrow label */}
            <span
              className="inline-flex items-center gap-2
                         text-[11px] md:text-xs font-semibold uppercase
                         tracking-[0.2em] text-red-600"
            >
              <span
                aria-hidden="true"
                className="w-8 h-[2px] bg-red-600 shrink-0"
              />
              {data.heading}
            </span>

            {/* Quote */}
            <blockquote
              className="mt-5 font-serif italic
                         text-base sm:text-lg md:text-2xl
                         text-[#0B3D91] leading-relaxed"
            >
              &ldquo;{data.quote}&rdquo;
            </blockquote>

            {/* Disclaimer note */}
            <span
              className="mt-5 inline-block
                         text-[10px] md:text-[11px] uppercase tracking-wider
                         text-red-700 border-l-2 border-red-600 pl-2"
            >
              {data.note}
            </span>

            {/* Signature row */}
            <div
              className="mt-6 pt-5 border-t border-gray-200
                         flex items-center gap-4"
            >
              <span
                aria-hidden="true"
                className="w-10 h-[2px] bg-[#0B3D91] shrink-0"
              />
              <div>
                <p className="text-sm md:text-base font-bold text-[#0B3D91]">
                  {data.name}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {data.designation}
                </p>
              </div>
            </div>

            {/* CTA — only when data.cta is truthy */}
            {data.cta && (
              <Link
                href={data.cta.href}
                className="group inline-flex items-center mt-6
                           bg-[#0B3D91] hover:bg-red-600
                           text-white font-semibold
                           text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3
                           shadow-md hover:-translate-y-0.5
                           transition-all duration-300"
              >
                {data.cta.label}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}

          </div>{/* end white card */}
        </div>{/* end right column */}

      </div>{/* end main grid */}
    </section>
  );
}
