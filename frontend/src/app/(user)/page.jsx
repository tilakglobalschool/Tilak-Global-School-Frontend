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
    "Tilak Global School — English-medium, co-educational CBSE school in Jaipur. Classes from Play Group to Class XII. CBSE Affiliation No. 1730870. Admissions open for session 2027-28. Located at Bindayaka (Bhutawali), Mukundpura Road, Jaipur.",
  keywords: [
    "Tilak Global School", "CBSE school Jaipur", "school admissions Jaipur 2027-28",
    "English medium school Jaipur", "Bindayaka school", "Nursery to Class 12 Jaipur",
  ],
  openGraph: {
    title:       "Tilak Global School | CBSE School Jaipur",
    description: "English-medium CBSE school — Play Group to Class XII. Admissions open 2027-28.",
    url:         "https://www.tilakglobalschool.com",
    images:      [{ url: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg", width: 1200, height: 630 }],
  },
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
