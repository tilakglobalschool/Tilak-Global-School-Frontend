import PageHero          from "@/components/shared/PageHero";
import FeaturedEventServer  from "@/components/news-events/FeaturedEventServer";
import UpcomingEventsServer from "@/components/news-events/UpcomingEventsServer";
import NewsNoticesLayoutServer from "@/components/news-events/NewsNoticesLayoutServer";
import PreviousEventsServer from "@/components/news-events/PreviousEventsServer";
import CtaBanner          from "@/components/shared/CtaBanner";
import { newsEventsHero, newsEventsPage, newsEventsCta } from "@/data/newsEvents";

export const metadata = {
  title: `${newsEventsPage.heading} — Tilak Global School`,
  description: newsEventsPage.subtext,
};

/**
 * NewsEventsPage — server component.
 * All sections now fetch live data from backend with static fallbacks.
 */
export default function NewsEventsPage() {
  return (
    <>
      <PageHero data={newsEventsHero} />
      <FeaturedEventServer />
      <UpcomingEventsServer />
      <NewsNoticesLayoutServer />
      <PreviousEventsServer />
      <CtaBanner data={newsEventsCta} />
    </>
  );
}
