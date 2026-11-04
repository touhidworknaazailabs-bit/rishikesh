"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * Applies prefers-reduced-motion to every Framer Motion animation and
 * gesture (hover/tap) app-wide, not just the ones we explicitly branch on
 * with useReducedMotion.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
