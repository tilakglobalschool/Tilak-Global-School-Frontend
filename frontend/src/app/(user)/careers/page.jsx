import { careersPage } from "@/data/contact";

export const dynamic = "force-dynamic";
export const metadata = { title: `${careersPage.heading} — Tilak Global School` };
export default function CareersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#0B3D91] mb-4">{careersPage.heading}</h1>
      <p className="text-[#5B6785]">{careersPage.subtext}</p>
    </div>
  );
}
