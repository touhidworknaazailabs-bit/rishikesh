"use client";

import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import PropertyImage from "./PropertyImage";
import { GalleryCategory, GalleryImage, galleryCategories } from "@/data/gallery";

/**
 * Editorial, asymmetric grid — a deliberate mix of large, wide and standard
 * tiles on a 4-column track, rather than an equal-sized grid or a near-
 * uniform CSS-column masonry. `featured` images become a large 2x2 block;
 * every third standard image becomes a wide 2x1 block; everything else is
 * a plain 1x1 tile. The rhythm (large, then a run of small, then wide)
 * repeats down the page instead of settling into one pattern.
 */
function tileSpan(img: GalleryImage, indexAmongStandard: number): string {
  if (img.featured) return "col-span-2 row-span-2 aspect-square";
  if (indexAmongStandard % 5 === 3) return "col-span-2 aspect-[2/1]";
  return "aspect-square";
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Precomputed with a pure reduce (no mutation during render) so each
  // standard (non-featured) tile knows its own position in that
  // sub-sequence, for the "every 5th standard tile is wide" rhythm above.
  const standardIndexByPosition = filtered.reduce<number[]>((acc, img) => {
    const prevCount = acc.length > 0 ? acc[acc.length - 1] : -1;
    acc.push(img.featured ? prevCount : prevCount + 1);
    return acc;
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10">
        {(["All", ...galleryCategories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={clsx(
              "px-4 py-2 rounded-full text-xs tracking-[0.15em] border transition-colors",
              filter === cat
                ? "bg-charcoal text-ivory border-charcoal"
                : "border-charcoal/20 text-charcoal/70 hover:border-charcoal"
            )}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[minmax(0,1fr)]">
        {filtered.map((img, i) => (
            <motion.button
              key={img.src + i}
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                "relative block w-full overflow-hidden rounded-xl group",
                tileSpan(img, standardIndexByPosition[i])
              )}
            >
              <PropertyImage
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
            </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && filtered[activeIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-charcoal/95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX;
              if (delta > 50) prev();
              if (delta < -50) next();
              setTouchStartX(null);
            }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 text-ivory p-2 hover:opacity-70 z-10"
            >
              <img src="/icons/x-ivory.svg" className="size-7" alt="" />
            </button>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 md:left-6 text-ivory p-2 hover:opacity-70 z-10"
            >
              <img src="/icons/chevron-left-ivory.svg" className="size-8" alt="" />
            </button>
            <div className="relative w-[85vw] h-[75vh] max-w-4xl overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={filtered[activeIndex].src}
                  custom={direction}
                  initial={{ opacity: 0, x: 40 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 * direction }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <PropertyImage
                    src={filtered[activeIndex].src}
                    alt={filtered[activeIndex].alt}
                    fill
                    sizes="85vw"
                    objectFit="contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 md:right-6 text-ivory p-2 hover:opacity-70 z-10"
            >
              <img src="/icons/chevron-right-ivory.svg" className="size-8" alt="" />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/70 text-xs">
              {activeIndex + 1} / {filtered.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
