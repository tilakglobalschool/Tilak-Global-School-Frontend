"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   DiwaliHero — Premium Diwali festive hero section
   Placed at the very top of the homepage, above HeroSection.
   Respects prefers-reduced-motion for all animations.
───────────────────────────────────────────────────────────────────────────── */

/* ── Pure-CSS diya SVG drawn inline (no external asset needed) ── */
function DiyaSvg({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* Diya body */}
      <ellipse cx="60" cy="72" rx="36" ry="13" fill="#b5541a" />
      <path
        d="M24 72 Q28 88 60 90 Q92 88 96 72 Z"
        fill="#c4622a"
      />
      {/* Inner bowl */}
      <ellipse cx="60" cy="68" rx="28" ry="9" fill="#d4703a" />
      {/* Oil */}
      <ellipse cx="60" cy="66" rx="20" ry="6" fill="#e8a045" />
      {/* Wick */}
      <path
        d="M60 60 Q63 50 60 42"
        stroke="#888"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Flame outer glow */}
      <ellipse cx="60" cy="36" rx="10" ry="14" fill="#ff990020" className="diya-glow-outer" />
      {/* Flame body */}
      <path
        d="M60 22 C54 30 52 36 56 42 Q60 46 64 42 C68 36 66 30 60 22Z"
        fill="url(#flameGrad)"
        className="diya-flame"
      />
      {/* Flame core */}
      <path
        d="M60 28 C58 33 57 37 59 40 Q60 42 61 40 C63 37 62 33 60 28Z"
        fill="#fff7d6"
        opacity="0.9"
      />
      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="40%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#e65100" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Floating particle (golden dust mote) ── */
function Particle({ style }) {
  return (
    <span
      aria-hidden="true"
      className="absolute rounded-full bg-[#f6c94e] opacity-0 pointer-events-none diwali-particle"
      style={style}
    />
  );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 3 + (i % 4),
  left: `${5 + (i * 5.4) % 90}%`,
  delay: `${(i * 0.37) % 3}s`,
  duration: `${3.5 + (i * 0.22) % 2.5}s`,
  top: `${10 + (i * 4.7) % 75}%`,
}));

