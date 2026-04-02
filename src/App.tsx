import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import localProfileImage from "./assets/myprofile-photo1.jpg";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { CircularGallery } from "./components/ui/circular-gallery";
import { ProjectCarousel } from "./components/ui/project-carousel";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  NAV_ITEMS,
  PHOTO_GALLERY_ITEMS,
  PROJECT_GROUPS,
  PROJECTS,
  SKILLS,
  type PhotoGalleryItem,
  type Project,
  type ProjectType,
  type SectionId,
} from "./portfolioContent";

function Icon({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg className={className || "icon-svg"} viewBox="0 0 24 24" fill="none">
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

function HeroSection({
  onProjectsClick,
}: {
  onProjectsClick: () => void;
}) {
  return (
    <section id="home" className="section-anchor hero-section">
      <div className="hero-shell hero-shell--portrait">
        <div className="hero-showcase">
          <div className="hero-name-stack" aria-label="Christian Boyles">
            <h1 className="hero-name-line">CHRISTIAN</h1>
            <h1 className="hero-name-line">BOYLES</h1>

            <div className="hero-photo-frame">
              <ImageWithFallback
                src={localProfileImage}
                alt="Portrait of Christian Boyles"
                className="hero-photo"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <p className="hero-role">
            Full-stack developer and multimedia creator.
          </p>

          <button
            type="button"
            className="hero-scroll"
            onClick={onProjectsClick}
            aria-label="Scroll to projects"
          >
            <Icon path="M6 9L12 15L18 9" />
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-anchor">
      <div className="section-panel">
        <SectionHeading
          eyebrow="About"
          title="A technical foundation shaped by design and storytelling."
          description="I enjoy building products that feel practical, polished, and easy to understand - both in code and in presentation."
        />

        <div className="about-layout">
          <div className="about-layout__primary">
            <article className="panel-frame section-card">
              <div className="copy-stack">
                <p>
                  I work across web development, UI/UX design, and multimedia
                  production. That combination helps me think beyond isolated
                  screens and toward the full product experience: structure,
                  usability, visual clarity, and how people connect with the
                  final result.
                </p>
                <p>
                  On the development side, I focus on React-based frontends and
                  modern full-stack workflows. On the creative side, I use Figma
                  and Adobe tools to translate ideas into interfaces, content, and
                  visual systems that feel intentional instead of improvised.
                </p>
                <p>
                  I am especially motivated by projects that need both solid
                  engineering and a strong sense of presentation.
                </p>
              </div>

              <div className="skill-list">
                {SKILLS.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>

            <article className="panel-frame section-card">
              <h3 className="subsection-title">Education</h3>
              <div className="detail-list">
                {EDUCATION.map((item) => (
                  <div className="detail-card" key={item.title}>
                    <p className="detail-period">{item.period}</p>
                    <h4>{item.title}</h4>
                    <p className="detail-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="about-layout__secondary">
            <article className="panel-frame section-card">
              <h3 className="subsection-title">Experience</h3>
              <div className="detail-list">
                {EXPERIENCE.map((item) => (
                  <div className="detail-card" key={`${item.title}-${item.period}`}>
                    <p className="detail-period">{item.period}</p>
                    <h4>{item.title}</h4>
                    <p className="detail-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({
  onProjectSelect,
}: {
  onProjectSelect: (project: Project) => void;
}) {
  return (
    <section id="projects" className="section-anchor">
      <div className="section-panel">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects across interfaces, frontend development, and media production."
          description="Each card opens a cleaner detail view so visitors can browse the work without getting lost."
        />

        <div className="project-groups">
          {PROJECT_GROUPS.map((group) => {
            if (group.type === "photo") {
              return (
                <PhotoShowcaseSection
                  key={group.type}
                  heading={group.title}
                  items={PHOTO_GALLERY_ITEMS}
                />
              );
            }

            const groupProjects = PROJECTS.filter(
              (project) => project.type === group.type,
            );

            return (
              <ProjectCarousel
                key={group.type}
                heading={group.title}
                description={group.copy}
                emptyMessage={group.emptyMessage}
                items={groupProjects}
                onProjectSelect={onProjectSelect}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhotoShowcaseSection({
  heading,
  items,
}: {
  heading: string;
  items: PhotoGalleryItem[];
}) {
  return (
    <section className="project-shelf project-shelf--photo panel-frame">
      <div className="project-shelf__header">
        <div className="project-shelf__intro">
          <h3>{heading}</h3>
        </div>
      </div>

      <div className="photo-showcase">
        <div className="photo-showcase__stage">
          <CircularGallery items={items} />
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section id="certifications" className="section-anchor">
      <div className="section-panel">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications that support the technical side of the portfolio."
        />

        <div className="cert-grid">
          {CERTIFICATIONS.map((cert) => (
            <article className="panel-frame cert-card" key={cert.title}>
              <p className="detail-period">{cert.year}</p>
              <h3>{cert.title}</h3>
              <p className="detail-description">{cert.organization}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-anchor">
      <div className="panel-frame contact-panel">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>Let's build something thoughtful and well presented.</h2>
          <p className="section-description">
            If you need someone who can design, develop, and shape the visual
            delivery around the work, you can reach me here.
          </p>
        </div>

        <div className="contact-list">
          <a
            className="contact-card"
            href="mailto:christianboyles0143@gmail.com"
          >
            <span className="contact-card__icon">
              <Icon path="M4 7.5H20V16.5H4V7.5ZM5 8.5L12 13.5L19 8.5" />
            </span>
            <span className="contact-card__label">Email</span>
            <span className="contact-card__value">
              christianboyles0143@gmail.com
            </span>
          </a>

          <a className="contact-card" href="tel:+639152111698">
            <span className="contact-card__icon">
              <Icon path="M15.5 14.5L13.8 16.2C10.6 14.6 8.4 12.4 6.8 9.2L8.5 7.5C8.8 7.2 8.9 6.8 8.8 6.4L8.1 3.5C8 3 7.6 2.7 7.1 2.7H4.5C3.9 2.7 3.4 3.2 3.4 3.8C3.4 13.5 11.2 21.3 20.9 21.3C21.5 21.3 22 20.8 22 20.2V17.6C22 17.1 21.7 16.7 21.2 16.6L18.3 15.9C17.9 15.8 17.5 15.9 17.2 16.2" />
            </span>
            <span className="contact-card__label">Phone</span>
            <span className="contact-card__value">+63 915 211 1698</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryImages = project.images && project.images.length > 0
    ? project.images
    : project.imageUrl
      ? [project.imageUrl]
      : [];

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (galleryImages.length > 1 && event.key === "ArrowRight") {
        setCurrentImageIndex((current) => (current + 1) % galleryImages.length);
      }

      if (galleryImages.length > 1 && event.key === "ArrowLeft") {
        setCurrentImageIndex((current) =>
          current === 0 ? galleryImages.length - 1 : current - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryImages.length, onClose]);

  const primaryHref = project.videoUrl || project.link;
  const primaryLabel = project.type === "video"
    ? "Watch project"
    : project.type === "uiux"
      ? "Open prototype"
      : "View live project";

  const videoPlatform = project.videoUrl ? getVideoPlatform(project.videoUrl) : null;
  const canAdvanceGallery = galleryImages.length > 1;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <Icon path="M6 6L18 18M18 6L6 18" />
        </button>

        <div className="modal-header">
          <p className="eyebrow">{getProjectTypeLabel(project.type)}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="project-card__period">{project.period}</p>
        </div>

        {project.type === "video" && project.videoUrl ? (
          <div className="media-frame">
            {videoPlatform === "youtube" ? (
              <div className="video-frame">
                <iframe
                  src={getYouTubeEmbedUrl(project.videoUrl)}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="external-media">
                <ImageWithFallback
                  src={project.imageUrl || ""}
                  alt={project.title}
                  className="external-media__image"
                  loading="lazy"
                  decoding="async"
                />
                <p className="helper-text">
                  This video is hosted on an external platform, so the portfolio
                  opens it as a separate link instead of forcing a broken embed.
                </p>
              </div>
            )}
          </div>
        ) : null}

        {project.type === "photo" &&
        project.beforeImage &&
        project.afterImage ? (
          <div className="before-after-grid">
            <div className="media-frame">
              <p className="media-label">Before</p>
              <ImageWithFallback
                src={project.beforeImage}
                alt={`${project.title} before`}
                className="comparison-image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="media-frame">
              <p className="media-label">After</p>
              <ImageWithFallback
                src={project.afterImage}
                alt={`${project.title} after`}
                className="comparison-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ) : null}

        {project.type !== "video" && project.type !== "photo" && galleryImages.length > 0 ? (
          <div className="gallery">
            <div className="media-frame gallery-stage">
              <ImageWithFallback
                src={galleryImages[currentImageIndex]}
                alt={`${project.title} preview ${currentImageIndex + 1}`}
                className="gallery-image"
                loading="lazy"
                decoding="async"
              />

              {canAdvanceGallery ? (
                <>
                  <button
                    type="button"
                    className="gallery-nav gallery-nav--left"
                    onClick={() =>
                      setCurrentImageIndex((current) =>
                        current === 0 ? galleryImages.length - 1 : current - 1,
                      )
                    }
                    aria-label="Show previous image"
                  >
                    <Icon path="M15 6L9 12L15 18" />
                  </button>
                  <button
                    type="button"
                    className="gallery-nav gallery-nav--right"
                    onClick={() =>
                      setCurrentImageIndex(
                        (current) => (current + 1) % galleryImages.length,
                      )
                    }
                    aria-label="Show next image"
                  >
                    <Icon path="M9 6L15 12L9 18" />
                  </button>
                  <div className="gallery-counter">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </div>
                </>
              ) : null}
            </div>

            {canAdvanceGallery ? (
              <div className="thumbnail-row">
                {galleryImages.map((image, index) => (
                  <button
                    type="button"
                    key={`${project.title}-thumb-${index + 1}`}
                    className={`thumbnail-button${
                      currentImageIndex === index ? " is-active" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="thumbnail-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="copy-stack">
          {project.details ? project.details : <p>{project.summary}</p>}
        </div>

        <div className="tag-list tag-list--large">
          {project.tags.map((tag) => (
            <span className="tag" key={`${project.title}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>

        {primaryHref ? (
          <a
            className="button button--primary modal-action"
            href={primaryHref}
            target="_blank"
            rel="noreferrer"
          >
            {primaryLabel}
            <ExternalLink className="button-icon" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!("IntersectionObserver" in window) || sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id as SectionId);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileNavOpen]);

  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
      setMobileNavOpen(false);
    }
  };

  return (
    <div className="site-app">
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-glow site-glow--gold" />
        <div className="site-glow site-glow--blue" />
        <div className="site-grid" />
      </div>

      <div className="floating-nav">
        <button
          type="button"
          className={`floating-nav__toggle${
            mobileNavOpen ? " is-open" : ""
          }`}
          onClick={() => setMobileNavOpen((open) => !open)}
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileNavOpen}
          aria-controls="side-menu"
        >
          {mobileNavOpen ? (
            <Icon path="M6 6L18 18M18 6L6 18" />
          ) : (
            <Icon path="M4 7H20M4 12H20M4 17H20" />
          )}
        </button>

        <button
          type="button"
          className="floating-nav__mark"
          onClick={() => scrollToSection("home")}
          aria-label="Back to home"
        >
          CB
        </button>
      </div>

      {mobileNavOpen ? (
        <div className="menu-overlay" id="side-menu">
          <nav className="menu-overlay__nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`menu-overlay__link${
                  activeSection === item.id ? " is-active" : ""
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      ) : null}

      <main className="site-main">
        <HeroSection onProjectsClick={() => scrollToSection("projects")} />
        <AboutSection />
        <ProjectsSection onProjectSelect={setSelectedProject} />
        <CertificationsSection />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <p>Portfolio of Christian Boyles - designed to be cleaner, more stable, and easier to browse.</p>
      </footer>

      {selectedProject ? (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </div>
  );
}

function getProjectTypeLabel(type: ProjectType) {
  switch (type) {
    case "web":
      return "Web/App";
    case "video":
      return "Video";
    case "photo":
      return "Photo";
    default:
      return "UI/UX";
  }
}

function getVideoPlatform(url: string) {
  const normalized = url.toLowerCase();
  if (normalized.includes("youtube.com") || normalized.includes("youtu.be")) {
    return "youtube";
  }
  if (normalized.includes("facebook.com")) {
    return "facebook";
  }
  return "external";
}

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
  );
  const videoId = match ? match[1] : url;
  return `https://www.youtube.com/embed/${videoId}`;
}
