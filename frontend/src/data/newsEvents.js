/**
 * newsEvents.js
 * Feeds NewsAccordion (homepage), NewsGallerySection, and /news-events page.
 * All strings here — zero literals in JSX components.
 */

// ── Legacy homepage exports (preserved — used by NewsAccordion + NewsGallerySection) ──
export const newsEventsPage = {
  heading: "News & Events",
  subtext: "Stay updated with the latest news, notices and events from Tilak Global School.",
};

export const newsEvents = {
  heading: "News & Events",
  note:    "Dates shown are indicative and subject to change — please confirm with the school.",
  viewAll: {
    label: "View All News & Events",
    href:  "/news-events",
  },
  items: [
    {
      id:      1,
      day:     "04",
      month:   "Apr",
      title:   "New session will begin",
      summary: "The new academic session begins from 4 April.",
      content:
        "Full notice: The new academic session 2025-26 will commence from 4 April. All students are requested to report by 8:00 AM in proper uniform. Book lists and timetables will be shared on the first day.",
      type: "event",
    },
    {
      id:      2,
      day:     "--",
      month:   "Date",
      title:   "Final exams for Nursery to IX",
      summary: "Final examinations for students of Nursery to Class IX begin.",
      content:
        "Final examinations for the academic year 2024-25 will be conducted for Nursery to Class IX. Detailed date sheets will be shared separately. Students are advised to revise all topics covered during the year.",
      type: "notice",
    },
    {
      id:      3,
      day:     "--",
      month:   "Date",
      title:   "Annual Day celebrated",
      summary: "Annual Day celebrations held at school.",
      content:
        "The school celebrated its Annual Day with great enthusiasm. Students performed various cultural programmes including dance, music, drama and recitation. Prizes were distributed to outstanding achievers.",
      type: "news",
    },
    {
      id:      4,
      day:     "--",
      month:   "Date",
      title:   "Parent-Teacher Meeting",
      summary: "PTM scheduled for all classes – parents are requested to attend.",
      content:
        "A Parent-Teacher Meeting is scheduled for all classes. Parents are requested to meet the respective class teachers to discuss their ward's academic progress. Timings will be communicated via school notice.",
      type: "notice",
    },
  ],
};

