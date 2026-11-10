export const dynamic = "force-dynamic";
import AcademicsHero from "@/components/academics/AcademicsHero";
import { curriculumPage, curriculumHero } from "@/data/academics";

export const metadata = {
  title: `${curriculumPage.heading} — Tilak Global School`,
  description: curriculumPage.subtext,
};

export default function CurriculumPage() {
  return (
    <>
      <AcademicsHero data={curriculumHero} />

      {/* Placeholder content — to be replaced with full Curriculum section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <p className="text-[#5B6785] text-sm md:text-base leading-relaxed">
          {curriculumPage.subtext}
        </p>
      </div>
    </>
  );
}

