"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
}

export function TextReveal({
  text,
  as: Tag = "p",
  className,
  stagger = 0.035,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-word]");
      gsap.from(targets, {
        yPercent: 100,
        opacity: 0,
        duration: 0.6,
        stagger,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, prefersReduced]);

  return (
    <div ref={containerRef}>
      <Tag className={cn("flex flex-wrap gap-x-[0.25em]", className)}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden"
          >
            <span data-word className="inline-block">
              {word}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
