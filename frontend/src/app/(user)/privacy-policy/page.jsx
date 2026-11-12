export const dynamic = "force-dynamic";
import { privacyPolicyPage } from "@/data/contact";
export const metadata = { title: `${privacyPolicyPage.heading} — Tilak Global School` };
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#0B3D91] mb-4">{privacyPolicyPage.heading}</h1>
      <p className="text-[#5B6785]">{privacyPolicyPage.subtext}</p>
    </div>
  );
}

