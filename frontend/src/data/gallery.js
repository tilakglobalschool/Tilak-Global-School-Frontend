/**
 * gallery.js
 * Feeds the Gallery page, homepage Gallery Preview, and related components.
 * All strings sourced here — zero literals in JSX.
 */

// ── Gallery hero (feeds PageHero component) ───────────────────────────────────
export const galleryHero = {
  badge:  "Life at Tilak Global School",
  heading: "School Gallery",
  subtext:
    "Explore memorable moments, campus life, classroom activities, celebrations and student experiences at Tilak Global School.",
  breadcrumb: [
    { label: "Home",    href: "/" },
    { label: "Gallery", href: "/gallery" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students at Tilak Global School events and activities",
  },
};

// ── Gallery page config ───────────────────────────────────────────────────────
export const galleryPage = {
  heading:     "School Gallery",
  description: "Explore photos from campus life, events, sports and everyday learning.",
  eyebrow:     "Our School",
  // These must match the GALLERY_CATEGORIES enum in the backend model
  categories:  ["All", "Campus", "Classrooms", "Sports", "Events", "Activities"],
  emptyState: {
    heading:     "No photos yet",
    description: "Photos will appear here once they are uploaded from the Admin Panel.",
  },
  errorState: {
    heading:     "Gallery unavailable",
    description: "We could not load the gallery right now. Please check back soon.",
  },
  loadMore:    "Load More",
  viewAll:     "View All Photos",
  lightbox: {
    close: "Close",
    prev:  "Previous",
    next:  "Next",
  },
};

// ── Dummy gallery items (9 items, used as fallback when API returns no images) ─
// Categories match GALLERY_CATEGORIES in the backend GalleryImage model.
export const dummyGalleryItems = [
  {
    id:          "dummy-campus",
    title:       "School Campus",
    caption:     "Main building & grounds",
    category:    "Campus",
    description: "Spacious main building set on open green grounds at Bindayaka, Jaipur.",
    imageUrl:    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Tilak Global School main building and grounds",
    },
    status: "published",
  },
  {
    id:          "dummy-classrooms",
    title:       "Smart Classrooms",
    caption:     "Modern, well-lit learning spaces",
    category:    "Classrooms",
    description: "Smart boards, natural light and ergonomic seating for every stage.",
    imageUrl:    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Smart classroom at Tilak Global School",
    },
    status: "published",
  },
  {
    id:          "dummy-science-lab",
    title:       "Science Laboratory",
    caption:     "Hands-on scientific exploration",
    category:    "Classrooms",
    description: "Fully equipped science lab for practical experiments across all stages.",
    imageUrl:    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Science laboratory at Tilak Global School",
    },
    status: "published",
  },
  {
    id:          "dummy-computer-lab",
    title:       "Computer Lab",
    caption:     "Digital learning for every student",
    category:    "Classrooms",
    description: "Modern computers with high-speed internet for digital education.",
    imageUrl:    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Computer lab at Tilak Global School",
    },
    status: "published",
  },
  {
    id:          "dummy-library",
    title:       "Library",
    caption:     "A love for reading",
    category:    "Campus",
    description: "A well-stocked library encouraging curiosity and independent learning.",
    imageUrl:    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "School library at Tilak Global School",
    },
    status: "published",
  },
  {
    id:          "dummy-sports",
    title:       "Sports Activities",
    caption:     "Building teamwork & fitness",
    category:    "Sports",
    description: "Outdoor and indoor sports facilities for physical education and recreation.",
    imageUrl:    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Sports activities at Tilak Global School",
    },
    status: "published",
  },
  {
    id:          "dummy-annual-day",
    title:       "Annual Day Celebration",
    caption:     "A celebration of talent",
    category:    "Events",
    description: "Students showcase their talent through dance, music and drama at the Annual Day.",
    imageUrl:    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Annual Day celebrations at Tilak Global School",
    },
    status: "published",
  },
  {
    id:          "dummy-art",
    title:       "Art & Craft Activities",
    caption:     "Creativity at every age",
    category:    "Activities",
    description: "Dedicated spaces for fine arts, crafts and creative expression.",
    imageUrl:    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Art and craft activities at Tilak Global School",
    },
    status: "published",
  },
  {
    id:          "dummy-playground",
    title:       "Playground",
    caption:     "Open space for play & growth",
    category:    "Campus",
    description: "A safe, spacious playground for sports, assemblies and outdoor learning.",
    imageUrl:    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80&fm=webp",
    image: {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80&fm=webp",
      alt: "Playground at Tilak Global School",
    },
    status: "published",
  },
];

// ── Gallery page CTA banner ───────────────────────────────────────────────────
export const galleryCta = {
  eyebrow: "Admissions Enquiry",
  heading: "Give your child the Tilak Global advantage",
  subtext: "Admissions open · Nursery to Class XII · Session details to be confirmed",
  primary: {
    label: "Apply for Admission",
    href:  "/admissions/online-admission-form",
  },
  secondary: {
    label: "Contact Us",
    href:  "/contact-us",
  },
};

// ── Legacy page stub exports (preserved for any existing imports) ─────────────
export const photoGalleryPage = {
  heading: "Photo Gallery",
  subtext: "A collection of photographs from school events, activities and everyday learning.",
};

export const videoGalleryPage = {
  heading: "Video Gallery",
  subtext: "Watch videos from school events, performances and activities.",
};

// ── Homepage gallery preview ──────────────────────────────────────────────────
export const galleryPreview = {
  heading: "Gallery Preview",
  viewAll: {
    label: "View Full Gallery",
    href:  "/gallery",
  },
  items: [
    {
      id:    "annual-day",
      title: "Annual Day",
      image: {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Annual Day celebrations at Tilak Global School",
      },
    },
    {
      id:    "classroom",
      title: "Classrooms",
      image: {
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Modern classrooms at Tilak Global School",
      },
    },
    {
      id:    "sports",
      title: "Sports",
      image: {
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Sports activities at Tilak Global School",
      },
    },
    {
      id:    "science-lab",
      title: "Science Lab",
      image: {
        src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Science laboratory at Tilak Global School",
      },
    },
  ],
};
