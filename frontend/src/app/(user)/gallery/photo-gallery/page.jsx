import { redirect } from "next/navigation";

/**
 * Permanent redirect: /gallery/photo-gallery → /gallery
 * Preserves any external links or bookmarks.
 */
export default function PhotoGalleryRedirect() {
  redirect("/gallery");
}

export async function generateMetadata() {
  return { robots: "noindex" };
}
