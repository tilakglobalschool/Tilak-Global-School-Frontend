"use client";

import MobileSlider from "@/components/ui/MobileSlider";
import EventCard    from "@/components/news-events/EventCard";
import { previousEvents as d } from "@/data/newsEvents";

/**
 * PreviousEvents — client component (MobileSlider needs useState/useRef).
 * Desktop: 3-column grid. Mobile: MobileSlider, one per swipe.
 * Reuses EventCard with showDetails=false so title lives on the image.
 * Zero rounded-*. Zero literal text.
 */
export default function PreviousEvents() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center justify-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {d.eyebrow}
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
          </span>
          <h2 className="mt-4 text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {d.heading}
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-4" />
          {d.description && (
            <p className="mt-4 text-xs md:text-base text-gray-600 max-w-xl mx-auto">
              {d.description}
            </p>
          )}
        </div>

        {/* Mobile slider */}
        <MobileSlider
          items={d.items}
          breakpoint="md"
          slideWidth="w-[calc(100vw-2.5rem)]"
          activeDotClass="w-6 h-2 bg-red-600"
          inactiveDotClass="w-2 h-2 bg-gray-300"
          renderItem={(item) => <EventCard item={item} showDetails={false} />}
        />

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {d.items.map((item) => (
            <EventCard key={item.id} item={item} showDetails={false} />
          ))}
        </div>

      </div>
    </section>
  );
}
