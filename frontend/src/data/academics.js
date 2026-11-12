/**
 * academics.js
 * Feeds all pages under app/(user)/academics/ and the AcademicStages homepage section.
 */

export const academicsPage = {
  heading: "Academics",
  subtext: "Explore our academic programmes, curriculum stages and teaching approach.",
};

export const curriculumPage = {
  heading: "Curriculum",
  subtext: "A structured NCERT/CBSE curriculum designed to build strong academic foundations from Nursery to Class XII.",
};

export const facultyPage = {
  heading: "Faculty",
  subtext: "Dedicated educators committed to creating an engaging and supportive learning experience.",
  introHeading: "Our Educators",
  introLead:    "At Tilak Global School, our teachers are the foundation of everything we do.",
  introParagraphs: [
    "Our faculty are dedicated professionals who bring knowledge, patience and genuine care to every classroom. They create an environment where students feel safe to ask questions, make mistakes and grow — academically and as individuals.",
    "Following a constructivist and holistic teaching approach, our educators focus on building conceptual understanding rather than rote memorisation. They design lessons that connect classroom learning to real-world situations, encouraging curiosity, critical thinking and independent study habits.",
    "Beyond academics, our teachers support students in developing self-confidence, discipline and a positive attitude toward learning — skills that serve them well throughout their lives.",
  ],
  introNote: "Faculty profiles and individual qualifications will be published once confirmed by the school.",
  introImage: {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80&fm=webp",
    alt: "Teachers and students in a classroom at Tilak Global School",
  },
};

export const academicCalendarPage = {
  heading: "Academic Calendar",
  subtext: "Stay informed about important academic dates, examinations and school activities throughout the session.",
};

// ── Page hero data (feed AcademicsHero → PageHero) ───────────────────────────

