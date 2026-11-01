import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import AdmissionProcess from "@/components/admissions/AdmissionProcess";
import EligibilityDocumentsSection from "@/components/admissions/EligibilityDocumentsSection";
import ApplyOnlineSection from "@/components/admissions/ApplyOnlineSection";
import FeeStructureSection from "@/components/admissions/FeeStructureSection";
import AdmissionsFaqWrapper from "@/components/admissions/AdmissionsFaqWrapper";
import CtaBanner from "@/components/shared/CtaBanner";
import { admissionsPage, admissionsHero, admissionsCta } from "@/data/admissions";

export const metadata = {
  title: `${admissionsPage.heading} — Tilak Global School`,
  description:
    "Start your child's educational journey with Tilak Global School. Explore our admission process, eligibility and available classes.",
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
