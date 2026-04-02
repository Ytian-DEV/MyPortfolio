import type { ReactNode } from "react";
import amaranthWeb from "./assets/imgURL/amaranth-dvm6.vercel.app.png";
import amaranthScuaa8VNR from "./assets/imgURL/amaranth-scua8-finalreport.jpg";
import amaranthRecap from "./assets/imgURL/amaranth-staff-tribute-and-recap-2024-2025.png";
import amaranthHigayongPambaye from "./assets/imgURL/higayong-pambaye.png";
import ticTacToeImage from "./assets/imgURL/tictactoe-zeta.vercel.app.png.png";
import xmass3Lighting from "./assets/imgURL/xmass-tree-lighting.png";
import birthdayInvitationImage from "./assets/imgURL/birthday-invitation.png";
import agroVlogImage from "./assets/imgURL/agro-vlog.png";
import boardmapPreview from "./assets/imgURL/boardmap.jpeg";
import back2schoolVoxBox from "./assets/imgURL/back2school-voxbox.png";
import boardmapLogIn from "./assets/images/BoardMap/LogInPage.png";
import boardmapSignUp from "./assets/images/BoardMap/SignUpPage.png";
import boardmapStudentMap from "./assets/images/BoardMap/StudentDashBoard-MapView.png";
import boardmapStudentMapFilter from "./assets/images/BoardMap/StudentDashBoard-MapView-Filter.png";
import boardmapStudentList from "./assets/images/BoardMap/StudentDashBoard-ListView.png";
import boardmapStudentListFilter from "./assets/images/BoardMap/StudentDashBoard-ListView-Filter.png";
import boardmapStudentProperty from "./assets/images/BoardMap/StudentDashBoard-Property.png";
import boardmapStudentMessages from "./assets/images/BoardMap/StudentDashBoard-Message.png";
import boardmapStudentChat from "./assets/images/BoardMap/StudentDashBoard-Message-CHat.png";
import boardmapOwnerProperty from "./assets/images/BoardMap/OwnerDashBoard-Property.png";
import boardmapOwnerInquiries from "./assets/images/BoardMap/OwnerDashBoard-Inquiries.png";
import boardmapOwnerAnalytics from "./assets/images/BoardMap/OwnerDashBoard-Analytics.png";
import boardmapOwnerOccupants from "./assets/images/BoardMap/OwnerDashBoard-Occupants.png";
import rydeLoadingPage from "./assets/images/Ryde/Loading Page.png";
import rydeLoginDark from "./assets/images/Ryde/Login Page - Dark Theme.png";
import rydeLoginLight from "./assets/images/Ryde/Login Page - Light Theme.png";
import rydeNameDark from "./assets/images/Ryde/Name Page - Dark Theme.png";
import rydeNameLight from "./assets/images/Ryde/Name Page - Light Theme.png";
import rydeOtpDark from "./assets/images/Ryde/OTP Page - Dark Theme.png";
import rydeOtpLight from "./assets/images/Ryde/OTP Page - Light Theme.png";
import rydeHomeDark from "./assets/images/Ryde/Home Page - Dark Theme.png";
import rydeHomeLight from "./assets/images/Ryde/Home Page - Light Theme.png";
import rydeSetPickupLight from "./assets/images/Ryde/Set Pick-up Location Page - Light Theme.png";
import rydeSetDestinationLight from "./assets/images/Ryde/Set Destination Page - Light Theme.png";
import rydeSelectTimeLight from "./assets/images/Ryde/Select Time Page - Light Theme.png";
import rydeSelectTime2Light from "./assets/images/Ryde/Select Time 2 Page - Light Theme.png";
import rydeSelectTime3Light from "./assets/images/Ryde/select Time 3 Page - Light Theme.png";
import rydePaymentMethodLight from "./assets/images/Ryde/Payment Method Page - Light Theme.png";
import rydePaymentMethod1Light from "./assets/images/Ryde/Payment Method 1 Page - Light Theme.png";
import rydePaymentMethod2Light from "./assets/images/Ryde/Payment Method 2 Page - Light Theme.png";
import reseatoCebu from "./assets/imgURL/reseato-cebu.png";
import mapaguapa from "./assets/imgURL/mapaguapa.png";

