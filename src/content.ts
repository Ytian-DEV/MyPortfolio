import amaranth from "./assets/imgURL/amaranth.webp";
import boardmapV2 from "./assets/imgURL/boardmap-v2.webp";
import lilyFlowers from "./assets/imgURL/lily-flowers.webp";
import mapaguapa from "./assets/imgURL/mapaguapa.webp";
import reseato from "./assets/imgURL/reseato-cebu.webp";

import bmLogIn from "./assets/images/BoardMap/loginpage.webp";
import bmOwnerAnalytics from "./assets/images/BoardMap/ownerdashboard-analytics.webp";
import bmOwnerInquiries from "./assets/images/BoardMap/ownerdashboard-inquiries.webp";
import bmOwnerProperty from "./assets/images/BoardMap/ownerdashboard-property.webp";
import bmStudentList from "./assets/images/BoardMap/studentdashboard-listview.webp";
import bmStudentMapFilter from "./assets/images/BoardMap/studentdashboard-mapview-filter.webp";
import bmStudentMap from "./assets/images/BoardMap/studentdashboard-mapview.webp";
import bmStudentChat from "./assets/images/BoardMap/studentdashboard-message-chat.webp";
import bmStudentProperty from "./assets/images/BoardMap/studentdashboard-property.webp";

import khAndroidHome from "./assets/images/Kheryne/android-home.webp";
import khAndroidMorpho from "./assets/images/Kheryne/android-morphometrics.webp";
import khAndroidReport from "./assets/images/Kheryne/android-report.webp";
import khAndroidScan from "./assets/images/Kheryne/android-scan.webp";
import khWinCompare from "./assets/images/Kheryne/windows-compare.webp";
import khWinKey from "./assets/images/Kheryne/windows-key.webp";
import khWinLive from "./assets/images/Kheryne/windows-live.webp";
import khWinReport from "./assets/images/Kheryne/windows-report.webp";
import khWinWorkspace from "./assets/images/Kheryne/windows-workspace.webp";

import rydeHomeDark from "./assets/images/Ryde/home-page-dark-theme.webp";
import rydeHomeLight from "./assets/images/Ryde/home-page-light-theme.webp";
import rydeLoginDark from "./assets/images/Ryde/login-page-dark-theme.webp";
import rydeOtpLight from "./assets/images/Ryde/otp-page-light-theme.webp";
import rydePayment from "./assets/images/Ryde/payment-method-page-light-theme.webp";
import rydeTime from "./assets/images/Ryde/select-time-page-light-theme.webp";
import rydePickup from "./assets/images/Ryde/set-pick-up-location-page-light-theme.webp";

export const PROFILE = {
  name: "Christian Boyles",
  fullName: "Christian Earl James Boyles",
  role: "Junior Software Engineer",
  specialization: "UI/UX · Frontend · Backend",
  location: "Baybay City, Philippines",
  timezone: "Asia/Manila",
  education: "BS Computer Science (4th Year) · Visayas State University",
  email: "christian02613@gmail.com",
  phone: "+63 915 211 1698",
  phoneHref: "tel:+639152111698",
  github: "https://github.com/Ytian-DEV",
  githubLabel: "github.com/Ytian-DEV",
  /** Drop your finished PDF into public/resume.pdf and set this to "/resume.pdf" to enable direct download. */
  resumeUrl: null as string | null,
  availability: "Open to full-time & freelance roles",
};

export type ProjectCategory = "fullstack" | "design";

export interface GalleryItem {
  src: string;
  caption: string;
  group?: string;
  portrait?: boolean;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  period: string;
  year: string;
  category: ProjectCategory;
  disciplineLabel: string;
  featured: boolean;
  mobile?: boolean;
  summary: string;
  problem: string;
  role: string;
  architectureNote: string;
  built: string[];
  stack: string[];
  metrics?: { label: string; value: string }[];
  live?: string;
  figma?: string;
  cover: string;
  secondaryPreviews?: string[];
  gallery: GalleryItem[];
}

