import PageHero       from "@/components/shared/PageHero";
import VisionMission  from "@/components/about/VisionMission";
import CtaBanner      from "@/components/shared/CtaBanner";
import { getContent } from "@/lib/api";
import { visionMissionHero, educationalPhilosophy, subpageCta } from "@/data/about";

export const dynamic = "force-dynamic";

export const metadata = {
  title:       "Vision & Mission — Tilak Global School",
  description: "The vision, mission and educational philosophy of Tilak Global School — a CBSE school in Jaipur committed to holistic, stress-free learning.",
};

export default async function VisionMissionPage() {
  const { data } = await getContent("about");
  const content  = data?.content || {};
  const d        = educationalPhilosophy;

  return (
    <>
      <PageHero data={visionMissionHero} />

      {/* Vision, Mission & Core Values cards */}
      <VisionMission content={content} />

      {/* Educational Philosophy — editorial text section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section header */}
          <div className="max-w-3xl mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {d.eyebrow}
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0B3D91] leading-tight">
              {d.heading}
            </h2>
            <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-4" />
            <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed">
              {d.intro}
            </p>
          </div>

          {/* Three philosophy points */}
          <div className="space-y-0 divide-y divide-gray-200 border-y border-gray-200">
            {d.points.map((point) => (
              <div
                key={point.number}
                className="grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-4 md:gap-8
                           items-start py-8 md:py-10 px-0 md:px-4
                           group hover:bg-[#EEF3FB] transition-colors duration-200"
              >
                {/* Number */}
                <div className="flex items-center gap-4 md:block">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-red-600 leading-none">
                    {point.number}
                  </span>
                  {/* Mobile divider */}
                  <div aria-hidden="true" className="flex-1 h-px bg-gray-200 md:hidden" />
                </div>

                {/* Content */}
                <div className="md:border-l md:border-[#0B3D91]/15 md:pl-8">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#0B3D91] mb-3
                                 group-hover:text-red-600 transition-colors duration-200">
                    {point.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer note */}
          <p className="mt-8 text-[11px] text-red-700 border-l-2 border-red-600 pl-3">
            {d.note}
          </p>
        </div>
      </section>

      <CtaBanner data={subpageCta} />
    </>
  );
}
