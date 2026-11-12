"use client";

import FacilityCard from "@/components/home/FacilityCard";
import MobileSlider from "@/components/ui/MobileSlider";
import { facilities } from "@/data/home";

/**
 * FacilitiesSection — client component (MobileSlider needs useRef/useState).
 * Tinted background so sharp dark cards lift visually off the page.
 * Passes index to FacilityCard for the serif watermark number.
 */
export default function FacilitiesSection() {
  return (
    <section className="w-full bg-[#EEF3FB] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {facilities.heading}
          </h2>
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-3 mb-3"
          />
          <p className="text-xs md:text-base text-gray-600 max-w-2xl mx-auto mb-10 md:mb-14">
            {facilities.subtext}
          </p>
        </div>

        {/* Mobile slider — hidden md+ */}
        <MobileSlider
          items={facilities.items}
          breakpoint="md"
          slideWidth="w-[calc(100vw-2.5rem)]"
          activeDotClass="w-6 h-2 bg-red-600"
          renderItem={(facility, i) => (
            <FacilityCard facility={facility} index={i} />
          )}
        />

        {/* Desktop grid — hidden below md */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {facilities.items.map((facility, i) => (
            <FacilityCard key={facility.id} facility={facility} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
