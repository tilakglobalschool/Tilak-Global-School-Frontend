"use client";

import Image from "next/image";
import { galleryPage as d } from "@/data/gallery";
import { getUploadUrl } from "@/lib/uploadUrl";

/**
 * GalleryCard — individual gallery image tile.
 *
 * Props:
 *   item  — { _id, title, caption, category, imageUrl, status }
 *   index — zero-based position (serif watermark)
 *   onClick — opens lightbox with this item
 *
 * Design rules:
 *   • Zero rounded-* — sharp corners.
 *   • Consistent aspect-[4/3] regardless of source image dimensions.
 *   • object-cover keeps all images the same height, never stretches neighbors.
 *   • Caption permanently visible on mobile; overlay on desktop hover.
 *   • Red bottom line expands on hover.
 */
export default function GalleryCard({ item, index, onClick }) {
  const ordinal  = String(index + 1).padStart(2, "0");
  const imageSrc = item.imageUrl
    ? getUploadUrl(item.imageUrl)
    : item.image?.src || "";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full aspect-[4/3] overflow-hidden
                 shadow-md border border-[#0B3D91]/10
                 focus:outline-none focus-visible:ring-2
                 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      aria-label={item.title || item.caption || `Gallery image ${ordinal}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={item.caption || item.title || `Gallery photo ${ordinal}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover object-center
                     transition-transform duration-700 ease-out
                     group-hover:scale-105"
          loading={index < 10 ? "eager" : "lazy"}
        />
      ) : (
        /* Placeholder when imageUrl is missing */
        <div className="w-full h-full bg-[#EEF3FB] flex items-center justify-center">
          <span className="text-[#0B3D91]/30 text-3xl font-serif font-bold select-none">
            {ordinal}
          </span>
        </div>
      )}

      {/* Permanent bottom gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0
                   bg-gradient-to-t from-[#0B3D91]/80 via-[#0B3D91]/20 to-transparent
                   pointer-events-none"
      />

      {/* Red hover tint — desktop only */}
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

      {/* Faint serif number — top-right */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-4
                   text-3xl font-serif font-bold text-white/15
                   leading-none select-none pointer-events-none"
      >
        {ordinal}
      </span>

      {/* Red bottom line — expands on hover */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600
                   transition-all duration-500 group-hover:w-full"
      />

      {/* Caption block */}
      <div className="absolute inset-x-0 bottom-0 pb-3 pt-8 px-3">
        {item.category && (
          <p
            className="text-[9px] md:text-[10px] uppercase tracking-[0.2em]
                       text-red-300 mb-1"
          >
            {item.category}
          </p>
        )}
        {(item.title || item.caption) && (
          <p
            className="text-white text-[11px] md:text-xs font-serif font-semibold
                       leading-snug line-clamp-2
                       border-l-2 border-red-500 pl-2"
          >
            {item.title || item.caption}
          </p>
        )}
      </div>
    </button>
  );
}
