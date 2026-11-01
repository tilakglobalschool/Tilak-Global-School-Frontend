/**
 * admissions.js
 * Feeds all pages under app/(user)/admissions/.
 * All content is static / dummy — ready for future backend integration.
 */

// ── Legacy page stub exports (preserved) ─────────────────────────────────────
export const admissionsPage = {
  heading: "Admissions",
  subtext: "Start your child's educational journey at Tilak Global School.",
};

export const admissionProcessPage = {
  heading: "Admission Process",
  subtext: "A simple four-step journey to join the Tilak Global School family.",
};

export const feeStructurePage = {
  heading: "Fee Structure",
  subtext: "Fee details will be updated after confirmation from the school.",
};

export const onlineAdmissionFormPage = {
  heading:  "Online Admission Form",
  subtext:  "Fill in the details below. Our team will get back to you shortly.",
  formNote: "Our admissions team will contact you after reviewing your application.",
};

// ── Hero data ─────────────────────────────────────────────────────────────────
export const admissionsHero = {
  badge:   "Begin Your Journey",
  heading: "Admissions at Tilak Global School",
  subtext:
    "Start your child's educational journey with Tilak Global School. Explore our admission process, eligibility requirements and available classes.",
  breadcrumb: [
    { label: "Home",       href: "/" },
    { label: "Admissions", href: "/admissions" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students in a classroom at Tilak Global School",
  },
};

export const admissionProcessHero = {
  badge:   "How to Apply",
  heading: "Admission Process",
  subtext: "A simple four-step journey to join the Tilak Global School family.",
  breadcrumb: [
    { label: "Home",              href: "/" },
    { label: "Admissions",        href: "/admissions" },
    { label: "Admission Process", href: "/admissions/admission-process" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students in a school hallway",
  },
};

export const feeStructureHero = {
  badge:   "Fee Details",
  heading: "Fee Structure",
  subtext: "Fee details will be updated after confirmation from the school.",
  breadcrumb: [
    { label: "Home",          href: "/" },
    { label: "Admissions",    href: "/admissions" },
    { label: "Fee Structure", href: "/admissions/fee-structure" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Students studying at a desk",
  },
};

export const onlineAdmissionHero = {
  badge:   "Apply Now",
  heading: "Online Admission Form",
  subtext:
    "Complete the form below to enquire about or apply for admission to Tilak Global School.",
  breadcrumb: [
    { label: "Home",                   href: "/" },
    { label: "Admissions",             href: "/admissions" },
    { label: "Online Admission Form",  href: "/admissions/online-admission-form" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80&fm=webp",
    alt: "Student filling out a form at school",
  },
};

// ── Admission Process steps ───────────────────────────────────────────────────
export const admissionProcess = {
  eyebrow:     "How to Apply",
  heading:     "Admission Process",
  description: "Follow these four steps to complete the admission process at Tilak Global School.",
  steps: [
    {
      id:          "enquire",
      number:      "01",
      title:       "Enquire",
      description: "Submit an enquiry online or visit the school office at Bindayaka, Mukandpura Road, Jaipur.",
    },
    {
      id:          "apply",
      number:      "02",
      title:       "Apply",
      description: "Fill out the admission application form with accurate student and parent details.",
    },
    {
      id:          "interaction",
      number:      "03",
      title:       "Interaction",
      description: "Student interaction or assessment may be conducted, if applicable, as communicated by the school.",
    },
    {
      id:          "confirm",
      number:      "04",
      title:       "Confirm",
      description: "Complete document verification and fee payment to confirm the admission.",
    },
  ],
};

// ── Eligibility ───────────────────────────────────────────────────────────────
export const admissionEligibility = {
  eyebrow: "Who Can Apply",
  heading: "Eligibility Criteria",
  note:    "Age requirements are indicative — to be confirmed with the school.",
  rows: [
    { classLabel: "Nursery",          minAge: "3 years (to be confirmed)"  },
    { classLabel: "KG / Class I",     minAge: "4–6 years (to be confirmed)" },
    { classLabel: "Classes II–XII",   minAge: "As per CBSE guidelines"     },
  ],
};

// ── Required Documents ────────────────────────────────────────────────────────
export const requiredDocuments = {
  eyebrow: "What to Bring",
  heading: "Required Documents",
  note:    "Document requirements may vary — please confirm with the school office.",
  items: [
    "Birth Certificate of the student",
    "Previous School Report Card / Transfer Certificate",
    "Aadhaar Card of the student (if required)",
    "Two recent passport-size photographs",
    "Identity and address proof of parent / guardian",
  ],
};

// ── Admission Enquiry Form data ───────────────────────────────────────────────
export const admissionEnquiry = {
  eyebrow:       "Quick Enquiry",
  heading:       "Admission Enquiry",
  description:   "Have a quick question? Share your details and our team will reach out to you.",
  demoMessage:   "Demo Preview: Form submitted locally. No enquiry has been sent to the school.",
  classOptions: [
    "Nursery", "KG", "Class I", "Class II", "Class III", "Class IV",
    "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
    "Class XI", "Class XII",
  ],
  fields: {
    studentName:   { label: "Student Full Name",      placeholder: "Enter student's full name"   },
    classApplying: { label: "Class Applying For",     placeholder: "Select a class"              },
    parentMobile:  { label: "Parent Mobile Number",   placeholder: "Enter 10-digit mobile number" },
  },
  submitLabel: "Submit Enquiry",
};

// ── Online Admission Form data ────────────────────────────────────────────────
export const onlineAdmission = {
  eyebrow:     "Apply Online",
  heading:     "Online Admission Form",
  description: "Complete the four-step application form. Your information will be reviewed by our admissions team.",
  demoMessage: "Demo Preview: Form submitted locally. No application has been sent to the school.",
  steps: [
    { number: 1, label: "Student Details"       },
    { number: 2, label: "Parent Details"        },
    { number: 3, label: "Previous School"       },
    { number: 4, label: "Review & Submit"       },
  ],
  classOptions: [
    "Nursery", "KG", "Class I", "Class II", "Class III", "Class IV",
    "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
    "Class XI", "Class XII",
  ],
};

// ── Fee Structure ─────────────────────────────────────────────────────────────
export const feeStructure = {
  eyebrow:      "Fee Details",
  heading:      "Fee Structure",
  note:         "Fee details will be updated after confirmation from the school. All amounts shown as TBA.",
  tableHeaders: ["Class / Stage", "Admission Fee", "Tuition Fee (Per Term)", "Other Charges"],
  rows: [
    {
      classLabel:    "Nursery – UKG",
      admissionFee:  "To be announced",
      tuitionFee:    "To be announced",
      otherCharges:  "To be announced",
    },
    {
      classLabel:    "Classes I – V",
      admissionFee:  "To be announced",
      tuitionFee:    "To be announced",
      otherCharges:  "To be announced",
    },
    {
      classLabel:    "Classes VI – VIII",
      admissionFee:  "To be announced",
      tuitionFee:    "To be announced",
      otherCharges:  "To be announced",
    },
    {
      classLabel:    "Classes IX – XII",
      admissionFee:  "To be announced",
      tuitionFee:    "To be announced",
      otherCharges:  "To be announced",
    },
  ],
};

// ── FAQs ──────────────────────────────────────────────────────────────────────
export const admissionFaqs = {
  eyebrow: "FAQs",
  heading: "Frequently Asked Questions",
  items: [
    {
      id:       1,
      question: "Which classes are open for admission?",
      answer:   "Tilak Global School offers admission from Nursery to Class XII. Current availability for each class should be confirmed directly with the school office.",
    },
    {
      id:       2,
      question: "What documents are required for admission?",
      answer:   "Generally required documents include the student's birth certificate, previous school report card or transfer certificate, Aadhaar card (if required), passport-size photographs, and parent identity and address proof. Please verify with the school.",
    },
    {
      id:       3,
      question: "Is there an entrance test or student interaction?",
      answer:   "The school may conduct a student interaction or assessment for certain classes. Details will be communicated after the admission enquiry has been submitted.",
    },
    {
      id:       4,
      question: "How can parents pay the school fees?",
      answer:   "Fee payment modes will be communicated by the school at the time of admission confirmation. Please contact the school office for current payment options.",
    },
    {
      id:       5,
      question: "How can I contact the admissions office?",
      answer:   "You can visit the school at Bindayaka, Mukandpura Road, Jaipur, or use the contact details available on the Contact Us page. You may also fill the Admission Enquiry form on this page.",
    },
  ],
};

// ── Admission CTA banner ──────────────────────────────────────────────────────
export const admissionsCta = {
  eyebrow:     "Admissions Enquiry",
  heading:     "Give your child the Tilak Global advantage",
  subtext:     "Admissions open for Nursery to Class XII — Session details to be confirmed",
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
