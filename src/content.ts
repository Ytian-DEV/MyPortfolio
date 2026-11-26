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

import rydeLogin from "./assets/images/Ryde/02-phone-login.webp";
import rydeOtp from "./assets/images/Ryde/03-otp-verification.webp";
import rydeHomeLight from "./assets/images/Ryde/05-home-map-light.webp";
import rydePickupSearch from "./assets/images/Ryde/06-pickup-destination.webp";
import rydeTiersLight from "./assets/images/Ryde/07-ride-tiers-light.webp";
import rydePaymentSchedule from "./assets/images/Ryde/08-payment-schedule.webp";
import rydeLiveLight from "./assets/images/Ryde/10-live-tracking-light.webp";
import rydeSummaryRating from "./assets/images/Ryde/11-ride-summary-rating.webp";
import rydeHomeDark from "./assets/images/Ryde/15-home-map-dark.webp";
import rydeTiersDark from "./assets/images/Ryde/16-ride-tiers-dark.webp";
import rydeLiveDark from "./assets/images/Ryde/17-live-tracking-dark.webp";
import rydeProfileDark from "./assets/images/Ryde/18-profile-settings-dark.webp";

import agapayCropSuggestions from "./assets/images/Agapay/farmer-crop-suggestions.webp";
import agapayHomeDark from "./assets/images/Agapay/farmer-home-dark.webp";
import agapayHomeLight from "./assets/images/Agapay/farmer-home-light.webp";
import agapayMapDark from "./assets/images/Agapay/farmer-map-dark.webp";
import agapayMapLight from "./assets/images/Agapay/farmer-map-light.webp";
import agapayPlantingWindow from "./assets/images/Agapay/farmer-planting-window.webp";
import agapaySmsPreview from "./assets/images/Agapay/farmer-sms-preview.webp";
import agapayYieldEstimate from "./assets/images/Agapay/farmer-yield-estimate.webp";
import agapayLiveLgu from "./assets/images/Agapay/live-lgu-dashboard.webp";
import agapayLiveWelcome from "./assets/images/Agapay/live-welcome.webp";

