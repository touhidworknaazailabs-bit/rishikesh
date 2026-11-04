"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Step = {
  index: string;
  title: string;
  description: string;
  icon: string;
};

const steps: Step[] = [
  {
    index: "01",
    title: "Arrive",
    description: "Call or WhatsApp ahead — the hotel team confirms your room and is ready when you get to Chandreshwar Nagar.",
    icon: "/icons/phone-call-terracotta.svg",
  },
  {
    index: "02",
    title: "Settle In",
    description: "A clean double-bed room, AC or Non-AC, with an attached bathroom and hot water waiting.",
    icon: "/icons/door-open-terracotta.svg",
  },
  {
    index: "03",
    title: "Explore Rishikesh",
    description: "Ghats, bridges, ashrams and markets are all within reach — see our Rishikesh guide for planning it.",
    icon: "/icons/compass-terracotta.svg",
  },
  {
    index: "04",
    title: "Come Back Anytime",
    description: "Same direct line, same personal team — booking your next stay is just a call or message away.",
    icon: "/icons/refresh-cw-terracotta.svg",
  },
];

// Individual step: its own useInView + animate rather than the whileInView
// prop with a raw target object, which proved flaky for at least one
// sibling case in this project.
function JourneyStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const shouldReduceMotion = useReducedMotion();
  const hiddenX = shouldReduceMotion ? 0 : -20;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: hiddenX }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: hiddenX }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group/step relative"
    >
      <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-ivory border border-terracotta/25 shadow-sm mb-6 transition-colors duration-300 group-hover/step:border-terracotta">
        <img src={step.icon} className="size-6" alt="" aria-hidden />
      </div>
      <div className="flex items-baseline gap-2.5 mb-1.5">
        <span className="font-display text-2xl text-terracotta/35 leading-none">{step.index}</span>
        <h3 className="font-display text-2xl text-charcoal leading-none">{step.title}</h3>
      </div>
      <p className="text-sm text-charcoal/65 leading-relaxed max-w-[260px]">{step.description}</p>
    </motion.div>
  );
}

export default function GuestJourney() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px 0px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="container-editorial py-16 md:py-24">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
        animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mb-12 md:mb-16"
      >
        <p className="eyebrow">THE STAY</p>
        <h2 className="font-display text-4xl md:text-5xl text-charcoal text-balance">
          What Staying at Hotel Chandreshwar Looks Like
        </h2>
      </motion.div>

      <div className="relative">
        {/* Connecting line — sits at the vertical centre of the size-14 icon
            badges (28px), so it reads as one continuous thread between steps. */}
        <div
          aria-hidden
          className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent"
        />
        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {steps.map((step, i) => (
            <JourneyStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
