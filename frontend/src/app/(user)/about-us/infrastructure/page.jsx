import PageHero      from "@/components/shared/PageHero";
import CampusSection from "@/components/about/CampusSection";
import FacilityCard  from "@/components/home/FacilityCard";
import CtaBanner     from "@/components/shared/CtaBanner";
import { infrastructureHero, subpageCta } from "@/data/about";
import { facilities } from "@/data/home";

export const dynamic = "force-dynamic";

export const metadata = {
  title:       "Infrastructure — Tilak Global School",
  description: "Explore the campus, classrooms, laboratories, library, sports ground, multi-purpose hall and other facilities at Tilak Global School, Jaipur.",
};

export default function InfrastructurePage() {
  return (
    <>
      <PageHero data={infrastructureHero} />

      {/* Our Campus — mosaic image section */}
      <CampusSection />

      {/* School Facilities — full 8-card grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center justify-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {facilities.heading}
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0B3D91] leading-tight">
              {facilities.heading}
            </h2>
            <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-4" />
            <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {facilities.subtext}
            </p>
          </div>

          {/*
            Infrastructure page shows full descriptions always visible.
            FacilityCard already uses image-on-top + caption-below layout
            with line-clamp-3 md:line-clamp-4 — suitable for this grid.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {facilities.items.map((facility, i) => (
              <FacilityCard key={facility.id} facility={facility} index={i} />
            ))}
          </div>

        </div>
      </section>

      <CtaBanner data={subpageCta} />
    </>
  );
}