import carevendCatalog from "./assets/images/CareVend/kiosk-slot-catalog.webp";
import carevendHome from "./assets/images/CareVend/kiosk-triage-home.webp";

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
  tabletPortrait?: boolean;
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
    id: "agapay",
    title: "Agapay",
    subtitle: "Hyper-Local Planting & Climate Decision App for Filipino Farmers",
    period: "2026",
    year: "2026",
    category: "fullstack",
    disciplineLabel: "Full-Stack Mobile App & UI/UX",
    featured: true,
    mobile: true,
    summary:
      "A mobile-first agricultural decision application for Filipino farmers—delivering field-level planting windows, 1 km suitability grids, offline sync, and SMS advisories, paired with an RA 10173-compliant LGU dashboard.",
    problem:
      "Smallholder farmers make high-stakes planting decisions amid unpredictable rainfall and waterlogging without hyper-local guidance, while municipal offices lack privacy-safe visibility into barangay crop crowding.",
    role: "Product Designer & Full-Stack Developer — designed the multi-plan iOS 26 UI system in Figma (codenamed BukidTech) and built the live application.",
    architectureNote:
      "Pairs an offline-capable, multilingual farmer mobile interface (with sync queues and SMS fallback) alongside a companion LGU workspace enforcing RA 10173 Data Privacy suppression (<5 reporting farmers) and CSV/PDF export.",
    built: [
      "Farmer mobile app surfacing GO / WAIT / AVOID planting windows, 7-day rainfall & waterlogging checks, crop rankings, and yield estimates",
      "Interactive spatial suitability grid across Baybay City barangays (Rain, Soil, Flood, and Suitability layers)",
      "Offline preview mode, field sync status, and SMS advisory fallback designed for low-connectivity farm parcels",
      "Companion City Agriculture Office (LGU) workspace monitoring barangay crop crowding and planted hectares with RA 10173 privacy suppression",
    ],
    stack: ["React", "TypeScript", "Mobile Web / App", "Offline-First UX", "Spatial Maps", "Figma", "Light & Dark Modes"],
    metrics: [
      { label: "Primary UX", value: "Farmer Mobile App" },
      { label: "Resilience", value: "Offline + SMS Ready" },
      { label: "Privacy", value: "RA 10173 Aggregated" },
    ],
    live: "https://agapay-tau.vercel.app/",
    figma: "https://www.figma.com/design/uzxr3AUL2so9ADoJQfUgG4/BukidTech-%E2%80%93-iOS-26-App-Design?node-id=0-1&t=3eihe5d52qOvpWNo-1",
    cover: agapayLiveWelcome,
    secondaryPreviews: [agapayHomeLight, agapayMapLight],
    gallery: [
      { src: agapayLiveWelcome, caption: "Agapay mobile entry — Multilingual, offline preview & SMS access", group: "Farmer App", portrait: true },
      { src: agapayHomeLight, caption: "Farmer home — Planting window, waterlogging & 7-day rain outlook", group: "Farmer App", portrait: true },
      { src: agapayMapLight, caption: "1 km suitability grid (GO / WAIT / AVOID) — Brgy. Gabas", group: "Farmer App", portrait: true },
      { src: agapayPlantingWindow, caption: "Daily planting window & soil drainage guidance", group: "Farmer App", portrait: true },
      { src: agapayCropSuggestions, caption: "Crop suitability ranking & recommendations", group: "Farmer App", portrait: true },
      { src: agapayYieldEstimate, caption: "Projected harvest & yield estimator", group: "Farmer App", portrait: true },
      { src: agapaySmsPreview, caption: "Low-connectivity SMS advisory thread", group: "Farmer App", portrait: true },
      { src: agapayHomeDark, caption: "Dark mode — Farmer planting window & rainfall dashboard", group: "Dark Mode", portrait: true },
      { src: agapayMapDark, caption: "Dark mode — Barangay suitability map", group: "Dark Mode", portrait: true },
      { src: agapayLiveLgu, caption: "Companion LGU Workspace — Barangay crowding map & planted hectares", group: "LGU Companion", portrait: false },
    ],
  },
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
    title: "Ryde.",
    subtitle: "Campus Ride-Hailing & Multi-Service App · VSU Baybay (Dev Build)",
    period: "2026 – Present",
    year: "2026",
    category: "fullstack",
    disciplineLabel: "App Dev & UI/UX System · In Dev",
    featured: true,
    mobile: true,
    summary:
      "A localized mobility and delivery app built around VSU Baybay—combining Motor, Taxi, Food, and local errand booking with live driver tracking, GCash checkout, and an 18-screen Liquid Glass UI system.",
    problem:
      "Commuters and students around VSU Baybay rely on informal rides and scattered chat groups without upfront fare tiers, live driver ETAs, or trip safety tools.",
    role: "Product Designer & Developer — authored the 18-screen iOS 26 Liquid Glass system in Figma and engineered the working application in active development.",
    architectureNote:
      "Translated from a tokenized Liquid Glass Figma design system (full light & dark parity) into an interactive app build covering OTP auth, VSU/Baybay spatial pinning, fare-tier sheets, live trip tracking, and Safety SOS.",
    built: [
      "Multi-service booking hub supporting Motor, Taxi, Food, and local Services with instant VSU Baybay quick-pins (DCST, VSU Hospital, 7/11 Utod)",
      "Active dev build implementing the end-to-end trip lifecycle: phone OTP verification, route search, ride-tier & schedule selection, live driver arrival tracking, and ratings",
      "18-screen iOS 26 Liquid Glass design system in Figma engineered with full daylight and low-glare dark mode parity",
      "Integrated commuter payment and trust workflows including GCash checkout, verified driver profiles, trip sharing, and Safety SOS",
    ],
    stack: ["React", "TypeScript", "Mobile Web / App", "Maps", "Figma", "Design Systems", "Light & Dark Modes"],
    metrics: [
      { label: "Build State", value: "In Active Dev" },
      { label: "UI System", value: "18 Production Screens" },
      { label: "Locale", value: "VSU · Baybay City" },
    ],
    // Attach your dev live web URL here when ready: live: "https://...",
    figma: "https://www.figma.com/design/FJbTiEChKqH4h2rAMHfsYg/Ryde.-app?node-id=0-1&t=srmMfrVtVFGE27sK-1",
    cover: rydeHomeLight,
    secondaryPreviews: [rydeHomeDark, rydeLiveLight],
    gallery: [
      { src: rydeHomeLight, caption: "Home map & multi-service quick book (VSU Baybay)", group: "Booking Flow", portrait: true },
      { src: rydePickupSearch, caption: "Pickup & destination spatial search", group: "Booking Flow", portrait: true },
      { src: rydeTiersLight, caption: "Ride tier & upfront fare selection sheet", group: "Booking Flow", portrait: true },
      { src: rydePaymentSchedule, caption: "GCash payment & scheduled departure sheet", group: "Booking Flow", portrait: true },
      { src: rydeLiveLight, caption: "Live driver arrival tracking & Safety SOS", group: "Live Trip", portrait: true },
      { src: rydeSummaryRating, caption: "Completed trip summary & driver rating", group: "Live Trip", portrait: true },
      { src: rydeHomeDark, caption: "Dark mode — Home map & service switcher", group: "Dark Mode", portrait: true },
      { src: rydeTiersDark, caption: "Dark mode — Ride tiers & fare sheet", group: "Dark Mode", portrait: true },
      { src: rydeLiveDark, caption: "Dark mode — Live route tracking", group: "Dark Mode", portrait: true },
      { src: rydeProfileDark, caption: "Dark mode — Commuter profile & settings", group: "Dark Mode", portrait: true },
      { src: rydeLogin, caption: "Phone number sign-in", group: "Onboarding", portrait: true },
      { src: rydeOtp, caption: "SMS OTP verification", group: "Onboarding", portrait: true },
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
    id: "carevend",
    title: "CareVend",
    subtitle: "Campus OTC Health & Hygiene Kiosk · Portrait iPad",
    period: "2026",
    year: "2026",
    category: "fullstack",
    disciplineLabel: "Portrait iPad Kiosk & Web App",
    featured: true,
    tabletPortrait: true,
    summary:
      "A vertical iPad self-service health and menstrual hygiene vending kiosk—guiding students through quick symptom and contraindication checks before dispensing OTC essentials or escalating to the school clinic.",
    problem:
      "Students needing basic first-aid, pain relief, or menstrual care on campus face clinic queues or after-hours closures, yet unguided vending risks unsafe medication choices.",
    role: "Product Designer & Frontend/Full-Stack Engineer — designed the portrait iPad touch interface, clinical safety decision tree, and 9-slot dispensing flow.",
    architectureNote:
      "Engineered specifically for vertical iPad touch targets—modeling branching symptom-and-allergy safety checks (escalating to the school nurse on contraindications) alongside live 9-slot (`A1–C3`) inventory state, ingredient card flips, and checkout simulation.",
    built: [
      "Portrait iPad touchscreen triage across 7 campus health & hygiene needs with allergy and recent-dose contraindication safeguards",
      "Automatic school clinic nurse escalation whenever high-risk symptoms or medication conflicts are detected",
      "Interactive 9-slot (`A1–C3`) vending machine grid with live stock counts, inline active-ingredient card flips, and sticky multi-item cart",
      "End-to-end kiosk checkout and slot-dispensing flow with operator one-tap slot restocking and fullscreen kiosk mode",
    ],
    stack: ["React", "TypeScript", "Portrait iPad UX", "State Machines", "Tailwind CSS"],
    metrics: [
      { label: "Form Factor", value: "Portrait iPad Kiosk" },
      { label: "Inventory", value: "9 Physical Slots (A1–C3)" },
      { label: "Safety", value: "Contraindication Triage" },
    ],
    live: "https://carevend.vercel.app/",
    cover: carevendHome,
    secondaryPreviews: [carevendCatalog],
    gallery: [
      { src: carevendHome, caption: "Portrait iPad home — 2×4 symptom & hygiene need triage", portrait: true },
      { src: carevendCatalog, caption: "Portrait iPad 9-slot (A1–C3) catalog — Stock, ingredient inspect & cart", portrait: true },
    ],
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
  blurb: string;
  tools: string[];
}

