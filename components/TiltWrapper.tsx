"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ReactNode } from "react";

const TILT_DEGREES = 6;

/**
 * Wraps children in a subtle cursor-tracked 3D tilt — used on flat photo
 * cards (room teaser cards) that don't already have their own mousemove
 * handler. For cards that do (RoomCardImage's hover-scrub crossfade), the
 * tilt is implemented inline instead so both effects share one handler.
 */
export default function TiltWrapper({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 28 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 28 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratioX = (e.clientX - rect.left) / rect.width;
    const ratioY = (e.clientY - rect.top) / rect.height;
    rawRotateY.set((ratioX - 0.5) * TILT_DEGREES);
    rawRotateX.set(-(ratioY - 0.5) * TILT_DEGREES);
  }
  function handleLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
