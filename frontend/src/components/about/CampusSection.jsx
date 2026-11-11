"use client";

import Link from "next/link";
import MobileSlider from "@/components/ui/MobileSlider";
import CampusCard from "@/components/about/CampusCard";
import { ourCampus as d } from "@/data/about";

/**
 * CampusSection — client component (MobileSlider needs useRef/useState).
 *
 * Background changed from dark navy to white — text colours updated accordingly.
 * Image cards retain their internal dark overlays (needed for white text legibility).
 *
 * Desktop mosaic:
 *   [0] Campus      — col-span-7, row-span-2  (large left)
 *   [1] Classroom   — col-span-5, row-span-1  (top right)
 *   [2] Playground  — col-span-5, row-span-1  (bottom right)
 *
 * Mobile: horizontal MobileSlider, one tile at a time.
 * Zero rounded-*. Zero literal text. All strings from data/about.js → ourCampus.
 */
export default function CampusSection() {
  const [large, ...small] = d.items;

  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 pb-16 md:pb-24">

      {/* ── Subtle dot pattern — very faint on white ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(11,61,145,0.05) 1px, transparent 1px)",
          backgroundSize:  "24px 24px",
        }}
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">

          {/* Left: eyebrow + heading + subtext */}
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {d.eyebrow}
            </span>

            <h2 className="mt-3 text-2xl md:text-4xl lg:text-[2.6rem] font-serif font-bold text-[#0B3D91] leading-tight">
              {d.heading}
            </h2>

            <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-3" />

            <p className="mt-3 text-xs md:text-base text-gray-600 max-w-xl">
              {d.subtext}
            </p>
          </div>

          {/* Right: stat + CTA */}
          <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">

            {/* Stat */}
            <div className="border-l-2 border-red-600 pl-4">
              <p className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
                {d.stat.value}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mt-0.5">
                {d.stat.label}
              </p>
            </div>

            {/* CTA — navy square, hover red */}
            <Link
              href={d.cta.href}
              className="group inline-flex items-center
                         border-2 border-[#0B3D91] text-[#0B3D91]
                         hover:bg-[#0B3D91] hover:text-white
                         font-semibold text-xs px-5 py-2.5
                         md:text-sm md:px-7 md:py-3
                         transition-all duration-300"
            >
              {d.cta.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1"
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

        {/* MOBILE SLIDER — hidden md+ */}
        <MobileSlider
          items={d.items}
          breakpoint="md"
          slideWidth="w-[calc(100vw-1.5rem)]"
          activeDotClass="w-6 h-2 bg-red-600"
          inactiveDotClass="w-2 h-2 bg-gray-300"
          renderItem={(item) => (
            <div className="aspect-[4/3]">
              <CampusCard
                item={item}
                href={d.cta.href}
                sizes="95vw"
                isLarge={false}
              />
            </div>
          )}
        />

        {/* DESKTOP MOSAIC GRID — hidden below md */}
        <div
          className="hidden md:grid
                     grid-cols-12 grid-rows-2
                     gap-3 md:gap-4
                     h-[520px] lg:h-[600px]"
        >
          {/* Tile 1 — large left, both rows */}
          <div className="col-span-12 md:col-span-7 row-span-2">
            <CampusCard
              item={large}
              href={d.cta.href}
              sizes="(max-width: 1280px) 58vw, 700px"
              isLarge
            />
          </div>

          {/* Tile 2 — top right */}
          <div className="md:col-span-5 row-span-1">
            <CampusCard
              item={small[0]}
              href={d.cta.href}
              sizes="(max-width: 1280px) 40vw, 490px"
              isLarge={false}
            />
          </div>

          {/* Tile 3 — bottom right */}
          <div className="md:col-span-5 row-span-1">
            <CampusCard
              item={small[1]}
              href={d.cta.href}
              sizes="(max-width: 1280px) 40vw, 490px"
              isLarge={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
