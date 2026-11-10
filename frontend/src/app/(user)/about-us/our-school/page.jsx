export const dynamic = "force-dynamic";
import PageHero from "@/components/shared/PageHero";
import { ourSchoolPage, ourSchoolHero } from "@/data/about";

export const metadata = { title: `${ourSchoolPage.heading} — Tilak Global School` };

export default function OurSchoolPage() {
  return (
    <>
      <PageHero data={ourSchoolHero} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-[#5B6785]">{ourSchoolPage.subtext}</p>
      </div>
    </>
  );
}

