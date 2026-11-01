/**
 * PreviousEventsServer — async server component.
 * Fetches published posts sorted oldest-first for "previous" section.
 * Falls back to static data if API returns nothing.
 */
import { getNews } from "@/lib/api";
import PreviousEvents from "@/components/news-events/PreviousEvents";
import { previousEvents as staticData } from "@/data/newsEvents";
import { getUploadUrl } from "@/lib/uploadUrl";

function formatDate(post) {
  const d = post.date || post.publishedAt;
  if (!d) return "Previous Session";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function PreviousEventsServer() {
  const { data } = await getNews("?status=published&limit=6");
  const posts = data?.posts || [];

  const liveItems = posts.length > 0
    ? posts.map((post) => ({
        id:          post._id,
        title:       post.title,
        description: post.summary || post.title,
        category:    post.category || "Events",
        date:        formatDate(post),
        image: {
          src: post.imageUrl
            ? getUploadUrl(post.imageUrl)
            : staticData.items[0]?.image.src,
          alt: post.title,
        },
      }))
    : null;

  return (
    <PreviousEvents
      data={{ ...staticData, items: liveItems || staticData.items }}
    />
  );
}
