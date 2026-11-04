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
 * Thin wrapper around next/image. All placeholder art today is SVG (see
 * /public/images/README.md) — next/image serves those unoptimized (SVGs
 * can't be re-encoded to WebP/AVIF anyway) but still gets lazy-loading,
 * layout-stable sizing and the same API real photos will use once they
 * replace the placeholders.
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

  // Next's default re-encode quality (75) visibly softens already-modest
  // source photography. These are small, well-optimized JPEGs to begin
  // with, so a higher quality budget is worth the small size increase.
  const quality = 90;

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
