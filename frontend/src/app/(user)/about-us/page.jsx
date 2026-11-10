import PageHero        from "@/components/shared/PageHero";
import WhoWeAre        from "@/components/about/WhoWeAre";
import VisionMission   from "@/components/about/VisionMission";
import DirectorMessage from "@/components/shared/DirectorMessage";
import OurJourney      from "@/components/about/OurJourney";
import ManagementSection from "@/components/about/ManagementSection";
import CampusSection   from "@/components/about/CampusSection";
import CtaBanner       from "@/components/shared/CtaBanner";
import { getSettings, getContent } from "@/lib/api";
import {
  aboutPage, aboutHero, aboutDirectorMessage, aboutCta,
} from "@/data/about";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us — Tilak Global School | CBSE School Jaipur",
  description:
    "Learn about Tilak Global School — a co-educational English-medium CBSE school in Jaipur offering classes from Nursery to Class XII. Our vision, mission and values.",
};

export default async function AboutUsPage() {
  const [settingsRes, contentRes] = await Promise.all([
    getSettings(),
    getContent("about"),
  ]);

  const settings = settingsRes.data?.settings || null;
  const content  = contentRes.data?.content   || {};

  const directorData = {
    ...aboutDirectorMessage,
    name:        settings?.directorName        || aboutDirectorMessage.name,
    designation: settings?.directorDesignation || aboutDirectorMessage.designation,
    quote:       settings?.directorMessage     || content?.["about.director.message"]?.value || aboutDirectorMessage.quote,
    image: {
      ...aboutDirectorMessage.image,
      src: settings?.directorPhotoUrl?.startsWith("http")
        ? settings.directorPhotoUrl
        : aboutDirectorMessage.image.src,
    },
  };

  return (
    <>
      <PageHero data={aboutHero} />
      <WhoWeAre      content={content} />
      <VisionMission content={content} />
      <DirectorMessage data={directorData} bg="bg-white" />
      <OurJourney />
      <ManagementSection />
      <CampusSection />
      <CtaBanner data={aboutCta} />
    </>
  );
}
