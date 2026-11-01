/**
 * Server component wrapper — fetches FAQs from API and passes to
 * the client accordion component. Falls back to static data if API fails.
 */
import { getFaqs } from "@/lib/api";
import AdmissionsFaqSection from "./AdmissionsFaqSection";

export default async function AdmissionsFaqWrapper() {
  const { data } = await getFaqs();
  const apiFaqs = data?.faqs;

  // Pass API FAQs as a prop override if available
  return <AdmissionsFaqSection apiFaqs={apiFaqs} />;
}
