import { getSettings } from "@/lib/api";
import { siteConfig }  from "@/data/siteConfig";
import ContactForm     from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us — Tilak Global School",
  description: "Get in touch with Tilak Global School, Jaipur. Phone, email, address and enquiry form.",
};

/**
 * ContactUsPage — server component.
 * Reads phone, email, address, officeTimings, whatsappNumber, mapEmbedUrl
 * from the API settings. Falls back to siteConfig.js if API unavailable.
 */
export default async function ContactUsPage() {
  const { data } = await getSettings();
  const s = data?.settings || null;

  // Prefer API data; fall back to siteConfig
  const phone        = s?.phone           || siteConfig.phone        || "9119112335";
  const email        = s?.email           || siteConfig.email        || "schooltilak@gmail.com";
  const address      = s?.address         || siteConfig.address      || "Bindayaka (Bhutawali), Mukundpura Road, Jaipur - 302041";
  const officeTimings= s?.officeTimings   || "8:00 AM – 2:00 PM";
  const whatsapp     = s?.whatsappNumber  || siteConfig.whatsapp     || "9119112335";
  const mapEmbedUrl  = s?.mapEmbedUrl     || null;

  const infoItems = [
    {
      icon:  MapPin,
      label: "Address",
      value: address,
    },
    {
      icon:  Phone,
      label: "Phone",
      value: phone,
      href:  phone ? `tel:${phone.replace(/\s/g, "")}` : null,
    },
    {
      icon:  Mail,
      label: "Email",
      value: email,
      href:  email ? `mailto:${email}` : null,
    },
    {
      icon:  Clock,
      label: "Office Hours",
      value: officeTimings,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page heading */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-[#C8102E] uppercase mb-2">Contact Us</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B3D91] leading-tight">
          Get In Touch
        </h1>
        <p className="mt-3 text-[#5B6785] max-w-xl">
          Have a question about admissions or our school? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* ── Contact info ── */}
        <div className="lg:col-span-2 space-y-6">
          {infoItems.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8F1FB] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#0B3D91]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-1">{label}</p>
                {href ? (
                  <a href={href} className="text-sm text-[#5B6785] hover:text-[#0B3D91] transition-colors">
                    {value || "—"}
                  </a>
                ) : (
                  <p className="text-sm text-[#5B6785] leading-relaxed">{value || "—"}</p>
                )}
              </div>
            </div>
          ))}

          {/* WhatsApp CTA */}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello, I would like to enquire about admission.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700
                         text-white text-sm font-semibold px-5 py-2.5 rounded transition"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Enquiry
            </a>
          )}
        </div>

        {/* ── Contact form (client component) ── */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>

      {/* ── Map embed ── */}
      {mapEmbedUrl && (
        <div className="mt-16">
          <h2 className="font-serif text-xl font-bold text-[#0B3D91] mb-4">Find Us</h2>
          <div className="border border-[#0B3D91]/20 overflow-hidden aspect-video">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tilak Global School Location"
            />
          </div>
        </div>
      )}
    </div>
  );
}
