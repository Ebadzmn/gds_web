"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroLineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function HeroLine({ children, delay = 0, className }: HeroLineProps) {
  const prefersReduced = useReducedMotion();

  return (
    <span className={cn("block overflow-hidden", className)}>
      <m.span
        className="block"
        initial={prefersReduced ? false : { y: "105%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: prefersReduced ? 0 : 0.72,
          delay: prefersReduced ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </m.span>
    </span>
  );
}

interface HeroItemProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function HeroItem({ children, delay = 0, className }: HeroItemProps) {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      initial={prefersReduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
