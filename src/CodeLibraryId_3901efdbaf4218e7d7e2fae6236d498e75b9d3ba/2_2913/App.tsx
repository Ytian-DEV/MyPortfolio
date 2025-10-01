import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-6sovak61ez";
import imgAdobeExpressFile31 from "figma:asset/7ba16f5335969b66c314f7955ee4897ab548acd6.png";

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About me' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contacts', label: 'Contacts' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1f1f1f]/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-['Poppins:Regular',_sans-serif] text-[18px] transition-colors duration-200 ${
                  activeSection === item.id ? 'text-[#f8f7f9]' : 'text-[#f8f7f9]/70 hover:text-[#f8f7f9]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="h-11 w-px bg-[#f8f7f9]" />
            <div className="flex gap-6">
              <SocialIcon type="instagram" />
              <SocialIcon type="twitter" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function SocialIcon({ type }: { type: 'instagram' | 'twitter' }) {
  const getPath = () => {
    if (type === 'instagram') {
      return (
        <>
          <path
            d={svgPaths.p4fdb300}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p39557800}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M17.5 6.5H17.51"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </>
      );
    } else {
      return (
        <path
          d={svgPaths.p3350a500}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      );
    }
  };

  return (
    <button className="text-[#f8f7f9] hover:text-[#f8f7f9]/80 transition-colors duration-200">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        {getPath()}
      </svg>
    </button>
  );
}

