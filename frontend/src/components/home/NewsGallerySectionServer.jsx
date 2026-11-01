/**
 * NewsGallerySectionServer — async server component.
 * Fetches live news and gallery data from backend, passes to
 * the presentational NewsGallerySection component.
 * Falls back to static data if API is unavailable.
 */
import { getNews, getGallery } from "@/lib/api";
import NewsGallerySection from "@/components/home/NewsGallerySection";
import { newsEvents as staticNews } from "@/data/newsEvents";
import { galleryPreview as staticGallery } from "@/data/gallery";
import { getUploadUrl } from "@/lib/uploadUrl";

export default async function NewsGallerySectionServer() {
  // Fetch news (latest 4 published) and gallery (latest 4 published) in parallel
  const [newsRes, galleryRes] = await Promise.all([
    getNews("?limit=4&status=published"),
    getGallery("?limit=4&status=published"),
  ]);

  // Map API news posts to the shape NewsAccordion expects.
  // The /api/news list endpoint returns: title, slug, category, date, summary, imageUrl, isFeatured, publishedAt
  const apiNewsPosts = newsRes.data?.posts || [];
  const liveNewsItems = apiNewsPosts.length > 0
    ? apiNewsPosts.map((post) => {
        const d = post.date || post.publishedAt ? new Date(post.date || post.publishedAt) : new Date();
        return {
          id:      post._id,
          day:     String(d.getDate()).padStart(2, "0"),
          month:   d.toLocaleString("en-IN", { month: "short" }),
          title:   post.title,
          summary: post.summary || post.title,
          // list endpoint does not return body — use summary as the expandable content
          content: post.summary || post.title,
          type:    (post.category || "news").toLowerCase(),
        };
      })
    : staticNews.items;

  // Map API gallery images to the shape GalleryPreview expects
  const apiGalleryImages = galleryRes.data?.images || [];
  const liveGalleryItems = apiGalleryImages.length > 0
    ? apiGalleryImages.slice(0, 4).map((img, i) => ({
        id:    img._id || `gallery-${i}`,
        title: img.title || img.caption || "Gallery",
        image: {
          src: getUploadUrl(img.imageUrl || img.filePath),
          alt: img.caption || img.title || "School gallery photo",
        },
      }))
    : staticGallery.items;

  return (
    <NewsGallerySection
      newsItems={liveNewsItems}
      galleryItems={liveGalleryItems}
    />
  );
}