export default function DiwaliHero() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Intersection observer — start entrance animations once in view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToWishes = () => {
    document.getElementById("diwali-wishes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Global keyframes injected once ── */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .diya-flame          { animation: flicker 1.8s ease-in-out infinite alternate; transform-origin: center bottom; }
          .diya-glow-outer     { animation: glowPulse 2.2s ease-in-out infinite alternate; }
          .diwali-particle     { animation: floatUp var(--dur,4s) var(--delay,0s) ease-in infinite; }
          @keyframes flicker {
            0%   { transform: scaleX(1)   scaleY(1)   rotate(-1deg); opacity: 1; }
            30%  { transform: scaleX(0.92) scaleY(1.05) rotate(1deg);  opacity: 0.95; }
            60%  { transform: scaleX(1.05) scaleY(0.97) rotate(-0.5deg); opacity: 1; }
            100% { transform: scaleX(0.95) scaleY(1.08) rotate(1.5deg); opacity: 0.97; }
          }
          @keyframes glowPulse {
            0%   { opacity: 0.15; r: 10; }
            100% { opacity: 0.45; r: 14; }
          }
          @keyframes floatUp {
            0%   { transform: translateY(0)   scale(1);   opacity: 0; }
            15%  { opacity: 0.7; }
            85%  { opacity: 0.4; }
            100% { transform: translateY(-90px) scale(0.4); opacity: 0; }
          }
          .diwali-enter-1 { animation: enterFade 0.8s 0.1s both; }
          .diwali-enter-2 { animation: enterFade 0.8s 0.35s both; }
          .diwali-enter-3 { animation: enterFade 0.8s 0.6s both; }
          .diwali-enter-4 { animation: enterFade 0.8s 0.85s both; }
          .diwali-enter-5 { animation: enterFade 0.8s 1.1s both; }
          @keyframes enterFade {
            from { opacity: 0; transform: translateY(22px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>

      <section
        id="diwali-hero"
        ref={sectionRef}
        aria-label="Diwali celebration banner"
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d1b3e 0%, #1a0a2e 25%, #2d0f0a 55%, #1a0a2e 80%, #0d1b3e 100%)",
          minHeight: "clamp(460px, 70vh, 720px)",
        }}
      >
        {/* ── Background: subtle radial glows ── */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          {/* Deep warm glow — center right */}
          <div
            className="absolute rounded-full"
            style={{
              width: "55%", height: "70%",
              top: "15%", right: "-10%",
              background: "radial-gradient(circle, rgba(180,80,10,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Cool glow — left */}
          <div
            className="absolute rounded-full"
            style={{
              width: "45%", height: "60%",
              top: "10%", left: "-8%",
              background: "radial-gradient(circle, rgba(80,30,140,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Golden center highlight */}
          <div
            className="absolute rounded-full"
            style={{
              width: "30%", height: "35%",
              top: "30%", left: "35%",
              background: "radial-gradient(circle, rgba(240,170,20,0.07) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />
        </div>

        {/* ── Floating particles ── */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((p) => (
            <Particle
              key={p.id}
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.top,
                "--dur":   p.duration,
                "--delay": p.delay,
              }}
            />
          ))}
        </div>

        {/* ── Decorative horizontal golden rule (top) ── */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #c9952a 30%, #f6c94e 50%, #c9952a 70%, transparent)" }}
        />

        {/* ── Main content grid ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div
            className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-center py-16 sm:py-20"
          >

            {/* ── Left diya (hidden on mobile, shows on lg) ── */}
            <div
              aria-hidden="true"
              className="hidden lg:flex justify-end pr-12 items-end pb-4"
            >
              <div className="relative">
                {/* glow behind diya */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 160, height: 120,
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    background: "radial-gradient(circle, rgba(240,160,20,0.35) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <DiyaSvg className="relative w-36 h-28 drop-shadow-lg" />
              </div>
            </div>

            {/* ── Centre: text content ── */}
            <div className="text-center flex flex-col items-center gap-5 px-2">

              {/* Eyebrow label */}
              <div className={visible ? "diwali-enter-1" : "opacity-0"}>
                <span
                  className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase"
                  style={{ color: "#f6c94e" }}
                >
                  <span aria-hidden="true" className="w-6 h-px" style={{ background: "#f6c94e60" }} />
                  Festival of Lights &bull; Diwali 2026
                  <span aria-hidden="true" className="w-6 h-px" style={{ background: "#f6c94e60" }} />
                </span>
              </div>

              {/* Main heading */}
              <div className={visible ? "diwali-enter-2" : "opacity-0"}>
                <h1
                  className="font-serif font-bold leading-tight"
                  style={{
                    fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                    background: "linear-gradient(135deg, #f6c94e 0%, #fde68a 40%, #f6a621 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                  }}
                >
                  Happy Diwali!
                </h1>
              </div>

              {/* Sub-heading */}
              <div className={visible ? "diwali-enter-3" : "opacity-0"}>
                <h2
                  className="font-serif font-semibold"
                  style={{
                    fontSize: "clamp(1.05rem, 2.8vw, 1.7rem)",
                    color: "#fde5a0",
                    lineHeight: 1.4,
                  }}
                >
                  Let the Light of Knowledge Shine Bright.
                </h2>
              </div>

              {/* Description */}
              <div className={`max-w-xl ${visible ? "diwali-enter-4" : "opacity-0"}`}>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "#c9bda8" }}
                >
                  &#8220;This Diwali, may every light bring happiness, every moment
                  create beautiful memories, and every dream lead to a brighter
                  tomorrow.&#8221;
                </p>
              </div>

              {/* CTA */}
              <div className={visible ? "diwali-enter-5" : "opacity-0"}>
                <button
                  onClick={scrollToWishes}
                  className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base
                             px-7 py-3 mt-1 transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f6c94e]"
                  style={{
                    background: "linear-gradient(135deg, #c9822a 0%, #f6c94e 50%, #c9822a 100%)",
                    color: "#1a0a05",
                    border: "none",
                    boxShadow: "0 4px 24px rgba(240,170,20,0.35)",
                  }}
                  aria-label="Scroll to school Diwali wishes"
                >
                  <span>🪔</span>
                  Celebrate the Festival
                </button>
              </div>

              {/* Mobile-only small diya row */}
              <div aria-hidden="true" className="flex lg:hidden gap-8 mt-3 justify-center">
                <DiyaSvg className="w-16 h-14 opacity-90" />
                <DiyaSvg className="w-20 h-16" />
                <DiyaSvg className="w-16 h-14 opacity-90" />
              </div>
            </div>

            {/* ── Right diya (hidden on mobile) ── */}
            <div
              aria-hidden="true"
              className="hidden lg:flex justify-start pl-12 items-end pb-4"
            >
              <div className="relative">
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 160, height: 120,
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    background: "radial-gradient(circle, rgba(240,160,20,0.35) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <DiyaSvg className="relative w-36 h-28 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom decorative golden rule ── */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #c9952a 30%, #f6c94e 50%, #c9952a 70%, transparent)" }}
        />
      </section>
    </>
  );
}
