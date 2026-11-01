import PageHero from "@/components/shared/PageHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import VisionMission from "@/components/about/VisionMission";
import DirectorMessage from "@/components/shared/DirectorMessage";
import OurJourney from "@/components/about/OurJourney";
import ManagementSection from "@/components/about/ManagementSection";
import CampusSection from "@/components/about/CampusSection";
import CtaBanner from "@/components/shared/CtaBanner";
import { aboutPage, aboutHero, aboutDirectorMessage, aboutCta } from "@/data/about";
import { getSettings } from "@/lib/api";
import { getUploadUrl } from "@/lib/uploadUrl";

export const metadata = { title: `${aboutPage.heading} — Tilak Global School` };

export default async function AboutUsPage() {
  const { data } = await getSettings();
  const s = data?.settings || null;

  const directorData = s?.directorName
    ? {
        heading:     aboutDirectorMessage.heading,
        quote:       s.directorMessage || aboutDirectorMessage.quote,
        note:        aboutDirectorMessage.note,
        name:        s.directorName,
        designation: s.directorDesignation || aboutDirectorMessage.designation,
        cta:         null,
        image: {
          src:     s.directorPhotoUrl
            ? getUploadUrl(s.directorPhotoUrl)
            : aboutDirectorMessage.image.src,
          alt:     s.directorName + " – Director, Tilak Global School",
          caption: s.directorDesignation || "Director",
        },
      }
    : aboutDirectorMessage;

  return (
    <>
      <PageHero data={aboutHero} />
      <WhoWeAre />
      <VisionMission />
      <DirectorMessage data={directorData} bg="bg-white" />
      <OurJourney />
      <ManagementSection />
      <CampusSection />
      <CtaBanner data={aboutCta} />
    </>
  );
}
