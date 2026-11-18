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
  heading: "Chairman's Message",
  subtext: "A vision for excellence, a commitment to values — from the Chairman of Tilak Global School.",
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
    src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
    alt: "Tilak Global School campus, Bindayaka, Jaipur",
  },
};

export const ourSchoolHero = {
  badge:   "Est. 2016 · Jaipur",
  heading: "Our School",
  subtext: "An English-medium, co-educational CBSE school at Bindayaka, Jaipur — part of the trusted Tilak Group.",
  breadcrumb: [
    { label: "Home",       href: "/" },
    { label: "About Us",   href: "/about-us" },
    { label: "Our School", href: "/about-us/our-school" },
  ],
  image: {
    src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
    alt: "Tilak Global School campus, Bindayaka, Jaipur",
  },
};

export const visionMissionHero = {
  badge:   "Our Purpose",
  heading: "Our Vision & Mission",
  subtext: "The principles and ideals that guide every decision we make and every child we nurture.",
  breadcrumb: [
    { label: "Home",             href: "/" },
    { label: "About Us",         href: "/about-us" },
    { label: "Vision & Mission", href: "/about-us/vision-mission" },
  ],
  image: {
    src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
    alt: "Students engaged in learning at Tilak Global School",
  },
};

export const principalsMessageHero = {
  badge:   "Leadership",
  heading: "Chairman's Message",
  subtext: "A vision for excellence, a commitment to values — from Mr. R. S. Tanwar, Chairman, Tilak Global School.",
  breadcrumb: [
    { label: "Home",               href: "/" },
    { label: "About Us",           href: "/about-us" },
    { label: "Chairman's Message", href: "/about-us/principals-message" },
  ],
  image: {
    src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
    alt: "School leadership at Tilak Global School",
  },
};

export const infrastructureHero = {
  badge:   "Campus & Facilities",
  heading: "School Infrastructure",
  subtext: "Modern facilities and thoughtfully designed spaces for learning, sports, creativity and growth.",
  breadcrumb: [
    { label: "Home",           href: "/" },
    { label: "About Us",       href: "/about-us" },
    { label: "Infrastructure", href: "/about-us/infrastructure" },
  ],
  image: {
    src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
    alt: "Tilak Global School campus and facilities",
  },
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
    src:     "https://res.cloudinary.com/h6erncmn/image/upload/v1794977696/tilak-global-school/gallery/tia17gm00g0tdlowyuab.jpg",
    alt:     "Students of Tilak Global School in classroom",
    caption: "Tilak Global School, Bindayaka · Est. 2016",
  },
};

// ── Chairman's Message (About Us page) ───────────────────────────────────────
export const aboutDirectorMessage = {
  heading:     "Chairman's Message",
  quote:
    "Education is not merely about acquiring knowledge or achieving academic excellence; it is about shaping character, instilling values, and preparing young individuals to face life's challenges with confidence, compassion, and integrity.",
  fullMessage: `Dear Parents, Students, and Well-Wishers,

It gives me immense pleasure to welcome you to Tilak Global School, a place where young minds are nurtured, dreams are encouraged, and every child is inspired to discover their true potential.

I firmly believe that education is not merely about acquiring knowledge or achieving academic excellence; it is about shaping character, instilling values, and preparing young individuals to face life's challenges with confidence, compassion, and integrity.

At Tilak Global School, our vision is to create a nurturing and progressive learning environment where tradition meets innovation, knowledge inspires creativity, and values build character. We strive to provide holistic education that promotes intellectual curiosity, emotional well-being, leadership, and a strong sense of social responsibility.

In today's rapidly evolving world, we are committed to embracing modern teaching methodologies and innovative learning experiences while remaining deeply rooted in our cultural heritage and moral values.

I strongly believe that every child possesses unique talents and limitless possibilities. Our responsibility is to recognize those abilities, encourage their growth, and empower each student to become a confident, responsible, and compassionate individual.

Together with our dedicated educators and supportive parents, we aspire to build not just successful students, but thoughtful individuals and responsible citizens who will contribute meaningfully to society and the nation.

Let us continue this beautiful journey of learning, growth, and excellence together.`,
  note:        "A Vision for Excellence, A Commitment to Values",
  name:        "Mr. R. S. Tanwar",
  designation: "Chairman, Tilak Global School",
  cta:         null,
  image: {
    src:     "/images/chairman-rs-tanwar.jpg",
    alt:     "Mr. R. S. Tanwar – Chairman, Tilak Global School",
    caption: "Chairman",
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
    src:     "https://res.cloudinary.com/h6erncmn/image/upload/v1794327697/tilak-global-school/campus/tilak-global-school/campus/school-main-gate.jpg",
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
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327829/tilak-global-school/events/tilak-global-school/events/annual-day-kathak-dance.jpg",
        alt: "Students performing at Tilak Global School Annual Day",
        objectPosition: "center",
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
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327921/tilak-global-school/events/tilak-global-school/events/saraswati-puja-idol.jpg",
        alt: "Students collaborating on a project",
        objectPosition: "center",
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
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794327929/tilak-global-school/events/tilak-global-school/events/saraswati-vandana-singing.jpg",
        alt: "Hands together symbolising teamwork and shared values",
        objectPosition: "center",
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
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
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
        src: "/images/classroom-tilak-global.jpg",
        alt: "Students in classroom at Tilak Global School",
      },
    },
    {
      id:          "playground",
      number:      "03",
      title:       "Playground",
      caption:     "Open space for sports & play",
      description: "Dedicated space for sports, assemblies and outdoor learning.",
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421181/tilak-global-school/facilities/sports.jpg",
        alt: "Sports ground at Tilak Global School",
      },
    },
  ],
};

