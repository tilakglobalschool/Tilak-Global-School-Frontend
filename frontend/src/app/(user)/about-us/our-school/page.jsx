import PageHero      from "@/components/shared/PageHero";
import WhoWeAre      from "@/components/about/WhoWeAre";
import OurJourney    from "@/components/about/OurJourney";
import CtaBanner     from "@/components/shared/CtaBanner";
import { getContent } from "@/lib/api";
import { ourSchoolHero, subpageCta } from "@/data/about";

export const dynamic = "force-dynamic";

export const metadata = {
  title:       "Our School — Tilak Global School | CBSE School Jaipur",
  description: "Learn about Tilak Global School — a co-educational English-medium CBSE school in Jaipur offering classes from Nursery to Class XII, part of the Tilak Group.",
};

export default async function OurSchoolPage() {
  const { data } = await getContent("about");
  const content  = data?.content || {};

  return (
    <>
      <PageHero data={ourSchoolHero} />
      {/* Who We Are — full section with pillars, facts, image */}
      <WhoWeAre content={content} />
      {/* Our Journey — editorial text + layered image; CTA hidden via prop */}
      <OurJourney showCta={false} />
      <CtaBanner data={subpageCta} />
    </>
  );
}
