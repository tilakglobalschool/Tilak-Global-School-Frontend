import Image from "next/image";
import Link from "next/link";
import { resolveImage, resolveAlt, resolvePosition } from "@/lib/sectionImages";

// facility.id → schoolFacilities slot key
const FACILITY_SLOT = {
  'laboratory':        'laboratory',
  'smart-classrooms':  'smartClassrooms',
  'library':           'library',
  'sports':            'sports',
  'multi-purpose-hall':'multipurposeHall',
  'music-dance':       'musicDance',
  'transport':         'transport',
  'art-room':          'artRoom',
};

export default function FacilityCard({ facility, index = 0, sectionImages = {} }) {
  const ordinal  = String(index + 1).padStart(2, "0");
  const slotKey  = FACILITY_SLOT[facility.id] || facility.id;
  const imgSrc   = resolveImage(sectionImages,   'schoolFacilities', slotKey, facility.image.src);
  const imgAlt   = resolveAlt(sectionImages,     'schoolFacilities', slotKey, facility.image.alt);
  const objPos   = resolvePosition(sectionImages, 'schoolFacilities', slotKey, facility.image.objectPosition || 'center');

  return (
    <Link
      href={facility.href}
      className="group flex flex-col h-full overflow-hidden
                 border border-[#0B3D91]/15 bg-white
                 shadow-sm hover:shadow-lg hover:border-red-600/40
                 transition-all duration-300"
      aria-label={facility.title}
    >
      {/* Image area */}
      <div className="relative w-full overflow-hidden shrink-0" style={{ aspectRatio: "4 / 3" }}>
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: objPos }}
          quality={85}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B3D91]/30 via-transparent to-transparent pointer-events-none" />
        <div aria-hidden="true" className="absolute top-0 left-0 w-8 h-[3px] bg-red-600 z-10" />
        <div aria-hidden="true" className="absolute top-0 left-0 w-[3px] h-8 bg-red-600 z-10" />
        <span aria-hidden="true" className="absolute top-3 right-4 z-10 text-3xl md:text-4xl font-serif font-bold text-white/25 leading-none select-none pointer-events-none">
          {ordinal}
        </span>
        <div aria-hidden="true" className="absolute inset-0 bg-red-600 opacity-0 md:group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Caption strip */}
      <div className="flex flex-col flex-1 p-4 md:p-5 bg-white">
        <div aria-hidden="true" className="w-8 h-[2px] bg-red-600 mb-2.5 transition-all duration-500 group-hover:w-14" />
        <h3 className="text-sm md:text-base font-serif font-bold text-[#0B3D91] leading-snug mb-2 group-hover:text-red-600 transition-colors duration-300">
          {facility.title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-4">
          {facility.description}
        </p>
      </div>
    </Link>
  );
}
