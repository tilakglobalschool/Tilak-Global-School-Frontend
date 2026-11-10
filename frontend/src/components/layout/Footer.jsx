import Link from "next/link";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { QUICK_LINKS, IMPORTANT_LINKS } from "@/data/navigation";

export default function Footer({ settings }) {
  const sc = {
    ...siteConfig,
    ...(settings && {
      name:        settings.schoolName     || sc.name,
      tagline:     settings.topBarTagline  || settings.schoolSubtitle || sc.tagline,
      description: settings.footerDescription || sc.description,
      address:     settings.address        || sc.address,
      phone:       settings.phone          || sc.phone,
      phoneHref:   settings.phone          ? `tel:${settings.phone.replace(/\s/g,"")}` : sc.phoneHref,
      email:       settings.email          || sc.email,
      emailHref:   settings.email          ? `mailto:${settings.email}` : sc.emailHref,
      social: {
        facebook:  settings.socialLinks?.facebook  || sc.social.facebook,
        instagram: settings.socialLinks?.instagram || sc.social.instagram,
        youtube:   settings.socialLinks?.youtube   || sc.social.youtube,
        twitter:   settings.socialLinks?.other     || sc.social.twitter,
      },
      mapEmbed:    settings.mapEmbedUrl    || sc.mapEmbed,
    }),
  };
  return (
    <footer className="w-full">
      {/* â”€â”€ Main Dark Blue Section â”€â”€ */}
      <div className="bg-[#0B3D91] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 â€” School Info */}
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

          {/* Column 2 â€” Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition flex items-center gap-2 before:content-['â€º'] before:text-[#C8102E]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 â€” Important Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 border-b border-white/20 pb-2">Important Links</h3>
            <ul className="flex flex-col gap-2">
              {IMPORTANT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition flex items-center gap-2 before:content-['â€º'] before:text-[#C8102E]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 â€” Contact Info */}
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
                  <a href={sc.phoneHref} className="hover:text-white transition">{sc.phone}</a>
                </li>
              )}
              {sc.email && (
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-[#C8102E] shrink-0" />
                  <a href={sc.emailHref} className="hover:text-white transition">{sc.email}</a>
                </li>
              )}
            </ul>
            {sc.mapEmbed && (
              <div className="mt-4 w-full h-28 rounded-lg bg-[#0d2f6e] border border-white/10 flex items-center justify-center">
                <span className="text-xs text-blue-300">{sc.mapEmbed}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* â”€â”€ Bottom Red Copyright Bar â”€â”€ */}
      <div className="bg-[#C8102E] text-white text-center py-3 px-4">
        <p className="text-xs sm:text-sm">
          {sc.copyright} &nbsp;|&nbsp; Designed &amp; Developed by{" "}
          <span className="font-semibold">{sc.developer}</span>
        </p>
      </div>
    </footer>
  );
}

