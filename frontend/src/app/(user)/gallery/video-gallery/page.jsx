import { redirect } from "next/navigation";

/**
 * Permanent redirect: /gallery/video-gallery → /gallery
 * Preserves any external links or bookmarks.
 */
export default function VideoGalleryRedirect() {
  redirect("/gallery");
}

export async function generateMetadata() {
  return { robots: "noindex" };
}
