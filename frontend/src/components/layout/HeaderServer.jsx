/**
 * HeaderServer — thin server wrapper.
 * Fetches /api/settings and passes phone, email, address, social links
 * down to the client Header component.
 * Falls back to static siteConfig if API unavailable.
 */
import { getSettings } from "@/lib/api";
import Header from "./Header";

export default async function HeaderServer() {
  const { data } = await getSettings();
  const settings = data?.settings || null;

  return <Header settings={settings} />;
}
