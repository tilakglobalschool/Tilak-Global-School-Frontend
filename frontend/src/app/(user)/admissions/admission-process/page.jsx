export const dynamic = "force-dynamic";
import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import AdmissionProcess from "@/components/admissions/AdmissionProcess";
import EligibilityDocumentsSection from "@/components/admissions/EligibilityDocumentsSection";
import { admissionProcessPage, admissionProcessHero } from "@/data/admissions";

export const metadata = {
  title: `${admissionProcessPage.heading} — Tilak Global School`,
  description: admissionProcessPage.subtext,
};

export default function AdmissionProcessPage() {
  return (
    <>
      <AdmissionsHero data={admissionProcessHero} />
      <AdmissionProcess />
      <EligibilityDocumentsSection />
    </>
  );
}

