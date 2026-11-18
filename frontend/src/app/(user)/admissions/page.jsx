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
  title: "Admissions 2027-28 — Tilak Global School | CBSE School Jaipur",
  description:
    "Apply for admission at Tilak Global School, Jaipur for session 2027-28. CBSE-affiliated school offering Play Group to Class XII. Simple 4-step process. Contact: +91 9119112335.",
  keywords: ["Tilak Global School admission 2027-28", "school admission Jaipur", "CBSE school admission Jaipur", "Nursery admission Jaipur"],
  openGraph: {
    title:       "Admissions 2027-28 | Tilak Global School",
    description: "CBSE school admissions open for 2027-28. Play Group to Class XII, Jaipur.",
    url:         "https://www.tilakglobalschool.com/admissions",
  },
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
