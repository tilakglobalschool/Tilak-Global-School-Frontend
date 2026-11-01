import PageHero      from "@/components/shared/PageHero";
import GallerySection from "@/components/gallery/GallerySection";
import CtaBanner      from "@/components/shared/CtaBanner";
import { getGallery } from "@/lib/api";
import { galleryHero, galleryPage, dummyGalleryItems, galleryCta } from "@/data/gallery";

export const metadata = {
  title: `${galleryPage.heading} — Tilak Global School`,
  description: galleryPage.description,
};

/**
 * GalleryPage — server component.
 *
 * Fetch strategy:
 *   1. Try to load live images from the backend API.
 *   2. If the API returns no images (empty database), fall back to
 *      dummyGalleryItems from data/gallery.js so the page always has
 *      something to show visitors.
 *   3. If the API errors (network/server issue), pass error=true to
 *      GallerySection which renders the error state from data.
 *
 * Admin-uploaded images always take priority over dummy images.
 * All strings from data/gallery.js — zero literals in JSX.
 */
export default async function GalleryPage() {
  const { data, error } = await getGallery("?limit=200&status=published");
  const apiImages = data?.images || [];

  // Use live images if available; fall back to dummy items
  const images = apiImages.length > 0 ? apiImages : dummyGalleryItems;

  return (
    <>
      <PageHero data={galleryHero} />
      <GallerySection items={images} error={Boolean(error)} />
      <CtaBanner data={galleryCta} />
    </>
  );
}
