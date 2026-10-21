import boardmapV2 from "./assets/imgURL/boardmap-v2.webp";
import reseato from "./assets/imgURL/reseato-cebu.webp";
import mapaguapa from "./assets/imgURL/mapaguapa.webp";
import amaranth from "./assets/imgURL/amaranth.webp";
import invitation from "./assets/imgURL/birthday-invitation.webp";
import ticTacToe from "./assets/imgURL/tictactoe.webp";
import lilyFlowers from "./assets/imgURL/lily-flowers.webp";
import bmLogIn from "./assets/images/BoardMap/loginpage.webp";
import bmStudentMap from "./assets/images/BoardMap/studentdashboard-mapview.webp";
import bmStudentMapFilter from "./assets/images/BoardMap/studentdashboard-mapview-filter.webp";
import bmStudentList from "./assets/images/BoardMap/studentdashboard-listview.webp";
import bmStudentProperty from "./assets/images/BoardMap/studentdashboard-property.webp";
import bmStudentChat from "./assets/images/BoardMap/studentdashboard-message-chat.webp";
import bmOwnerProperty from "./assets/images/BoardMap/ownerdashboard-property.webp";
import bmOwnerInquiries from "./assets/images/BoardMap/ownerdashboard-inquiries.webp";
import bmOwnerAnalytics from "./assets/images/BoardMap/ownerdashboard-analytics.webp";
import rydeHomeDark from "./assets/images/Ryde/home-page-dark-theme.webp";
import rydeLoginDark from "./assets/images/Ryde/login-page-dark-theme.webp";
import rydeOtpLight from "./assets/images/Ryde/otp-page-light-theme.webp";
import rydeHomeLight from "./assets/images/Ryde/home-page-light-theme.webp";
import rydePickup from "./assets/images/Ryde/set-pick-up-location-page-light-theme.webp";
import rydeTime from "./assets/images/Ryde/select-time-page-light-theme.webp";
import rydePayment from "./assets/images/Ryde/payment-method-page-light-theme.webp";

import khAndroidHome from "./assets/images/Kheryne/android-home.webp";
import khAndroidScan from "./assets/images/Kheryne/android-scan.webp";
import khAndroidReport from "./assets/images/Kheryne/android-report.webp";
import khAndroidMorpho from "./assets/images/Kheryne/android-morphometrics.webp";
import khWinWorkspace from "./assets/images/Kheryne/windows-workspace.webp";
import khWinLive from "./assets/images/Kheryne/windows-live.webp";
import khWinCompare from "./assets/images/Kheryne/windows-compare.webp";
import khWinKey from "./assets/images/Kheryne/windows-key.webp";
import khWinReport from "./assets/images/Kheryne/windows-report.webp";

export const PROFILE = {
  name: "Christian Boyles",
  fullName: "Christian Earl James Boyles",
  role: "Full-Stack Developer",
  location: "Baybay City, Philippines",
  email: "christian02613@gmail.com",
  phone: "+63 915 211 1698",
  phoneHref: "tel:+639152111698",
  github: "https://github.com/Ytian-DEV",
  githubLabel: "github.com/Ytian-DEV",
  availability: "Open to full-time & freelance · 2026",
};

export type ProjectCategory = "fullstack" | "frontend" | "design";

export interface Project {
  id: string;
  /** Display number; assigned from PROJECT_ORDER below. */
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
  /** Key facts shown on the flagship card. */
  facts?: { label: string; value: string }[];
  /** Portrait mobile screens get a different gallery layout. */
  mobile?: boolean;
}

