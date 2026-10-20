import boardmapV2 from "./assets/imgURL/boardmap-v2.png";
import reseato from "./assets/imgURL/reseato-cebu.png";
import mapaguapa from "./assets/imgURL/mapaguapa.png";
import amaranth from "./assets/imgURL/amaranth-dvm6.vercel.app.png";
import invitation from "./assets/imgURL/birthday-invitation.png";
import ticTacToe from "./assets/imgURL/tictactoe-zeta.vercel.app.png.png";
import bmLogIn from "./assets/images/BoardMap/LogInPage.png";
import bmStudentMap from "./assets/images/BoardMap/StudentDashBoard-MapView.png";
import bmStudentMapFilter from "./assets/images/BoardMap/StudentDashBoard-MapView-Filter.png";
import bmStudentList from "./assets/images/BoardMap/StudentDashBoard-ListView.png";
import bmStudentProperty from "./assets/images/BoardMap/StudentDashBoard-Property.png";
import bmStudentChat from "./assets/images/BoardMap/StudentDashBoard-Message-CHat.png";
import bmOwnerProperty from "./assets/images/BoardMap/OwnerDashBoard-Property.png";
import bmOwnerInquiries from "./assets/images/BoardMap/OwnerDashBoard-Inquiries.png";
import bmOwnerAnalytics from "./assets/images/BoardMap/OwnerDashBoard-Analytics.png";
import rydeHomeDark from "./assets/images/Ryde/Home Page - Dark Theme.png";
import rydeLoginDark from "./assets/images/Ryde/Login Page - Dark Theme.png";
import rydeOtpLight from "./assets/images/Ryde/OTP Page - Light Theme.png";
import rydeHomeLight from "./assets/images/Ryde/Home Page - Light Theme.png";
import rydePickup from "./assets/images/Ryde/Set Pick-up Location Page - Light Theme.png";
import rydeTime from "./assets/images/Ryde/Select Time Page - Light Theme.png";
import rydePayment from "./assets/images/Ryde/Payment Method Page - Light Theme.png";

export const PROFILE = {
  name: "Christian Boyles",
  fullName: "Christian Earl James Boyles",
  role: "Full-Stack Developer",
  location: "Baybay City, Philippines",
  email: "christianboyles0143@gmail.com",
  phone: "+63 915 211 1698",
  phoneHref: "tel:+639152111698",
  github: "https://github.com/Ytian-DEV",
  githubLabel: "github.com/Ytian-DEV",
  availability: "Open to full-time & freelance · 2026",
};

