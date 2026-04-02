import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "../../portfolioContent";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProjectCarouselProps {
  heading: string;
  description: string;
  emptyMessage: string;
  items: Project[];
  onProjectSelect: (project: Project) => void;
}

export function ProjectCarousel({
  heading,
  description,
  emptyMessage,
  items,
  onProjectSelect,
}: ProjectCarouselProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const updateState = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateState();
    emblaApi.on("reInit", updateState);
    emblaApi.on("select", updateState);

    return () => {
      emblaApi.off("reInit", updateState);
      emblaApi.off("select", updateState);
    };
  }, [emblaApi]);

  return (
    <section className="project-shelf panel-frame">
      <div className="project-shelf__header">
        <div className="project-shelf__intro">
          <p className="project-shelf__count">
            {items.length} {items.length === 1 ? "project" : "projects"}
          </p>
          <h3>{heading}</h3>
          <p>{description}</p>
        </div>

        <div className="project-shelf__controls" aria-label={`${heading} carousel controls`}>
          <button
            type="button"
            className="project-shelf__control"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label={`Scroll ${heading} projects left`}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="project-shelf__control"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label={`Scroll ${heading} projects right`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="project-shelf__viewport" ref={viewportRef}>
          <div className="project-shelf__track">
            {items.map((project) => (
              <article
                className="project-shelf__slide"
                key={`${project.type}-${project.title}-${project.period}`}
              >
                <button
                  type="button"
                  className="project-teaser"
                  onClick={() => onProjectSelect(project)}
                >
                  <div className="project-teaser__media">
                    <ImageWithFallback
                      src={project.imageUrl || project.beforeImage || ""}
                      alt={project.title}
                      className="project-teaser__image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="project-teaser__shade" />
                  </div>

                  <div className="project-teaser__body">
                    <div className="project-teaser__meta">
                      <span className="project-teaser__type">
                        {getProjectTypeLabel(project.type)}
                      </span>
                      <span className="project-teaser__period">{project.period}</span>
                    </div>

                    <h4 className="project-teaser__title">{project.title}</h4>
                    <p className="project-teaser__summary">{project.summary}</p>

                    <div className="tag-list">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span className="tag" key={`${project.title}-${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-teaser__footer">
                      <span className="project-teaser__cta">View details</span>
                      <ArrowUpRight className="project-teaser__cta-icon" />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">{emptyMessage}</div>
      )}
    </section>
  );
}

function getProjectTypeLabel(type: Project["type"]) {
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
