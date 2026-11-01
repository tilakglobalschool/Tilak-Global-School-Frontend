"use client";

import { useState } from "react";
import { newsAnnouncements as d } from "@/data/newsEvents";

/**
 * NewsAnnouncements — client component (accordion state).
 * Single-open accordion. Left red edge grows on hover/open.
 * Square date block turns red-600 when item is open.
 * Compact rows: p-3 md:p-4, date blocks w-12 h-12 md:w-14 md:h-14.
 * Zero rounded-*. Zero literal text.
 */
export default function NewsAnnouncements() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

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

      {/* Accordion list */}
      <div className="space-y-2.5">
        {d.items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`group relative bg-white overflow-hidden
                          transition-all duration-300 border shadow-sm hover:shadow-md
                          ${isOpen ? "border-[#0B3D91]/40" : "border-[#0B3D91]/15"}`}
            >
              {/* Left red edge */}
              <div
                aria-hidden="true"
                className={`absolute left-0 top-0 w-1 bg-red-600 transition-all duration-300
                            ${isOpen ? "h-full" : "h-0 group-hover:h-full"}`}
              />

              {/* Header button */}
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`news-panel-${item.id}`}
                id={`news-btn-${item.id}`}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-3 pl-4 pr-3 py-3 md:p-4 text-left"
              >
                {/* Date block — compact */}
                <div
                  className={`shrink-0 w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center
                              leading-none transition-colors duration-300
                              ${isOpen ? "bg-red-600" : "bg-[#0B3D91] group-hover:bg-red-600"} text-white`}
                >
                  <span className="text-base md:text-lg font-serif font-bold">{item.day}</span>
                  <span className="text-[9px] uppercase tracking-wide text-blue-100 mt-0.5">{item.month}</span>
                </div>

                {/* Title + summary */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm md:text-base font-serif font-bold leading-snug
                                 transition-colors duration-200
                                 ${isOpen ? "text-red-600" : "text-[#0B3D91] group-hover:text-red-600"}`}>
                    {item.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5 line-clamp-1">{item.summary}</p>
                </div>

                {/* Plus / × icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`shrink-0 w-5 h-5 transition-all duration-300
                              ${isOpen ? "rotate-45 text-red-600" : "text-[#0B3D91]"}`}
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2} aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>

              {/* Expanded content — grid-rows animation */}
              <div
                id={`news-panel-${item.id}`}
                role="region"
                aria-labelledby={`news-btn-${item.id}`}
                className={`grid transition-all duration-300 ease-in-out
                            ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="pl-4 md:pl-[4.25rem] pr-4 pb-3 md:pb-4 border-t border-gray-100 pt-2.5">
                    <span className="inline-block mb-1.5 text-[10px] uppercase tracking-wider text-red-700 border-l-2 border-red-600 pl-2 capitalize">
                      {item.category}
                    </span>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      {d.note && (
        <p className="mt-4 text-[10px] uppercase tracking-wider text-red-700 border-l-2 border-red-600 pl-2">
          {d.note}
        </p>
      )}
    </div>
  );
}
