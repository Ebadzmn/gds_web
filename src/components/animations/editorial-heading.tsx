"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}

export function EditorialHeading({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
}: EditorialHeadingProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="overflow-hidden">
      <m.div
        initial={prefersReduced ? false : { y: "28%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: prefersReduced ? 0 : 0.68,
          delay: prefersReduced ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Tag className={cn(className)}>{children}</Tag>
      </m.div>
    </div>
  );
}
