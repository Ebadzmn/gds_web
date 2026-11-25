"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-[#d97736]"
    />
  );
}
