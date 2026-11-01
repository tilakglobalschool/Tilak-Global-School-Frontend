/**
 * about.js
 * Feeds all pages under app/(user)/about-us/.
 */

// ── Page content ──────────────────────────────────────────────────────────────

export const aboutPage = {
  heading: "About Us",
  subtext: "Learn more about Tilak Global School — our history, values and community.",
};

export const ourSchoolPage = {
  heading: "Our School",
  subtext: "[Our School content — to be confirmed by school]",
};

export const visionMissionPage = {
  heading: "Vision & Mission",
  subtext: "[Vision / Mission / Values — to be confirmed by school]",
};

export const principalsMessagePage = {
  heading: "Principal's Message",
  subtext: "[Principal / Director message — to be confirmed by school]",
};

export const infrastructurePage = {
  heading: "Infrastructure",
  subtext: "[Infrastructure / facilities content — to be confirmed by school]",
};

// ── Page hero banners (feed PageHero component) ────────────────────────────────

export const aboutHero = {
  badge: "Est. 2016 · Jaipur",
  heading: "About Tilak Global School",
  subtext:
    "An English-medium, co-educational CBSE school for Nursery to XII, from the Tilak Group.",
  breadcrumb: [
    { label: "Home",     href: "/" },
    { label: "About Us", href: "/about-us" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Tilak Global School students",
  },
};

export const ourSchoolHero = {
  heading: "Our School",
  subtext: "Learn about our history, values and the people who make Tilak Global School special.",
  breadcrumb: [
    { label: "Home",       href: "/" },
    { label: "About Us",   href: "/about-us" },
    { label: "Our School", href: "/about-us/our-school" },
  ],
};

export const visionMissionHero = {
  heading: "Vision & Mission",
  subtext: "The principles and ideals that guide every decision we make.",
  breadcrumb: [
    { label: "Home",              href: "/" },
    { label: "About Us",          href: "/about-us" },
    { label: "Vision & Mission",  href: "/about-us/vision-mission" },
  ],
};

export const principalsMessageHero = {
  heading: "Principal's Message",
  subtext: "A personal message from the head of Tilak Global School.",
  breadcrumb: [
    { label: "Home",                 href: "/" },
    { label: "About Us",             href: "/about-us" },
    { label: "Principal's Message",  href: "/about-us/principals-message" },
  ],
};

export const infrastructureHero = {
  heading: "Infrastructure",
  subtext: "Modern facilities and thoughtfully designed spaces for learning and growth.",
  breadcrumb: [
    { label: "Home",           href: "/" },
    { label: "About Us",       href: "/about-us" },
    { label: "Infrastructure", href: "/about-us/infrastructure" },
  ],
};

// ── Who We Are section (About Us page) ────────────────────────────────────────
export const whoWeAre = {
  label:   "Who We Are",
  eyebrow: "Who We Are",
  heading: "A school built on values, curiosity and care",
  lead:    "An English-medium, co-educational CBSE school in Jaipur, built by the Tilak Group on values, curiosity and care.",
  paragraphs: [
    "Tilak Global School is an English-medium, co-educational CBSE school offering classes from Nursery to XII at Bindayaka, Mukandpura Road, Jaipur. It is another venture of the Tilak Group, which also runs Tilak Public School at Triveni Nagar, Jaipur.",
    "Following the NCERT/CBSE syllabus, we take a holistic and constructivist approach to learning, giving every child equal educational and developmental opportunities in a stress-free, family-like environment.",
    "Our focus is on building strong character, confidence and lifelong learning habits so that every student is ready to meet a changing world.",
  ],
  quote: "Equal educational and developmental opportunities for every child, in a stress-free environment.",
  pillars: [
    {
      number: "01",
      title:  "Values",
      text:   "Respect, honesty and discipline practised every day.",
    },
    {
      number: "02",
      title:  "Curiosity",
      text:   "A constructivist, question-led approach to every subject.",
    },
    {
      number: "03",
      title:  "Care",
      text:   "A stress-free, family-like environment for every child.",
    },
  ],
  highlights: [
    { icon: "🎓", text: "Nursery to Class XII" },
    { icon: "📘", text: "NCERT / CBSE Curriculum" },
    { icon: "🤝", text: "Co-educational, English medium" },
    { icon: "🏛️", text: "Part of the Tilak Group" },
  ],
  facts: [
    { value: "2016",        label: "Established"    },
    { value: "Nursery–XII", label: "Classes"         },
    { value: "CBSE",        label: "Curriculum"      },
    { value: "Co-Ed",       label: "English medium"  },
  ],
  cta: {
    label: "Our Vision & Mission",
    href:  "/about-us/vision-mission",
  },
  image: {
    src:     "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80&fm=webp",
    alt:     "Students of Tilak Global School in classroom",
    caption: "Tilak Global School, Bindayaka · Est. 2016",
  },
};

// ── Director's Message (About Us page) ────────────────────────────────────────
export const aboutDirectorMessage = {
  heading:     "Director's Message",
  quote:
    "Our task is to make children aware of indigenous knowledge and prepare them to meet competition with creativity and innovation.",
  note:        "Summarised from the school website – final wording to be approved",
  name:        "R. S. Tanwar",
  designation: "Director",
  cta:         null,
  image: {
    src:     "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80&fm=webp",
    alt:     "R. S. Tanwar – Director, Tilak Global School",
    caption: "Director",
  },
};

// ── Our Journey section (About Us page) ──────────────────────────────────────
export const ourJourney = {
  label:   "Our Journey",
  heading: "From a vision in 2016 to a growing community of learners",
  paragraphs: [
    "Tilak Global School was founded in 2016 as a venture of the Tilak Group, which has been serving the education sector in Jaipur for years through Tilak Public School at Triveni Nagar. Located at Bindayaka, Mukandpura Road, the school was established with a clear purpose — to offer an English-medium, co-educational CBSE education in a calm, stress-free environment where every child feels at home.",
    "Starting from Nursery, the school has steadily grown to offer classes through senior secondary (Class XII) under the NCERT/CBSE curriculum. Along the way, we have focused on building strong academic foundations, well-equipped facilities and a culture of curiosity, discipline and respect.",
    "Today, Tilak Global School continues to expand its facilities, academic programmes and co-curricular opportunities, preparing students not just for board examinations but for life beyond the classroom.",
  ],
  cta: {
    label: "Read More",
    href:  "/about-us/our-school",
  },
  image: {
    src:     "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80&fm=webp",
    alt:     "Tilak Global School campus building",
    caption: "Tilak Global School, Bindayaka · Est. 2016",
  },
  stats: [
    { value: "2016",       label: "Founded"     },
    { value: "Nursery–XII", label: "Classes"     },
    { value: "CBSE",       label: "Affiliation"  },
  ],
};

// ── Vision, Mission & Core Values section ────────────────────────────────────
export const visionMission = {
  sectionHeading: "Vision, Mission & Core Values",
  subtext: "The principles that shape every decision we make and every child we nurture.",
  cards: [
    {
      id:          "vision",
      number:      "01",
      eyebrow:     "Where we are heading",
      title:       "Vision",
      description: "Education with positive input that builds strong human behaviour, creativity and innovation.",
      tag:         "Based on Director's message",
      linkLabel:   "Learn more",
      href:        "/about-us/vision-mission",
      image: {
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students looking ahead toward the horizon",
      },
    },
    {
      id:          "mission",
      number:      "02",
      eyebrow:     "What we do every day",
      title:       "Mission",
      description: "To nurture every student with a holistic and constructivist approach, building academic excellence alongside strong character and values.",
      tag:         null,
      linkLabel:   "Learn more",
      href:        "/about-us/vision-mission",
      image: {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students collaborating on a project",
      },
    },
    {
      id:          "core-values",
      number:      "03",
      eyebrow:     "What we stand for",
      title:       "Core Values",
      description: "Integrity, respect, curiosity and discipline — the core values that shape every student's journey at Tilak Global School.",
      tag:         null,
      linkLabel:   "Learn more",
      href:        "/about-us/vision-mission",
      image: {
        src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Hands together symbolising teamwork and shared values",
      },
    },
  ],
};

// ── Our Campus section (About Us page) ───────────────────────────────────────
export const ourCampus = {
  eyebrow: "Life at School",
  heading: "Our Campus",
  subtext: "Spaces designed for learning, play and growth.",
  cta: {
    label: "Explore Infrastructure",
    href:  "/about-us/infrastructure",
  },
  stat: {
    value: "3+ acres",
    label: "Campus area (to be confirmed)",
  },
  items: [
    {
      id:          "campus",
      number:      "01",
      title:       "Campus",
      caption:     "Main building & grounds",
      description: "Spacious main building set on open green grounds at Bindayaka.",
      image: {
        src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80&fm=webp",
        alt: "Tilak Global School main building and grounds",
      },
    },
    {
      id:          "classroom",
      number:      "02",
      title:       "Classroom",
      caption:     "Smart, well-lit learning spaces",
      description: "Smart boards, natural light and ergonomic seating for every stage.",
      image: {
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80&fm=webp",
        alt: "Smart classroom at Tilak Global School",
      },
    },
    {
      id:          "playground",
      number:      "03",
      title:       "Playground",
      caption:     "Open space for sports & play",
      description: "Dedicated space for sports, assemblies and outdoor learning.",
      image: {
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80&fm=webp",
        alt: "Playground and sports area at Tilak Global School",
      },
    },
  ],
};

// ── About-page CTA banner ─────────────────────────────────────────────────────
export const aboutCta = {
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
    src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80&fm=webp",
    alt: "Tilak Global School building",
  },
};