export type ProjectCategory = "fullstack" | "frontend" | "design";

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  period: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  role: string;
  built: string[];
  stack: string[];
  live?: string;
  extraLink?: { label: string; href: string };
  cover: string;
  gallery: { src: string; caption: string }[];
  flagship?: boolean;
  /** Portrait mobile screens get a different gallery layout. */
  mobile?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "boardmap",
    index: "01",
    title: "BoardMap",
    kicker: "Student housing platform",
    period: "Nov 2025 → Now",
    category: "fullstack",
    flagship: true,
    summary:
      "VSU students used to hunt for boarding houses door-to-door. BoardMap puts every listing on a live map — with filters, owner dashboards, inquiries and in-app messaging.",
    problem:
      "Students and faculty arriving at VSU Baybay had no single place to compare boarding houses. Listings lived in Facebook posts and word of mouth, so finding a room meant walking the town.",
    role: "Product design → full-stack build. I designed the flows in Figma, then built v1 and the v2 rebuild end-to-end.",
    built: [
      "Map-first discovery with Leaflet: clustering, filters by price, distance and amenities",
      "Two role-based dashboards — students browse & message, owners manage listings, occupants and inquiries",
      "Supabase Postgres schema with row-level security, auth and realtime chat",
      "v2 rebuild with cleaner navigation, faster loading and a polished visual system",
    ],
    stack: ["React", "TypeScript", "Leaflet", "Supabase", "Tailwind CSS"],
    live: "https://batch-2025-vsu-boardmap-web.vercel.app/",
    extraLink: {
      label: "Original Figma concept",
      href: "https://www.figma.com/design/PLyl615g6uSVaesonXgCk2/BoardMap?node-id=0-1&t=R30u6mbH4MCXcR7o-1",
    },
    cover: boardmapV2,
    gallery: [
      { src: boardmapV2, caption: "v2 — live landing & sign-in" },
      { src: bmStudentMap, caption: "Concept — student map view" },
      { src: bmStudentMapFilter, caption: "Concept — map filters" },
      { src: bmStudentList, caption: "Concept — list view" },
      { src: bmStudentProperty, caption: "Concept — property detail" },
      { src: bmStudentChat, caption: "Concept — in-app messaging" },
      { src: bmOwnerProperty, caption: "Concept — owner listings" },
      { src: bmOwnerInquiries, caption: "Concept — owner inquiries" },
      { src: bmOwnerAnalytics, caption: "Concept — owner analytics" },
      { src: bmLogIn, caption: "Concept — log in" },
    ],
  },
  {
    id: "reseato",
    index: "02",
    title: "RESEATO Cebu",
    kicker: "Restaurant reservations",
    period: "Feb → Apr 2026",
    category: "fullstack",
    summary:
      "Skip the queue at SM City & SM Seaside. Real-time table availability, reservations and diner reviews for Cebu's top restaurants.",
    problem:
      "Mall restaurants in Cebu fill up fast on weekends and diners have no way to know what's free until they've already queued.",
    role: "Full-stack developer — data model, booking flow, review system and responsive UI.",
    built: [
      "Live table availability powered by Supabase realtime subscriptions",
      "Booking flow with time-slot validation to prevent double reservations",
      "Ratings & reviews with recommendations of what to order",
      "Responsive interface tuned for diners booking on their phones",
    ],
    stack: ["React", "TypeScript", "Supabase", "Realtime", "Tailwind CSS"],
    live: "https://reseato-cebu-v2.vercel.app/",
    cover: reseato,
    gallery: [{ src: reseato, caption: "Restaurant discovery & booking" }],
  },
  {
    id: "mapaguapa",
    index: "03",
    title: "MAPAGUAPA",
    kicker: "Housing finder · VYM",
    period: "Mar → Apr 2026",
    category: "fullstack",
    summary:
      "Helps Viscan students find boarding houses and apartments that match their comfort, location and budget — all in one accessible platform.",
    problem:
      "Budget, distance and comfort are the three things students weigh, but no existing tool let them filter on all three at once.",
    role: "Full-stack developer — map integration, listing search and account flows.",
    built: [
      "Map-integrated search with budget, location and comfort filters",
      "Account flows and saved listings backed by Supabase auth",
      "Accessible, mobile-first UI with clear hierarchy",
    ],
    stack: ["React", "TypeScript", "Supabase", "Maps", "Tailwind CSS"],
    live: "https://mapaguapa.vercel.app/",
    cover: mapaguapa,
    gallery: [{ src: mapaguapa, caption: "Landing & sign-in" }],
  },
  {
    id: "amaranth",
    index: "04",
    title: "Amaranth Website",
    kicker: "Campus publication",
    period: "Aug 2025 → Now",
    category: "fullstack",
    summary:
      "A responsive revamp of VSU's official student publication with clearer information architecture, campus resources and a CMS-style workflow.",
    problem:
      "The publication's old site buried new articles and was hard to read on phones, where most students actually visit.",
    role: "Full-stack developer — information architecture, article system and responsive front-end.",
    built: [
      "Article feed and categories backed by Supabase",
      "Reworked information architecture so latest stories surface first",
      "Responsive layouts for phone-first readers",
    ],
    stack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    live: "https://amaranth-dvm6.vercel.app/",
    cover: amaranth,
    gallery: [{ src: amaranth, caption: "Latest articles" }],
  },
  {
    id: "invitation",
    index: "05",
    title: "e-Invitation + Admin",
    kicker: "Event platform",
    period: "Oct 2025",
    category: "fullstack",
    summary:
      "A public invitation experience linked to an admin dashboard for guest lists, QR check-in and live attendance tracking.",
    problem:
      "Paper invites and manual guest lists make it impossible to know who has actually arrived at an event.",
    role: "Full-stack developer — built in one week, from invitation UI to admin tooling.",
    built: [
      "Animated public invitation with RSVP",
      "Admin dashboard to manage guests and generate QR codes",
      "QR scanning check-in with real-time attendance updates",
    ],
    stack: ["React", "TypeScript", "Supabase", "QR codes", "Tailwind CSS"],
    live: "https://invitation-web-t7q7.vercel.app/",
    extraLink: { label: "Admin dashboard", href: "https://invitation-web-t7q7.vercel.app/#/administrator" },
    cover: invitation,
    gallery: [{ src: invitation, caption: "Public invitation" }],
  },
  {
    id: "tictactoe",
    index: "06",
    title: "Tic Tac Toe",
    kicker: "Game",
    period: "Oct 2025",
    category: "frontend",
    summary:
      "A React + TypeScript game with polished interactions, score tracking and a strong visual identity.",
    problem: "A focused exercise in state management and interaction design — small scope, high polish.",
    role: "Front-end developer.",
    built: ["Typed game state and win detection", "Score tracking across rounds", "Micro-interactions and a neon visual identity"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://tiktactoe-zeta.vercel.app/",
    cover: ticTacToe,
    gallery: [{ src: ticTacToe, caption: "Game board" }],
  },
  {
    id: "ryde",
    index: "07",
    title: "Ryde",
    kicker: "Mobile UX blueprint",
    period: "2026",
    category: "design",
    mobile: true,
    summary:
      "A ride-booking app flow — onboarding, OTP, pickup & destination, scheduling and payment — explored in both dark and light themes.",
    problem: "Ride-booking flows often lose users between choosing a destination and paying. Ryde explores a shorter path.",
    role: "Product & UI designer — full user journey in Figma, designed to be built.",
    built: [
      "End-to-end booking journey across 17 screens",
      "Dark and light theme systems",
      "Component-driven Figma file ready for hand-off",
    ],
    stack: ["Figma", "UX flows", "Prototyping", "Design systems"],
    cover: rydeHomeDark,
    gallery: [
      { src: rydeLoginDark, caption: "Log in — dark" },
      { src: rydeHomeDark, caption: "Home — dark" },
      { src: rydeOtpLight, caption: "OTP — light" },
      { src: rydeHomeLight, caption: "Home — light" },
      { src: rydePickup, caption: "Set pick-up" },
      { src: rydeTime, caption: "Schedule" },
      { src: rydePayment, caption: "Payment" },
    ],
  },
];

