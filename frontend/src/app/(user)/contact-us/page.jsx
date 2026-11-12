import { getSettings } from "@/lib/api";
import { siteConfig }  from "@/data/siteConfig";
import ContactForm     from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us — Tilak Global School",
  description: "Get in touch with Tilak Global School, Jaipur. Phone, email, address and enquiry form.",
};

/** Strip country code safely — only removes leading 91 when number is 12 digits */
function extractDigits(raw) {
  if (!raw) return "";
  const all = raw.replace(/\D/g, "");
  return all.length === 12 && all.startsWith("91") ? all.slice(2) : all;
}

/** Format an Indian phone number for display: +91 XXXXXXXXXX */
function formatPhone(raw) {
  const digits = extractDigits(raw);
  if (digits.length === 10) return `+91 ${digits}`;
  return raw || "";
}

/** Build a valid tel: href from raw phone string */
function telHref(raw) {
  const digits = extractDigits(raw);
  if (!digits) return null;
  return `tel:+91${digits}`;
}

export default async function ContactUsPage() {
  const { data } = await getSettings();
  const s = data?.settings || null;

  const rawPhone     = s?.phone           || siteConfig.phone        || "9119112335";
  const email        = s?.email           || siteConfig.email        || "schooltilak@gmail.com";
  const address      = s?.address         || siteConfig.address      || "Bindayaka (Bhutawali), Mukundpura Road, Jaipur - 302041";
  const officeTimings= s?.officeTimings   || siteConfig.officeTimings || "8:00 AM – 2:00 PM";
  const whatsapp     = s?.whatsappNumber  || siteConfig.whatsapp     || "9119112335";
  const mapEmbedUrl  = s?.mapEmbedUrl     || null;

  const displayPhone = formatPhone(rawPhone);
  const phoneHref    = telHref(rawPhone);

  const infoItems = [
    {
      icon:  MapPin,
      label: "Address",
      value: address,
      href:  null,
    },
    {
      icon:  Phone,
      label: "Phone",
      value: displayPhone,
      href:  phoneHref,
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
      href:  null,
    },
  ];

  /* WhatsApp link digits */
  const waDigits = extractDigits(whatsapp);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page heading */}
      <div className="mb-6 md:mb-8">
        <p className="text-xs font-bold tracking-widest text-[#C8102E] uppercase mb-2">Contact Us</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B3D91] leading-tight">
          Get In Touch
        </h1>
        <p className="mt-3 text-[#5B6785] max-w-xl">
          Have a question about admissions or our school? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
        {/* Left — contact info (5 cols) */}
        <div className="lg:col-span-5 min-w-0 space-y-5">
          {infoItems.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-9 h-9 bg-[#E8F1FB] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[#0B3D91]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-0.5">{label}</p>
                {href ? (
                  <a href={href} className="text-sm text-[#5B6785] hover:text-[#0B3D91] transition-colors break-words">
                    {value || "—"}
                  </a>
                ) : (
                  <p className="text-sm text-[#5B6785] leading-relaxed break-words">{value || "—"}</p>
                )}
              </div>
            </div>
          ))}

          {waDigits.length === 10 && (
            <a
              href={`https://wa.me/91${waDigits}?text=${encodeURIComponent("Hello, I would like to enquire about admission.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700
                         text-white text-sm font-semibold px-5 py-2.5 transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Enquiry
            </a>
          )}
        </div>

        {/* Right — contact form (7 cols) */}
        <div className="lg:col-span-7 min-w-0">
          <ContactForm />
        </div>
      </div>

      {/* Map embed */}
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
