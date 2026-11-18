import HeaderServer     from "@/components/layout/HeaderServer";
import FooterServer     from "@/components/layout/FooterServer";
import ToasterProvider  from "@/components/ToasterProvider";
import WhatsAppButton   from "@/components/ui/WhatsAppButton";
import { getSettings }  from "@/lib/api";

export const metadata = {
  title: "Tilak Global School | CBSE Affiliated School Jaipur",
  description: "Tilak Global School — English-medium CBSE school in Jaipur. Nursery to Class XII. Admissions open 2027-28.",
};

export default async function UserLayout({ children }) {
  const { data } = await getSettings();
  const settings = data?.settings || null;

  const phone   = settings?.whatsappNumber || settings?.phone || "9119112335";
  const message = settings?.whatsappMessage || "Hello, I would like to enquire about admission to Tilak Global School.";

  // Dynamic favicon from admin Settings panel
  // When admin uploads favicon via Settings → faviconUrl is set → injected here
  const faviconUrl = settings?.faviconUrl || null;

  return (
    <>
      {/* Dynamic favicon from CMS — overrides static public/favicon.ico */}
      {faviconUrl && (
        <head>
          <link rel="icon"       href={faviconUrl} />
          <link rel="shortcut icon" href={faviconUrl} />
        </head>
      )}
      <ToasterProvider />
      <HeaderServer />
      <main className="min-h-screen">{children}</main>
      <FooterServer />
      <WhatsAppButton phone={phone} message={message} />
    </>
  );
}
