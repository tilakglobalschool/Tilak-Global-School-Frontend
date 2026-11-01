import Link from "next/link";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import { QUICK_LINKS, IMPORTANT_LINKS } from "@/data/navigation";

export default function Footer({ siteConfig: liveSiteConfig }) {
  const config = liveSiteConfig || staticConfig;
  return (
    <footer className="w-full">
      {/* ── Main Dark Blue Section ── */}
      <div className="bg-[#0B3D91] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — School Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <span className="text-[#0B3D91] font-bold text-lg">{config.logoInitials}</span>
              </div>
              <div className="leading-tight">
                <p className="font-bold text-base">{config.name}</p>
                <p className="text-xs text-blue-200">{config.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">{config.description}</p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition flex items-center gap-2 before:content-['›'] before:text-[#C8102E]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Important Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Important Links</h3>
            <ul className="flex flex-col gap-2">
              {IMPORTANT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition flex items-center gap-2 before:content-['›'] before:text-[#C8102E]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </li>
              {config.phone && (
                <li className="flex items-center gap-2">
                  <PhoneCall size={16} className="text-[#C8102E] shrink-0" />
                  <a href={config.phoneHref} className="hover:text-white transition">{config.phone}</a>
                </li>
              )}
              {config.email && (
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-[#C8102E] shrink-0" />
                  <a href={config.emailHref} className="hover:text-white transition">{config.email}</a>
                </li>
              )}
            </ul>
            {config.mapEmbed && (
              <div className="mt-4 w-full h-28 rounded-lg bg-[#0d2f6e] border border-white/10 flex items-center justify-center">
                <span className="text-xs text-blue-300">{config.mapEmbed}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Red Copyright Bar ── */}
      <div className="bg-[#C8102E] text-white text-center py-3 px-4">
        <p className="text-xs sm:text-sm">
          {config.copyright} &nbsp;|&nbsp; Designed &amp; Developed by{" "}
          <span className="font-semibold">{config.developer}</span>
        </p>
      </div>
    </footer>
  );
}
