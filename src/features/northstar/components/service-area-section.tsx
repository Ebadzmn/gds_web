"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function ServiceAreaSection() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState("");
  const prefersReduced = useReducedMotion();

  function handleCheck() {
    const trimmed = zip.trim();
    setResult(
      /^[0-9]{5}(-[0-9]{4})?$/.test(trimmed)
        ? `Yes — we serve ${trimmed}. Same-day & next-day dispatch available.`
        : "Please enter a valid 5-digit ZIP code."
    );
  }

  return (
    <section className="grid grid-cols-1 items-center gap-[28px] px-[22px] py-[70px] md:grid-cols-2 md:gap-[9%] md:px-[7%] md:py-[105px] lg:px-[10.5%]">
      <div>
        <FadeIn y={10}>
          <div className="flex items-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#7d8585]">
            <span className="inline-block h-px w-[25px] bg-[#d97736]" />
            CLOSE TO HOME
          </div>
        </FadeIn>
        <EditorialHeading className="mt-[18px] mb-0 font-heading text-[44px] leading-[1.06] font-semibold tracking-[-2.5px] md:text-[52px] md:tracking-[-3px]">
          Local knowledge.
          <br />
          <em className="font-serif font-normal italic">Neighborly service.</em>
        </EditorialHeading>
        <FadeIn delay={0.1}>
          <p className="mt-5 mb-[26px] max-w-[410px] text-[12px] leading-[1.9] text-[#737d80]">
            Our trucks are stocked locally and dispatched from the neighborhood.
            Enter your ZIP code to confirm same-day availability.
          </p>

          <div className="flex max-w-[440px] items-center gap-[10px] border border-[#d9d8d2] bg-white py-[6px] pr-[7px] pl-[14px] transition-colors focus-within:border-[#d97736]">
            <MapPin className="size-3.5 shrink-0 stroke-[1.75] text-[#d97736]" />
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCheck();
              }}
              placeholder="Enter your ZIP code (e.g. 07030)"
              maxLength={10}
              aria-label="ZIP code"
              className="min-w-0 flex-1 border-0 text-[10px] outline-0"
            />
            <m.button
              type="button"
              onClick={handleCheck}
              whileHover={prefersReduced ? undefined : { y: -1 }}
              whileTap={prefersReduced ? undefined : { scale: 0.97 }}
              className="cursor-pointer border-0 bg-[#111a24] px-[13px] py-3 text-[9px] text-white transition-colors hover:bg-[#293b4b]"
            >
              Check area →
            </m.button>
          </div>

          {result && (
            <small className="mt-[10px] block text-[10px] font-medium text-[#52725c]">
              {result}
            </small>
          )}
          <small className="mt-3 block text-[8px] text-[#8b918f]">
            Covering Oakridge, Westbrook, North Hills &amp; surrounding
            communities.
          </small>
        </FadeIn>
      </div>

      <ScrollReveal>
        <div className="relative grid h-[280px] place-items-center overflow-hidden border border-[#dedcd4] bg-[#e9e9e2] md:h-[360px]">
          <svg
            viewBox="0 0 600 400"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          >
            <g stroke="#c7ccc5" strokeWidth="1.2" fill="none">
              <path d="M-20 85 Q 180 65, 340 120 T 620 95" />
              <path d="M-20 205 Q 200 185, 380 230 T 620 215" />
              <path d="M-20 315 Q 220 295, 410 340 T 620 310" />
              <path d="M95 -20 L 135 420" />
              <path d="M245 -20 L 210 420" />
              <path d="M405 -20 L 385 420" />
              <path d="M510 -20 L 540 420" />
            </g>
            <path
              d="M-20 145 C 140 130, 260 270, 620 250"
              stroke="#d5d9d2"
              strokeWidth="12"
              fill="none"
            />
          </svg>

          <span className="absolute top-11 left-10 text-[8px] font-bold tracking-[1.8px] text-[#7f8884]">
            NORTH HILLS
          </span>
          <span className="absolute top-24 right-12 text-[8px] font-bold tracking-[1.8px] text-[#7f8884]">
            OAKRIDGE
          </span>
          <span className="absolute right-16 bottom-14 text-[8px] font-bold tracking-[1.8px] text-[#7f8884]">
            WESTBROOK
          </span>

          <m.div
            animate={
              prefersReduced
                ? undefined
                : { scale: [1, 1.06, 1], opacity: [0.6, 0.95, 0.6] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[200px] w-[200px] rounded-full border border-[#d9773666]"
          />
          <m.div
            animate={
              prefersReduced
                ? undefined
                : { scale: [1, 1.04, 1], rotate: [0, 12, 0] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-[#d9773666]"
          />
          <m.div
            whileHover={prefersReduced ? undefined : { scale: 1.08 }}
            className="z-10 grid h-[54px] w-[54px] -rotate-45 place-items-center rounded-t-full rounded-br-full rounded-bl-[4px] bg-[#d97736] text-white shadow-[0_8px_22px_rgba(217,119,54,0.33)]"
          >
            <MapPin className="size-5 rotate-45 stroke-[1.75]" />
          </m.div>
          <div className="absolute bottom-[22px] left-[22px] flex items-center gap-[9px] border border-[#e3e1dc] bg-white px-[15px] py-[12px] text-[8px] font-bold tracking-[1px]">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#d97736] shadow-[0_0_0_4px_rgba(217,119,54,0.17)]" />
            NORTHSTAR DISPATCH{" "}
            <small className="ml-auto text-[7px] text-[#969c9b]">
              25-MILE RADIUS
            </small>
          </div>
          <span className="absolute top-[18px] right-5 text-[7px] tracking-[1px] text-[#8b9490]">
            40° 42&apos; 46.8&quot; N / 74° 00&apos; 21.6&quot; W
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}
