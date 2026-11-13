/**
 * home.js
 * Feeds HeroSection, StatsBar, and WelcomeSection on the homepage.
 */

// ── Hero Section ─────────────────────────────────────────────────────────────
export const hero = {
  eyebrow:      "Tilak Global School · Jaipur",
  badge:        "Admissions Open · Session 2026-27",
  headingLine1: "A stress-free place where",
  headingLine2: "every child grows with character.",
  // Keep full heading for SEO / non-visual use
  heading:      "A stress-free place where every child grows with character.",
  subtext:
    "Tilak Global School is an English-medium, co-educational CBSE school offering classes from Nursery to XII — part of the trusted Tilak Group, Jaipur. We nurture curiosity, discipline, and lifelong learning.",
  imageSrc: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
  imageAlt: "Tilak Global School campus — Bindayaka, Jaipur",
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
    src:     "https://res.cloudinary.com/h6erncmn/image/upload/v1794425393/tilak-global-school/hero/welcome-section.jpg",
    alt:     "Tilak Global School classroom",
    caption: "Tilak Global School · Jaipur",
  },
};

// ── School Facilities ─────────────────────────────────────────────────────────
export const facilities = {
  heading: "School Facilities",
  subtext: "Spaces designed for learning, growth and creativity.",
  note:    "",
  items: [
    // ── Cloudinary images (actual school photographs) ───────────────────────
    {
      id:          "laboratory",
      title:       "Laboratory",
      description: "To enhance learning ability, develop practical skills and provide hands-on exposure to theoretical concepts, the school has modern laboratories for Physics, Chemistry, Biology, Mathematics, Geography and Computer Science.",
      image: {
        src:            "https://res.cloudinary.com/h6erncmn/image/upload/v1794421174/tilak-global-school/facilities/laboratory.jpg",
        alt:            "Modern school laboratory at Tilak Global School",
        objectPosition: "center",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "smart-classrooms",
      title:       "Smart Classrooms",
      description: "Computer-aided teaching through smart classrooms helps make the teaching and learning process more interactive, engaging and effective for students.",
      image: {
        src:            "https://res.cloudinary.com/h6erncmn/image/upload/v1794421180/tilak-global-school/facilities/smart-classrooms.jpg",
        alt:            "Smart classroom with digital board at Tilak Global School",
        objectPosition: "center",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "library",
      title:       "Library",
      description: "The school library offers a wide range of resources to support students' academic needs, including books, journals, periodicals, newspapers and audiovisual materials. New resources are added regularly to keep the collection relevant and up to date.",
      image: {
        src:            "https://res.cloudinary.com/h6erncmn/image/upload/v1794421176/tilak-global-school/facilities/library.jpg",
        alt:            "School library at Tilak Global School",
        objectPosition: "center",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "sports",
      title:       "Sports",
      description: "The school believes in a healthy mind in a healthy body. Facilities and activities include Basketball, Table Tennis, Cricket, Badminton, Volleyball, Chess and other indoor and outdoor games. Students participate in sports activities during school hours and may take part in inter-school, state and national competitions.",
      image: {
        src:            "https://res.cloudinary.com/h6erncmn/image/upload/v1794421181/tilak-global-school/facilities/sports.jpg",
        alt:            "Sports ground and facilities at Tilak Global School",
        objectPosition: "center",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "multi-purpose-hall",
      title:       "Multi Purpose Hall",
      description: "The school has a multi-purpose hall and auditorium for cultural programmes, school functions, assemblies and other events.",
      image: {
        src:            "https://res.cloudinary.com/h6erncmn/image/upload/v1794421178/tilak-global-school/facilities/multi-purpose-hall.jpg",
        alt:            "Multi-purpose hall and auditorium at Tilak Global School",
        objectPosition: "center",
      },
      href: "/about-us/infrastructure",
    },
    // ── Unsplash temporary images (no local photo available) ────────────────
    {
      id:          "music-dance",
      title:       "Music and Dance",
      description: "Students have opportunities to learn vocal music, instrumental music and dance during school hours. Dedicated music and dance rooms provide space for students to practise and develop their creative abilities.",
      image: {
        // TEMPORARY — replace with actual school photo when available
        src:            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt:            "Music and dance room at Tilak Global School",
        objectPosition: "center",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "transport",
      title:       "Transport",
      description: "The school provides transport facilities for students of different classes and for school-organised activities. School buses operate on multiple routes and are equipped with GPS tracking.",
      image: {
        src:            "https://res.cloudinary.com/h6erncmn/image/upload/v1794421434/tilak-global-school/facilities/transport.jpg",
        alt:            "School transport bus at Tilak Global School",
        objectPosition: "center",
      },
      href: "/about-us/infrastructure",
    },
    {
      id:          "art-room",
      title:       "Art Room",
      description: "A dedicated art room provides students with opportunities to explore drawing, painting, craft and other creative activities.",
      image: {
        // TEMPORARY — replace with actual school photo when available
        src:            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80&fm=webp",
        alt:            "Art room at Tilak Global School",
        objectPosition: "center",
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
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794418739/tilak-global-school/why-us/ncert_curriculum.jpg",
        alt: "NCERT CBSE Curriculum at Tilak Global School",
      },
    },
    {
      id:          "environment",
      number:      "02",
      title:       "Stress-Free Environment",
      description: "A holistic, constructivist approach where every child can grow with confidence.",
      highlight:   false,
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794418741/tilak-global-school/why-us/stress_free_environment.jpg",
        alt: "Stress-free learning environment at Tilak Global School",
      },
    },
    {
      id:          "legacy",
      number:      "03",
      title:       "Tilak Group Legacy",
      description: "From the group that also runs Tilak Public School, Triveni Nagar, Jaipur.",
      highlight:   false,
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794418742/tilak-global-school/why-us/tilak_legacy.jpg",
        alt: "Tilak Group legacy and school building",
      },
    },
    {
      id:          "achievements",
      number:      "04",
      title:       "Achievements & Results",
      description: "Board results, achievements and awards — to be updated once verified by the school.",
      highlight:   true,
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794418743/tilak-global-school/why-us/achievements_results.jpg",
        alt: "Student achievements and results at Tilak Global School",
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
  eyebrow:     "Admissions 2026-27",
  heading:     "Give your child the Tilak Global advantage",
  subtext:     "Admissions open · Nursery to Class XII · Session 2026-27",
  sessionYear: "",
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
    src:  "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
    alt:  "Tilak Global School campus — Bindayaka, Jaipur",
  },
};
