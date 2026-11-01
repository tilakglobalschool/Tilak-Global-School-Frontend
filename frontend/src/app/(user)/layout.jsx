import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import { getSettings } from "@/lib/api";
import { getUploadUrl } from "@/lib/uploadUrl";
import { siteConfig as staticConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Tilak Global School",
  description: "Quality CBSE education in Jaipur — Nursery to Class XII",
};

export default async function UserLayout({ children }) {
  // Fetch live settings for Header/Footer — fail gracefully
  const { data } = await getSettings();
  const s = data?.settings || null;

  // Merge live settings over static fallback
  const siteConfig = s
    ? {
        ...staticConfig,
        name:         s.schoolName        || staticConfig.name,
        tagline:      s.schoolSubtitle    || staticConfig.tagline,
        description:  s.footerDescription || staticConfig.description,
        address:      s.address           || staticConfig.address,
        addressShort: s.address
          ? s.address.split(",").slice(0, 2).join(",")
          : staticConfig.addressShort,
        phone:        s.phone             || staticConfig.phone,
        phoneHref:    s.phone             ? `tel:${s.phone.replace(/\s/g, "")}` : staticConfig.phoneHref,
        email:        s.email             || staticConfig.email,
        emailHref:    s.email             ? `mailto:${s.email}` : staticConfig.emailHref,
        whatsapp:     s.whatsappNumber    || staticConfig.whatsapp,
        logoUrl:      s.logoUrl           ? getUploadUrl(s.logoUrl) : null,
        mapEmbedUrl:  s.mapEmbedUrl       || null,
        social: {
          facebook:  s.socialLinks?.facebook  || staticConfig.social.facebook,
          instagram: s.socialLinks?.instagram || staticConfig.social.instagram,
          youtube:   s.socialLinks?.youtube   || staticConfig.social.youtube,
          // backend stores twitter as "other" — fall back gracefully
          twitter:   s.socialLinks?.twitter   || s.socialLinks?.other || staticConfig.social.twitter,
        },
      }
    : staticConfig;

  return (
    <>
      <ToasterProvider />
      <Header siteConfig={siteConfig} />
      <main className="min-h-screen">{children}</main>
      <Footer siteConfig={siteConfig} />
    </>
  );
}
