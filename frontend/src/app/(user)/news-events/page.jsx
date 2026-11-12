import PageHero          from "@/components/shared/PageHero";
import FeaturedEvent      from "@/components/news-events/FeaturedEvent";
import UpcomingEvents     from "@/components/news-events/UpcomingEvents";
import NewsNoticesLayout  from "@/components/news-events/NewsNoticesLayout";
import PreviousEvents     from "@/components/news-events/PreviousEvents";
import CtaBanner          from "@/components/shared/CtaBanner";
import { getNews }        from "@/lib/api";
import { newsEventsHero, newsEventsPage, newsEventsCta } from "@/data/newsEvents";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `${newsEventsPage.heading} — Tilak Global School`,
  description: newsEventsPage.subtext,
};

/**
 * NewsEventsPage — server component.
 * Fetches all published posts from the API and distributes them to sections.
 */
export default async function NewsEventsPage() {
  const { data } = await getNews("?limit=100&status=published");
  const allPosts = data?.posts || [];

  const now = new Date();

  const featured = allPosts.find(p => p.isFeatured) || allPosts[0] || null;
  const upcoming = allPosts.filter(p => p.category === "Event" && new Date(p.date) >= now);
  const news     = allPosts.filter(p => p.category === "News");
  const notices  = allPosts.filter(p => p.category === "Notice");
  const previous = allPosts.filter(p => p.category === "Event" && new Date(p.date) < now);

  return (
    <>
      <PageHero data={newsEventsHero} />
      <FeaturedEvent     apiPost={featured} />
      <UpcomingEvents    apiItems={upcoming} />
      <NewsNoticesLayout apiNews={news} apiNotices={notices} />
      <PreviousEvents    apiItems={previous} />
      <CtaBanner data={newsEventsCta} />
    </>
  );
}
