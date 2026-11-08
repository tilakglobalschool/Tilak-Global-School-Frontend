/* ─────────────────────────────────────────────────────────────────────────────
   DiwaliWishes — Official school Diwali greeting card section.
   Target anchor: id="diwali-wishes" (scrolled to from DiwaliHero CTA).
   Server component — no client interactivity needed here.
───────────────────────────────────────────────────────────────────────────── */
import { siteConfig } from "@/data/siteConfig";

/* ── Decorative diya SVG (same as in DiwaliHero but used statically here) ── */
function DiyaDecor({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 90"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="65" rx="30" ry="11" fill="#c4622a" />
      <path d="M20 65 Q24 78 50 80 Q76 78 80 65 Z" fill="#d4703a" />
      <ellipse cx="50" cy="62" rx="23" ry="8" fill="#e8a045" />
      <path d="M50 56 Q52 46 50 38" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 20 C45 27 43 33 46 38 Q50 42 54 38 C57 33 55 27 50 20Z" fill="url(#wFlame)" />
      <path d="M50 25 C48 30 48 34 50 37 Q51 38 52 37 C54 34 53 30 50 25Z" fill="#fff7d6" opacity="0.9" />
      <defs>
        <radialGradient id="wFlame" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="45%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#e65100" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Rangoli arc pattern (pure SVG) ── */
function RangoliCorner({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Petal arcs */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 60 60)`}>
          <path
            d="M60 60 Q72 44 60 30 Q48 44 60 60Z"
            fill="none"
            stroke="#c9952a"
            strokeWidth="1.2"
            opacity={0.35 + (i % 3) * 0.12}
          />
        </g>
      ))}
      {/* Centre dot */}
      <circle cx="60" cy="60" r="4" fill="#c9952a" opacity="0.5" />
      {/* Outer ring */}
      <circle cx="60" cy="60" r="28" fill="none" stroke="#c9952a" strokeWidth="0.8" opacity="0.25" strokeDasharray="4 3" />
    </svg>
  );
}

export default function DiwaliWishes() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .wishes-diya-glow {
            animation: wishGlow 2.8s ease-in-out infinite alternate;
          }
          @keyframes wishGlow {
            0%   { opacity: 0.25; transform: scale(1); }
            100% { opacity: 0.6;  transform: scale(1.08); }
          }
        }
      `}</style>

      <section
        id="diwali-wishes"
        aria-label="Diwali wishes from Tilak Global School"
        className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
        style={{ background: "linear-gradient(160deg, #fffaf0 0%, #fdf6e3 40%, #fef9f0 70%, #fffaf0 100%)" }}
      >

        {/* ── Background rangoli corners (decorative) ── */}
        <RangoliCorner
          className="absolute top-0 left-0 w-36 sm:w-48 opacity-50"
        />
        <RangoliCorner
          className="absolute top-0 right-0 w-36 sm:w-48 opacity-50"
          flip
        />
        <RangoliCorner
          className="absolute bottom-0 left-0 w-28 sm:w-40 opacity-35"
        />
        <RangoliCorner
          className="absolute bottom-0 right-0 w-28 sm:w-40 opacity-35"
          flip
        />

        {/* ── Outer golden border frame ── */}
        <div
          aria-hidden="true"
          className="absolute inset-3 sm:inset-5 pointer-events-none"
          style={{
            border: "1.5px solid",
            borderColor: "#c9952a55",
            boxShadow: "inset 0 0 60px rgba(200,150,40,0.07)",
          }}
        />

        {/* ── Top decorative rule ── */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[4px]"
          style={{ background: "linear-gradient(90deg, transparent, #c9952a 25%, #f6c94e 50%, #c9952a 75%, transparent)" }}
        />

        {/* ── Main content ── */}
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">

          {/* Small label */}
          <p
            className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ color: "#a06b1a" }}
          >
            A Special Message from Tilak Global School
          </p>

          {/* Diya illustration row */}
          <div className="flex items-end justify-center gap-3 sm:gap-5 mb-8" aria-hidden="true">
            <DiyaDecor className="w-12 sm:w-16 opacity-80" />

            {/* Centre large diya with glow */}
            <div className="relative">
              <div
                className="absolute rounded-full wishes-diya-glow"
                style={{
                  width: "120%", height: "120%",
                  top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  background: "radial-gradient(circle, rgba(240,170,20,0.38) 0%, transparent 70%)",
                  filter: "blur(14px)",
                }}
              />
              <DiyaDecor className="relative w-20 sm:w-24" />
            </div>

            <DiyaDecor className="w-12 sm:w-16 opacity-80" />
          </div>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
            <span className="flex-1 h-px max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, #c9952a)" }} />
            <span className="text-lg" style={{ color: "#c9952a" }}>✦</span>
            <span className="w-2 h-2 rounded-full" style={{ background: "#f6c94e" }} />
            <span className="text-lg" style={{ color: "#c9952a" }}>✦</span>
            <span className="flex-1 h-px max-w-[80px]" style={{ background: "linear-gradient(90deg, #c9952a, transparent)" }} />
          </div>

          {/* Main heading */}
          <h2
            className="font-serif font-bold mb-6 leading-tight"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
              color: "#7c4a08",
            }}
          >
            Lighting Up Lives,&nbsp;Spreading Happiness!
          </h2>

          {/* Greeting card message */}
          <div
            className="rounded-none border mx-auto mb-8 px-6 sm:px-10 py-8 text-left sm:text-left"
            style={{
              borderColor: "#c9952a40",
              background: "rgba(255,250,235,0.8)",
              boxShadow: "0 4px 32px rgba(180,120,10,0.10), inset 0 1px 0 rgba(200,150,40,0.15)",
            }}
          >
            {/* Salutation */}
            <p
              className="font-semibold text-sm sm:text-base mb-4"
              style={{ color: "#7c4a08", fontFamily: "Lora, Georgia, serif" }}
            >
              Dear Students, Parents, Teachers &amp; Well-Wishers,
            </p>

            {/* Body paragraphs */}
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "#5a3c10" }}>
              As we celebrate the beautiful festival of Diwali,{" "}
              <strong style={{ color: "#7c4a08" }}>{siteConfig.name}</strong> wishes every
              member of our school family a life filled with happiness, peace,
              prosperity and endless opportunities.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "#5a3c10" }}>
              May the light of knowledge guide our students towards success, may
              the spirit of kindness bring us closer, and may every new beginning
              inspire us to learn, grow and shine brighter.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: "#5a3c10" }}>
              Let us celebrate this festival with love, positivity and
              responsibility.
            </p>

            {/* Highlighted wish line */}
            <p
              className="text-sm sm:text-base font-semibold text-center py-3 px-4 leading-snug"
              style={{
                color: "#7c4a08",
                background: "linear-gradient(135deg, #fff8e7 0%, #fdedc4 100%)",
                border: "1px solid #e4b85440",
                fontFamily: "Lora, Georgia, serif",
              }}
            >
              🪔 &nbsp;Wishing You and Your Family a Very Happy &amp; Prosperous Diwali!&nbsp; 🪔
            </p>
          </div>

          {/* Closing / signature */}
          <div className="flex flex-col items-center gap-2">
            {/* Gold rule */}
            <div className="flex items-center gap-3 mb-3" aria-hidden="true">
              <span className="flex-1 h-px max-w-[60px]" style={{ background: "linear-gradient(90deg, transparent, #c9952a)" }} />
              <span style={{ color: "#c9952a" }}>✦</span>
              <span className="flex-1 h-px max-w-[60px]" style={{ background: "linear-gradient(90deg, #c9952a, transparent)" }} />
            </div>

            <p className="text-sm font-medium" style={{ color: "#a06b1a" }}>
              With Warm Wishes,
            </p>
            {/* School name badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 mt-1"
              style={{
                background: "linear-gradient(135deg, #7c3d08 0%, #b5620a 50%, #7c3d08 100%)",
              }}
            >
              {/* Logo initials */}
              <span
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0"
                style={{ color: "#7c3d08" }}
                aria-hidden="true"
              >
                TG
              </span>
              <span
                className="font-serif font-semibold text-sm sm:text-base tracking-wide"
                style={{ color: "#fde68a" }}
              >
                Team {siteConfig.name}
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom decorative rule ── */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{ background: "linear-gradient(90deg, transparent, #c9952a 25%, #f6c94e 50%, #c9952a 75%, transparent)" }}
        />
      </section>
    </>
  );
}