// ── News & Events page hero ───────────────────────────────────────────────────
export const newsEventsHero = {
  badge:   "School Updates",
  heading: "News & Events",
  subtext:
    "Stay connected with the latest school announcements, upcoming activities, celebrations and important notices from Tilak Global School.",
  breadcrumb: [
    { label: "Home",         href: "/" },
    { label: "News & Events", href: "/news-events" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students at a school event at Tilak Global School",
  },
};

// ── Featured Event ────────────────────────────────────────────────────────────
export const featuredEvent = {
  label:       "Featured Event",
  title:       "Annual Day Celebration",
  description:
    "Tilak Global School's Annual Day is a grand celebration of student talent, creativity and academic excellence. Students from Nursery to Class XII present cultural programmes including dance, music, drama and recitation.",
  date:        "Date to be announced by the school",
  dateConfirmed: false,
  cta: {
    label: "View Details",
  },
  image: {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Annual Day celebrations at Tilak Global School",
  },
};

// ── Upcoming Events ───────────────────────────────────────────────────────────
export const upcomingEvents = {
  eyebrow:     "What's Ahead",
  heading:     "Upcoming Events",
  description: "Events and activities scheduled at Tilak Global School. Dates are indicative and will be confirmed by the school.",
  items: [
    {
      id:          "upcoming-new-session",
      title:       "New Academic Session",
      description: "The new academic session is expected to commence in April. All students are requested to report with required stationery and uniforms on the first day.",
      category:    "Academic",
      date:        "April (Date TBC)",
      dateConfirmed: false,
      image: {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students beginning the new academic session",
      },
    },
    {
      id:          "upcoming-exams",
      title:       "School Examination Schedule",
      description: "Periodic and final examinations for all classes will be scheduled and communicated through the school notice board and parent communication.",
      category:    "Examinations",
      date:        "Date TBC — as per school schedule",
      dateConfirmed: false,
      image: {
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students in examination hall",
      },
    },
    {
      id:          "upcoming-sports-day",
      title:       "Sports Day",
      description: "Annual Sports Day will feature track and field events, team sports, and friendly competitions for students of all stages. Parents are welcome to attend.",
      category:    "Sports",
      date:        "Date TBC — to be announced",
      dateConfirmed: false,
      image: {
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Students participating in sports activities",
      },
    },
  ],
};

// ── News & Announcements ──────────────────────────────────────────────────────
export const newsAnnouncements = {
  eyebrow:     "Latest Updates",
  heading:     "News & Announcements",
  note:        "Dates are indicative. Please confirm details with the school office.",
  items: [
    {
      id:      "news-1",
      day:     "04",
      month:   "Apr",
      year:    "2026",
      title:   "New Academic Session Begins",
      summary: "The new academic session 2025-26 commences from 4 April.",
      content:
        "All students are requested to report by 8:00 AM on the first day of the new session in proper school uniform. Updated timetables, book lists and fee schedules will be shared on the first day of school. Parents are requested to ensure their ward's attendance from day one.",
      category:      "Academic",
      dateConfirmed: false,
    },
    {
      id:      "news-2",
      day:     "--",
      month:   "TBA",
      year:    "",
      title:   "Final Examination Information",
      summary: "Final examinations for Nursery to Class IX will be conducted as per the annual calendar.",
      content:
        "Final examinations for the academic year will be conducted for students of Nursery to Class IX. Detailed date sheets will be shared through the school notice board in advance. Students are advised to complete their revision and prepare according to the prescribed syllabus.",
      category:      "Examinations",
      dateConfirmed: false,
    },
    {
      id:      "news-3",
      day:     "--",
      month:   "TBA",
      year:    "",
      title:   "Annual Day Celebration",
      summary: "Tilak Global School's Annual Day was celebrated with great enthusiasm.",
      content:
        "The school celebrated its Annual Day with cultural performances by students from Nursery to Class XII. The event featured dance, music, drama, recitation and prize distribution. The programme was attended by parents, staff and school management.",
      category:      "Events",
      dateConfirmed: false,
    },
    {
      id:      "news-4",
      day:     "--",
      month:   "TBA",
      year:    "",
      title:   "Parent-Teacher Meeting",
      summary: "PTM scheduled for all classes. Parents are requested to attend.",
      content:
        "A Parent-Teacher Meeting is scheduled for all classes. Parents are requested to visit the school and meet the respective class teachers to discuss their child's academic progress and overall performance. Timings will be communicated through the school notice board and parent groups.",
      category:      "Notice",
      dateConfirmed: false,
    },
  ],
};

// ── Notices ───────────────────────────────────────────────────────────────────
export const notices = {
  eyebrow: "Official Notices",
  heading: "Notices",
  items: [
    {
      id:          "notice-1",
      title:       "Admission Notice",
      description: "Admissions are open for Nursery to Class XII for the current session. Parents are requested to contact the school office for admission enquiries and requirements.",
      date:        "Current Session",
      category:    "Admissions",
      documentUrl: null,
      documentStatus: "Document Coming Soon",
    },
    {
      id:          "notice-2",
      title:       "Fee Schedule Notice",
      description: "Fee structure details for the current academic session will be shared by the school. Parents are requested to contact the school office for current fee information.",
      date:        "Current Session",
      category:    "Finance",
      documentUrl: null,
      documentStatus: "Document Coming Soon",
    },
    {
      id:          "notice-3",
      title:       "Holiday List",
      description: "The school holiday list for the academic year will be published and distributed to all students and parents at the commencement of each session.",
      date:        "Current Session",
      category:    "General",
      documentUrl: null,
      documentStatus: "Document Coming Soon",
    },
  ],
  viewNotice:   "View Notice",
  documentSoon: "Document Coming Soon",
};

// ── Previous Events ───────────────────────────────────────────────────────────
export const previousEvents = {
  eyebrow:     "Looking Back",
  heading:     "Previous Events",
  description: "A glimpse at events and activities that have brought the Tilak Global School community together.",
  items: [
    {
      id:          "prev-annual-day",
      title:       "Annual Day Celebration",
      description: "Students showcased their talents through cultural performances, dance, music and drama at the school's Annual Day.",
      category:    "Events",
      date:        "Previous Session",
      image: {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Annual Day celebrations at Tilak Global School",
      },
    },
    {
      id:          "prev-sports",
      title:       "Sports Activities",
      description: "Students participated in outdoor sports, athletics and team competitions during the school's sports programme.",
      category:    "Sports",
      date:        "Previous Session",
      image: {
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Sports activities at Tilak Global School",
      },
    },
    {
      id:          "prev-science",
      title:       "Science Exhibition",
      description: "Students from Middle and Senior School presented their science projects and experiments at the annual Science Exhibition.",
      category:    "Academic",
      date:        "Previous Session",
      image: {
        src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80&fm=webp",
        alt: "Science exhibition at Tilak Global School",
      },
    },
  ],
};

// ── News & Events page CTA banner ─────────────────────────────────────────────
export const newsEventsCta = {
  eyebrow: "Admissions Enquiry",
  heading: "Give your child the Tilak Global advantage",
  subtext: "Admissions open for Nursery to Class XII. Contact the school for current session details.",
  primary: {
    label: "Apply for Admission",
    href:  "/admissions/online-admission-form",
  },
  secondary: {
    label: "Contact Us",
    href:  "/contact-us",
  },
};
