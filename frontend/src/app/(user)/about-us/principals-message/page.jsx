import Image        from "next/image";
import PageHero     from "@/components/shared/PageHero";
import CtaBanner    from "@/components/shared/CtaBanner";
import {
  principalsMessageHero,
  principalMessage as d,
  subpageCta,
} from "@/data/about";

export const dynamic = "force-dynamic";

export const metadata = {
  title:       "Chairman's Message — Tilak Global School",
  description: "A vision for excellence, a commitment to values — from Mr. R. S. Tanwar, Chairman, Tilak Global School.",
};

export default async function PrincipalsMessagePage() {
  // Static public path — served directly by Next.js, no backend needed
  const photoSrc = d.image.src;

  return (
    <>
      <PageHero data={principalsMessageHero} />

      {/* ── Chairman's Message ── */}
      <section
        className="relative overflow-hidden bg-[#EAF0FB] py-16 md:py-24"
        style={{
          backgroundImage: "radial-gradient(rgba(11,61,145,0.06) 1px, transparent 1px)",
          backgroundSize:  "24px 24px",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8
                        grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Portrait ── */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start lg:sticky lg:top-28">
            <div className="relative w-56 sm:w-64 md:w-72 lg:w-full max-w-xs pb-4">
              {/* Navy backing plate */}
              <div aria-hidden="true"
                className="absolute -top-4 -left-4 w-full h-full bg-[#0B3D91] z-0" />
              {/* Red outline frame */}
              <div aria-hidden="true"
                className="absolute -bottom-4 -right-4 w-full h-full border-2 border-red-600 z-0" />

              {/* Portrait */}
              <div className="relative z-10 w-full aspect-[4/5] overflow-hidden shadow-2xl group">
                <Image
                  src={photoSrc || d.image.src}
                  alt={d.image.alt}
                  fill
                  sizes="(max-width: 1024px) 70vw, 30vw"
                  className="object-cover object-top
                             transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Bottom overlay */}
                <div aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3
                             bg-gradient-to-t from-[#0B3D91]/90 to-transparent pointer-events-none" />
                {/* Red hover tint — desktop only */}
                <div aria-hidden="true"
                  className="absolute inset-0 bg-red-600 opacity-0
                             md:group-hover:opacity-15
                             transition-opacity duration-500
                             mix-blend-multiply pointer-events-none" />
                {/* Name tag */}
                <div className="absolute bottom-4 left-4 border-l-2 border-red-500 pl-2">
                  <p className="text-sm font-serif font-bold text-white">{d.name}</p>
                  <p className="text-[10px] uppercase tracking-wider text-red-200 mt-0.5">
                    {d.image.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Message content ── */}
          <div className="lg:col-span-8">
            <div className="relative bg-white border border-[#0B3D91]/15 shadow-lg p-6 md:p-10">
              {/* Red top rule */}
              <div aria-hidden="true" className="absolute top-0 left-0 w-24 h-1 bg-red-600" />
              {/* Inner offset border */}
              <div aria-hidden="true"
                className="absolute inset-2 border border-[#0B3D91]/10 pointer-events-none" />

              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2
                               text-[11px] md:text-xs font-semibold uppercase
                               tracking-[0.2em] text-red-600">
                <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
                {d.heading}
              </span>

              {/* Sub-heading */}
              <h2 className="mt-3 text-lg md:text-2xl font-serif font-bold text-[#0B3D91]">
                {d.subheading}
              </h2>

              {/* Red rule */}
              <div aria-hidden="true" className="w-12 h-[2px] bg-red-600 mt-3 mb-5" />

              {/* Full message paragraphs */}
              <div className="space-y-4">
                {d.fullMessage.map((para, i) => (
                  <p key={i}
                    className={`text-sm md:text-base leading-relaxed
                      ${i === 0
                        ? "font-semibold text-[#0B3D91]"
                        : "text-gray-700"
                      }`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Closing */}
              <p className="mt-6 text-sm text-gray-600 italic">{d.closing}</p>

              {/* Signature row */}
              <div className="mt-5 pt-5 border-t border-gray-200 flex items-center gap-4">
                <span aria-hidden="true" className="w-10 h-[2px] bg-[#0B3D91] shrink-0" />
                <div>
                  <p className="text-sm md:text-base font-bold text-[#0B3D91]">{d.name}</p>
                  <p className="text-xs md:text-sm text-gray-600">{d.designation}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <CtaBanner data={subpageCta} />
    </>
  );
}
