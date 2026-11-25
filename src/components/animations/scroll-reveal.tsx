"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  start?: string;
}

export function ScrollReveal({
  children,
  className,
  y = 32,
  duration = 0.7,
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [y, duration, start, prefersReduced]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
