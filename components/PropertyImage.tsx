import Image from "next/image";
import clsx from "clsx";

type PropertyImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain";
};

/**
 * Thin wrapper around next/image with lazy-loading and layout-stable sizing.
 * SVG sources are served unoptimized; photos go through the image optimizer.
 */
export default function PropertyImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  objectFit = "cover",
}: PropertyImageProps) {
  const isSvg = src.endsWith(".svg");
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  // Slightly above Next's default (75), which softens modest source photos;
  // must stay in the allow-list in next.config.ts.
  const quality = 80;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        priority={priority}
        unoptimized={isSvg}
        quality={quality}
        className={clsx(fitClass, className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1200}
      height={height || 900}
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg}
      quality={quality}
      className={clsx(fitClass, className)}
    />
  );
}
