import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import AdmissionProcess from "@/components/admissions/AdmissionProcess";
import EligibilityDocumentsSection from "@/components/admissions/EligibilityDocumentsSection";
import ApplyOnlineSection from "@/components/admissions/ApplyOnlineSection";
import FeeStructureSection from "@/components/admissions/FeeStructureSection";
import AdmissionsFaqWrapper from "@/components/admissions/AdmissionsFaqWrapper";
import CtaBanner from "@/components/shared/CtaBanner";
import { admissionsPage, admissionsHero, admissionsCta } from "@/data/admissions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admissions 2026-27 — Tilak Global School | CBSE School Jaipur",
  description:
    "Apply for admission at Tilak Global School, Jaipur for session 2026-27. CBSE-affiliated school offering Play Group to Class XII. Easy 4-step process.",
};

export default function AdmissionsPage() {
  return (
    <>
      <AdmissionsHero data={admissionsHero} />
      <AdmissionProcess />
      <EligibilityDocumentsSection />
      <ApplyOnlineSection />
      <FeeStructureSection />
      <AdmissionsFaqWrapper />
      <CtaBanner data={admissionsCta} />
    </>
  );
}
