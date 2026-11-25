"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { useBookingStore } from "@/store/booking-store";
import { cn } from "@/lib/utils";

interface BookButtonProps {
  children: ReactNode;
  service?: string;
  variant?: "dark" | "accent" | "card-link" | "text-link";
  className?: string;
}

export function BookButton({
  children,
  service,
  variant = "dark",
  className,
}: BookButtonProps) {
  const openBooking = useBookingStore((state) => state.openBooking);
  const prefersReduced = useReducedMotion();

  const isSolid = variant === "dark" || variant === "accent";

  const variantClasses = {
    dark: "group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-[#111a24] px-5 py-[15px] text-[11px] font-bold tracking-[0.2px] text-white transition-colors duration-300 hover:bg-[#223242]",
    accent:
      "group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-[#d97736] px-5 py-[15px] text-[11px] font-bold tracking-[0.2px] text-white transition-colors duration-300 hover:bg-[#bd642c]",
    "card-link":
      "group inline-flex items-center gap-2 text-[9px] font-bold text-[#27333c] transition-colors duration-200 hover:text-[#d97736]",
    "text-link":
      "group inline-flex items-center gap-3 py-2 text-[10px] font-bold text-[#27333c] transition-colors duration-200 hover:text-[#d97736]",
  }[variant];

  return (
    <m.button
      type="button"
      onClick={() => openBooking(service)}
      whileHover={prefersReduced ? undefined : isSolid ? { y: -2 } : { x: 2 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn("cursor-pointer border-0", variantClasses, className)}
    >
      {isSolid && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.16),transparent)] transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </m.button>
  );
}
