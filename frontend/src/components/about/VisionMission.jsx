"use client";

import VisionMissionCard from "@/components/about/VisionMissionCard";
import MobileSlider from "@/components/ui/MobileSlider";
import { visionMission as d } from "@/data/about";

/**
 * VisionMission — client component (MobileSlider needs useRef/useState).
 * Props:
 *   content — CMS blocks from /api/content/about (optional)
 */
export default function VisionMission({ content = {} }) {
  // CMS overrides
  const cmsVision  = content?.["about.vision.text"]?.value  || null;
  const cmsMission = content?.["about.mission.text"]?.value || null;
  const cmsValues  = content?.["about.values.list"]?.value  || null;

  // Build cards — override with CMS where available
  const cards = d.cards.map(card => {
    if (card.id === "vision"  && cmsVision)  return { ...card, body: cmsVision };
    if (card.id === "mission" && cmsMission && !cmsMission.includes("["))
      return { ...card, body: cmsMission };
    if (card.id === "values"  && Array.isArray(cmsValues))
      return { ...card, list: cmsValues };
    return card;
  });
  return (
    <section
      className="relative overflow-hidden bg-[#EEF3FB] py-16 md:py-24"
      style={{
        backgroundImage:
          "radial-gradient(rgba(11,61,145,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── Decorative blurred glows ── */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-80 h-80
                   bg-[#0B3D91]/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-20 w-96 h-96
                   bg-red-600/5 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Section header — two-column on lg+ ── */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-end
                        mb-10 md:mb-14">

          {/* Left: eyebrow + heading + rule */}
          <div className="lg:col-span-7">
            <span
              className="inline-flex items-center gap-2
                         text-[11px] md:text-xs font-semibold uppercase
                         tracking-[0.2em] text-red-600"
            >
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {d.sectionHeading}
            </span>

            <h2
              className="mt-4 text-2xl md:text-4xl font-serif font-bold
                         text-[#0B3D91] leading-tight"
            >
              {d.sectionHeading}
            </h2>

            <div
              aria-hidden="true"
              className="w-12 h-[2px] md:h-1 bg-red-600 mt-3"
            />
          </div>

          {/* Right: subtext — sits beside heading on lg+ */}
          {d.subtext && (
            <div
              className="lg:col-span-5 lg:pl-8
                         lg:border-l border-[#0B3D91]/15
                         mt-4 lg:mt-0"
            >
              <p className="text-xs md:text-base text-gray-600 leading-relaxed">
                {d.subtext}
              </p>
            </div>
          )}
        </div>

        {/* ── Mobile / tablet slider — hidden md+ ── */}
        <MobileSlider
          items={cards}
          breakpoint="md"
          slideWidth="w-[calc(100vw-2.5rem)]"
          activeDotClass="w-6 h-2 bg-red-600"
          renderItem={(card) => <VisionMissionCard card={card} />}
        />

        {/* ── Desktop grid — hidden below md ── */}
        <div
          className="hidden md:grid md:grid-cols-3
                     gap-6 md:gap-8 lg:gap-10 items-stretch"
        >
          {cards.map((card) => (
            <VisionMissionCard key={card.id} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}
