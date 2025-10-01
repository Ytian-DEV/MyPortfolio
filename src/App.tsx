import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-6sovak61ez";
import imgAdobeExpressFile31 from "figma:asset/7ba16f5335969b66c314f7955ee4897ab548acd6.png";
import { ExternalLink, Play, Image as ImageIcon, Code } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setMobileMenuOpen(false);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[16px] xl:text-[18px] tracking-wide transition-all duration-300 ${
                  activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="h-11 w-px bg-white/30" />
            <div className="flex gap-6">
              <SocialIcon type="instagram" />
              <SocialIcon type="twitter" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 border-t border-white/20 pt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-[16px] tracking-wide transition-all duration-300 ${
                  activeSection === item.id ? 'text-white' : 'text-white/60'
                }`}
                style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-6 pt-4">
              <SocialIcon type="instagram" />
              <SocialIcon type="twitter" />
            </div>
          </div>
        )}
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
    <button className="text-white hover:text-white/70 transition-colors duration-300">
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
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 md:pt-0">
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

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center py-8 md:py-0">
        {/* Left content */}
        <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-[14px] md:text-[18px] lg:text-[20px] text-white tracking-[0.2em] md:tracking-[0.3em] uppercase" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 200 }}>
              HI, I'M NEERAJ
            </h2>
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] leading-[0.95] text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              I'M A PRODUCT<br />MANAGER
            </h1>
          </div>
          
          <button 
            onClick={scrollToProjects}
            className="group border-2 border-white px-6 md:px-10 py-3 md:py-5 transition-all duration-300 hover:bg-white hover:text-black"
          >
            <span className="text-[16px] md:text-[20px] text-white group-hover:text-black transition-colors duration-300 tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
              VIEW MY PROJECTS
            </span>
          </button>
        </div>

        {/* Right content - Profile image */}
        <div className="relative order-1 lg:order-2 mt-8 md:mt-0">
          <div
            className="w-full h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url('${imgAdobeExpressFile31}')` }}
          />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-[48px] md:text-[72px] lg:text-[96px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          About me
        </h2>
        
        <div className="max-w-4xl">
          <p className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70 leading-[1.7] mb-6 md:mb-8" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            I'm Dynamic and results-driven Senior Business Development Associate with a robust background in sales, client relations, and Agile product management.
          </p>
          <p className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70 leading-[1.7]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            I have a proven track record of exceeding targets, driving revenue growth, and leading high-performing teams. Experienced in utilizing data analytics, market research, and innovative strategies to achieve business objectives. Certified Scrum Product Owner (CSPO) with advanced expertise in Agile methodologies, product backlog management, and sprint planning. Passionate about continuous improvement and delivering customer-centric solutions that drive operational efficiency and market success.
          </p>
        </div>

        {/* Education */}
        <div className="mt-12 md:mt-16 lg:mt-20">
          <h3 className="text-[14px] md:text-[16px] lg:text-[18px] text-white mb-6 md:mb-8 lg:mb-10 tracking-[0.2em] md:tracking-[0.3em] uppercase" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
            EDUCATION
          </h3>
          <div className="max-w-4xl">
            <h4 className="text-[20px] md:text-[24px] lg:text-[26px] text-white mb-2 md:mb-3" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
              National Institute of Technology Puducherry
            </h4>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white/70 leading-[1.7]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
              I hold a Bachelor of Technology degree in Electronics and Communications from National Institute of Technology Puducherry, with a cumulative GPA of 5.29/10.0. My education has equipped me with a solid foundation in technical skills and problem-solving
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-12 md:mt-16 lg:mt-20">
          <h3 className="text-[14px] md:text-[16px] lg:text-[18px] text-white mb-6 md:mb-8 lg:mb-10 tracking-[0.2em] md:tracking-[0.3em] uppercase" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
            Experience
          </h3>
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
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
      <h4 className="text-[20px] md:text-[24px] lg:text-[26px] text-white mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
        {title}
      </h4>
      <p className="text-[14px] md:text-[16px] lg:text-[18px] text-white/50 mb-3 md:mb-4 tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 200 }}>
        {period}
      </p>
      <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white/70 leading-[1.7]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
        {description}
      </p>
    </div>
  );
}

type ProjectType = 'web' | 'video' | 'photo' | 'product' | 'analysis';

