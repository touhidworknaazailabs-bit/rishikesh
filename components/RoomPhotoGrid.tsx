"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropertyImage from "./PropertyImage";
import { RoomImage } from "@/data/rooms";

/**
 * Room detail page's photo block: the same big+two-small editorial grid as
 * before, but every tile now opens a full-screen viewer over ALL of the
 * room's photos (not just the 3 shown in the grid), with keyboard/swipe
 * navigation — matching the gallery page's lightbox pattern.
 */
export default function RoomPhotoGrid({ images, roomName }: { images: RoomImage[]; roomName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

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

  return (
    <>
      <section className="container-editorial mt-8 grid md:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          aria-label={`View ${roomName} photos, full-screen`}
          className="group md:col-span-2 relative aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-2xl block"
        >
          <PropertyImage
            src={images[0].src}
            alt={images[0].alt}
            fill
            priority
            sizes="(min-width: 768px) 66vw, 100vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <PhotoHint count={images.length} />
        </button>
        <div className="grid grid-rows-2 gap-2">
          {images.slice(1, 3).map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(i + 1)}
              aria-label={`View ${roomName} photos, full-screen`}
              className="group relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-2xl block"
            >
              <PropertyImage
                src={img.src}
                alt={img.alt}
                fill
                sizes="33vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              {i === 1 && images.length > 3 && (
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/50 text-ivory text-sm font-medium tracking-wide">
                  +{images.length - 3} more
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-charcoal/95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`${roomName} photos`}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX;
              if (delta > 50) prev();
              if (delta < -50) next();
              setTouchStartX(null);
            }}
          >
            <button onClick={close} aria-label="Close" className="absolute top-5 right-5 text-ivory p-2 hover:opacity-70 z-10">
              <img src="/icons/x-ivory.svg" className="size-7" alt="" />
            </button>
            {images.length > 1 && (
              <button onClick={prev} aria-label="Previous image" className="absolute left-2 md:left-6 text-ivory p-2 hover:opacity-70 z-10">
                <img src="/icons/chevron-left-ivory.svg" className="size-8" alt="" />
              </button>
            )}
            <div className="relative w-[85vw] h-[75vh] max-w-4xl overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={images[activeIndex].src}
                  custom={direction}
                  initial={{ opacity: 0, x: 40 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 * direction }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <PropertyImage src={images[activeIndex].src} alt={images[activeIndex].alt} fill sizes="85vw" objectFit="contain" />
                </motion.div>
              </AnimatePresence>
            </div>
            {images.length > 1 && (
              <button onClick={next} aria-label="Next image" className="absolute right-2 md:right-6 text-ivory p-2 hover:opacity-70 z-10">
                <img src="/icons/chevron-right-ivory.svg" className="size-8" alt="" />
              </button>
            )}
            {images.length > 1 && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/70 text-xs">
                {activeIndex + 1} / {images.length}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PhotoHint({ count }: { count: number }) {
  return (
    <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md bg-ivory/95 text-charcoal text-[11px] tracking-[0.14em] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <img src="/icons/expand-charcoal.svg" className="size-3.5" alt="" aria-hidden />
      VIEW ALL {count} PHOTOS
    </span>
  );
}
