import DiwaliHero from "@/components/home/DiwaliHero";
import DiwaliWishes from "@/components/home/DiwaliWishes";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import AcademicStages from "@/components/home/AcademicStages";
import DirectorMessage from "@/components/shared/DirectorMessage";
import { directorMessage } from "@/data/home";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import NewsGallerySection from "@/components/home/NewsGallerySection";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata = {
  title: "Home — Tilak Global School | CBSE School Jaipur",
  description:
    "Tilak Global School is an English-medium co-educational CBSE school in Jaipur offering classes from Nursery to Class XII.",
};

export default function HomePage() {
  return (
    <>
      {/* ── Diwali Special (seasonal — remove after festival) ── */}
      <DiwaliHero />
      <DiwaliWishes />

      {/* ── Permanent homepage sections ── */}
      <HeroSection />
      <StatsBar />
      <WelcomeSection />
      <AcademicStages />
      <DirectorMessage data={directorMessage} />
      <FacilitiesSection />
      <WhyChooseSection />
      <NewsGallerySection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
