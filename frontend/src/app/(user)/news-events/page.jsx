import PageHero          from "@/components/shared/PageHero";
import FeaturedEvent      from "@/components/news-events/FeaturedEvent";
import UpcomingEvents     from "@/components/news-events/UpcomingEvents";
import NewsNoticesLayout  from "@/components/news-events/NewsNoticesLayout";
import PreviousEvents     from "@/components/news-events/PreviousEvents";
import CtaBanner          from "@/components/shared/CtaBanner";
import { newsEventsHero, newsEventsPage, newsEventsCta } from "@/data/newsEvents";

export const metadata = {
  title: `${newsEventsPage.heading} — Tilak Global School`,
  description: newsEventsPage.subtext,
};

/**
 * NewsEventsPage — server component.
 * Section order:
 *   PageHero → FeaturedEvent → UpcomingEvents →
 *   NewsNoticesLayout (News + Notices side-by-side) →
 *   PreviousEvents → CtaBanner
 *
 * All strings from data/newsEvents.js — zero literals in JSX.
 */
export default function NewsEventsPage() {
  return (
    <>
      <PageHero data={newsEventsHero} />
      <FeaturedEvent />
      <UpcomingEvents />
      <NewsNoticesLayout />
      <PreviousEvents />
      <CtaBanner data={newsEventsCta} />
    </>
  );
}
