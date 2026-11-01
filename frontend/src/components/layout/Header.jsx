"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall, MapPin, Mail, Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { NAV_ITEMS, admissionCta } from "@/data/navigation";

/* ── Social SVG icons ── */
const FacebookIcon  = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const InstagramIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>);
const YoutubeIcon   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>);
const TwitterIcon   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const [scrolled, setScrolled]                       = useState(false);
  const [mobileOpen, setMobileOpen]                   = useState(false);
  const [openDropdown, setOpenDropdown]               = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const [headerHeight, setHeaderHeight]               = useState(56);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => {
      const h = header.getBoundingClientRect().height;
      setHeaderHeight(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleMobileAccordion = (label) =>
    setOpenMobileAccordion((prev) => (prev === label ? null : label));

  return (
    <>
      <div style={{ height: headerHeight }} aria-hidden="true" />

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}
      >
        {/* ── Top Red Utility Bar ── */}
        <div className={`bg-[#C8102E] text-white overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0 py-0" : "max-h-[48px] opacity-100 py-1 md:py-2"
        }`}>
          <div className="max-w-7xl mx-auto px-3 md:px-6">

            {/* Mobile row */}
            <div className="flex md:hidden items-center justify-between gap-2 whitespace-nowrap overflow-hidden">
              <span className="flex items-center gap-1 text-[10px] font-medium shrink min-w-0 overflow-hidden">
                <MapPin className="w-3 h-3 shrink-0" />
                <span style={{ display: "block", whiteSpace: "nowrap", textOverflow: "clip", overflow: "hidden" }}>
                  {siteConfig.addressShort}
                </span>
              </span>
              {siteConfig.phone && (
                <a href={siteConfig.phoneHref} className="flex items-center gap-1 text-[10px] font-medium shrink-0 hover:opacity-80 transition">
                  <PhoneCall className="w-3 h-3 shrink-0" />
                  <span>Call</span>
                </a>
              )}
            </div>

            {/* Desktop row */}
            <div className="hidden md:flex items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-xs opacity-90 whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {siteConfig.address}
                </span>
                {siteConfig.phone && (
                  <a href={siteConfig.phoneHref} className="flex items-center gap-1 text-xs hover:opacity-80 transition whitespace-nowrap">
                    <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                    {siteConfig.phone}
                  </a>
                )}
                {siteConfig.email && (
                  <a href={siteConfig.emailHref} className="flex items-center gap-1 text-xs hover:opacity-80 transition whitespace-nowrap">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    {siteConfig.email}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a href={siteConfig.social.facebook}  aria-label="Facebook"  className="hover:opacity-75 transition"><FacebookIcon /></a>
                <a href={siteConfig.social.instagram} aria-label="Instagram" className="hover:opacity-75 transition"><InstagramIcon /></a>
                <a href={siteConfig.social.youtube}   aria-label="YouTube"   className="hover:opacity-75 transition"><YoutubeIcon /></a>
                <a href={siteConfig.social.twitter}   aria-label="Twitter"   className="hover:opacity-75 transition"><TwitterIcon /></a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Navy Navigation Bar ── */}
        <nav className="bg-[#0B3D91] text-white">
          <div className="max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-3 flex items-center justify-between gap-3">

            <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <span className="text-[#0B3D91] font-bold text-sm md:text-lg leading-none">{siteConfig.logoInitials}</span>
              </div>
              <div className="leading-tight min-w-0">
                <p className="font-bold text-sm md:text-lg tracking-wide">{siteConfig.name}</p>
                <p className="text-[10px] md:text-xs text-blue-200 tracking-wider">{siteConfig.tagline}</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link href={item.href} className={`relative flex items-center gap-1 px-2.5 xl:px-3 py-2 text-sm font-medium rounded hover:bg-white/10 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-[#C8102E] after:transition-all after:duration-300 after:ease-in-out ${isActive(item.href) ? "after:w-full" : "after:w-0 hover:after:w-full"}`}>
                    {item.label}
                    {item.children && (
                      <ChevronDown size={13} className={`opacity-70 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    )}
                  </Link>
                  {item.children && (
                    <ul className={`absolute left-0 top-full mt-1 w-52 bg-white text-[#1F2A44] rounded-lg shadow-xl py-1 z-50 transition-all duration-200 origin-top ${openDropdown === item.label ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link href={child.href} className="block px-4 py-2 text-sm hover:bg-[#E8F1FB] hover:text-[#0B3D91] transition">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <Link href={admissionCta.href} className="hidden lg:inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#a50d25] text-white text-sm font-semibold px-4 py-2 rounded transition shrink-0">
              {admissionCta.label}
            </Link>

            <button className="lg:hidden p-1.5 rounded hover:bg-white/10 transition shrink-0" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
            <ul className="px-3 pb-4 pt-2 flex flex-col gap-0.5 border-t border-white/20">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button onClick={() => toggleMobileAccordion(item.label)} className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded hover:bg-white/10 transition ${isActive(item.href) ? "text-red-300" : ""}`}>
                        {item.label}
                        <ChevronDown size={15} className={`transition-transform duration-200 ${openMobileAccordion === item.label ? "rotate-180" : ""}`} />
                      </button>
                      <ul className={`overflow-hidden transition-all duration-200 pl-3 ${openMobileAccordion === item.label ? "max-h-60" : "max-h-0"}`}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} className="block px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded transition">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} className={`block px-3 py-2.5 text-sm font-medium rounded hover:bg-white/10 transition ${isActive(item.href) ? "text-red-300" : ""}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-white/20">
                <Link href={admissionCta.href} className="block text-center bg-[#C8102E] hover:bg-[#a50d25] text-white text-sm font-semibold px-4 py-2.5 rounded transition">
                  {admissionCta.label}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
