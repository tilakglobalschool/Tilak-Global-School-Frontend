import AcademicsHero      from "@/components/academics/AcademicsHero";
import FacultyIntroduction from "@/components/academics/FacultyIntroduction";
import TeachingMethodology from "@/components/academics/TeachingMethodology";
import CtaBanner           from "@/components/shared/CtaBanner";
import { facultyPage, facultyHero, academicsCta } from "@/data/academics";

export const dynamic = "force-dynamic";

export const metadata = {
  title:       `${facultyPage.heading} — Tilak Global School`,
  description: facultyPage.subtext,
};

export default function FacultyPage() {
  return (
    <>
      {/* Hero */}
      <AcademicsHero data={facultyHero} />

      {/* Faculty Introduction — editorial text + classroom image */}
      <FacultyIntroduction />

      {/* Teaching Methodology — reused directly, on light-blue bg */}
      <section className="w-full bg-[#F4F7FC] border-t border-[#0B3D91]/10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <TeachingMethodology />
        </div>
      </section>

      {/* Faculty profiles omitted — no verified names/photos available */}

      {/* Admission CTA */}
      <CtaBanner data={academicsCta} />
    </>
  );
}
