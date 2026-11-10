import AcademicsHero from "@/components/academics/AcademicsHero";
import AcademicEventCard from "@/components/academics/AcademicEventCard";
import { academicCalendarPage, academicCalendarHero, academicCalendar } from "@/data/academics";

export const dynamic = "force-dynamic";
export const metadata = {
  title: `${academicCalendarPage.heading} — Tilak Global School`,
  description: academicCalendar.description,
};

/**
 * AcademicCalendarPage — server component.
 * Renders ALL events from academicCalendar.events (same shared data export
 * used by AcademicCalendarPreview on the main Academics page).
 * Updating academicCalendar.events in data/academics.js updates both pages.
 */
export default function AcademicCalendarPage() {
  return (
    <>
      <AcademicsHero data={academicCalendarHero} />

      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section header */}
          <div className="mb-10 md:mb-14">

            {/* Session badge */}
            <span
              className="inline-block text-[10px] md:text-xs uppercase tracking-wider
                         text-red-700 border-l-2 border-red-600 pl-2 mb-4"
            >
              {academicCalendar.session}
            </span>

            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
              {academicCalendar.heading}
            </h2>

            <div
              aria-hidden="true"
              className="w-12 h-[2px] md:h-1 bg-red-600 mt-4"
            />

            <p className="mt-4 text-xs md:text-base text-gray-600 max-w-2xl leading-relaxed">
              {academicCalendar.description}
            </p>
          </div>

          {/* All events — stacked list on mobile, 3-col grid on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            {academicCalendar.events.map((event) => (
              <AcademicEventCard key={event.id} event={event} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
