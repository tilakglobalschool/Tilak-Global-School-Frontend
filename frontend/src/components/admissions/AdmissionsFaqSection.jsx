"use client";

import { useState } from "react";
import { admissionFaqs as d } from "@/data/admissions";

/**
 * AdmissionsFaqSection — client component (accordion state).
 * Single-open accordion: opening one closes any other.
 * Plus SVG rotates to × on open. Grid-rows reveal animation.
 *
 * Zero rounded-*. Zero literal text. All from data/admissions.js.
 */
export default function AdmissionsFaqSection({ apiFaqs }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  // Use live API FAQs if available, otherwise fall back to static data
  const items = apiFaqs && apiFaqs.length > 0
    ? apiFaqs.map((f, i) => ({ id: f._id || i + 1, question: f.question, answer: f.answer }))
    : d.items;

  return (
    <section className="w-full bg-white border-t border-[#0B3D91]/10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center justify-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {d.eyebrow}
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
          </span>
          <h2 className="mt-4 text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {d.heading}
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto space-y-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`group relative bg-white overflow-hidden
                            transition-all duration-300
                            border shadow-sm hover:shadow-md
                            ${isOpen ? "border-[#0B3D91]/40" : "border-[#0B3D91]/15"}`}
              >
                {/* Left red edge */}
                <div
                  aria-hidden="true"
                  className={`absolute left-0 top-0 w-1 bg-red-600
                              transition-all duration-300
                              ${isOpen ? "h-full" : "h-0 group-hover:h-full"}`}
                />

                {/* Question button */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-3 md:gap-4
                             pl-4 pr-4 py-4 md:py-5 text-left"
                >
                  {/* Number badge — square, turns red when open */}
                  <span
                    className={`shrink-0 w-9 h-9 md:w-10 md:h-10
                                 flex items-center justify-center
                                 font-serif font-bold text-sm text-white
                                 transition-colors duration-300
                                 ${isOpen ? "bg-red-600" : "bg-[#0B3D91] group-hover:bg-red-600"}`}
                  >
                    {String(item.id).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span
                    className={`flex-1 text-sm md:text-base font-serif font-bold
                                 leading-snug transition-colors duration-200
                                 ${isOpen ? "text-red-600" : "text-[#0B3D91] group-hover:text-red-600"}`}
                  >
                    {item.question}
                  </span>

                  {/* Plus / × icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`shrink-0 w-5 h-5 transition-all duration-300
                                ${isOpen ? "rotate-45 text-red-600" : "text-[#0B3D91]"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                {/* Answer panel — grid-rows animation */}
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out
                              ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pl-4 md:pl-[3.5rem] pr-4 pb-4 md:pb-5
                                  text-xs md:text-sm text-gray-700 leading-relaxed
                                  border-t border-gray-100 pt-3">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
