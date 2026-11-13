/**
 * FaqSectionServer — async server component.
 * Fetches live FAQs from backend, passes to the client FaqSection component.
 * Falls back to static data/home.js FAQs if API is unavailable or empty.
 */
import { getFaqs } from "@/lib/api";
import FaqSection from "@/components/home/FaqSection";
import { faqs as staticFaqs } from "@/data/home";

export default async function FaqSectionServer() {
  const { data } = await getFaqs();
  const apiFaqs = data?.faqs || [];

  // Map API FAQs to the shape FaqSection expects
  const liveFaqItems = apiFaqs.length > 0
    ? apiFaqs.map((faq, i) => ({
        id:       faq._id || i + 1,
        question: faq.question,
        answer:   faq.answer,
      }))
    : staticFaqs.items;

  return <FaqSection faqItems={liveFaqItems} />;
}
