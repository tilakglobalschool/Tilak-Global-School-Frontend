import Image from "next/image";

/**
 * EventCard — server component.
 * Used by both UpcomingEvents and PreviousEvents sections.
 *
 * Props:
 *   item        — { id, title, description, category, date, dateConfirmed, image }
 *   showDetails — whether to show description text below image (upcoming vs prev)
 *
 * Design: sharp corners, aspect-[16/10] image, navy gradient overlay,
 * red hover tint, red bottom rule animation.
 * Zero rounded-*. Zero literal text.
 */
export default function EventCard({ item, showDetails = true }) {
  return (
    <div className="group flex flex-col bg-white border border-[#0B3D91]/15 shadow-sm
                    hover:shadow-lg transition-all duration-300 overflow-hidden">

      {/* Image strip */}
      <div className="relative aspect-[16/10] overflow-hidden shrink-0">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out
                     group-hover:scale-105"
        />

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0
                     bg-gradient-to-t from-[#0B3D91]/85 via-[#0B3D91]/20 to-transparent
                     pointer-events-none"
        />

        {/* Red hover tint */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-red-600 opacity-0
                     md:group-hover:opacity-15
                     transition-opacity duration-500
                     mix-blend-multiply pointer-events-none"
        />

        {/* Red top-left corner accent */}
        <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600" />
        <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600" />

        {/* Category badge — top-right */}
        <span
          className="absolute top-3 right-3
                     bg-[#0B3D91]/80 text-white
                     text-[9px] md:text-[10px] uppercase tracking-wider
                     px-2 py-1 font-semibold"
        >
          {item.category}
        </span>

        {/* Title for previous events (always on image) */}
        {!showDetails && (
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div aria-hidden="true" className="w-8 h-[2px] bg-red-500 mb-2 transition-all duration-500 group-hover:w-16" />
            <p className="text-white text-sm md:text-base font-serif font-bold leading-snug">
              {item.title}
            </p>
            {item.date && (
              <p className="mt-1 text-[10px] uppercase tracking-wider text-red-200">
                {item.date}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Content body — for upcoming events */}
      {showDetails && (
        <div className="p-5 flex flex-col flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 mb-2">
            {item.category}
          </p>
          <h3 className="text-base md:text-lg font-serif font-bold text-[#0B3D91] leading-snug">
            {item.title}
          </h3>
          <div aria-hidden="true" className="w-8 h-[2px] bg-red-600 my-3 transition-all duration-500 group-hover:w-16" />
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed flex-1">
            {item.description}
          </p>
          {item.date && (
            <p className="mt-4 text-[10px] uppercase tracking-wider text-red-700 border-l-2 border-red-600 pl-2">
              {item.date}
            </p>
          )}
        </div>
      )}

      {/* Red bottom rule — grows on hover */}
      <div aria-hidden="true" className="h-[2px] w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
