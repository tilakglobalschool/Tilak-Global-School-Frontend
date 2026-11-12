import Image from "next/image";
import Link from "next/link";
import { galleryPreview as d } from "@/data/gallery";

/**
 * GalleryPreview — server component.
 * Equal 2×2 grid of square tiles.
 *
 * FIX: Images now use object-contain so the FULL image is always visible
 * regardless of its natural aspect ratio (portrait, landscape, square).
 * A dark navy background fills the letterbox/pillarbox space.
 *
 * Root causes that were fixed:
 *  1. Unsplash URLs had fit=crop → server cropped before browser received it.
 *     Changed to fit=clip → full image delivered.
 *  2. object-cover + aspect-square → CSS also cropped to fill the square.
 *     Changed to object-contain → image fits inside without any cropping.
 *  3. group-hover:scale-105 → zoom on hover clipped even more content.
 *     Removed; hover uses brightness + overlay instead.
 */
export default function GalleryPreview() {
  return (
    <div className="relative mt-4 mb-6 pt-3 pl-3 pb-3 md:pt-4 md:pl-4 md:pb-4 pr-3 md:pr-4">

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

      {/* ── 2×2 grid ── */}
      <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4">
        {d.items.map((item, i) => (
          <GalleryTile key={item.id} item={item} href={d.viewAll.href} index={i} />
        ))}
      </div>

    </div>
  );
}

/* ── Individual tile ── */
function GalleryTile({ item, href, index }) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={href}
      className="group relative block aspect-square overflow-hidden
                 shadow-lg border border-[#0B3D91]/10
                 bg-[#071D45]"          /* dark navy fills letterbox space */
      aria-label={item.title}
    >
      {/*
        Image — object-contain guarantees the FULL image is visible.
        No scale on hover so content doesn't get clipped during animation.
        Hover: subtle brightness dim via the overlay layer instead.
      */}
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(max-width: 1024px) 45vw, 22vw"
        className="object-contain transition-opacity duration-500
                   group-hover:opacity-90"
      />

      {/* Full-image semi-transparent navy tint — always on */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#0B3D91]/35 pointer-events-none z-[1]
                   transition-opacity duration-500 group-hover:bg-[#0B3D91]/50"
      />

      {/* Bottom gradient — caption legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]
                   bg-gradient-to-t from-[#071D45]/95 via-[#0B3D91]/25 to-transparent
                   pointer-events-none"
      />

      {/* Red hover tint — desktop only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-red-600 opacity-0 z-[3]
                   md:group-hover:opacity-15
                   transition-opacity duration-500
                   mix-blend-multiply pointer-events-none"
      />

      {/* Always-visible inset frame */}
      <div
        aria-hidden="true"
        className="absolute inset-2 border border-white/15 z-[3] pointer-events-none"
      />

      {/* Hover inner white frame — brighter on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-3 border border-white/0 z-[3]
                   md:group-hover:border-white/35
                   transition-colors duration-500 pointer-events-none"
      />

      {/* Red top-left corner accent */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600 z-[4]" />
      <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600 z-[4]" />

      {/* Animated red bottom accent line — grows on hover */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-red-600 z-[4]
                   w-0 md:group-hover:w-full transition-all duration-500"
      />

      {/* Faint serif index number */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 z-[4]
                   text-3xl md:text-4xl font-serif font-bold text-white/20
                   leading-none select-none pointer-events-none"
      >
        {ordinal}
      </span>

      {/* Title caption */}
      <p
        className="absolute bottom-3 left-3 z-[4]
                   text-white text-[10px] md:text-xs uppercase tracking-wider
                   border-l-2 border-red-500 pl-2"
      >
        {item.title}
      </p>
    </Link>
  );
}