const ALL_PROJECTS: Project[] = [
  {
    id: "boardmap",
    index: "01",
    title: "BoardMap",
    kicker: "Student housing platform",
    period: "Nov 2025 → Now",
    category: "fullstack",
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
    flagship: true,
    facts: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Stack", value: "React · TypeScript · Supabase · Maps" },
      { label: "Built for", value: "Viscan students at VSU" },
    ],
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
    gallery: [{ src: mapaguapa, caption: "Sign in — a room near campus" }],
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
    live: "https://amaranth-iota.vercel.app/",
    cover: amaranth,
    gallery: [{ src: amaranth, caption: "Homepage — top story & most read" }],
  },
  {
    id: "lily",
    index: "",
    title: "Lily Flowers",
    kicker: "Inventory & invoicing",
    period: "2026",
    category: "fullstack",
    summary:
      "Inventory and invoice management for a Baybay City flower shop — orders, payments, deliveries, customers and a bouquet catalog, with a live revenue dashboard.",
    problem:
      "The shop tracked bouquet orders, deposits and delivery dates by hand, so balances were missed and nobody could see at a glance what was due this week.",
    role: "Full-stack developer — data model, invoicing flow, dashboard and admin UI.",
    built: [
      "Order flow that issues dated invoice numbers (INV-YYYYMMDD-####) and tracks each order from Confirmed → Preparing → Ready",
      "Payments with outstanding balances, so the shop sees exactly what is left to collect",
      "Dashboard: revenue this month, balance to collect, open orders, deliveries this week and a 6-month revenue chart",
      "Bouquet catalog with best-sellers, plus customer records and staff accounts with roles",
    ],
    stack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    live: "https://lily-flower-invoice-management.vercel.app/",
    cover: lilyFlowers,
    gallery: [{ src: lilyFlowers, caption: "Staff sign-in" }],
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
    id: "kheryne",
    index: "",
    title: "Kheryne",
    kicker: "Nematode ID · Android + Windows",
    period: "2026",
    category: "design",
    summary:
      "An offline assistant that spots plant-parasitic nematodes through the microscope and identifies them from order to genus — designed for Android and Windows, in light and dark.",
    problem:
      "Identifying nematodes means hours at the eyepiece comparing anatomy against dichotomous keys, and field labs often have no reliable internet — so cloud tools aren't an option.",
    role: "Product & UI designer — the full system in Figma: foundations, components, and every flow on Android and Windows.",
    built: [
      "Live scan: a phone clipped to the eyepiece marks likely nematodes in real time and prompts a switch to 40× for genus-level detail",
      "Explainable results — order → family → genus with confidence, plus the traits used (stylet knobs, tail shape, vulva position)",
      "Morphometrics with stage-micrometer calibration and automatic De Man indices",
      "Windows workspace that pairs with the phone for live streaming, batch analysis, side-by-side compare and full PDF reports",
      "Offline-first (models on-device), light & dark themes, built on a documented design system",
    ],
    stack: ["Figma", "Design system", "Android", "Windows", "Light & dark"],
    extraLink: {
      label: "Open in Figma",
      href: "https://www.figma.com/design/KWcNyL3Ehh9ayQ09f7QB1n/Kheryne-%E2%80%94-UI-design?node-id=1-4",
    },
    cover: khWinWorkspace,
    gallery: [
      { src: khAndroidHome, caption: "Android — home, light & dark" },
      { src: khAndroidScan, caption: "Android — live scan & identify" },
      { src: khAndroidReport, caption: "Android — identification report" },
      { src: khAndroidMorpho, caption: "Android — calibrate & measure" },
      { src: khWinWorkspace, caption: "Windows — workspace" },
      { src: khWinLive, caption: "Windows — live stream from phone" },
      { src: khWinCompare, caption: "Windows — compare" },
      { src: khWinKey, caption: "Windows — dichotomous key" },
      { src: khWinReport, caption: "Windows — full report" },
    ],
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

/** Display order — the first entry is numbered 01. */
const PROJECT_ORDER = ["mapaguapa", "amaranth", "boardmap", "reseato", "lily", "invitation", "tictactoe", "kheryne", "ryde"];

export const PROJECTS: Project[] = PROJECT_ORDER.map((id, i) => ({
  ...ALL_PROJECTS.find((p) => p.id === id)!,
  index: String(i + 1).padStart(2, "0"),
}));

export const FILTERS: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All realms" },
  { id: "fullstack", label: "Full-stack" },
  { id: "frontend", label: "Front-end" },
  { id: "design", label: "Blueprints" },
];

export const STATS = [
  { value: 6, suffix: "", pad: true, label: "Production apps live" },
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
