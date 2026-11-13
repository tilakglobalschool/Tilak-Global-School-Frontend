/**
 * NewsNoticesLayoutServer — async server component.
 * Fetches all published posts, splits into News and Notice categories.
 * Falls back to static data if API returns nothing.
 */
import { getNews } from "@/lib/api";
import NewsNoticesLayout from "@/components/news-events/NewsNoticesLayout";
import { newsAnnouncements as staticNews, notices as staticNotices } from "@/data/newsEvents";

function formatDateParts(post) {
  const d = post.date || post.publishedAt;
  if (!d) return { day: "--", month: "TBA", year: "" };
  const dt = new Date(d);
  return {
    day:   String(dt.getDate()).padStart(2, "0"),
    month: dt.toLocaleString("en-IN", { month: "short" }),
    year:  String(dt.getFullYear()),
  };
}

export default async function NewsNoticesLayoutServer() {
  const { data } = await getNews("?status=published&limit=20");
  const posts = data?.posts || [];

  if (posts.length === 0) {
    return <NewsNoticesLayout newsData={staticNews} noticesData={staticNotices} />;
  }

  const noticePosts = posts.filter((p) =>
    p.category?.toLowerCase() === "notice"
  );
  const newsPosts = posts.filter((p) =>
    p.category?.toLowerCase() !== "notice"
  );

  const mapToNewsItem = (post) => {
    const { day, month, year } = formatDateParts(post);
    return {
      id:       post._id,
      day, month, year,
      title:    post.title,
      summary:  post.summary || post.title,
      content:  post.body
        ? post.body.replace(/<[^>]*>/g, "").slice(0, 300)
        : post.summary || post.title,
      category: post.category || "News",
      dateConfirmed: true,
    };
  };

  const mapToNoticeItem = (post) => {
    const { day, month } = formatDateParts(post);
    return {
      id:             post._id,
      title:          post.title,
      description:    post.summary || post.title,
      date:           `${day} ${month}`,
      category:       "Notice",
      documentUrl:    null,
      documentStatus: "Document Coming Soon",
    };
  };

  const newsData = newsPosts.length > 0
    ? { ...staticNews,    items: newsPosts.map(mapToNewsItem)   }
    : staticNews;

  const noticesData = noticePosts.length > 0
    ? { ...staticNotices, items: noticePosts.map(mapToNoticeItem) }
    : staticNotices;

  return <NewsNoticesLayout newsData={newsData} noticesData={noticesData} />;
}