const RAW_PROJECTS: Omit<Project, "index">[] = [
  {
    id: "kheryne",
    title: "Kheryne",
    subtitle: "Offline Nematode Identification System · Android & Windows",
    period: "2026",
    year: "2026",
    category: "design",
    disciplineLabel: "UI/UX System · Cross-Platform",
    featured: true,
    summary:
      "An offline-first microscope assistant that detects plant-parasitic nematodes in real time and guides researchers from order to genus across paired Android and Windows workspaces.",
    problem:
      "Identifying nematodes requires hours at the microscope comparing subtle anatomy against dichotomous keys, while agricultural field labs rarely have reliable internet for cloud inference.",
    role: "Product & UI/UX Designer — authored the complete multi-platform design system, token architecture, and end-to-end research workflows in Figma.",
    architectureNote:
      "Designed around on-device inference constraints: confidence-graded trait explanations, physical stage-micrometer calibration, and zero-latency phone-to-desktop pairing.",
    built: [
      "Eyepiece live-scan HUD on Android that marks candidate specimens and prompts 40× magnification switches for genus-level anatomy",
      "Explainable taxonomic breakdowns (Order → Family → Genus) surfacing diagnostic traits like stylet knobs, tail shape, and vulva position",
      "Built-in morphometrics calibration workflow calculating De Man ratios without manual spreadsheet entry",
      "Paired Windows desktop lab environment for live microscope streaming, side-by-side specimen comparison, dichotomous keys, and PDF reporting",
      "Tokenized light and dark themes tuned for both bright field conditions and dim microscopy rooms",
    ],
    stack: ["Figma", "Design Systems", "Design Tokens", "Android UX", "Windows UX", "Light & Dark Modes"],
    metrics: [
      { label: "Platforms", value: "Android + Windows" },
      { label: "Operation", value: "100% Offline-First" },
      { label: "Themes", value: "Calibrated Light & Dark" },
    ],
    figma: "https://www.figma.com/design/KWcNyL3Ehh9ayQ09f7QB1n/Kheryne-%E2%80%94-UI-design?node-id=1-4",
    cover: khWinWorkspace,
    secondaryPreviews: [khAndroidScan, khAndroidReport],
    gallery: [
      { src: khWinWorkspace, caption: "Windows — Lab workspace & specimen queue", group: "Windows Lab" },
      { src: khWinLive, caption: "Windows — Live stream paired from eyepiece phone", group: "Windows Lab" },
      { src: khWinCompare, caption: "Windows — Side-by-side morphological comparison", group: "Windows Lab" },
      { src: khWinKey, caption: "Windows — Interactive dichotomous key", group: "Windows Lab" },
      { src: khWinReport, caption: "Windows — Exportable taxonomic report", group: "Windows Lab" },
      { src: khAndroidHome, caption: "Android — Field home in light & dark modes", group: "Android Field", portrait: true },
      { src: khAndroidScan, caption: "Android — Live eyepiece scan & genus prompt", group: "Android Field", portrait: true },
      { src: khAndroidReport, caption: "Android — Confidence & trait breakdown", group: "Android Field", portrait: true },
      { src: khAndroidMorpho, caption: "Android — Stage-micrometer calibration & De Man indices", group: "Android Field", portrait: true },
    ],
  },
  {
    id: "mapaguapa",
    title: "MAPAGUAPA",
    subtitle: "Campus Housing Discovery Platform · VSU",
    period: "Mar – Apr 2026",
    year: "2026",
    category: "fullstack",
    disciplineLabel: "Full-Stack Engineering",
    featured: true,
    summary:
      "A map-integrated housing platform built for Visayas State University students to evaluate boarding houses and apartments simultaneously by budget, walking distance, and room comfort.",
    problem:
      "Incoming and returning Viscan students weighed price, campus proximity, and amenities together, yet existing listings were scattered across unstructured social posts with no spatial search.",
    role: "Full-Stack Engineer — owned map integration, multi-criteria filtering, authentication flows, and responsive UI architecture.",
    architectureNote:
      "Backed by Supabase Auth and relational PostgreSQL queries so saved listings, room availability, and coordinate bounds stay synchronized across mobile and desktop.",
    built: [
      "Interactive spatial search pairing map pins with multi-axis filters for monthly budget, distance to campus gates, and comfort amenities",
      "Authenticated student accounts with persistent saved listings and comparison shortlists via Supabase Auth",
      "Mobile-first interface hierarchy engineered for fast browsing over campus cellular connections",
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Maps API", "Tailwind CSS"],
    metrics: [
      { label: "Audience", value: "VSU Students" },
      { label: "Core Flow", value: "Map + 3-Axis Filter" },
      { label: "Backend", value: "Supabase Auth & DB" },
    ],
    live: "https://mapaguapa.vercel.app/",
    cover: mapaguapa,
    gallery: [{ src: mapaguapa, caption: "MAPAGUAPA — Authentication & campus housing entry" }],
  },
  {
    id: "ryde",
    title: "Ryde",
    subtitle: "End-to-End Mobility & Ride-Booking Blueprint",
    period: "2026",
    year: "2026",
    category: "design",
    disciplineLabel: "UI/UX System · Mobile",
    featured: true,
    mobile: true,
    summary:
      "A 17-screen mobile ride-booking experience streamlining onboarding, OTP verification, spatial pickup pinning, ride scheduling, and payment across dual light and dark theme systems.",
    problem:
      "Commuter ride-hailing apps frequently lose users in multi-step address confirmation and fare-payment friction before a booking is ever dispatched.",
    role: "Product & UI/UX Designer — mapped the user journey, component library, and developer handoff specs in Figma.",
    architectureNote:
      "Constructed with strict auto-layout constraints, semantic color variables for instant light/dark parity, and progressive disclosure to keep primary thumb actions reachable.",
    built: [
      "Complete 17-screen commuter journey from phone OTP verification to live pickup pinning, scheduled departures, and payment selection",
      "Semantic token architecture supporting high-legibility daylight maps and low-glare night riding surfaces",
      "Implementation-ready component states prepared for React Native or Flutter engineering handoff",
    ],
    stack: ["Figma", "Mobile UX", "Design Systems", "Interactive Prototyping", "Light & Dark Themes"],
    metrics: [
      { label: "Scope", value: "17 Core Screens" },
      { label: "Themes", value: "Dual Light / Dark" },
      { label: "Target", value: "Mobile Handoff Ready" },
    ],
    cover: rydeHomeDark,
    secondaryPreviews: [rydeHomeLight, rydePickup, rydePayment],
    gallery: [
      { src: rydeHomeDark, caption: "Home & map search — Dark theme", group: "Dark Theme", portrait: true },
      { src: rydeLoginDark, caption: "Onboarding & sign-in — Dark theme", group: "Dark Theme", portrait: true },
      { src: rydeHomeLight, caption: "Home & quick destinations — Light theme", group: "Light Flow", portrait: true },
      { src: rydeOtpLight, caption: "OTP verification — Light theme", group: "Light Flow", portrait: true },
      { src: rydePickup, caption: "Spatial pickup pin confirmation", group: "Booking Steps", portrait: true },
      { src: rydeTime, caption: "Scheduled ride time selector", group: "Booking Steps", portrait: true },
      { src: rydePayment, caption: "Payment method & fare breakdown", group: "Booking Steps", portrait: true },
    ],
  },
  {
    id: "amaranth",
    title: "Amaranth",
    subtitle: "Official Campus Publication Platform · VSU",
    period: "Aug 2025 – Present",
    year: "2025–26",
    category: "fullstack",
    disciplineLabel: "Full-Stack & Editorial UI",
    featured: true,
    summary:
      "A modern editorial redesign and full-stack rebuild of Visayas State University's official student publication—prioritizing mobile readability, clear story hierarchy, and structured publishing.",
    problem:
      "The legacy publication site buried breaking campus reporting under cluttered navigation and struggled on mobile viewports where most student readers arrive.",
    role: "Full-Stack Developer — led information architecture, editorial typography, responsive frontend, and Supabase content integration.",
    architectureNote:
      "Structured around dynamic category feeds, featured lead stories, and most-read rankings backed by Supabase tables and fast client caching.",
    built: [
      "Re-engineered editorial homepage surfacing lead reporting, section verticals, and most-read campus stories at a glance",
      "Supabase-backed article and category data pipeline replacing static page bottlenecks",
      "Phone-first reading experience with calibrated measure, contrast, and responsive card grids",
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Publication", value: "VSU Official Press" },
      { label: "Focus", value: "Editorial IA & CMS" },
      { label: "Viewport", value: "Mobile-First Reader" },
    ],
    live: "https://amaranth-iota.vercel.app/",
    cover: amaranth,
    gallery: [{ src: amaranth, caption: "Amaranth — Lead story hierarchy & most-read editorial feed" }],
  },
  {
    id: "boardmap",
    title: "BoardMap",
    subtitle: "Two-Sided Student Housing Marketplace & Realtime Chat",
    period: "Nov 2025 – Present",
    year: "2025–26",
    category: "fullstack",
    disciplineLabel: "Full-Stack & Product Design",
    featured: false,
    summary:
      "End-to-end boarding house marketplace putting VSU listings on a live clustered Leaflet map with role-based student and landlord dashboards, inquiries, and realtime chat.",
    problem:
      "Finding off-campus rooms meant walking street-to-street or chasing outdated social posts, with no structured way for landlords to track occupants and inquiries.",
    role: "Product Designer & Full-Stack Engineer — designed the initial multi-role system in Figma, shipped v1, and engineered the v2 production rebuild.",
    architectureNote:
      "Enforces tenant/owner separation via PostgreSQL Row-Level Security (RLS) policies, pairing Leaflet spatial clustering with Supabase Realtime messaging channels.",
    built: [
      "Leaflet map discovery with marker clustering and live filtering by monthly rate, distance, and amenities",
      "Dual role-based workspaces: students browse and message; landlords manage room inventory, occupants, inquiries, and analytics",
      "Supabase PostgreSQL schema secured with Row-Level Security (RLS), authentication, and realtime chat subscriptions",
      "v2 architecture overhaul delivering cleaner navigation, faster bundle loads, and cohesive UI tokens",
    ],
    stack: ["React", "TypeScript", "Leaflet", "Supabase", "PostgreSQL RLS", "Tailwind CSS", "Figma"],
    live: "https://batch-2025-vsu-boardmap-web.vercel.app/",
    figma: "https://www.figma.com/design/PLyl615g6uSVaesonXgCk2/BoardMap?node-id=0-1&t=R30u6mbH4MCXcR7o-1",
    cover: boardmapV2,
    gallery: [
      { src: boardmapV2, caption: "BoardMap v2 — Production landing & sign-in", group: "Live v2" },
      { src: bmStudentMap, caption: "Student workspace — Live map discovery", group: "Student Flow" },
      { src: bmStudentMapFilter, caption: "Student workspace — Price & amenity filters", group: "Student Flow" },
      { src: bmStudentList, caption: "Student workspace — Card list view", group: "Student Flow" },
      { src: bmStudentProperty, caption: "Student workspace — Property detail & rooms", group: "Student Flow" },
      { src: bmStudentChat, caption: "Student workspace — Realtime landlord messaging", group: "Student Flow" },
      { src: bmOwnerProperty, caption: "Owner suite — Property & room management", group: "Owner Suite" },
      { src: bmOwnerInquiries, caption: "Owner suite — Tenant inquiries pipeline", group: "Owner Suite" },
      { src: bmOwnerAnalytics, caption: "Owner suite — Occupancy & listing analytics", group: "Owner Suite" },
      { src: bmLogIn, caption: "Original v1 authentication concept", group: "Live v2" },
    ],
  },
  {
    id: "reseato",
    title: "RESEATO Cebu",
    subtitle: "Realtime Mall Restaurant Reservations & Reviews",
    period: "Feb – Apr 2026",
    year: "2026",
    category: "fullstack",
    disciplineLabel: "Full-Stack Engineering",
    featured: false,
    summary:
      "Real-time table availability, time-slot booking validation, and diner dish recommendations for high-traffic restaurants at SM City Cebu and SM Seaside.",
    problem:
      "Weekend mall diners had no visibility into table waitlists until physically queuing at the restaurant podium.",
    role: "Full-Stack Developer — engineered the relational booking schema, conflict-free slot validation, review system, and mobile booking UI.",
    architectureNote:
      "Uses Supabase Realtime subscriptions to broadcast table state changes immediately while server-side constraints prevent overlapping slot double-bookings.",
    built: [
      "Live table availability indicators powered by Supabase Realtime channel subscriptions",
      "Reservation flow with party-size and time-slot validation to eliminate double-booked tables",
      "Verified diner ratings and dish-level order recommendations",
    ],
    stack: ["React", "TypeScript", "Supabase Realtime", "PostgreSQL", "Tailwind CSS"],
    live: "https://reseato-cebu-v2.vercel.app/",
    cover: reseato,
    gallery: [{ src: reseato, caption: "RESEATO Cebu — Restaurant discovery & live table booking" }],
  },
  {
    id: "lily",
    title: "Lily Flowers",
    subtitle: "Florist Inventory, Invoicing & Revenue Operations",
    period: "2026",
    year: "2026",
    category: "fullstack",
    disciplineLabel: "Full-Stack Engineering",
    featured: false,
    summary:
      "Internal operations platform for a Baybay City flower shop—automating sequential invoices, deposit balance tracking, weekly delivery schedules, and revenue analytics.",
    problem:
      "Handwritten bouquet orders and partial cash deposits caused missed balances and made weekly delivery preparation difficult to audit.",
    role: "Full-Stack Developer — designed the accounting/order data model, invoicing state machine, and role-gated staff dashboard.",
    architectureNote:
      "Models partial payments and outstanding balances directly in PostgreSQL so revenue collected vs. receivable stays accurate across order states.",
    built: [
      "Automated invoice generator (`INV-YYYYMMDD-####`) tracking orders across Confirmed → Preparing → Ready states",
      "Partial-payment ledger surfacing exact outstanding customer balances to collect",
      "Executive dashboard displaying monthly revenue, open orders, upcoming deliveries, and a 6-month revenue trend",
      "Bouquet catalog with best-seller tracking and role-based staff accounts",
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    live: "https://lily-flower-invoice-management.vercel.app/",
    cover: lilyFlowers,
    gallery: [{ src: lilyFlowers, caption: "Lily Flowers — Staff portal & invoicing operations" }],
  },
];

export const PROJECTS: Project[] = RAW_PROJECTS.map((project, idx) => ({
  ...project,
  index: String(idx + 1).padStart(2, "0"),
}));

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const ARCHIVE_PROJECTS = PROJECTS.filter((p) => !p.featured);

export const WORK_FILTERS: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "design", label: "UI/UX Systems" },
];

