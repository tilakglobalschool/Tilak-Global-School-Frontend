/**
 * UpcomingEventsServer — async server component.
 * Fetches Event-category posts from API. Falls back to static.
 */
import { getNews } from "@/lib/api";
import UpcomingEvents from "@/components/news-events/UpcomingEvents";
import { upcomingEvents as staticData } from "@/data/newsEvents";
import { getUploadUrl } from "@/lib/uploadUrl";

function formatDate(post) {
  const d = post.date || post.publishedAt;
  if (!d) return "Date TBC";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function UpcomingEventsServer() {
  const { data } = await getNews("?category=Event&status=published&limit=6");
  const posts = data?.posts || [];

  const liveItems = posts.length > 0
    ? posts.map((post) => ({
        id:          post._id,
        title:       post.title,
        description: post.summary || "",
        category:    post.category || "Event",
        date:        formatDate(post),
        dateConfirmed: true,
        image: {
          src: post.imageUrl
            ? getUploadUrl(post.imageUrl)
            : staticData.items[0]?.image.src,
          alt: post.title,
        },
      }))
    : null;

  return (
    <UpcomingEvents
      data={{ ...staticData, items: liveItems || staticData.items }}
    />
  );
}
