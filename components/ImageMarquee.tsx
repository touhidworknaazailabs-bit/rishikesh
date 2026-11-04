import PropertyImage from "./PropertyImage";

type MarqueeImage = { src: string; alt: string };

/**
 * A slow, continuous horizontal strip of photos — pauses on hover, respects
 * prefers-reduced-motion (globally disabled via globals.css). Pure CSS
 * animation, no JS needed, so this stays a server component.
 */
// The base --animate-marquee timing (38s) was tuned for an 8-image strip.
// Scrolling a longer list at that same fixed duration would speed the whole
// strip up (more content, same time to cover it) — so duration scales with
// the image count to keep a constant, calm per-photo pace regardless of
// how many photos are passed in.
const SECONDS_PER_IMAGE = 38 / 8;

export default function ImageMarquee({ images }: { images: MarqueeImage[] }) {
  // Duplicate the list so the loop is seamless.
  const loop = [...images, ...images];
  const duration = `${(images.length * SECONDS_PER_IMAGE).toFixed(1)}s`;

  return (
    <div className="group relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: duration }}
      >
        {loop.map((img, i) => (
          <div key={`${img.src}-${i}`} className="relative h-48 w-64 md:h-64 md:w-80 shrink-0 overflow-hidden rounded-xl">
            <PropertyImage src={img.src} alt={img.alt} fill sizes="320px" />
          </div>
        ))}
      </div>
    </div>
  );
}
