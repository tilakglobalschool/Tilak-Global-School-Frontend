export const dynamic = "force-dynamic";
import AcademicsHero from "@/components/academics/AcademicsHero";
import { facultyPage, facultyHero } from "@/data/academics";

export const metadata = {
  title: `${facultyPage.heading} — Tilak Global School`,
  description: facultyPage.subtext,
};

export default function FacultyPage() {
  return (
    <>
      <AcademicsHero data={facultyHero} />

      {/* Placeholder content — to be replaced with full Faculty section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <p className="text-[#5B6785] text-sm md:text-base leading-relaxed">
          {facultyPage.subtext}
        </p>
      </div>
    </>
  );
}

