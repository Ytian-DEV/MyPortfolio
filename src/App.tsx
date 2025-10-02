import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-6sovak61ez";
import localProfileImage from "./assets/myprofile-photo.png";
import amaranthWeb from "./assets/imgURL/amaranth-dvm6.vercel.app.png";
import amaranthScuaa8VNR from "./assets/imgURL/amaranth-scua8-finalreport.jpg";
import amaranthRecap from "./assets/imgURL/amaranth-staff-tribute-and-recap-2024-2025.png";
import amaranthHigayongPambaye from "./assets/imgURL/higayong-pambaye.png";
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
              Hi, I'm Boyles, Christian Earl James N.
            </h2>
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] leading-[0.95] text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              Full-Stack Developer,<br />Video & Photo Editor
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
            style={{ backgroundImage: `url('${localProfileImage}')` }}
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
        <h2 className="text-[32px] md:text-[48px] lg:text-[64px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
          About me
        </h2>
        
        <div className="max-w-4xl">
          <p className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70 leading-[1.7] mb-6 md:mb-8" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            I am a Full-Stack Developer and Multimedia Creator with a unique fusion of technical expertise and visual storytelling. I build dynamic, user-centric web applications using modern technologies like React.js, Next.js, TypeScript, and Tailwind CSS, while also producing high-impact visual content through expert proficiency in the Adobe Suite.
          </p>
          <p className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70 leading-[1.7] mb-6 md:mb-8" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            I have a proven ability to own a project from concept to launch, architecting robust backend systems with MongoDB and Firebase while simultaneously crafting the compelling photo and video narratives that define the user experience. This end-to-end capability ensures that the final product is not only technically sound but also visually engaging and market-ready.
          </p>

          <p className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70 leading-[1.7]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            Certified in Agile methodologies, I am passionate about leveraging this dual skillset to solve complex problems, drive user engagement, and deliver solutions that are both innovative and effective.
          </p>
        </div>

        {/* Education */}
        <div className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
            Education
          </h2>
          <div className="space-y-8 md:space-y-12">
            <div className="max-w-4xl">
              <h4 className="text-[20px] md:text-[24px] lg:text-[26px] text-white mb-2 md:mb-3" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600 }}>
                Visayas State University - Main Campus
              </h4>
              <h5 className="text-[14px] md:text-[18px] lg:text-[20px] text-white mb-2 md:mb-3" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
                August 2022 - Present
              </h5>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white/70 leading-[1.7]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                I am a fourth-year Computer Science student specializing in software and web development, I've found my passion in bringing ideas to life through code. I love crafting modern, user-friendly websites and applications, paying close attention to creating intuitive designs that people actually enjoy using. What excites me most is taking a project from that initial spark of an idea through planning, development, and testing—all the way to launching something that genuinely solves problems and helps users. I'm always eager to roll up my sleeves and contribute to building digital solutions that make a real difference.
              </p>
            </div>

            <div className="max-w-4xl">
              <h4 className="text-[20px] md:text-[24px] lg:text-[26px] text-white mb-2 md:mb-3" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600 }}>
                Ubay National Science High School
              </h4>
              <h5 className="text-[14px] md:text-[18px] lg:text-[20px] text-white mb-2 md:mb-3" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
                June 2016 - July 2022
              </h5>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white/70 leading-[1.7]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                My journey into design began with a dream of becoming an architect, a path I paved by graduating with honors in STEM. While my direction shifted to Computer Science in college—where I also graduated my junior year with honors—my core passion for creating meaningful designs remains. I've simply translated that passion from designing physical structures to crafting digital solutions, using technology to solve social issues and build a better, more connected world.
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
            Experience
          </h2>
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20 hidden md:block"></div>
            
            <div className="space-y-8 md:space-y-10 lg:space-y-12" style={{ fontFamily: 'Jost, sans-serif' }}>
              <ExperienceItem
                title="Full-Stack Developer"
                period="May 2025 — present"
                description="Add description here."
              />
              <ExperienceItem
                title="Front-End Developer"
                period="September 2024 — present"
                description="Add description here."
              />
              <ExperienceItem
                title="UI/UX Designer"
                period= "December 2024 — present"
                description="Add description here."
              />
              <ExperienceItem
                title="Multimedia & Production Head"
                period="August 2025 — present"
                description="Add description here."
              />
              <ExperienceItem
                title='Video Editor'
                period='January 2024 — present'
                description='Add description here.'
              />
              <ExperienceItem
                title='Photo Editor'
                period='January 2024 — present'
                description='Add description here.'
              />
              <ExperienceItem
                title='Photojournalist'
                period='February 2023 — January 2024'
                description='Add description here.'
              />
            </div>
          </div>
        </div>
      </div>
    </section> 
  );
}

