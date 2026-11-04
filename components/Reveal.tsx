"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span";
};

/**
 * Scroll-triggered fade + rise reveal. Respects prefers-reduced-motion via
 * Framer Motion's useReducedMotion (falls back to a plain opacity fade).
 */
export default function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStaggerItem({
  children,
  className,
  y = 20,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  /** Adds a subtle lift + shadow on hover, for card-like items. */
  hover?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      whileHover={hover ? { y: -6 } : undefined}
      transition={hover ? { type: "spring", stiffness: 300, damping: 20 } : undefined}
    >
      {children}
    </motion.div>
  );
}
