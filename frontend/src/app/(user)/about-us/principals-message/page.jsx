export const dynamic = "force-dynamic";
import PageHero from "@/components/shared/PageHero";
import { principalsMessagePage, principalsMessageHero } from "@/data/about";

export const metadata = { title: `${principalsMessagePage.heading} — Tilak Global School` };

export default function PrincipalsMessagePage() {
  return (
    <>
      <PageHero data={principalsMessageHero} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-[#5B6785]">{principalsMessagePage.subtext}</p>
      </div>
    </>
  );
}