export const academicsHero = {
  badge: "Excellence in Education",
  heading: "Academics at Tilak Global School",
  subtext:
    "Nurturing young minds through a balanced NCERT/CBSE curriculum, experienced educators and a learning environment that encourages curiosity, creativity and academic excellence.",
  breadcrumb: [
    { label: "Home",      href: "/" },
    { label: "Academics", href: "/academics" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students studying in a classroom at Tilak Global School",
  },
};

export const curriculumHero = {
  badge: "Our Learning Approach",
  heading: "Our Curriculum",
  subtext:
    "A comprehensive NCERT/CBSE-based curriculum designed to strengthen academic foundations, critical thinking, creativity and lifelong learning.",
  breadcrumb: [
    { label: "Home",       href: "/"                   },
    { label: "Academics",  href: "/academics"           },
    { label: "Curriculum", href: "/academics/curriculum" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students studying books and curriculum materials",
  },
};

export const facultyHero = {
  badge: "Our Educators",
  heading: "Our Faculty",
  subtext:
    "Dedicated educators committed to creating an engaging, supportive and inspiring learning experience for every student.",
  breadcrumb: [
    { label: "Home",      href: "/"                },
    { label: "Academics", href: "/academics"        },
    { label: "Faculty",   href: "/academics/faculty" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Teacher with students in a classroom",
  },
};

export const academicCalendarHero = {
  badge: "Academic Planning",
  heading: "Academic Calendar",
  subtext:
    "Stay informed about important academic activities, examinations, school events and key dates throughout the academic session.",
  breadcrumb: [
    { label: "Home",              href: "/"                           },
    { label: "Academics",         href: "/academics"                   },
    { label: "Academic Calendar", href: "/academics/academic-calendar" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students planning and studying in school",
  },
};

// ── Academic Stages — feeds AcademicStages.jsx on homepage and /academics pages ──
export const academicStages = {
  heading: "Our Academic Stages",
  accent:  "Four stages, one continuous journey from first steps to career guidance.",
  stages: [
    {
      id:          "kindergarten",
      number:      "01",
      range:       "Nursery – KG",
      title:       "Kindergarten",
      description: "Meets the needs of young learners in a safe, family-like environment.",
      stats:       "20+ activities · 10+ classrooms",
      href:        "/academics/curriculum",
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794408329/tilak-global-school/academic-stages/kindergarten.jpg",
        alt: "Young children in a Kindergarten classroom at Tilak Global School",
      },
    },
    {
      id:          "primary",
      number:      "02",
      range:       "Class I – V",
      title:       "Primary School",
      description: "Qualified, diverse faculty who nurture curiosity and eagerness to learn.",
      stats:       "15+ activities · 20+ classrooms",
      href:        "/academics/curriculum",
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794408331/tilak-global-school/academic-stages/primary_school.jpg",
        alt: "Primary school students in class at Tilak Global School",
      },
    },
    {
      id:          "middle",
      number:      "03",
      range:       "Class VI – VIII",
      title:       "Middle School",
      description: "Curriculum design, teaching strategies and assessments aligned by teachers.",
      stats:       "15+ activities · 20+ classrooms",
      href:        "/academics/curriculum",
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794408332/tilak-global-school/academic-stages/middle_school.jpg",
        alt: "Middle school students in a classroom at Tilak Global School",
      },
    },
    {
      id:          "senior",
      number:      "04",
      range:       "Class IX – XII",
      title:       "Senior School",
      description: "Focus on IIT, NEET and CPT selection, with career guidance.",
      stats:       "15+ activities · 20+ classrooms",
      href:        "/academics/curriculum",
      image: {
        src: "https://res.cloudinary.com/h6erncmn/image/upload/v1794408334/tilak-global-school/academic-stages/senior_school.jpg",
        alt: "Senior school students studying at Tilak Global School",
      },
    },
  ],
};

// ── CBSE Curriculum section ───────────────────────────────────────────────────
export const cbseCurriculum = {
  eyebrow:     "Curriculum",
  heading:     "CBSE Curriculum",
  description:
    "The school follows the NCERT/CBSE syllabus for all classes, providing a structured and nationally recognised academic framework from Nursery through Class XII.",
  note:
    "Stream and subject list for Class XI–XII to be confirmed by the school.",
  highlights: [
    "English-medium instruction",
    "NCERT-based textbooks",
    "Continuous and periodic assessments (details to be confirmed)",
    "Co-curricular and activity programme",
  ],
};

// ── Teaching Methodology section ─────────────────────────────────────────────
export const teachingMethodology = {
  eyebrow:     "How We Teach",
  heading:     "Teaching Methodology",
  description:
    "A holistic and constructivist approach where students learn by doing, questioning and applying ideas.",
  items: [
    {
      id:          "concept-led",
      number:      "01",
      title:       "Concept-led Learning",
      description:
        "We encourage students to understand fundamental concepts through interactive lessons, meaningful discussions and practical examples.",
      image: {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students engaged in concept-based classroom learning",
      },
    },
    {
      id:          "activity-based",
      number:      "02",
      title:       "Activity-based Learning",
      description:
        "Hands-on activities, group projects and experiential learning help students develop curiosity, teamwork and problem-solving skills.",
      image: {
        src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students participating in classroom activities and projects",
      },
    },
    {
      id:          "career-guidance",
      number:      "03",
      title:       "Career Guidance",
      description:
        "Students receive academic guidance and support in exploring higher education opportunities, competitive examinations and future career pathways.",
      image: {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students receiving educational guidance and career counselling",
      },
    },
  ],
};

// ── Academic Calendar (shared between preview and dedicated page) ─────────────
export const academicCalendar = {
  heading:     "Academic Calendar",
  description: "Stay informed about important academic dates, examinations and school activities throughout the academic session.",
  session:     "2026–27",
  events: [
    {
      id:            1,
      day:           "04",
      month:         "Apr",
      title:         "New Session Begins",
      description:   "The new academic session is expected to begin in April. The exact date should be verified with the school.",
      category:      "Academic Session",
      dateConfirmed: false,
    },
    {
      id:            2,
      day:           "--",
      month:         "TBA",
      title:         "Periodic Tests",
      description:   "Periodic assessments will be conducted according to the school examination schedule. Dates will be announced by the school.",
      category:      "Examinations",
      dateConfirmed: false,
    },
    {
      id:            3,
      day:           "--",
      month:         "TBA",
      title:         "Final Examinations",
      description:   "Final examinations for Nursery to Class IX will be scheduled according to the academic calendar.",
      category:      "Examinations",
      dateConfirmed: false,
    },
  ],
};

// Preview config — limit controls how many events appear on the Academics page
export const academicCalendarPreview = {
  heading: "Academic Calendar Preview",
  subtext: "Important academic dates and upcoming school activities.",
  viewAll: {
    label: "View Full Academic Calendar",
    href:  "/academics/academic-calendar",
  },
  limit: 3,
};

// ── Examination Information section ──────────────────────────────────────────
export const examinationInformation = {
  eyebrow:     "Assessment & Evaluation",
  heading:     "Examination Information",
  description:
    "The school conducts internal assessments and final examinations for students from Nursery to Class IX, while students of Classes X and XII appear for CBSE board examinations as applicable.",
  note:
    "Detailed examination patterns, schedules and assessment criteria will be updated after confirmation from the school.",
  highlights: [
    "Continuous assessment and evaluation",
    "Periodic tests and examinations",
    "CBSE board examination preparation",
    "Student progress monitoring",
  ],
};

// ── Academics page CTA banner ─────────────────────────────────────────────────
export const academicsCta = {
  eyebrow:     "Admissions 2026–27",
  heading:     "Give your child the Tilak Global advantage",
  subtext:     "Admissions open · Nursery to Class XII · Session 2026–27 (subject to school confirmation)",
  sessionYear: "2026",
  points: [
    "Nursery to Class XII",
    "NCERT / CBSE Curriculum",
    "English-medium Education",
  ],
  primary: {
    label: "Apply for Admission",
    href:  "/admissions/online-admission-form",
  },
  secondary: {
    label: "Contact Us",
    href:  "/contact-us",
  },
};