function ExperienceItem({ title, period, description }: { title: string; period: string; description: string }) {
  return (
    <div className="max-w-4xl">
      <h4 className="text-[20px] md:text-[24px] lg:text-[26px] text-white mb-2" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600 }}>
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
      title: "Amaranth | Visayas State University Revamped Website",
      period: "August 26 — current",
      description: "Amaranth - VSU's web platform featuring responsive design, interactive campus maps, academic resources, and streamlined information architecture for better user engagement.",
      type: "web",
      link: "https://amaranth-dvm6.vercel.app/",
      imageUrl: amaranthWeb,
      tags: ["Web Development", "Full Stack", "React.js", "Typescript", "TailwindCSS", "Supabase"]
    },
    {
      title: "AMARANTH SCUAA-8 Coverage Final Report",
      period: "December 2024",
      description: "Comprehensive video news report documenting the SCUAA-8 event coverage, featuring highlights from the competition and the culminating awards ceremony. Produced to capture the excitement and achievements of the athletic meet.",
      type: "video",
      videoUrl: "https://youtu.be/L1bbL-iUQMo",
      imageUrl: amaranthScuaa8VNR,
      tags: ["Video Editing", "Video News Report", "Adobe Premiere Pro", "Adobe After Effects"]
    },
    {
      title: "AMARANTH Staff Recap & Tribute 2024-2025",
      period: "July 2025",
      description: "A heartfelt animated tribute video showcasing Amaranth's progress and achievements throughout 2024-2025, celebrating the dedication and contributions of graduating staff members with emotional storytelling and visual artistry.",
      type: "video",
      videoUrl: "https://youtu.be/6tQAIzzpKGY",
      imageUrl: amaranthRecap,
      tags: ["Video Editing", "Animation", "Motion Graphics", "Adobe After Effects"]
    },
    {
      title: "AMARANTH Higayong Pambaye 2025",
      period: "April 2025",
      description: "News coverage of Higayong Pambayi's 3rd annual Women's Month celebration at VSU, showcasing women's empowerment events and activities through professional video reporting and production.",
      type: "video",
      videoUrl: "https://youtu.be/UIityaj5g-E",
      imageUrl: amaranthHigayongPambaye,
      tags: ["Video Editing", "Video News Report", "Adobe Premiere Pro", "Adobe After Effects"]
    },
    {
      title: "Product Photography Enhancement",
      period: "2024",
      description: "Professional photo retouching and enhancement for e-commerce product listings.",
      type: "photo",
      beforeImage: "https://images.unsplash.com/photo-1648536426233-29776d89d6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMHBob3RvJTIwZWRpdGluZ3xlbnwxfHx8fDE3NTkzMTI0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      afterImage: "https://images.unsplash.com/photo-1648536426233-29776d89d6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMHBob3RvJTIwZWRpdGluZ3xlbnwxfHx8fDE3NTkzMTI0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Photo Editing", "Retouching", "Adobe Photoshop"]
    }
  ];

  return (
    <section id="projects" className="py-12 md:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-[32px] md:text-[48px] lg:text-[64px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
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
          fallbackSrc="https://via.placeholder.com/400x300/333/fff?text=Image+Not+Found"
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
                src={`https://www.youtube.com/embed/${getYouTubeId(project.videoUrl)}`}
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
      title: "CERTIFICATION OF Introduction to Data Science",
      year: "2025",
      organization: "Networking Academy through the Cisco Networking Academy program"
    },
    {
      title: "Certification of Data Science: R Basics",
      year: "2025",
      organization: "Harvard EdX HarvardX PH125.1x"
    }
  ];

  return (
    <section id="certifications" className="py-12 md:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-[32px] md:text-[48px] lg:text-[64px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
          Certifications
        </h2>
        
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {certifications.map((cert, index) => (
            <div key={index} className="max-w-4xl relative">
              <div className="pl-6 md:pl-10 relative">
                <div className="absolute left-[-6px] md:left-[-8px] top-[10px] md:top-[12px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                <h3 className={`text-[18px] md:text-[24px] lg:text-[26px] text-white mb-2 ${
                  cert.title === "CERTIFICATION OF BUSINESS CORRESPONDENTS/FACILITATORS" ? "md:whitespace-nowrap" : ""
                }`} style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600 }}>
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
        <h2 className="text-[32px] md:text-[48px] lg:text-[64px] text-white mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
          Contacts
        </h2>
        
        <div className="space-y-4 md:space-y-6 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0">
            <span className="text-[18px] md:text-[20px] lg:text-[22px] text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
              Email:  
            </span>
            <span className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70 break-all" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
               christianboyles0143@gmail.com
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0">
            <span className="text-[18px] md:text-[20px] lg:text-[22px] text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
              Phone: 
            </span>
            <span className="text-[16px] md:text-[20px] lg:text-[22px] text-white/70" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
               +63 915 211 1698
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

function getYouTubeId(url: string) {
            // Handles various YouTube URL formats
            const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            return match ? match[1] : url;
          }