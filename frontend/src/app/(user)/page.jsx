import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import AcademicStages from "@/components/home/AcademicStages";
import DirectorMessage from "@/components/shared/DirectorMessage";
import { directorMessage } from "@/data/home";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import NewsGallerySectionServer from "@/components/home/NewsGallerySectionServer";
import FaqSectionServer from "@/components/home/FaqSectionServer";
import CtaBanner from "@/components/home/CtaBanner";
import { getSettings } from "@/lib/api";
import { getUploadUrl } from "@/lib/uploadUrl";

export const metadata = {
  title: "Home — Tilak Global School | CBSE School Jaipur",
  description:
    "Tilak Global School is an English-medium co-educational CBSE school in Jaipur offering classes from Nursery to Class XII.",
};

export default async function HomePage() {
  // Fetch live settings for director message
  const { data: settingsData } = await getSettings();
  const s = settingsData?.settings || settingsData || null;

  // Build director message from live settings, fall back to static data
  const directorData = s?.directorName
    ? {
        heading:     "Director's Message",
        quote:       s.directorMessage || directorMessage.quote,
        note:        directorMessage.note,
        name:        s.directorName,
        designation: s.directorDesignation || directorMessage.designation,
        cta:         directorMessage.cta,
        image: {
          src:     s.directorPhotoUrl
            ? getUploadUrl(s.directorPhotoUrl)
            : directorMessage.image.src,
          alt:     s.directorName + " – Director, Tilak Global School",
          caption: "Director",
        },
      }
    : directorMessage;

  return (
    <>
      <HeroSection />
      <StatsBar />
      <WelcomeSection />
      <AcademicStages />
      <DirectorMessage data={directorData} />
      <FacilitiesSection />
      <WhyChooseSection />
      <NewsGallerySectionServer />
      <FaqSectionServer />
      <CtaBanner />
    </>
  );
}
