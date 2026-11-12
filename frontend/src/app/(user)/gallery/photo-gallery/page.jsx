import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * Permanent redirect: /gallery/photo-gallery → /gallery
 */
export default function PhotoGalleryRedirect() {
  redirect("/gallery");
}

export async function generateMetadata() {
  return { robots: "noindex" };
}
