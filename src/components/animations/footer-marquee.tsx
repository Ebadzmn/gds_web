"use client";

import { m, useReducedMotion } from "motion/react";

const ITEMS = [
  "NORTHSTAR GARAGE DOORS",
  "PRECISION",
  "RELIABILITY",
  "SECURITY",
] as const;

function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item, idx) => (
        <span key={item} className="inline-flex items-center">
          <span
            className={
              idx === 0
                ? "font-heading text-[48px] leading-none font-extrabold tracking-[-1.5px] text-[#e9b17f]/25 transition-colors duration-500 group-hover:text-[#e9b17f]/40 md:text-[88px] md:tracking-[-3px]"
                : "font-heading text-[48px] leading-none font-extrabold tracking-[-1.5px] text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.12] md:text-[88px] md:tracking-[-3px]"
            }
          >
            {item}
          </span>
          <span className="mx-6 inline-block h-2.5 w-2.5 rotate-45 bg-[#d97736]/45 md:mx-10 md:h-3 md:w-3" />
        </span>
      ))}
    </div>
  );
}

export function FooterMarquee() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="group relative overflow-hidden border-y border-white/[0.07] py-5 select-none md:py-7"
    >
      {/* Left/Right edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0d151d] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0d151d] to-transparent md:w-28" />

      <m.div
        animate={prefersReduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max whitespace-nowrap"
      >
        <MarqueeGroup />
        <MarqueeGroup />
      </m.div>
    </div>
  );
}