interface Project {
  title: string;
  period: string;
  description: string;
  type: ProjectType;
  link?: string;
  videoUrl?: string;
  imageUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  tags?: string[];
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Energic - EV Charging Station Management",
      period: "07/2024 — current",
      description: "Comprehensive CSMS platform for real-time station management, scheduling, and maintenance alerts.",
      type: "web",
      link: "https://example.com/energic", // Replace with actual link
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU5MjgwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Web Development", "Full Stack", "React"]
    },
    {
      title: "Commercial Video Production",
      period: "2024",
      description: "Professional video editing and color grading for brand commercials and promotional content.",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video
      imageUrl: "https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzU5MjM5OTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Video Editing", "Color Grading", "Motion Graphics"]
    },
    {
      title: "Product Photography Enhancement",
      period: "2024",
      description: "Professional photo retouching and enhancement for e-commerce product listings.",
      type: "photo",
      beforeImage: "https://images.unsplash.com/photo-1648536426233-29776d89d6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMHBob3RvJTIwZWRpdGluZ3xlbnwxfHx8fDE3NTkzMTI0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      afterImage: "https://images.unsplash.com/photo-1648536426233-29776d89d6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMHBob3RvJTIwZWRpdGluZ3xlbnwxfHx8fDE3NTkzMTI0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Photo Editing", "Retouching", "Adobe Photoshop"]
    },
    {
      title: "Online Grocery Platform Roadmap",
      period: "06/2024 — 07/2024",
      description: "12-month product roadmap focusing on growth, customer satisfaction, and market leadership.",
      type: "product",
      imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1OTMxMjQxNnww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Product Management", "Strategy", "Roadmap"]
    },
    {
      title: "IPL Best XI Analytics",
      period: "05/2023 — 07/2023",
      description: "Python-based data analysis to determine optimal playing XI across all IPL teams using statistical modeling.",
      type: "analysis",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU5MjgwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Python", "Data Analysis", "Sports Analytics"]
    },
    {
      title: "Financial Analysis Dashboard",
      period: "02/2023 — 04/2023",
      description: "5-year financial statement analysis with trend identification and industry benchmarking.",
      type: "analysis",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU5MjgwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Financial Analysis", "Excel", "Business Intelligence"]
    }
  ];

  return (
    <section id="projects" className="py-12 md:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-[48px] md:text-[72px] lg:text-[96px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const getIcon = () => {
    switch (project.type) {
      case 'web':
        return <Code className="w-5 h-5" />;
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'photo':
        return <ImageIcon className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white/5 border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/30"
    >
      {/* Image */}
      <div className="relative h-[200px] md:h-[240px] overflow-hidden bg-black">
        <ImageWithFallback
          src={project.imageUrl || project.beforeImage || ''}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2.5 border border-white/20">
          {getIcon()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[18px] md:text-[20px] text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
            {project.title}
          </h3>
        </div>
        
        <p className="text-[12px] md:text-[14px] text-white/40 mb-3 tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 200 }}>
          {project.period}
        </p>
        
        <p className="text-[14px] md:text-[15px] text-white/60 leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 text-white/70"
                style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-black border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2.5 border border-white/30 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 md:p-10">
          <h2 className="text-[32px] md:text-[48px] text-white mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            {project.title}
          </h2>
          
          <p className="text-[14px] md:text-[16px] text-white/50 mb-6 tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 200 }}>
            {project.period}
          </p>

          {/* Media Content */}
          {project.type === 'video' && project.videoUrl && (
            <div className="mb-8 aspect-video bg-black border border-white/10">
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {project.type === 'photo' && project.beforeImage && project.afterImage && (
            <div className="mb-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[14px] text-white/70 mb-2 tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>BEFORE</p>
                  <ImageWithFallback
                    src={project.beforeImage}
                    alt="Before"
                    className="w-full h-auto border border-white/10"
                  />
                </div>
                <div>
                  <p className="text-[14px] text-white/70 mb-2 tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>AFTER</p>
                  <ImageWithFallback
                    src={project.afterImage}
                    alt="After"
                    className="w-full h-auto border border-white/10"
                  />
                </div>
              </div>
            </div>
          )}

          {(project.type === 'web' || project.type === 'product' || project.type === 'analysis') && project.imageUrl && (
            <div className="mb-8">
              <ImageWithFallback
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto border border-white/10"
              />
            </div>
          )}

          {/* Description */}
          <p className="text-[16px] md:text-[18px] text-white/70 leading-[1.7] mb-8" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && (
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[13px] px-4 py-2 bg-white/5 border border-white/20 text-white"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-white px-8 py-4 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="text-[16px] tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                VIEW LIVE PROJECT
              </span>
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
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
    <section id="certifications" className="py-12 md:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-[48px] md:text-[72px] lg:text-[96px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          Certifications
        </h2>
        
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {certifications.map((cert, index) => (
            <div key={index} className="max-w-4xl relative">
              <div className="pl-6 md:pl-10 relative">
                <div className="absolute left-[-6px] md:left-[-8px] top-[10px] md:top-[12px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                <h3 className={`text-[18px] md:text-[24px] lg:text-[26px] text-white mb-2 ${
                  cert.title === "CERTIFICATION OF BUSINESS CORRESPONDENTS/FACILITATORS" ? "md:whitespace-nowrap" : ""
                }`} style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                  {cert.title}
                </h3>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] text-white/50 mb-2 md:mb-3 tracking-wider" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 200 }}>
                  {cert.year}
                </p>
                <p className="text-[15px] md:text-[18px] lg:text-[20px] text-white/70" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
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
    <section id="contacts" className="py-12 md:py-20 lg:py-24 pb-16 md:pb-24 lg:pb-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-[48px] md:text-[72px] lg:text-[96px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          Contacts
        </h2>
        
        <div className="space-y-4 md:space-y-6 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0">
            <span className="text-[18px] md:text-[20px] lg:text-[22px] text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
              Email - 
            </span>
            <span className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70 break-all" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
              neo.maddison17@gmail.com
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0">
            <span className="text-[18px] md:text-[20px] lg:text-[22px] text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
              Phone - 
            </span>
            <span className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
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
    <div className="bg-[#000000] min-h-screen text-white" style={{ fontFamily: 'Jost, sans-serif' }}>
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