export const FILTERS: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All realms" },
  { id: "fullstack", label: "Full-stack" },
  { id: "frontend", label: "Front-end" },
  { id: "design", label: "Blueprints" },
];

export const STATS = [
  { value: 5, suffix: "", pad: true, label: "Production apps live" },
  { value: 2, suffix: "+ yrs", label: "Building for the web" },
  { value: 12, suffix: "", label: "Technologies in the arsenal" },
  { value: 4, suffix: "th yr", label: "BS Computer Science · VSU" },
];

export const ARSENAL = [
  {
    title: "Frontend",
    blurb: "Interfaces that feel fast and obvious.",
    icon: "code",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Responsive UI"],
  },
  {
    title: "Backend & Data",
    blurb: "Auth, storage and realtime that just work.",
    icon: "database",
    items: ["Supabase", "PostgreSQL", "Firebase", "MongoDB", "REST APIs", "Leaflet Maps"],
  },
  {
    title: "Craft & Delivery",
    blurb: "Designed before it's built, shipped when it's right.",
    icon: "star",
    items: ["Figma", "Git & GitHub", "Vercel", "UX flows", "Prototyping", "Agile"],
  },
] as const;

export const MARQUEE = [
  "React", "TypeScript", "Next.js", "Supabase", "PostgreSQL", "Tailwind CSS",
  "Firebase", "MongoDB", "Leaflet", "Vite", "Vercel", "Figma", "Git",
];

export const CAMPAIGN = [
  { n: "I", title: "Scout", text: "Understand the users, the constraints and what success looks like before a single pixel moves." },
  { n: "II", title: "Blueprint", text: "Wireframes and high-fidelity prototypes in Figma — validated with real people, not guesses." },
  { n: "III", title: "Forge", text: "Component-first React + TypeScript on a Supabase back-end. Typed, tested, reviewable." },
  { n: "IV", title: "Launch", text: "Deployed on Vercel, measured, and iterated with feedback. Shipping is the start, not the end." },
];

export const TIMELINE = [
  {
    when: "May 2025 — Present",
    role: "Full-Stack Developer",
    org: "Freelance & campus projects",
    text: "Own features end-to-end: Postgres schemas and RLS in Supabase, typed React front-ends, Vercel deploys.",
    active: true,
  },
  {
    when: "Dec 2024 — Present",
    role: "Product & UI Designer",
    org: "Figma",
    text: "Design flows and high-fidelity prototypes with implementation in mind — BoardMap, Ryde.",
  },
  {
    when: "Sep 2024 — Present",
    role: "Front-End Developer",
    org: "React · TypeScript",
    text: "Responsive, accessible interfaces with clean component architecture.",
  },
  {
    when: "Aug 2022 — Present",
    role: "BS Computer Science",
    org: "Visayas State University",
    text: "Software engineering, data structures, databases and web development.",
  },
  {
    when: "2025",
    role: "Certifications",
    org: "Cisco NetAcad · HarvardX",
    text: "Introduction to Data Science · Data Science: R Basics (PH125.1x)",
  },
];
