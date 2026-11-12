import PageHero       from "@/components/shared/PageHero";
import DirectorMessage from "@/components/shared/DirectorMessage";
import CtaBanner       from "@/components/shared/CtaBanner";
import { getSettings } from "@/lib/api";
import { principalsMessageHero, aboutDirectorMessage, subpageCta } from "@/data/about";

export const dynamic = "force-dynamic";

export const metadata = {
  title:       "Principal's Message — Tilak Global School",
  description: "A message from the leadership of Tilak Global School, Jaipur.",
};

export default async function PrincipalsMessagePage() {
  const { data } = await getSettings();
  const settings  = data?.settings || null;

  /*
   * Use the existing Director's Message data (R. S. Tanwar) since no separate
   * Principal details have been confirmed by the school yet.
   * cta is null in aboutDirectorMessage → the "Read Full Message" button is
   * automatically hidden by DirectorMessage's {data.cta && ...} guard.
   * API settings override name, designation, quote, and photo when available.
   */
  const messageData = {
    ...aboutDirectorMessage,
    name:        settings?.directorName        || aboutDirectorMessage.name,
    designation: settings?.directorDesignation || aboutDirectorMessage.designation,
    quote:       settings?.directorMessage     || aboutDirectorMessage.quote,
    cta:         null,   // hide "Read Full Message" — already on the message page
    image: {
      ...aboutDirectorMessage.image,
      src: settings?.directorPhotoUrl?.startsWith("http")
        ? settings.directorPhotoUrl
        : aboutDirectorMessage.image.src,
    },
  };

  return (
    <>
      <PageHero data={principalsMessageHero} />
      {/* DirectorMessage with cta:null hides the "Read Full Message" button */}
      <DirectorMessage data={messageData} bg="bg-[#EAF0FB]" />
      <CtaBanner data={subpageCta} />
    </>
  );
}
