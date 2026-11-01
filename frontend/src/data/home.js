/**
 * home.js
 * Feeds HeroSection, StatsBar, and WelcomeSection on the homepage.
 */

// ── Hero Section ─────────────────────────────────────────────────────────────
export const hero = {
  eyebrow:      "Tilak Global School · Jaipur",
  badge:        "Admissions Open · Session 2025-26",
  headingLine1: "A stress-free place where",
  headingLine2: "every child grows with character.",
  // Keep full heading for SEO / non-visual use
  heading:      "A stress-free place where every child grows with character.",
  subtext:
    "Tilak Global School is an English-medium, co-educational CBSE school offering classes from Nursery to XII — part of the trusted Tilak Group, Jaipur. We nurture curiosity, discipline, and lifelong learning.",
  imageSrc: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=80&fm=webp",
  imageAlt: "Students studying at Tilak Global School",
  cta: [
    {
      label:   "Enquire for Admission",
      href:    "/admissions/online-admission-form",
      variant: "primary",   // solid red, square corners
    },
    {
      label:   "Explore Academics",
      href:    "/academics",
      variant: "outline",   // white border, square corners
    },
  ],
};

// ── Stats Bar ─────────────────────────────────────────────────────────────────
export const stats = [
  {
    label:         "Nursery–XII",
    subtext:       "Classes offered",
    subtextMobile: "Classes offered",
  },
  {
    label:         "CBSE",
    subtext:       "NCERT syllabus",
    subtextMobile: "NCERT syllabus",
  },
  {
    label:         "Since 2016",
    subtext:       "Founded",
    subtextMobile: "Founded",
  },
  {
    label:         "Co-Ed",
    subtext:       "English medium",
    subtextMobile: "English medium",
  },
  {
    label:         "Tilak Group",
    subtext:       "Also runs Tilak Public School",
    subtextMobile: "Part of Tilak Group",
  },
];

// ── Director's Message ────────────────────────────────────────────────────────
export const directorMessage = {
  heading:     "Director's Message",
  quote:
    "Our vision is education with positive input, emphasising creativity and innovation, so every child can build strong character and meet a changing world with confidence.",
  note:        "Message summarised from the school website – final wording to be approved by the school",
  name:        "R. S. Tanwar",
  designation: "Director, Tilak Global School",
  cta: {
    label: "Read Full Message",
    href:  "/about-us/principals-message",
  },
  image: {
    src:     "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80&fm=webp",
    alt:     "R. S. Tanwar – Director, Tilak Global School",
    caption: "Director",
  },
};
export const welcome = {
  label:   "Welcome to Tilak Global School",
  heading: "Where every child learns without pressure and grows with character",
  paragraphs: [
    "Tilak Global School is an English-medium, co-educational school from Nursery to Class XII, another venture of the Tilak Group, which also runs Tilak Public School at Triveni Nagar, Jaipur.",
    "Following the NCERT/CBSE syllabus, the school takes a holistic and constructivist approach, offering equal educational and developmental opportunities in a stress-free environment.",
  ],
  highlights: [
    { value: "Nursery–XII", label: "Classes offered" },
    { value: "CBSE",        label: "NCERT syllabus"  },
    { value: "2016",        label: "Established"     },
  ],
  cta: {
    label: "Read More",
    href:  "/about-us/our-school",
  },
  image: {
    src:     "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80&fm=webp",
    alt:     "Tilak Global School classroom",
    caption: "Tilak Global School · Jaipur",
  },
};

