import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import type { CSSProperties } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export interface CircularGalleryItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  position?: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: CircularGalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

export const CircularGallery = forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    { items, className, radius = 250, autoRotateSpeed = 0.025, ...props },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setRotation(scrollProgress * 220);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation((current) => current + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed, isScrolling]);

    if (items.length === 0) {
      return null;
    }

    const maxItemsPerRing = items.length > 60 ? 18 : items.length > 24 ? 14 : 10;
    const ringCount = Math.ceil(items.length / maxItemsPerRing);
    const verticalSpacing = ringCount > 1 ? Math.min(88, 320 / (ringCount - 1)) : 0;
    const ringOffsetCenter = (ringCount - 1) / 2;
    const rings = Array.from({ length: ringCount }, (_, ringIndex) =>
      items.slice(
        ringIndex * maxItemsPerRing,
        ringIndex * maxItemsPerRing + maxItemsPerRing,
      ),
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Photo gallery"
        className={cn("circular-gallery", className)}
        {...props}
      >
        <div
          className="circular-gallery__ring"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {rings.flatMap((ringItems, ringIndex) => {
            const anglePerItem = 360 / ringItems.length;
            const verticalOffset = (ringIndex - ringOffsetCenter) * verticalSpacing;
            const ringRadius = radius + (ringIndex % 2 === 0 ? 0 : 36);
            const phaseOffset = ringIndex % 2 === 0 ? 0 : anglePerItem / 2;

            return ringItems.map((item, itemIndex) => {
              const itemAngle = phaseOffset + itemIndex * anglePerItem;
              const totalRotation = rotation % 360;
              const relativeAngle = (itemAngle + totalRotation + 360) % 360;
              const normalizedAngle = Math.abs(
                relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
              );
              const opacity = Math.max(0.24, 1 - normalizedAngle / 170);
              const scale = 0.78 + (1 - normalizedAngle / 180) * 0.24;
              const cardStyle = {
                transform:
                  `translateY(${verticalOffset}px) rotateY(${itemAngle}deg) translateZ(${ringRadius}px) scale(${scale})`,
                opacity,
              } as CSSProperties;

              return (
                <div
                  key={item.id}
                  role="group"
                  aria-label={item.title}
                  className="circular-gallery__item"
                  style={cardStyle}
                >
                  <article className="circular-gallery__card">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.title}
                      className="circular-gallery__image"
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: item.position || "center" }}
                    />
                  </article>
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";
