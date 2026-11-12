export const dynamic = "force-dynamic";
import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import ApplyOnlineSection from "@/components/admissions/ApplyOnlineSection";
import { onlineAdmissionFormPage, onlineAdmissionHero } from "@/data/admissions";

export const metadata = {
  title: `${onlineAdmissionFormPage.heading} — Tilak Global School`,
  description: onlineAdmissionFormPage.subtext,
};

export default function OnlineAdmissionFormPage() {
  return (
    <>
      <AdmissionsHero data={onlineAdmissionHero} />
      <ApplyOnlineSection />
    </>
  );
}

