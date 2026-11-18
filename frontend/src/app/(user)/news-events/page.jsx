import PageHero          from "@/components/shared/PageHero";
import FeaturedEvent      from "@/components/news-events/FeaturedEvent";
import AnnualDaySection   from "@/components/news-events/AnnualDaySection";
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
 *
 * Section order:
 *   Hero → Featured Event → Annual Day Section → Upcoming Events →
 *   News + Notices → Previous Events → CTA
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

  // Annual Day images from Cloudinary gallery
  // These are the actual school Annual Day photos uploaded via seedClientContent
  // Replace with real images when you have them from admin panel
  const annualDayImages = [
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327829/tilak-global-school/events/tilak-global-school/events/annual-day-kathak-dance.jpg",
      alt: "Kathak dance group performance at Annual Day",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327832/tilak-global-school/events/tilak-global-school/events/annual-day-first-prize-girl.jpg",
      alt: "Academic excellence prize at Annual Day",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327835/tilak-global-school/events/tilak-global-school/events/annual-day-chief-guest-speech.jpg",
      alt: "Chief guest speech at Annual Day",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327838/tilak-global-school/events/tilak-global-school/events/annual-day-shiva-dance.jpg",
      alt: "Shiva theme dance performance",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327841/tilak-global-school/events/tilak-global-school/events/annual-day-singing.jpg",
      alt: "Singing performance on stage",
    },
    {
      src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327844/tilak-global-school/events/tilak-global-school/events/annual-day-legends-dance.jpg",
      alt: "Legends of India sports tribute dance",
    },
  ];

  const annualDayData = {
    year:        "2024–25",
    date:        "Annual Function · Session 2024-25",
    title:       "Annual Day Celebration — A Grand Showcase of Talent",
    description:
      "The Annual Day of Tilak Global School was celebrated with great enthusiasm and pride. Students from Nursery to Class XII showcased their talents through spectacular cultural performances — Kathak dance, classical music, patriotic skits, drama and prize distribution. The event was graced by chief guests, parents and the school management.",
    highlights: [
      "Kathak & Classical Dance Performances",
      "Patriotic Skit by Senior Students",
      "Academic Excellence Prize Distribution",
      "Cultural Performances by All Classes",
      "Chief Guest Address & Felicitation",
    ],
    images: annualDayImages,
  };

  return (
    <>
      <PageHero data={newsEventsHero} />
      <FeaturedEvent     apiPost={featured} />

      {/* Annual Day — Blog card + image slider */}
      <AnnualDaySection data={annualDayData} />

      <UpcomingEvents    apiItems={upcoming} />
      <NewsNoticesLayout apiNews={news} apiNotices={notices} />
      <PreviousEvents    apiItems={previous} />
      <CtaBanner data={newsEventsCta} />
    </>
  );
}
