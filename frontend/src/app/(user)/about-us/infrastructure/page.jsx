export const dynamic = "force-dynamic";
import PageHero from "@/components/shared/PageHero";
import { infrastructurePage, infrastructureHero } from "@/data/about";

export const metadata = { title: `${infrastructurePage.heading} — Tilak Global School` };

export default function InfrastructurePage() {
  return (
    <>
      <PageHero data={infrastructureHero} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-[#5B6785]">{infrastructurePage.subtext}</p>
      </div>
    </>
  );
}

