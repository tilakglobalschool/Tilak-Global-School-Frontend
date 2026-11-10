import Link from "next/link";
import { PhoneCall, Mail, MapPin, ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { QUICK_LINKS, IMPORTANT_LINKS } from "@/data/navigation";

export default function Footer({ settings }) {
  const sc = {
    ...siteConfig,
    ...(settings && {
      name:        settings.schoolName         || siteConfig.name,
      tagline:     settings.topBarTagline      || settings.schoolSubtitle || siteConfig.tagline,
      description: settings.footerDescription  || siteConfig.description,
      address:     settings.address            || siteConfig.address,
      phone:       settings.phone              || siteConfig.phone,
      phoneHref:   settings.phone              ? `tel:+91${settings.phone.replace(/\D/g,"").replace(/^91/,"")}` : siteConfig.phoneHref,
      email:       settings.email              || siteConfig.email,
      emailHref:   settings.email              ? `mailto:${settings.email}` : siteConfig.emailHref,
      social: {
        facebook:  settings.socialLinks?.facebook  || siteConfig.social.facebook,
        instagram: settings.socialLinks?.instagram || siteConfig.social.instagram,
        youtube:   settings.socialLinks?.youtube   || siteConfig.social.youtube,
        twitter:   settings.socialLinks?.other     || siteConfig.social.twitter,
      },
      mapEmbed:    settings.mapEmbedUrl || siteConfig.mapEmbed,
    }),
  };

  // Format phone for display: +91 XXXXXXXXXX
  const rawDigits    = (sc.phone || "").replace(/\D/g, "").replace(/^91/, "");
  const displayPhone = rawDigits.length === 10 ? `+91 ${rawDigits}` : sc.phone;

  return (
    <footer className="w-full">
      {/* ── Main Dark Blue Section ── */}
      <div className="bg-[#0B3D91] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 – School Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <span className="text-[#0B3D91] font-bold text-lg">{sc.logoInitials}</span>
              </div>
              <div className="leading-tight">
                <p className="font-bold text-base">{sc.name}</p>
                <p className="text-xs text-blue-200">{sc.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">{sc.description}</p>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={13} className="text-[#C8102E] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Important Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Important Links</h3>
            <ul className="flex flex-col gap-2">
              {IMPORTANT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={13} className="text-[#C8102E] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>{sc.address}</span>
              </li>
              {sc.phone && (
                <li className="flex items-center gap-2">
                  <PhoneCall size={16} className="text-[#C8102E] shrink-0" />
                  <a href={sc.phoneHref} className="hover:text-white transition">{displayPhone}</a>
                </li>
              )}
              {sc.email && (
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-[#C8102E] shrink-0" />
                  <a href={sc.emailHref} className="hover:text-white transition break-all">{sc.email}</a>
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Copyright Bar ── */}
      <div className="bg-[#C8102E] text-white text-center py-3 px-4">
        <p className="text-xs sm:text-sm">
          {sc.copyright}
        </p>
      </div>
    </footer>
  );
}