export interface CapabilityPillar {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
  tools: string[];
}

export const CAPABILITIES: CapabilityPillar[] = [
  {
    index: "01",
    title: "UI/UX & Design Systems",
    subtitle: "Research flows, token architecture & prototyping",
    description:
      "I design interfaces with implementation in mind—mapping edge cases, semantic color tokens, and WCAG contrast before writing component code.",
    practices: [
      "Multi-platform user flows & wireframing (Web, Android, Windows)",
      "Tokenized light/dark component libraries & auto-layout specs",
      "WCAG AA/AAA contrast, keyboard focus order & clear hierarchy",
    ],
    tools: ["Figma", "Design Systems", "Prototyping", "UX Flows", "Information Architecture"],
  },
  {
    index: "02",
    title: "Frontend & Mobile Engineering",
    subtitle: "Typed web & cross-platform native interfaces",
    description:
      "Clean, predictable component architecture across modern React web apps and cross-platform mobile runtimes—tuned for fast load times and tactile responsiveness.",
    practices: [
      "Strict TypeScript state modeling & reusable UI primitives",
      "Cross-platform mobile interfaces in React Native & Flutter",
      "Accessible modals, keyboard shortcuts & reduced-motion support",
    ],
    tools: ["React", "Next.js", "TypeScript", "React Native", "Flutter", "Tailwind CSS", "Vite"],
  },
  {
    index: "03",
    title: "Backend, Data & Infrastructure",
    subtitle: "Relational schemas, APIs, auth & realtime sync",
    description:
      "Production data models and API services that keep multi-role applications secure, consistent, and responsive under real user traffic.",
    practices: [
      "RESTful services & middleware with Node.js, Express & Python",
      "PostgreSQL schema design, Row-Level Security (RLS) & Realtime channels",
      "Geospatial queries (Leaflet), auth flows & zero-downtime Vercel deploys",
    ],
    tools: [
      "Node.js / Express",
      "Python",
      "Supabase",
      "PostgreSQL",
      "Firebase",
      "MongoDB",
      "REST APIs",
      "Leaflet Maps",
      "Git & GitHub",
      "Vercel",
    ],
  },
];

