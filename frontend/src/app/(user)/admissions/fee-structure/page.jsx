export const dynamic = "force-dynamic";
import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import FeeStructureSection from "@/components/admissions/FeeStructureSection";
import { feeStructurePage, feeStructureHero } from "@/data/admissions";

export const metadata = {
  title: `${feeStructurePage.heading} — Tilak Global School`,
  description: feeStructurePage.subtext,
};

export default function FeeStructurePage() {
  return (
    <>
      <AdmissionsHero data={feeStructureHero} />
      <FeeStructureSection />
    </>
  );
}

