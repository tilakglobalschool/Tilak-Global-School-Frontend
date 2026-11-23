"use client";

import WhyChooseCard from "@/components/home/WhyChooseCard";
import MobileSlider from "@/components/ui/MobileSlider";
import { whyChoose as d } from "@/data/home";

/**
 * WhyChooseSection — client component (MobileSlider needs useRef/useState).
 *
 * Background: layered brand surface (light blue gradient + dot pattern +
 * diagonal stripe band + blurred glows) so white cards lift off it visually.
 * A thin red top edge and faint serif watermark add editorial detail.
 *
 * border-t border-[#0B3D91]/10 separates it cleanly from FacilitiesSection
 * (bg-[#EEF3FB]) above and NewsGallerySection (bg-[#EEF3FB]) below.
 */
export default function WhyChooseSection({ sectionImages = {} }) {
  return (
    <section
      className="relative overflow-hidden
                 bg-gradient-to-b from-[#F4F7FC] via-[#E9EFF9] to-[#F4F7FC]
                 border-t border-[#0B3D91]/10
                 py-16 md:py-24"
      style={{
        backgroundImage: undefined, // gradient set via className above
      }}
    >

      {/* ── Dot pattern texture ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,61,145,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Diagonal stripe band behind cards ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 h-72
                   bg-[#0B3D91]/[0.04] -skew-y-3 pointer-events-none"
      />

      {/* ── Soft blurred glow — top-left ── */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-80 h-80
                   bg-[#0B3D91]/6 blur-3xl pointer-events-none"
      />

      {/* ── Soft blurred glow — bottom-right ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -right-20 w-96 h-96
                   bg-red-600/6 blur-3xl pointer-events-none"
      />

      {/* ── Thin red top edge ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-24 bg-red-600"
      />

      {/* ── Faint serif watermark — top-right ── */}
      <span
        aria-hidden="true"
        className="absolute -top-4 right-4
                   text-[7rem] md:text-[10rem] font-serif font-bold
                   text-[#0B3D91]/5 leading-none select-none pointer-events-none"
      >
        {/* First word of the heading — pulled at runtime via JS slicing is
            not possible in a server component; use a static aria-hidden span
            sourced from the data. */}
        {d.heading.split(" ")[0]}
      </span>

      {/* ── Content — above all decorative layers ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {d.heading}
          </h2>
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-3 mb-3"
          />
          {d.subtext && (
            <p className="text-xs md:text-base text-gray-600 max-w-xl mx-auto mb-10 md:mb-14">
              {d.subtext}
            </p>
          )}
        </div>

        {/* Mobile slider — hidden md+ */}
        <MobileSlider
          items={d.items}
          breakpoint="md"
          slideWidth="w-[calc(100vw-2.5rem)]"
          activeDotClass="w-6 h-2 bg-red-600"
          renderItem={(item) => <WhyChooseCard item={item} sectionImages={sectionImages} />}
        />

        {/* Desktop grid — hidden below md */}
        <div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4
                     gap-6 md:gap-8 items-stretch"
        >
          {d.items.map((item) => (
            <WhyChooseCard key={item.id} item={item} sectionImages={sectionImages} />
          ))}
        </div>

      </div>
    </section>
  );
}
