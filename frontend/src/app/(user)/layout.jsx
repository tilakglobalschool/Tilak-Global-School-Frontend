import HeaderServer from "@/components/layout/HeaderServer";
import FooterServer from "@/components/layout/FooterServer";
import ToasterProvider from "@/components/ToasterProvider";

export const metadata = {
  title: "Tilak Global School",
  description: "Quality CBSE education in Jaipur — Nursery to Class XII",
};

export default function UserLayout({ children }) {
  return (
    <>
      <ToasterProvider />
      <HeaderServer />
      <main className="min-h-screen">{children}</main>
      <FooterServer />
    </>
  );
}