function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[905px] h-[897px]">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1417 1409">
              <defs>
                <filter id="blur" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="128" />
                </filter>
              </defs>
              <ellipse
                cx="708.5"
                cy="704.5"
                rx="452.5"
                ry="448.5"
                fill="#f8f7f9"
                filter="url(#blur)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-['Poppins:Bold',_sans-serif] text-[24px] text-[#f8f7f9]">
              HI, I'M NEERAJ
            </h2>
            <h1 className="font-['Poppins:Bold',_sans-serif] text-[64px] lg:text-[96px] leading-[0.9] text-[#f8f7f9]">
              I'M A PRODUCT<br />MANAGER
            </h1>
          </div>
          
          <button 
            onClick={scrollToProjects}
            className="group border-2 border-[#f8f7f9] px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f]"
          >
            <span className="font-['Poppins:Bold',_sans-serif] text-[24px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300">
              VIEW MY PROJECTS
            </span>
          </button>
        </div>

        {/* Right content - Profile image */}
        <div className="relative">
          <div
            className="w-full h-[600px] lg:h-[800px] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url('${imgAdobeExpressFile31}')` }}
          />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[96px] text-[#f8f7f9] mb-12">
          About me
        </h2>
        
        <div className="max-w-4xl">
          <p className="font-['Poppins:Regular',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5] mb-8">
            I'm Dynamic and results-driven Senior Business Development Associate with a robust background in sales, client relations, and Agile product management.
          </p>
          <p className="font-['Poppins:Regular',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
            I have a proven track record of exceeding targets, driving revenue growth, and leading high-performing teams. Experienced in utilizing data analytics, market research, and innovative strategies to achieve business objectives. Certified Scrum Product Owner (CSPO) with advanced expertise in Agile methodologies, product backlog management, and sprint planning. Passionate about continuous improvement and delivering customer-centric solutions that drive operational efficiency and market success.
          </p>
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3 className="font-['Poppins:Bold',_sans-serif] text-[24px] text-[#f8f7f9] mb-8">
            EDUCATION
          </h3>
          <div className="max-w-4xl">
            <h4 className="font-['Poppins:ExtraBold',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] mb-2">
              National Institute of Technology Puducherry
            </h4>
            <p className="font-['Poppins:Medium',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
              I hold a Bachelor of Technology degree in Electronics and Communications from National Institute of Technology Puducherry, with a cumulative GPA of 5.29/10.0. My education has equipped me with a solid foundation in technical skills and problem-solving
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-16">
          <h3 className="font-['Poppins:Bold',_sans-serif] text-[24px] text-[#f8f7f9] mb-8">
            Experience
          </h3>
          <div className="space-y-12">
            <ExperienceItem
              title="PRODUCT MANAGER"
              period="2024 — current"
              description="As a Product Manager at TRANSOND Systems Private Limited Joint Venture and EOR of AICTEC India, I bridge the gap between cutting-edge products and customer needs. My responsibilities include comprehensive market research to identify trends, customer pain points, and opportunities, while collaborating with cross-functional teams to refine product strategies. I leverage data insights to inform the product roadmap, prioritizing features that maximize user value and drive business growth. Additionally, I ensure smooth product launches that enhance functionality and deliver an exceptional user experience."
            />
            <ExperienceItem
              title="SENIOR BUSINESS DEVELOPMENT ASSOCIATE"
              period="2021 — 2022"
              description="As a senior business development associate I established and nurtured relationships with prospective clients, driving business growth and consistently exceeding sales targets. By facilitating virtual presentations via Zoom, I educated clients on product offerings. I developed and executed targeted sales strategies, securing new business opportunities and significantly contributing to revenue growth. Leading a dynamic team of business development associates, I provided mentorship and guidance to ensure high performance. Conducting thorough market research, I identified new markets and customer segments, expanding the academy's footprint."
            />
            <ExperienceItem
              title="SENIOR ADMISSION COUNSELLOR"
              period="2020 — 2021"
              description="As a senior admission counsellor established and maintained communication with prospective clients, cultivating strategic partnerships and consistently meeting revenue targets. I provided comprehensive guidance to prospective students on course selection, admission requirements, and career pathways, ensuring informed decisions. Managing the end-to-end admission process, I consistently exceeded enrolment targets. Collaborating with marketing and academic teams, I aligned admission strategies with organizational goals, enhancing program visibility."
            />
            <ExperienceItem
              title="BUSINESS DEVELOPMENT ASSOCIATE"
              period="2018 — 2019"
              description="As a business development associate have I contacted potential clients to set up meetings and counselled them on learning pedagogies and personalized learning experiences, achieving sales targets consistently. I directed and mentored a team of 10 business development representatives, providing guidance to achieve individual and collective goals. I developed and implemented strategic plans to enhance market penetration and customer acquisition."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ title, period, description }: { title: string; period: string; description: string }) {
  return (
    <div className="max-w-4xl">
      <h4 className="font-['Poppins:ExtraBold',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] mb-1">
        {title}
      </h4>
      <p className="font-['Poppins:ExtraLight',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] mb-3">
        {period}
      </p>
      <p className="font-['Poppins:Medium',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
        {description}
      </p>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "Energic - EV charging station management system",
      period: "07/2024 — current",
      description: "Energic provides a comprehensive and user-friendly EV charging station management system (CSMS) that helps with Real time locating, scheduling, and managing charging stations and maintenance alerts."
    },
    {
      title: "Product Roadmap for an Online Grocery Delivery Platform",
      period: "06/2024 — 07/2024",
      description: "A 12-month roadmap for an online grocery delivery platform that can achieve significant growth, enhance customer satisfaction, and establish itself as a market leader. This strategy ensures a balanced focus on user experience, operational efficiency, and continuous innovation."
    },
    {
      title: "IPL Best XI project",
      period: "05/2023- 07/2023",
      description: "A python project to find IPL Best XI by Involving Players from All 10 Teams of IPL 2023 season, by analysing and understanding the various factors that influence team selection and to develop effective strategies for selecting IPL Best XI"
    },
    {
      title: "Market Analysis",
      period: "03/2023 — 05/2023",
      description: "A python project to find IPL Best XI by Involving Players from All 10 Teams of IPL 2023 season, by analysing and understanding the various factors that influence team selection and to develop effective strategies for selecting IPL Best XI"
    },
    {
      title: "Financial Analysis",
      period: "02/2023 — 04/2023",
      description: "Analysed the past 5 years financial statements of Jj associates to understand the business's financial health and performance. Identified trends, compared against industry benchmarks, and made recommendations for improvements"
    },
    {
      title: "Conducted User Research",
      period: "02/2023 — 04/2024",
      description: "Performed user research to understand the needs, preferences, and behaviours of users. Used the research findings understand, what kind of design and feature improvements are expected by users in the next generation iPhone line-up."
    },
    {
      title: "An efficient image authentication based on hamming code",
      period: "07/2016 — 05/2017",
      description: "This presents the emerging technique for image authentication based on hamming coding by combining Hamming code technique, Torus auto-morphism and bit rotation"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[96px] text-[#f8f7f9] mb-12">
          Projects
        </h2>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              period={project.period}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ title, period, description }: { title: string; period: string; description: string }) {
  return (
    <div className="max-w-4xl relative">
      <div className="pl-8 relative">
        <div className="absolute left-[-9px] top-[12px] w-[15px] h-[15px] bg-white/80 rounded-full backdrop-blur-sm" 
             style={{ filter: 'blur(0.5px)' }} />
        <h3 className="font-['Poppins:ExtraBold',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] mb-1">
          {title}
        </h3>
        <p className="font-['Poppins:ExtraLight',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] mb-3">
          {period}
        </p>
        <p className="font-['Poppins:Medium',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
          {description}
        </p>
      </div>
    </div>
  );
}

function CertificationsSection() {
  const certifications = [
    {
      title: "CERTIFICATION OF BUSINESS CORRESPONDENTS/FACILITATORS",
      year: "2019",
      organization: "Indian Institute of Banking & Finance"
    },
    {
      title: "CERTIFIED SCRUM PRODUCT OWNER®",
      year: "2024",
      organization: "Scrum Alliance®"
    },
    {
      title: "ADVANCE CERTIFIED SCRUM PRODUCT OWNER®",
      year: "2024",
      organization: "Scrum Alliance®"
    }
  ];

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[96px] text-[#f8f7f9] mb-12">
          Certifications
        </h2>
        
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <div key={index} className="max-w-4xl relative">
              <div className="pl-8 relative">
                <div className="absolute left-[-9px] top-[12px] w-[15px] h-[15px] bg-white/80 rounded-full backdrop-blur-sm" 
                     style={{ filter: 'blur(0.5px)' }} />
                <h3 className={`font-['Poppins:ExtraBold',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] mb-1 ${
                  cert.title === "CERTIFICATION OF BUSINESS CORRESPONDENTS/FACILITATORS" ? "whitespace-nowrap" : ""
                }`}>
                  {cert.title}
                </h3>
                <p className="font-['Poppins:ExtraLight',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)] mb-2">
                  {cert.year}
                </p>
                <p className="font-['Poppins:Medium',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)]">
                  {cert.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section id="contacts" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[96px] text-[#f8f7f9] mb-12">
          Contacts
        </h2>
        
        <div className="space-y-4 max-w-4xl">
          <div>
            <span className="font-['Poppins:ExtraBold',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)]">
              Email - 
            </span>
            <span className="font-['Poppins:Medium',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)]">
              neo.maddison17@gmail.com
            </span>
          </div>
          <div>
            <span className="font-['Poppins:ExtraBold',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)]">
              Phone - 
            </span>
            <span className="font-['Poppins:Medium',_sans-serif] text-[24px] text-[rgba(248,247,249,0.5)]">
              +916282587126
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactsSection />
      </main>
    </div>
  );
}