// ── School Facilities ─────────────────────────────────────────────────────────
export const facilities = {
  heading: "School Facilities",
  subtext: "Spaces designed for learning, play and creativity.",
  note:    "Facilities shown are proposed – subject to school confirmation.",
  items: [
    {
      id:          "smart-classrooms",
      title:       "Smart Classrooms",
      description: "Interactive digital boards for engaging lessons.",
      image: {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "Smart classroom with digital board",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "science-labs",
      title:       "Science Laboratories",
      description: "Fully equipped labs for hands-on scientific exploration.",
      image: {
        src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "Science laboratory with equipment",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "computer-lab",
      title:       "Computer Lab",
      description: "Modern computers with high-speed internet for digital learning.",
      image: {
        src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "Computer lab with modern systems",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "library",
      title:       "Library",
      description: "A rich collection of books, journals and digital resources.",
      image: {
        src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "School library with bookshelves",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "sports",
      title:       "Sports Facilities",
      description: "Outdoor and indoor spaces for physical education and sports.",
      image: {
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "Sports ground and facilities",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "auditorium",
      title:       "Auditorium",
      description: "A large hall for assemblies, events and cultural programmes.",
      image: {
        src: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "School auditorium",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "music-art",
      title:       "Music & Art Rooms",
      description: "Dedicated creative spaces for music, fine arts and crafts.",
      image: {
        src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "Music and art room",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "transport-security",
      title:       "Transport & Security",
      description: "Safe transport network and 24/7 campus security.",
      image: {
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt: "School bus transport",
      },
      href: "/about-us/infrastructure",
    },
  ],
};

// ── Why Choose Tilak Global School ────────────────────────────────────────────
export const whyChoose = {
  heading: "Why Choose Tilak Global School",
  subtext: "Four reasons families trust us with their children's future.",
  items: [
    {
      id:          "curriculum",
      number:      "01",
      title:       "NCERT / CBSE Curriculum",
      description: "A structured academic programme preparing students for board examinations.",
      highlight:   false,
      image: {
        src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students studying with books",
      },
    },
    {
      id:          "environment",
      number:      "02",
      title:       "Stress-Free Environment",
      description: "A holistic, constructivist approach where every child can grow with confidence.",
      highlight:   false,
      image: {
        src: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students in a relaxed learning environment",
      },
    },
    {
      id:          "legacy",
      number:      "03",
      title:       "Tilak Group Legacy",
      description: "From the group that also runs Tilak Public School, Triveni Nagar, Jaipur.",
      highlight:   false,
      image: {
        src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "School building representing legacy and trust",
      },
    },
    {
      id:          "achievements",
      number:      "04",
      title:       "Achievements & Results",
      description: "Board results, achievements and awards — to be updated once verified by the school.",
      highlight:   true,
      image: {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students collaborating on a project",
      },
    },
  ],
};

// ── FAQs ──────────────────────────────────────────────────────────────────────
export const faqs = {
  heading: "Frequently Asked Questions",
  subtext: "Quick answers to the most common questions from parents and students.",
  cta: {
    label: "Still have questions? Contact Us",
    href:  "/contact-us",
  },
  items: [
    {
      id: 1,
      question: "Which board is Tilak Global School affiliated to?",
      answer:   "The school follows the NCERT/CBSE curriculum and offers classes from Nursery to XII.",
    },
    {
      id: 2,
      question: "What is the medium of instruction?",
      answer:   "English is the medium of instruction; the school is co-educational.",
    },
    {
      id: 3,
      question: "How can I apply for admission?",
      answer:   "You can fill the online admission form or visit the school office at Bindayaka, Mukandpura Road, Jaipur. Admissions for Session 2025-26 are open.",
    },
    {
      id: 4,
      question: "Is transport facility available?",
      answer:   "Yes, school transport with security staff covers major routes in Jaipur (routes to be confirmed by the school).",
    },
    {
      id: 5,
      question: "Is Tilak Global School part of the Tilak Group?",
      answer:   "Yes, it is another venture of the Tilak Group, which also runs Tilak Public School, Triveni Nagar, Jaipur.",
    },
  ],
};

// ── Admission CTA Banner ───────────────────────────────────────────────────────
export const ctaBanner = {
  eyebrow:     "Admissions 2025-26",
  heading:     "Give your child the Tilak Global advantage",
  subtext:     "Admissions open · Nursery to Class XII · Session 2025-26",
  sessionYear: "2025",
  points: [
    "Nursery to Class XII",
    "CBSE · English medium",
    "Limited seats per class",
  ],
  primary: {
    label: "Apply for Admission",
    href:  "/admissions/online-admission-form",
  },
  secondary: {
    label: "Contact Us",
    href:  "/contact-us",
  },
  image: {
    src:  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80&fm=webp",
    alt:  "Tilak Global School building",
  },
};
