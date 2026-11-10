import AcademicsHero              from "@/components/academics/AcademicsHero";
import AcademicStages             from "@/components/home/AcademicStages";
import CurriculumMethodologySection from "@/components/academics/CurriculumMethodologySection";
import AcademicCalendarPreview    from "@/components/academics/AcademicCalendarPreview";
import ExaminationInformation     from "@/components/academics/ExaminationInformation";
import CtaBanner                  from "@/components/shared/CtaBanner";
import { getContent }             from "@/lib/api";
import { academicsPage, academicsHero, academicsCta } from "@/data/academics";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Academics — Tilak Global School | CBSE Curriculum Jaipur",
  description:
    "Explore the CBSE/NCERT academic programme at Tilak Global School, Jaipur — Nursery through Class XII. Smart classrooms, experienced faculty, board exam preparation.",
};

export default async function AcademicsPage() {
  const { data } = await getContent("academics");
  const content  = data?.content || {};

  return (
    <>
      <AcademicsHero data={academicsHero} />
      <AcademicStages content={content} />
      <CurriculumMethodologySection />
      <AcademicCalendarPreview />
      <ExaminationInformation />
      <CtaBanner data={academicsCta} />
    </>
  );
}
