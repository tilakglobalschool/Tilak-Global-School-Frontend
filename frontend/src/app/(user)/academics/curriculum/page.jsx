import AcademicsHero              from "@/components/academics/AcademicsHero";
import AcademicStages             from "@/components/home/AcademicStages";
import CurriculumMethodologySection from "@/components/academics/CurriculumMethodologySection";
import CtaBanner                  from "@/components/shared/CtaBanner";
import { getContent }             from "@/lib/api";
import { curriculumPage, curriculumHero, academicsCta } from "@/data/academics";

export const dynamic = "force-dynamic";

export const metadata = {
  title:       `${curriculumPage.heading} — Tilak Global School`,
  description: curriculumPage.subtext,
};

export default async function CurriculumPage() {
  const { data } = await getContent("academics");
  const content  = data?.content || {};

  return (
    <>
      {/* Hero */}
      <AcademicsHero data={curriculumHero} />

      {/* Academic Stages — four image cards on white bg */}
      <AcademicStages content={content} />

      {/* CBSE Curriculum (left) + Teaching Methodology (right) */}
      <CurriculumMethodologySection />

      {/* Admission CTA */}
      <CtaBanner data={academicsCta} />
    </>
  );
}
