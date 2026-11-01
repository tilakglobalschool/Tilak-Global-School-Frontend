/**
 * FeaturedEventServer — async server component.
 * Uses the dedicated /api/news/featured endpoint.
 * Falls back to static data if no featured post is set.
 */
import apiFetch from "@/lib/api";
import FeaturedEvent from "@/components/news-events/FeaturedEvent";
import { featuredEvent as staticData } from "@/data/newsEvents";
import { getUploadUrl } from "@/lib/uploadUrl";

export default async function FeaturedEventServer() {
  const { data } = await apiFetch("/news/featured");
  const post = data?.post;

  if (!post) {
    return <FeaturedEvent data={staticData} />;
  }

  const liveData = {
    label:       post.category || "Featured Event",
    title:       post.title,
    description: post.summary || post.body?.replace(/<[^>]*>/g, "").slice(0, 200) || post.title,
    date:        post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric",
        })
      : post.date
        ? new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric",
          })
        : "Date to be announced",
    dateConfirmed: true,
    image: {
      src: post.imageUrl ? getUploadUrl(post.imageUrl) : staticData.image.src,
      alt: post.title,
    },
  };

  return <FeaturedEvent data={liveData} />;
}