export const CAPABILITIES: CapabilityPillar[] = [
  {
    index: "01",
    title: "UI/UX & Design",
    blurb: "Multi-platform flows, design tokens, and prototypes built for clean handoff.",
    tools: ["Figma", "Design Systems", "Prototyping", "UX Flows", "Wireframing", "WCAG Accessibility"],
  },
  {
    index: "02",
    title: "Frontend & Mobile",
    blurb: "Fast, typed interfaces across modern web browsers and mobile devices.",
    tools: ["React", "Next.js", "TypeScript", "React Native", "Flutter", "Tailwind CSS", "Vite"],
  },
  {
    index: "03",
    title: "Backend & Data",
    blurb: "APIs, auth, and relational schemas engineered for production reliability.",
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
];

export interface CredentialItem {
  title: string;
  issuer: string;
  date: string;
  note: string;
  summary?: string;
  certificateUrl?: string;
}

export const CREDENTIALS: CredentialItem[] = [
  {
    title: "Space Business Innovation Camp · National Finalist",
    issuer: "Philippine Space Agency (PhilSA)",
    date: "Nov 23, 2026",
    note: "Finalist",
    summary: "Selected among competing teams nationwide to present at the Final Demo Day.",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "Sep 12, 2025",
    note: "Certificate",
    certificateUrl: "/certificates/introduction-to-data-science-cisco.pdf",
  },
  {
    title: "Data Science: R Basics",
    issuer: "HarvardX · edX",
    date: "2025",
    note: "PH125.1x",
  },
];
