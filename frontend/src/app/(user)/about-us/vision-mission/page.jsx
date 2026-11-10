export const dynamic = "force-dynamic";
import PageHero from "@/components/shared/PageHero";
import { visionMissionPage, visionMissionHero } from "@/data/about";

export const metadata = { title: `${visionMissionPage.heading} — Tilak Global School` };

export default function VisionMissionPage() {
  return (
    <>
      <PageHero data={visionMissionHero} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-[#5B6785]">{visionMissionPage.subtext}</p>
      </div>
    </>
  );
}

