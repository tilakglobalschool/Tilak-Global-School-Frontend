import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import AcademicStages from "@/components/home/AcademicStages";
import DirectorMessage from "@/components/shared/DirectorMessage";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import NewsGallerySection from "@/components/home/NewsGallerySection";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

import { getSettings, getContent, getNews, getGallery, getFaqs } from "@/lib/api";
import { directorMessage as staticDirectorMsg } from "@/data/home";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tilak Global School | CBSE School Jaipur — Nursery to Class XII",
  description:
    "Tilak Global School is an English-medium, co-educational CBSE-affiliated school in Jaipur offering classes from Play Group to Class XII. Admissions open for 2026-27.",
};

export default async function HomePage() {
  // Fetch all dynamic data in parallel — graceful fallback on error
  const [settingsRes, contentRes, newsRes, galleryRes, faqsRes] = await Promise.all([
    getSettings(),
    getContent("home"),
    getNews("?limit=4&status=published"),
    getGallery("?limit=4&status=published"),
    getFaqs(),
  ]);

  const settings = settingsRes.data?.settings || null;
  const content  = contentRes.data?.content   || {};
  const news     = newsRes.data?.posts         || [];
  const gallery  = galleryRes.data?.images     || [];
  const faqs     = faqsRes.data?.faqs          || [];

  // Build director data: prefer DB settings, fall back to static
  const directorData = settings ? {
    ...staticDirectorMsg,
    name:        settings.directorName        || staticDirectorMsg.name,
    designation: settings.directorDesignation || staticDirectorMsg.designation,
    quote:       settings.directorMessage     || staticDirectorMsg.quote,
    image: {
      ...staticDirectorMsg.image,
      src: settings.directorPhotoUrl
        ? (settings.directorPhotoUrl.startsWith("http")
            ? settings.directorPhotoUrl
            : `${process.env.API_URL?.replace("/api", "") || ""}${settings.directorPhotoUrl}`)
        : staticDirectorMsg.image.src,
    },
  } : staticDirectorMsg;

  return (
    <>
      {/* ── Homepage sections ── */}
      <HeroSection settings={settings} content={content} />
      <StatsBar />
      <WelcomeSection content={content} />
      <AcademicStages />
      <DirectorMessage data={directorData} />
      <FacilitiesSection />
      <WhyChooseSection />
      <NewsGallerySection news={news} gallery={gallery} />
      <FaqSection apiFaqs={faqs} />
      <CtaBanner settings={settings} />
    </>
  );
}
