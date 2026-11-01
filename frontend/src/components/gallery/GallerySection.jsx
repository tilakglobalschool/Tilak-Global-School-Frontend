"use client";

import { useState, useMemo } from "react";
import GalleryCard      from "@/components/gallery/GalleryCard";
import GalleryLightbox  from "@/components/gallery/GalleryLightbox";
import { galleryPage as d } from "@/data/gallery";

const PAGE_SIZE = 20; // initial items shown before "Load More"

/**
 * GallerySection — client component.
 * Receives items from the server-rendered gallery page.
 *
 * Props:
 *   items   — array of gallery image objects from API or static fallback
 *   error   — boolean, true if API fetch failed
 *
 * Features:
 *   • Category filter bar (horizontal scroll on mobile)
 *   • Consistent 4/3 aspect-ratio grid — no masonry / column height variance
 *   • Image lightbox with keyboard navigation
 *   • Load More pagination (client-side, no re-fetch)
 *   • Clean empty/error states from data/gallery.js
 *
 * Zero rounded-* (category buttons are sharp). Zero literal text.
 */
export default function GallerySection({ items = [], error = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem,   setLightboxItem]   = useState(null);
  const [lightboxIndex,  setLightboxIndex]  = useState(0);
  const [visibleCount,   setVisibleCount]   = useState(PAGE_SIZE);

  // Filtered items by active category
  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((img) => img.category === activeCategory);
  }, [items, activeCategory]);

  // Slice for "Load More"
  const visible = filtered.slice(0, visibleCount);

  // Open lightbox at a specific index within the FILTERED set
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxItem(filtered[index]);
  };

  const closeLightbox = () => setLightboxItem(null);

  const prevLightbox = () => {
    const newIdx = lightboxIndex - 1;
    if (newIdx >= 0) { setLightboxIndex(newIdx); setLightboxItem(filtered[newIdx]); }
  };

  const nextLightbox = () => {
    const newIdx = lightboxIndex + 1;
    if (newIdx < filtered.length) { setLightboxIndex(newIdx); setLightboxItem(filtered[newIdx]); }
  };

  // Reset visible count when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Category filter bar ── */}
        <div
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide
                     pb-2 mb-8 md:mb-10"
        >
          {d.categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-4 py-2 text-xs md:text-sm font-semibold
                            uppercase tracking-wider
                            border-b-2 transition-all duration-200
                            focus:outline-none focus-visible:ring-2
                            focus-visible:ring-red-600
                            ${isActive
                              ? "bg-[#0B3D91] text-white border-red-600"
                              : "bg-[#EEF3FB] text-[#0B3D91] border-transparent hover:border-red-400 hover:bg-[#dce8f8]"
                            }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Error state ── */}
        {error && (
          <div className="text-center py-16">
            <h3 className="text-lg font-serif font-bold text-[#0B3D91] mb-2">
              {d.errorState.heading}
            </h3>
            <p className="text-sm text-gray-500">{d.errorState.description}</p>
          </div>
        )}

        {/* ── Empty state ── */}
        {!error && filtered.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-serif font-bold text-[#0B3D91] mb-2">
              {d.emptyState.heading}
            </h3>
            <p className="text-sm text-gray-500">{d.emptyState.description}</p>
          </div>
        )}

        {/* ── Image grid ── */}
        {!error && visible.length > 0 && (
          <>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                         gap-3 md:gap-5"
            >
              {visible.map((img, i) => (
                <GalleryCard
                  key={img._id || img.id || i}
                  item={img}
                  index={i}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="group inline-flex items-center
                             border-2 border-[#0B3D91] text-[#0B3D91]
                             hover:bg-[#0B3D91] hover:text-white
                             font-semibold text-xs px-6 py-2.5
                             md:text-sm md:px-8 md:py-3
                             transition-all duration-300"
                >
                  {d.loadMore}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-4 h-4 transition-transform duration-300
                               group-hover:translate-y-0.5"
                    fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

      </div>

      {/* ── Lightbox ── */}
      <GalleryLightbox
        item={lightboxItem}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
        hasPrev={lightboxIndex > 0}
        hasNext={lightboxIndex < filtered.length - 1}
      />
    </section>
  );
}