export type SectionId =
  | "home"
  | "about"
  | "projects"
  | "certifications"
  | "contact";

export type ProjectType = "uiux" | "web" | "video" | "photo";

export interface Project {
  title: string;
  period: string;
  summary: string;
  details?: ReactNode;
  type: ProjectType;
  link?: string;
  videoUrl?: string;
  imageUrl?: string;
  images?: string[];
  beforeImage?: string;
  afterImage?: string;
  tags: string[];
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  position?: string;
}

export interface DetailItem {
  title: string;
  period: string;
  description: string;
}

function createPhotoPlaceholder(
  title: string,
  subtitle: string,
  start: string,
  end: string,
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" rx="52" fill="url(#bg)" />
      <circle cx="670" cy="160" r="170" fill="rgba(255,255,255,0.12)" />
      <circle cx="130" cy="820" r="190" fill="rgba(10,12,18,0.14)" />
      <rect x="78" y="96" width="644" height="808" rx="38" fill="rgba(15,18,28,0.14)" stroke="rgba(255,255,255,0.18)" />
      <text x="90" y="170" fill="rgba(255,248,240,0.92)" font-family="Georgia, serif" font-size="62" font-weight="700">${title}</text>
      <text x="90" y="240" fill="rgba(255,248,240,0.74)" font-family="Arial, sans-serif" font-size="30">${subtitle}</text>
      <text x="90" y="850" fill="rgba(255,248,240,0.8)" font-family="Arial, sans-serif" font-size="24" letter-spacing="3">PLACEHOLDER FRAME</text>
      <text x="90" y="888" fill="rgba(255,248,240,0.62)" font-family="Arial, sans-serif" font-size="22">Swap in your final edited photo later.</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const HERO_HIGHLIGHTS = [
  {
    label: "Web builds",
    value: "Full-stack work from interface to backend integration",
  },
  {
    label: "Design systems",
    value: "Figma-first thinking with practical implementation in mind",
  },
  {
    label: "Visual media",
    value: "Editorial video and photo work with polished post-production",
  },
];

export const SKILLS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "MongoDB",
  "Firebase",
  "Supabase",
  "Figma",
  "Adobe Premiere Pro",
  "Adobe After Effects",
];

export const EDUCATION: DetailItem[] = [
  {
    title: "Visayas State University - Main Campus",
    period: "August 2022 - Present",
    description:
      "Fourth-year Computer Science student focused on software and web development. I enjoy taking products from the first idea through planning, development, testing, and launch while keeping the user experience intuitive and modern.",
  },
  {
    title: "Ubay National Science High School",
    period: "June 2016 - July 2022",
    description:
      "Graduated in the STEM track with honors. That early interest in architecture and design evolved into a love for digital product work, where I now apply the same problem-solving mindset to software and interface design.",
  },
];

export const EXPERIENCE: DetailItem[] = [
  {
    title: "Full-Stack Developer",
    period: "May 2025 - Present",
    description:
      "Expanded from front-end work into backend systems to build more complete applications, connecting polished interfaces with reliable server-side logic and data flows.",
  },
  {
    title: "Front-End Developer",
    period: "September 2024 - Present",
    description:
      "Build responsive, user-focused interfaces with attention to clarity, interaction quality, and maintainable component structure.",
  },
  {
    title: "UI/UX Designer",
    period: "December 2024 - Present",
    description:
      "Design modern product experiences in Figma with a practical understanding of what is feasible to implement, keeping user needs and technical constraints aligned.",
  },
  {
    title: "Multimedia and Production Head",
    period: "August 2025 - Present",
    description:
      "Lead multimedia planning, workflow coordination, and quality control for Amaranth, ensuring content ships on time and stays consistent across channels.",
  },
  {
    title: "Video Editor",
    period: "January 2024 - Present",
    description:
      "Shape raw footage into polished stories using pacing, color, audio cleanup, and motion graphics to create strong audience engagement.",
  },
  {
    title: "Photo Editor",
    period: "January 2024 - Present",
    description:
      "Handle curation, retouching, and visual consistency so published images feel intentional, clean, and publication-ready.",
  },
  {
    title: "Photojournalist",
    period: "February 2023 - January 2024",
    description:
      "Covered campus events through photojournalism with an emphasis on fast decision-making, respectful reporting, and visually strong storytelling.",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Introduction to Data Science",
    year: "2025",
    organization:
      "Cisco Networking Academy through the Networking Academy program",
  },
  {
    title: "Data Science: R Basics",
    year: "2025",
    organization: "Harvard EdX - HarvardX PH125.1x",
  },
];

export const PROJECTS: Project[] = [
    {
    title: "Ryde",
    period: "2026",
    summary:
      "A mobile ride-booking UI flow that moves from onboarding into route setup, time selection, and payment steps with both dark and light theme explorations.",
    details: (
      <div className="copy-stack">
        <p>
          Ryde is a mobile UI/UX case study built around a booking journey:
          onboarding, account entry, verification, home discovery, pickup and
          destination setup, schedule selection, and payment.
        </p>
      </div>
    ),
    type: "uiux",
    imageUrl: rydeLoadingPage,
    images: [
      rydeLoadingPage,
      rydeLoginDark,
      rydeLoginLight,
      rydeNameDark,
      rydeNameLight,
      rydeOtpDark,
      rydeOtpLight,
      rydeHomeDark,
      rydeHomeLight,
      rydeSetPickupLight,
      rydeSetDestinationLight,
      rydeSelectTimeLight,
      rydeSelectTime2Light,
      rydeSelectTime3Light,
      rydePaymentMethodLight,
      rydePaymentMethod1Light,
      rydePaymentMethod2Light,
    ],
    tags: [
      "UI Design",
      "UX Flow",
      "Mobile App Design",
      "Dark Theme",
      "Light Theme",
      "User Journey",
      "Booking Flow",
    ],
  },
  {
    title: "BoardMap",
    period: "Oct 26, 2025 - Nov 8, 2025",
    summary:
      "A Figma product design project for a map-based boarding house finder built for students and faculty near Visayas State University.",
    details: (
      <div className="copy-stack">
        <p>
          BoardMap is a UI/UX design concept for a web platform that helps
          students and faculty locate boarding houses near Visayas State
          University - Baybay City Campus.
        </p>
      </div>
    ),
    type: "uiux",
    link: "https://www.figma.com/design/PLyl615g6uSVaesonXgCk2/BoardMap?node-id=0-1&t=R30u6mbH4MCXcR7o-1",
    imageUrl: boardmapPreview,
    images: [
      boardmapLogIn,
      boardmapSignUp,
      boardmapStudentMap,
      boardmapStudentMapFilter,
      boardmapStudentList,
      boardmapStudentListFilter,
      boardmapStudentProperty,
      boardmapStudentMessages,
      boardmapStudentChat,
      boardmapOwnerProperty,
      boardmapOwnerOccupants,
      boardmapOwnerInquiries,
      boardmapOwnerAnalytics,
    ],
    tags: [
      "UI Design",
      "UX Design",
      "Figma",
      "Dashboard Design",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    title: "MAPAGUAPA | VYM",
    period: "March 2026 - April 2026",
    summary:
      "MAPAGUAPA helps Viscan students discover boarding houses and apartments that match their comfort, location, and budget all in one sleek and accessible platform.",
    type: "web",
    link: "https://mapaguapa.vercel.app/",
    imageUrl: mapaguapa,
    tags: [
      "Web Development",
      "Full Stack",
      "React TS",
      "Tailwind CSS",
      "Responsive Design",
      "Supabase",
      "Student Housing",
      "Map Integration",
    ],
  },
  {
    title: "RESEATO - Cebu",
    period: "February 2026 - April 2026",
    summary:
      "RESEATO helps you book the best tables at top rated restaurants in SM City and SM Seaside Cebu. Skip the line, enjoy the dine—and suggest what's best.",
    type: "web",
    link: "https://reseato-cebu-v2.vercel.app/",
    imageUrl: reseatoCebu,
    tags: [
      "Website Development",
      "Full Stack",
      "React TS",
      "Tailwind CSS",
      "Responsive Design",
      "Supabase",
      "Restaurant Booking",
      "User Reviews",
      "Real-time Availability",
    ],
  },
  {
    title: "BoardMap",
    period: "Nov 18, 2025 - Dec 16, 2025",
    summary:
      "A full-stack boarding house platform with map-driven discovery, filters, and a cleaner way to browse nearby options around VSU.",
    type: "web",
    link: "https://batch-2025-vsu-boardmap-web.vercel.app/",
    imageUrl: boardmapPreview,
    tags: [
      "Web Development",
      "Full Stack",
      "React.tsx",
      "TypeScript",
      "Tailwind CSS",
      "Leaflet Maps API",
      "Supabase",
    ],
  },
  {
    title: "Amaranth Revamped Website",
    period: "Aug 26, 2025 - Current",
    summary:
      "A refreshed Amaranth site with responsive design, campus resources, and clearer information architecture for stronger engagement.",
    type: "web",
    link: "https://amaranth-dvm6.vercel.app/",
    imageUrl: amaranthWeb,
    tags: [
      "Web Development",
      "Full Stack",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
  },
  {
    title: "Tic Tac Toe Game",
    period: "Oct 9, 2025",
    summary:
      "A React and TypeScript game project with a polished interface, smooth interactions, and a strong visual identity.",
    type: "web",
    link: "https://tiktactoe-zeta.vercel.app/",
    imageUrl: ticTacToeImage,
    tags: [
      "Web Development",
      "Game Development",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Birthday Celebration e-Invitation",
    period: "Oct 14, 2025 - Oct 20, 2025",
    summary:
      "A modern invitation experience with a linked admin dashboard for guest management, QR scanning, and attendance tracking.",
    details: (
      <div className="copy-stack">
        <p>
          This project combines a public-facing invitation experience with an
          administrator dashboard that manages guests, QR code check-ins, and
          real-time attendance updates.
        </p>
        <p>
          Administrator dashboard:
          {" "}
          <a
            className="inline-link"
            href="https://invitation-web-t7q7.vercel.app/#/administrator"
            target="_blank"
            rel="noreferrer"
          >
            invitation-web-t7q7.vercel.app/#/administrator
          </a>
        </p>
      </div>
    ),
    type: "web",
    link: "https://invitation-web-t7q7.vercel.app/",
    imageUrl: birthdayInvitationImage,
    tags: [
      "Web Development",
      "e-Invitations",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Admin Dashboard",
      "Supabase",
      "QR Code",
    ],
  },
  {
    title: "Back2School VoxBox",
    period: "Jan 26, 2026",
    summary:
      "An Amaranth video feature capturing back-to-school energy at VSU through interviews, campus moments, and student stories.",
    type: "video",
    videoUrl: "https://www.facebook.com/share/v/17p7cB8FHY/",
    imageUrl: back2schoolVoxBox,
    tags: [
      "Video Editing",
      "Content Creation",
      "Adobe Premiere Pro",
      "Adobe After Effects",
    ],
  },
  {
    title: "AgroVlog",
    period: "Dec 20, 2025",
    summary:
      "A video series that highlights agricultural practices, local stories, and informative on-camera presentation.",
    type: "video",
    videoUrl: "https://youtu.be/xjwizKsgjRw",
    imageUrl: agroVlogImage,
    tags: [
      "Video Editing",
      "Content Creation",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Agriculture",
    ],
  },
  {
    title: "AMARANTH SCUAA-8 Coverage Final Report",
    period: "December 2024",
    summary:
      "A complete event coverage recap that packages highlights, competition energy, and closing ceremonies into a clear news report.",
    type: "video",
    videoUrl: "https://youtu.be/L1bbL-iUQMo",
    imageUrl: amaranthScuaa8VNR,
    tags: [
      "Video Editing",
      "Video News Report",
      "Adobe Premiere Pro",
      "Adobe After Effects",
    ],
  },
  {
    title: "AMARANTH Staff Recap and Tribute 2024-2025",
    period: "July 2025",
    summary:
      "An animated tribute project celebrating Amaranth's work and the graduating staff behind it.",
    type: "video",
    videoUrl: "https://youtu.be/6tQAIzzpKGY",
    imageUrl: amaranthRecap,
    tags: [
      "Video Editing",
      "Animation",
      "Motion Graphics",
      "Adobe After Effects",
    ],
  },
  {
    title: "AMARANTH Higayong Pambaye 2025",
    period: "April 2025",
    summary:
      "A Women's Month event coverage piece that balances reporting, atmosphere, and fast-paced editorial storytelling.",
    type: "video",
    videoUrl: "https://youtu.be/UIityaj5g-E",
    imageUrl: amaranthHigayongPambaye,
    tags: [
      "Video Editing",
      "Video News Report",
      "Adobe Premiere Pro",
      "Adobe After Effects",
    ],
  },
  {
    title: "AMARANTH Christmas Tree Lighting News Report",
    period: "December 2024",
    summary:
      "A festive campus news package built around event atmosphere, community participation, and polished video production.",
    type: "video",
    videoUrl: "https://youtu.be/NIMRgf4rd7A",
    imageUrl: xmass3Lighting,
    tags: [
      "Video Editing",
      "Video News Report",
      "Adobe Premiere Pro",
      "Adobe After Effects",
    ],
  },
];

export const PROJECT_GROUPS: Array<{
  title: string;
  type: ProjectType;
  copy: string;
  emptyMessage: string;
}> = [
  {
    title: "UI/UX Design",
    type: "uiux",
    copy: "Figma concepts and product flows built with implementation in mind.",
    emptyMessage: "No UI/UX projects published yet.",
  },
  {
    title: "Web & App Development",
    type: "web",
    copy: "Responsive builds and product interfaces shaped for usability, clarity, and real-world interaction.",
    emptyMessage: "No web projects published yet.",
  },
  {
    title: "Video Editing",
    type: "video",
    copy: "Edited stories, reports, and multimedia coverage pieces.",
    emptyMessage: "No video projects published yet.",
  },
  {
    title: "Photo Editing",
    type: "photo",
    copy: "A rotating gallery scaffold for retouching, curation, and polished visual storytelling.",
    emptyMessage: "No photo projects published yet.",
  },
];

export const PHOTO_GALLERY_ITEMS: PhotoGalleryItem[] = [
  {
    id: "portrait-retouch",
    title: "Portrait Retouch",
    summary: "Use this slot for refined portraits with balanced tones and clean skin retouching.",
    imageUrl: createPhotoPlaceholder(
      "Portrait Retouch",
      "Future polished portrait work",
      "#c9a28c",
      "#6a4f4b",
    ),
    position: "center",
  },
  {
    id: "event-coverage",
    title: "Event Coverage",
    summary: "Drop in your strongest documentary-style event frames here later.",
    imageUrl: createPhotoPlaceholder(
      "Event Coverage",
      "Campus moments and live coverage",
      "#957d6a",
      "#2f323d",
    ),
    position: "center",
  },
  {
    id: "editorial-color",
    title: "Editorial Color",
    summary: "A good spot for before-and-after color grading or final editorial stills.",
    imageUrl: createPhotoPlaceholder(
      "Editorial Color",
      "Mood, tone, and color finish",
      "#5f7e88",
      "#1d2631",
    ),
    position: "center",
  },
  {
    id: "product-cleanup",
    title: "Product Cleanup",
    summary: "Use this frame for object cleanup, compositing, or studio touch-up work.",
    imageUrl: createPhotoPlaceholder(
      "Product Cleanup",
      "Commercial and product edits",
      "#d1c4b0",
      "#6a5d58",
    ),
    position: "center",
  },
  {
    id: "publication-ready",
    title: "Publication Ready",
    summary: "Reserve this for final layouts or images prepared for publication output.",
    imageUrl: createPhotoPlaceholder(
      "Publication Ready",
      "Final export quality showcase",
      "#c7b5a3",
      "#2a2430",
    ),
    position: "center",
  },
  {
    id: "creative-direction",
    title: "Creative Direction",
    summary: "Ideal for styled sets, concept-driven portraits, or branded visual direction.",
    imageUrl: createPhotoPlaceholder(
      "Creative Direction",
      "Conceptual image storytelling",
      "#8f8f79",
      "#252d24",
    ),
    position: "center",
  },
];
