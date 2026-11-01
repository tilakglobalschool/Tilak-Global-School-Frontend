import Image from "next/image";
import Link from "next/link";
import { galleryPreview as staticData } from "@/data/gallery";

/**
 * GalleryPreview — server component.
 * Equal 2×2 grid of square tiles. No featured/row-span tile.
 * Layered backing plate (navy, bottom-right) + outline frame (red, top-left)
 * sit behind the whole grid inside a relative wrapper.
 *
 * Props:
 *   items — optional live items array from parent; falls back to static data
 *
 * Zero rounded-* anywhere. Zero literal text.
 * All strings from data/gallery.js → galleryPreview.
 */
export default function GalleryPreview({ items }) {
  const d = staticData;
  const displayItems = (items && items.length > 0 ? items : d.items).slice(0, 4);
  return (
    /*
      Outer wrapper:
      - mt-4 mb-6  →  vertical rhythm within the gallery column
      - pt/pb/pl/pr offsets reserve visual space so the absolute
        backing plate and outline frame render fully without clipping.
    */
    <div className="relative mt-4 mb-6 pt-3 pl-3 pb-3 md:pt-4 md:pl-4 md:pb-4
                    pr-3 md:pr-4">

      {/* ── Backing plate: solid navy, offset bottom-right ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4
                   w-full h-full bg-[#0B3D91] z-0"
      />

      {/* ── Outline frame: red border, offset top-left ── */}
      <div
        aria-hidden="true"
        className="absolute -top-3 -left-3 md:-top-4 md:-left-4
                   w-full h-full border-2 border-red-600 z-0"
      />

      {/* ── 2×2 grid — z-10 above both decorative layers ── */}
      <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4">
        {displayItems.map((item, i) => (
          <GalleryTile
            key={item.id || item._id || i}
            item={item}
            href={d.viewAll.href}
            index={i}
          />
        ))}
      </div>

    </div>
  );
}

/* ── Individual tile ────────────────────────────────────────────────────────── */
function GalleryTile({ item, href, index }) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={href}
      className="group relative block aspect-square overflow-hidden
                 shadow-lg border border-[#0B3D91]/10"
      aria-label={item.title}
    >
      {/* Background image */}
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(max-width: 1024px) 45vw, 22vw"
        className="object-cover transition-transform duration-700 ease-out
                   group-hover:scale-105"
      />

      {/* Permanent bottom gradient */}
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

      {/* Hover inner white frame */}
      <div
        aria-hidden="true"
        className="absolute inset-3 border border-white/0
                   md:group-hover:border-white/30
                   transition-colors duration-500 pointer-events-none"
      />

      {/* Red top-left corner accent — horizontal bar */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600" />
      {/* Red top-left corner accent — vertical bar */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600" />

      {/* Faint serif index number — top-right */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-4
                   text-3xl md:text-4xl font-serif font-bold text-white/15
                   leading-none select-none pointer-events-none"
      >
        {ordinal}
      </span>

      {/* Title caption — bottom-left */}
      <p
        className="absolute bottom-3 left-3
                   text-white text-[10px] md:text-xs uppercase tracking-wider
                   border-l-2 border-red-500 pl-2"
      >
        {item.title}
      </p>

    </Link>
  );
}
