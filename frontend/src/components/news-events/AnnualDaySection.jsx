"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, Images } from "lucide-react";

/**
 * AnnualDaySection — Annual Function blog card + image slider.
 * Props:
 *   data — { year, date, title, description, highlights, images[] }
 * Falls back to built-in dummy data if no prop passed.
 */

const DUMMY_DATA = {
  year:        "2024–25",
  date:        "Annual Function · Session 2024-25",
  title:       "Annual Day Celebration — A Grand Showcase of Talent",
  description:
    "The Annual Day of Tilak Global School was celebrated with great enthusiasm and pride. Students from Nursery to Class XII showcased their talents through spectacular cultural performances — Kathak dance, classical music, patriotic skits, drama and prize distribution. The event was graced by chief guests, parents and the school management.",
  highlights: [
    "Kathak & Classical Dance Performances",
    "Patriotic Skit by Senior Students",
    "Academic Excellence Prize Distribution",
    "Cultural Performances by All Classes",
    "Chief Guest Address & Felicitation",
  ],
  images: [
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/tilak-global-school/events/annual-day-kathak-dance",
      alt: "Kathak dance performance at Annual Day",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/tilak-global-school/events/annual-day-first-prize-girl",
      alt: "Academic excellence prize distribution",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/tilak-global-school/events/annual-day-chief-guest-speech",
      alt: "Chief guest speech at Annual Day",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/tilak-global-school/events/annual-day-shiva-dance",
      alt: "Shiva theme dance performance",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/tilak-global-school/events/annual-day-singing",
      alt: "Singing performance on stage",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/tilak-global-school/events/annual-day-legends-dance",
      alt: "Legends of India sports tribute dance",
    },
  ],
};

// Fallback placeholder when Cloudinary image fails to load
const PLACEHOLDER = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80&fm=webp";

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  return (
    <div className="relative w-full">
      {/* Main image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0B3D91]/10">
        <Image
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-opacity duration-500"
          onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
        />

        {/* Gradient overlay bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none
                     bg-gradient-to-t from-black/60 to-transparent"
        />

        {/* Red top-left corner */}
        <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600" />
        <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600" />

        {/* Caption */}
        <p className="absolute bottom-3 left-4 text-white text-xs font-medium
                      border-l-2 border-red-500 pl-2 select-none">
          {images[current].alt}
        </p>

        {/* Counter */}
        <span className="absolute bottom-3 right-4 text-white/80 text-xs font-mono select-none">
          {current + 1} / {total}
        </span>
      </div>

      {/* Nav buttons */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2
                   w-9 h-9 bg-black/40 hover:bg-[#0B3D91] text-white
                   flex items-center justify-center transition-colors duration-200"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2
                   w-9 h-9 bg-black/40 hover:bg-[#0B3D91] text-white
                   flex items-center justify-center transition-colors duration-200"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-red-600"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative shrink-0 w-16 h-11 overflow-hidden transition-all duration-200
              ${i === current
                ? "ring-2 ring-red-600 ring-offset-1 opacity-100"
                : "opacity-60 hover:opacity-90"
              }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="64px"
              className="object-cover"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AnnualDaySection({ data }) {
  const d = data || DUMMY_DATA;

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-[#0B3D91]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2
                           text-[11px] md:text-xs font-semibold uppercase
                           tracking-[0.2em] text-red-600">
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            Annual Function
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            Our Annual Day Celebration
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-4" />
        </div>

        {/* Two-column layout: blog card left, slider right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Blog Card ── */}
          <div className="flex flex-col gap-6">

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5 bg-[#EEF3FB] text-[#0B3D91]
                               font-semibold px-3 py-1">
                <Calendar size={12} />
                {d.date}
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <Images size={12} />
                {d.images.length} photos
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0B3D91] leading-snug">
              {d.title}
            </h3>

            {/* Red rule */}
            <div aria-hidden="true" className="w-10 h-[2px] bg-red-600" />

            {/* Description */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {d.description}
            </p>

            {/* Highlights */}
            <div>
              <p className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-3">
                Programme Highlights
              </p>
              <ul className="space-y-2">
                {d.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 w-1.5 h-1.5 bg-red-600 shrink-0"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/gallery"
              className="self-start inline-flex items-center gap-2
                         bg-[#0B3D91] hover:bg-red-600 text-white
                         text-xs font-semibold px-5 py-2.5
                         transition-colors duration-200"
            >
              <Images size={14} />
              View Full Gallery
            </Link>
          </div>

          {/* ── RIGHT: Image Slider ── */}
          <div>
            <ImageSlider images={d.images} />
          </div>

        </div>
      </div>
    </section>
  );
}
