"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import PropertyImage from "./PropertyImage";
import { RoomImage } from "@/data/rooms";

const TILT_DEGREES = 6;

/**
 * Room card photo: cycles through the room's photos on hover (desktop) via
 * a crossfade, so the card feels alive without needing the visitor to
 * click through. Falls back to the first photo, statically, on touch
 * devices where there's no hover.
 *
 * Also applies a subtle 3D tilt that tracks the cursor position, on top of
 * the existing crossfade — the two effects read from the same mousemove
 * event but drive independent transforms (tilt on this wrapper, zoom/fade
 * on the inner image), so they don't fight each other.
 */
export default function RoomCardImage({
  href,
  images,
  countLabel,
}: {
  href: string;
  images: RoomImage[];
  countLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 28 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 28 });

  function handleEnter() {
    setHovering(true);
  }
  function handleLeave() {
    setHovering(false);
    setIndex(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
  }
  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratioX = (e.clientX - rect.left) / rect.width;
    const ratioY = (e.clientY - rect.top) / rect.height;

    if (images.length > 1) {
      const next = Math.min(images.length - 1, Math.floor(ratioX * images.length));
      if (next !== index) setIndex(next);
    }
    if (!shouldReduceMotion) {
      rawRotateY.set((ratioX - 0.5) * TILT_DEGREES);
      rawRotateX.set(-(ratioY - 0.5) * TILT_DEGREES);
    }
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="will-change-transform"
    >
      <Link
        href={href}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
        className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-charcoal/25"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <AnimatePresence mode="sync">
            <motion.div
              key={images[index].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <PropertyImage
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <span className="absolute top-4 left-4 rounded-md bg-charcoal/40 text-ivory text-[11px] tracking-[0.14em] px-3 py-1.5 backdrop-blur-sm">
          {countLabel}
        </span>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {images.map((img, i) => (
              <span
                key={img.src}
                className={`h-1 rounded-full transition-all duration-300 ${
                  hovering && i === index ? "w-6 bg-ivory" : "w-1.5 bg-ivory/50"
                }`}
              />
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
