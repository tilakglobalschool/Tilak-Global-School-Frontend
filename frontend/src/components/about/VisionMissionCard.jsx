import Image from "next/image";
import Link from "next/link";

/**
 * VisionMissionCard — server component.
 * Split card: shorter image strip on top, formatted body below.
 * The entire card is wrapped in next/link — clicking anywhere navigates.
 *
 * Props:
 *   card — { id, number, eyebrow, title, description, tag, linkLabel, href, image }
 *
 * Design rules:
 *   • Zero rounded-* anywhere.
 *   • Zero literal text — every string from props.
 *   • Image strip is h-44 sm:h-48 md:h-52 (shorter than full-height cards).
 *   • Description always visible (no hover reveal needed — body is tall enough).
 *   • Hover: zoom, red tint, red top edge grows, red rule widens, title turns red.
 */
export default function VisionMissionCard({ card }) {
  return (
    <Link
      href={card.href}
      aria-label={card.title}
      className="group relative flex flex-col h-full bg-white
                 border border-[#0B3D91]/15 shadow-md
                 hover:shadow-2xl md:hover:-translate-y-1.5
                 transition-all duration-300 overflow-hidden"
    >

      {/* ── Red top edge — grows from w-0 to w-full on hover ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-1 w-0 bg-red-600 z-20
                   transition-all duration-500 group-hover:w-full"
      />

      {/* ════════════════════════════════════════════════════════
          IMAGE STRIP
      ════════════════════════════════════════════════════════ */}
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden shrink-0">

        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(max-width: 768px) 85vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out
                     group-hover:scale-105`}
          style={{ objectPosition: card.image.objectPosition || "center" }}
        />

        {/* Bottom gradient — transitions into white card body */}
        <div
          aria-hidden="true"
          className="absolute inset-0
                     bg-gradient-to-t from-[#0B3D91]/85 via-[#0B3D91]/20 to-transparent
                     pointer-events-none"
        />

        {/* Red hover tint — desktop only */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-red-600 opacity-0
                     md:group-hover:opacity-20
                     transition-opacity duration-500
                     mix-blend-multiply pointer-events-none"
        />

        {/* Faint serif number — bottom-left inside image */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-4
                     text-4xl md:text-5xl font-serif font-bold
                     text-white/30 leading-none select-none pointer-events-none"
        >
          {card.number}
        </span>

        {/* Red top-left corner accent — horizontal */}
        <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600" />
        {/* Red top-left corner accent — vertical */}
        <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600" />

      </div>

      {/* ════════════════════════════════════════════════════════
          CARD BODY
      ════════════════════════════════════════════════════════ */}
      <div className="p-5 md:p-7 flex-1 flex flex-col">

        {/* Eyebrow */}
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-red-600">
          {card.eyebrow}
        </p>

        {/* Animated red rule */}
        <div
          aria-hidden="true"
          className="w-8 h-[2px] bg-red-600 my-3
                     transition-all duration-500 md:group-hover:w-16"
        />

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-serif font-bold text-[#0B3D91]
                     leading-tight
                     transition-colors duration-300 group-hover:text-red-600"
        >
          {card.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-xs md:text-sm text-gray-600 leading-relaxed flex-1">
          {card.description}
        </p>

        {/* Optional tag */}
        {card.tag && (
          <span
            className="mt-4 inline-block self-start
                       text-[10px] uppercase tracking-wider text-red-700
                       border-l-2 border-red-600 pl-2"
          >
            {card.tag}
          </span>
        )}

        {/* Bottom row — 'Learn more' label + arrow */}
        <div
          className="mt-5 pt-4 border-t border-gray-100
                     flex items-center justify-between"
        >
          <span
            className="text-[11px] md:text-xs font-semibold uppercase tracking-wider
                       text-[#0B3D91] transition-colors duration-300
                       group-hover:text-red-600"
          >
            {card.linkLabel}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#0B3D91] shrink-0
                       transition-all duration-300
                       group-hover:translate-x-1 group-hover:text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>

      </div>
    </Link>
  );
}
