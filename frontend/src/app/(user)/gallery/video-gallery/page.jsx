import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * Permanent redirect: /gallery/video-gallery → /gallery
 */
export default function VideoGalleryRedirect() {
  redirect("/gallery");
}

export async function generateMetadata() {
  return { robots: "noindex" };
}
