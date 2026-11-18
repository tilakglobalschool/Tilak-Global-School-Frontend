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
    "Explore the CBSE/NCERT academic programme at Tilak Global School, Jaipur. Pre-Primary to Senior School (Class XII). Smart classrooms, science labs, experienced faculty and board exam preparation.",
  openGraph: {
    title:       "Academics | Tilak Global School Jaipur",
    description: "CBSE curriculum from Pre-Primary to Class XII at Tilak Global School, Jaipur.",
    url:         "https://www.tilakglobalschool.com/academics",
  },
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
