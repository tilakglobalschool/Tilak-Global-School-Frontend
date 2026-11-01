"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { galleryPage as d } from "@/data/gallery";
import { getUploadUrl } from "@/lib/uploadUrl";

/**
 * GalleryLightbox — accessible full-screen image preview dialog.
 *
 * Props:
 *   item     — currently displayed gallery item (null = closed)
 *   onClose  — close handler
 *   onPrev   — navigate to previous item
 *   onNext   — navigate to next item
 *   hasPrev  — whether a previous item exists
 *   hasNext  — whether a next item exists
 *
 * Accessibility:
 *   • role="dialog" + aria-modal="true"
 *   • Escape key closes
 *   • Backdrop click closes
 *   • Background scroll locked while open
 */
export default function GalleryLightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const imageSrc = item
    ? (item.imageUrl ? getUploadUrl(item.imageUrl) : item.image?.src || "")
    : "";

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (e.key === "Escape")     { onClose(); }
    if (e.key === "ArrowLeft"  && hasPrev) { onPrev(); }
    if (e.key === "ArrowRight" && hasNext) { onNext(); }
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    if (!item) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [item, handleKey]);

  if (!item) return null;

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title || item.caption || "Gallery image preview"}
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-[#0B3D91]/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal content — stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-4xl mx-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Top bar: close button */}
        <div className="flex justify-end mb-3">
          <button
            onClick={onClose}
            aria-label={d.lightbox.close}
            className="text-white/70 hover:text-white transition-colors
                       focus:outline-none focus-visible:ring-2
                       focus-visible:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image container */}
        <div className="relative w-full max-h-[70vh] overflow-hidden bg-[#061F4D]">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={item.caption || item.title || "Gallery image"}
              width={1200}
              height={800}
              className="object-contain w-full max-h-[70vh]"
              priority
            />
          )}
        </div>

        {/* Navigation + caption row */}
        <div className="flex items-center justify-between mt-3 gap-4">

          {/* Prev */}
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            aria-label={d.lightbox.prev}
            className="text-white/60 hover:text-white disabled:opacity-20
                       transition-colors focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Caption */}
          <div className="flex-1 text-center">
            {(item.title || item.caption) && (
              <p className="text-white text-sm md:text-base font-serif font-semibold">
                {item.title || item.caption}
              </p>
            )}
            {item.category && (
              <p className="text-red-300 text-[10px] uppercase tracking-wider mt-0.5">
                {item.category}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={onNext}
            disabled={!hasNext}
            aria-label={d.lightbox.next}
            className="text-white/60 hover:text-white disabled:opacity-20
                       transition-colors focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}
