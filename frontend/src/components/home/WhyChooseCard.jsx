import Image from "next/image";
import { resolveImage, resolveAlt } from "@/lib/sectionImages";

const WHY_SLOT = {
  'curriculum':   'curriculum',
  'environment':  'environment',
  'legacy':       'legacy',
  'achievements': 'achievements',
};

export default function WhyChooseCard({ item, sectionImages = {} }) {
  const slotKey = WHY_SLOT[item.id] || item.id;
  const imgSrc  = resolveImage(sectionImages, 'whyChooseUs', slotKey, item.image.src);
  const imgAlt  = resolveAlt(sectionImages,   'whyChooseUs', slotKey, item.image.alt);
  const isHighlight = item.highlight;

  return (
    <div
      className={`group relative flex flex-col h-full overflow-hidden
                  shadow-md hover:shadow-2xl md:hover:-translate-y-1.5
                  transition-all duration-300
                  border
                  ${isHighlight
                    ? "border-red-600/40 bg-red-50/40"
                    : "border-[#0B3D91]/15 bg-white"
                  }`}
    >
      {/* ── Red top edge — grows from w-0 to w-full on hover ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-1 w-0 bg-red-600 z-20
                   transition-all duration-500 group-hover:w-full"
      />

      {/* ── Image strip ── */}
      <div className="relative h-40 md:h-44 overflow-hidden shrink-0">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width: 768px) 85vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out
                     group-hover:scale-105"
        />

        {/* Bottom gradient — darkens image toward card body */}
        <div
          aria-hidden="true"
          className="absolute inset-0
                     bg-gradient-to-t from-[#0B3D91]/80 to-transparent
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
                     text-4xl font-serif font-bold text-white/30
                     leading-none select-none pointer-events-none"
        >
          {item.number}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">

        {/* Animated red rule */}
        <div
          aria-hidden="true"
          className="w-8 h-[2px] bg-red-600 mb-3
                     transition-all duration-500 md:group-hover:w-16"
        />

        {/* Title */}
        <h3
          className="text-lg md:text-xl font-serif font-bold text-[#0B3D91]
                     leading-snug transition-colors duration-300
                     group-hover:text-red-600"
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs md:text-sm text-gray-600 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Highlight tag — only rendered when highlight is true */}
        {isHighlight && (
          <span
            className="mt-3 inline-block self-start
                       text-[10px] uppercase tracking-wider text-red-700
                       border-l-2 border-red-600 pl-2"
          >
            To be confirmed
          </span>
        )}

      </div>
    </div>
  );
}
