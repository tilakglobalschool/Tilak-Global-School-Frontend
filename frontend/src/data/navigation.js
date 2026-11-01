/**
 * navigation.js
 * Feeds Header (main nav + mobile menu) and Footer (Quick Links, Important Links).
 */

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href:  "/about-us",
    children: [
      { label: "Our School",          href: "/about-us/our-school" },
      { label: "Vision & Mission",    href: "/about-us/vision-mission" },
      { label: "Principal's Message", href: "/about-us/principals-message" },
      { label: "Infrastructure",      href: "/about-us/infrastructure" },
    ],
  },
  {
    label: "Academics",
    href:  "/academics",
    children: [
      { label: "Curriculum",        href: "/academics/curriculum" },
      { label: "Faculty",           href: "/academics/faculty" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
    ],
  },
  {
    label: "Admissions",
    href:  "/admissions",
    children: [
      { label: "Admission Process",     href: "/admissions/admission-process" },
      { label: "Fee Structure",         href: "/admissions/fee-structure" },
      { label: "Online Admission Form", href: "/admissions/online-admission-form" },
    ],
  },
  { label: "Gallery",       href: "/gallery" },
  { label: "News & Events", href: "/news-events" },
  { label: "Contact Us",    href: "/contact-us" },
];

export const QUICK_LINKS = [
  { label: "Home",          href: "/" },
  { label: "About Us",      href: "/about-us" },
  { label: "Academics",     href: "/academics" },
  { label: "Admissions",    href: "/admissions" },
  { label: "Gallery",       href: "/gallery" },
  { label: "News & Events", href: "/news-events" },
  { label: "Contact Us",    href: "/contact-us" },
];

export const IMPORTANT_LINKS = [
  { label: "Admission Enquiry", href: "/admissions/online-admission-form" },
  { label: "Careers",           href: "/careers" },
  { label: "Downloads",         href: "/downloads" },
  { label: "Privacy Policy",    href: "/privacy-policy" },
];

export const admissionCta = {
  label: "Admission Enquiry",
  href:  "/admissions/online-admission-form",
};