export const SPOTLIGHT_MILESTONE = {
  badge: "RECOGNITION · NOV 23, 2026",
  title: "National Finalist — Space Business Innovation Camp 2026",
  org: "Philippine Space Agency (PhilSA)",
  summary:
    "Selected from competing teams nationwide to advance to the Final Demo Day on November 23, 2026—translating space-data and technical systems into a viable product pitch and live demonstration.",
};

export interface ExperienceEntry {
  period: string;
  role: string;
  org: string;
  type: string;
  highlight?: boolean;
  details: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "Nov 2026",
    role: "Finalist — Space Business Innovation Camp 2026",
    org: "Philippine Space Agency (PhilSA)",
    type: "National Innovation Cohort",
    highlight: true,
    details:
      "Earned a finalist berth among teams nationwide, culminating in the Final Demo presentation on November 23, 2026.",
  },
  {
    period: "May 2025 – Present",
    role: "Full-Stack Software Engineer",
    org: "Independent & Campus Production Systems",
    type: "Engineering",
    highlight: true,
    details:
      "Architecting and shipping production web platforms end-to-end—MAPAGUAPA, Amaranth, BoardMap, RESEATO Cebu, and Lily Flowers—spanning PostgreSQL/RLS, Node/Express, React, and TypeScript.",
  },
  {
    period: "Dec 2024 – Present",
    role: "Product & UI/UX Designer",
    org: "Cross-Platform Systems in Figma",
    type: "Design",
    details:
      "Designing multi-theme component libraries and high-fidelity product blueprints ready for engineering handoff, including Kheryne (Android + Windows) and Ryde.",
  },
  {
    period: "Aug 2022 – Present",
    role: "BS Computer Science (4th Year)",
    org: "Visayas State University",
    type: "Education",
    details:
      "Completing undergraduate coursework in software engineering, database management systems, algorithms, data structures, and web/mobile development.",
  },
  {
    period: "2025",
    role: "Data Science Certifications",
    org: "HarvardX · Cisco Networking Academy",
    type: "Credentials",
    details:
      "Completed HarvardX Data Science: R Basics (PH125.1x) and Cisco NetAcad Introduction to Data Science.",
  },
];