// ── About-page CTA banner ─────────────────────────────────────────────────────
export const aboutCta = {
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
    src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80&fm=webp",
    alt: "Tilak Global School building",
  },
};

// ── Educational Philosophy — feeds Vision & Mission subpage ──────────────────
export const educationalPhilosophy = {
  eyebrow:  "Our Approach",
  heading:  "Educational Philosophy",
  intro:
    "At Tilak Global School, we believe that every child has the potential to learn, grow and contribute meaningfully to society. Our educational approach is built on three interconnected ideas.",
  points: [
    {
      number: "01",
      title:  "Holistic & Constructivist Learning",
      body:
        "We follow a constructivist approach where students learn by doing, questioning and applying ideas. Lessons are designed to build genuine understanding rather than rote memorisation, connecting classroom knowledge to real-world contexts.",
    },
    {
      number: "02",
      title:  "Creativity, Innovation and Positive Values",
      body:
        "In line with the Director's message, the school emphasises creativity, innovation and the development of indigenous knowledge. Students are encouraged to think independently, express themselves and develop strong moral character alongside academic skills.",
    },
    {
      number: "03",
      title:  "Stress-Free, Supportive Environment",
      body:
        "A calm, family-like atmosphere allows every child to progress at a natural pace. Equal educational and developmental opportunities ensure that no child is left behind, and every student feels seen, supported and motivated.",
    },
  ],
  note: "Educational philosophy summarised from the school website — final wording subject to school confirmation.",
};

// ── Chairman's Message page data ─────────────────────────────────────────────
export const principalMessage = {
  heading:         "Chairman's Message",
  subheading:      "A Vision for Excellence, A Commitment to Values",
  placeholder:     false,
  placeholderNote: "",
  name:            "Mr. R. S. Tanwar",
  designation:     "Chairman, Tilak Global School",
  quote:
    "Education is not merely about acquiring knowledge or achieving academic excellence; it is about shaping character, instilling values, and preparing young individuals to face life's challenges with confidence, compassion, and integrity.",
  note: "A Vision for Excellence, A Commitment to Values",
  fullMessage: [
    "Dear Parents, Students, and Well-Wishers,",
    "It gives me immense pleasure to welcome you to Tilak Global School, a place where young minds are nurtured, dreams are encouraged, and every child is inspired to discover their true potential.",
    "I firmly believe that education is not merely about acquiring knowledge or achieving academic excellence; it is about shaping character, instilling values, and preparing young individuals to face life's challenges with confidence, compassion, and integrity.",
    "At Tilak Global School, our vision is to create a nurturing and progressive learning environment where tradition meets innovation, knowledge inspires creativity, and values build character. We strive to provide holistic education that promotes intellectual curiosity, emotional well-being, leadership, and a strong sense of social responsibility.",
    "In today's rapidly evolving world, we are committed to embracing modern teaching methodologies and innovative learning experiences while remaining deeply rooted in our cultural heritage and moral values.",
    "I strongly believe that every child possesses unique talents and limitless possibilities. Our responsibility is to recognize those abilities, encourage their growth, and empower each student to become a confident, responsible, and compassionate individual.",
    "Together with our dedicated educators and supportive parents, we aspire to build not just successful students, but thoughtful individuals and responsible citizens who will contribute meaningfully to society and the nation.",
    "Let us continue this beautiful journey of learning, growth, and excellence together.",
  ],
  closing: "With warm regards and best wishes,",
  image: {
    src:     "/images/chairman-rs-tanwar.jpg",
    alt:     "Mr. R. S. Tanwar – Chairman, Tilak Global School",
    caption: "Chairman",
  },
};

// ── Subpage CTA objects ───────────────────────────────────────────────────────
export const subpageCta = {
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
    src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794421761/tilak-global-school/hero/homepage-hero.jpg",
    alt: "Tilak Global School campus",
  },
};
