import { notices as d } from "@/data/newsEvents";

/**
 * NoticesSection — server component.
 * Clean rectangular document rows — no fake download links.
 * Compact: py-3 md:py-4, consistent with News rows.
 * Empty state when no notices.
 * Zero rounded-*. Zero literal text.
 */
export default function NoticesSection() {
  return (
    <div>
      {/* Header */}
      <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
        <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
        {d.eyebrow}
      </span>
      <h2 className="mt-3 text-2xl md:text-3xl font-serif font-bold text-[#0B3D91]">
        {d.heading}
      </h2>
      <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-3 mb-5" />

      {/* Empty state */}
      {(!d.items || d.items.length === 0) && (
        <div className="text-center py-10 border border-[#0B3D91]/15 bg-white">
          <p className="text-sm text-gray-500">No notices have been published yet.</p>
        </div>
      )}

      {/* Notice rows */}
      {d.items && d.items.length > 0 && (
        <div className="divide-y divide-[#0B3D91]/10 border-y border-[#0B3D91]/10">
          {d.items.map((notice) => (
            <div
              key={notice.id}
              className="group flex flex-col sm:flex-row sm:items-start gap-3
                         py-3 md:py-4 px-3 hover:bg-white transition-colors duration-200
                         relative"
            >
              {/* Left red accent on hover */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 w-1 bg-red-600 h-0 group-hover:h-full transition-all duration-300"
              />

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider text-red-700 border-l-2 border-red-600 pl-2">
                    {notice.category}
                  </span>
                  {notice.date && (
                    <span className="text-[10px] text-gray-500">{notice.date}</span>
                  )}
                </div>
                <h3 className="text-sm md:text-base font-serif font-bold text-[#0B3D91] leading-snug
                               group-hover:text-red-600 transition-colors duration-200">
                  {notice.title}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-gray-600 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              {/* Action button */}
              <div className="shrink-0 mt-2 sm:mt-1">
                {notice.documentUrl ? (
                  <a
                    href={notice.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border-2 border-[#0B3D91] text-[#0B3D91]
                               hover:bg-[#0B3D91] hover:text-white font-semibold
                               text-[10px] md:text-xs px-3 py-1.5 transition-all duration-300"
                  >
                    {d.viewNotice}
                  </a>
                ) : (
                  <span
                    className="inline-block border border-gray-300 text-gray-400
                               text-[10px] md:text-xs px-3 py-1.5 select-none"
                    aria-label={notice.documentStatus}
                  >
                    {notice.documentStatus || d.documentSoon}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
