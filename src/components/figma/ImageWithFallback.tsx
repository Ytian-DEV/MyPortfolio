import { useEffect, useState, type CSSProperties, type ImgHTMLAttributes } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjRjhGN0Y5IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=";

const fallbackStyle: CSSProperties = {
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
};

const fallbackImageStyle: CSSProperties = {
  width: "5rem",
  height: "5rem",
  opacity: 0.8,
};

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  onError,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(!src);

  useEffect(() => {
    setDidError(!src);
  }, [src]);

  if (didError) {
    return (
      <div className={className} style={{ ...fallbackStyle, ...style }}>
        <img
          src={ERROR_IMG_SRC}
          alt="Image unavailable"
          style={fallbackImageStyle}
          data-original-url={src}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={(event) => {
        setDidError(true);
        onError?.(event);
      }}
      {...rest}
    />
  );
}
