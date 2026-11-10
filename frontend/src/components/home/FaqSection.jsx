"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/data/home";

/**
 * FaqSection — client component.
 * bg-white, serif heading, eyebrow label, square FAQ rows, no rounded-*.
 * Single-open-at-a-time via openId state.
 * Left red edge grows via real div (h-0 → h-full), same pattern as NewsAccordion.
 *
 * Zero literal text — all strings from data/home.js → faqs.
 */

/* ── FAQ Page JSON-LD schema for SEO ── */
function FaqSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: items.map((item) => ({
      "@type":        "Question",
      name:           item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FaqSection({ apiFaqs }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  // Use API FAQs if available, otherwise fall back to static
  const items = apiFaqs && apiFaqs.length > 0
    ? apiFaqs.map((f, i) => ({ id: f._id || i + 1, question: f.question, answer: f.answer }))
    : faqs.items;

  return (
    <section className="w-full bg-white pt-6 md:pt-10 pb-16 md:pb-24">
      <FaqSchema items={items} />

      <div className="max-w-4xl mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-8 md:mb-12">

          {/* Eyebrow */}
          <span
            className="inline-flex items-center justify-center gap-2
                       text-[11px] uppercase tracking-[0.2em]
                       font-semibold text-red-600"
          >
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {faqs.heading}
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
          </span>

          {/* Heading */}
          <h2 className="mt-3 text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {faqs.heading}
          </h2>

          {/* Red rule */}
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-3 mb-3"
          />

          {/* Subtext */}
          <p className="text-xs md:text-base text-gray-600">
            {faqs.subtext}
          </p>

        </div>

        {/* ── FAQ list ── */}
        <ul className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <li
                key={item.id}
                className={`group relative bg-white overflow-hidden
                            transition-all duration-300
                            border shadow-sm hover:shadow-md
                            ${isOpen
                              ? "border-[#0B3D91]/40"
                              : "border-[#0B3D91]/15"
                            }`}
              >
                {/* Left red edge — real div, h-0 → h-full */}
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
                             pl-4 pr-4 py-3.5 md:py-4 text-left"
                >
                  {/* Number badge — square, turns red-600 when open */}
                  <span
                    className={`shrink-0 w-9 h-9 md:w-10 md:h-10
                                 flex items-center justify-center
                                 font-serif font-bold text-sm text-white
                                 transition-colors duration-300
                                 ${isOpen
                                   ? "bg-red-600"
                                   : "bg-[#0B3D91] group-hover:bg-red-600"
                                 }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Question text */}
                  <span
                    className={`flex-1 text-sm md:text-base font-serif font-bold
                                 leading-snug transition-colors duration-200
                                 ${isOpen
                                   ? "text-red-600"
                                   : "text-[#0B3D91] group-hover:text-red-600"
                                 }`}
                  >
                    {item.question}
                  </span>

                  {/* Plus icon — rotates 45° to × when open */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`shrink-0 w-5 h-5 transition-all duration-300
                                ${isOpen
                                  ? "rotate-45 text-red-600"
                                  : "text-[#0B3D91]"
                                }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14M5 12h14"
                    />
                  </svg>
                </button>

                {/* Answer panel — grid-rows animation */}
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out
                              ${isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                              }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="pl-4 md:pl-[3.5rem] pr-4 pb-4 md:pb-5
                                 text-xs md:text-sm text-gray-700 leading-relaxed
                                 border-t border-gray-100 pt-3"
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>

              </li>
            );
          })}
        </ul>

        {/* ── CTA — square outline button ── */}
        <div className="flex justify-center mt-8 md:mt-10">
          <Link
            href={faqs.cta.href}
            className="group inline-flex items-center
                       border-2 border-[#0B3D91] text-[#0B3D91]
                       hover:bg-[#0B3D91] hover:text-white
                       font-semibold text-xs px-5 py-2.5
                       md:text-sm md:px-7 md:py-3
                       transition-all duration-300"
          >
            {faqs.cta.label}
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
        </div>

      </div>
    </section>
  );
}
