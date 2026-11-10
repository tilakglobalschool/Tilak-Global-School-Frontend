import HeaderServer     from "@/components/layout/HeaderServer";
import FooterServer     from "@/components/layout/FooterServer";
import ToasterProvider  from "@/components/ToasterProvider";
import WhatsAppButton   from "@/components/ui/WhatsAppButton";
import { getSettings }  from "@/lib/api";

export const metadata = {
  title: "Tilak Global School",
  description: "Quality CBSE education in Jaipur — Nursery to Class XII",
};

export default async function UserLayout({ children }) {
  // Fetch settings once here so the WhatsApp button gets the correct number
  const { data } = await getSettings();
  const phone   = data?.settings?.whatsappNumber || data?.settings?.phone || "9119112335";
  const message = data?.settings?.whatsappMessage || "Hello, I would like to enquire about admission to Tilak Global School.";

  return (
    <>
      <ToasterProvider />
      <HeaderServer />
      <main className="min-h-screen">{children}</main>
      <FooterServer />
      <WhatsAppButton phone={phone} message={message} />
    </>
  );
}
