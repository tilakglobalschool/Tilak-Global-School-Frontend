/**
 * FooterServer — thin server wrapper.
 * Fetches /api/settings and passes school info to Footer.
 */
import { getSettings } from "@/lib/api";
import Footer from "./Footer";

export default async function FooterServer() {
  const { data } = await getSettings();
  const settings = data?.settings || null;

  return <Footer settings={settings} />;
}
