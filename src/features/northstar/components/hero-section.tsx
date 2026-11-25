"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { FlipWords } from "@/components/animations/flip-words";
import { HeroItem, HeroLine } from "@/components/animations/hero-reveal";
import { BookButton } from "@/features/northstar/components/book-button";
import { cn } from "@/lib/utils";

const HERO_FLIP_WORDS = [
  "Great peace",
  "Total ease",
  "Lasting calm",
  "True comfort",
] as const;

const HERO_SLIDES = [
  {
    index: "01",
    image:
      "https://images.pexels.com/photos/31944676/pexels-photo-31944676/free-photo-of-minimalist-urban-garage-exterior-with-closed-doors.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Minimalist residential garage doors exterior",
  },
  {
    index: "02",
    image:
      "https://images.pexels.com/photos/12069489/pexels-photo-12069489.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Contemporary home with modern garage door",
  },
  {
    index: "03",
    image:
      "https://images.pexels.com/photos/14193874/pexels-photo-14193874.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Residential driveway and garage door architecture",
  },
  {
    index: "04",
    image:
      "https://images.pexels.com/photos/8387509/pexels-photo-8387509.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Custom garage door installation",
  },
] as const;

const SLIDE_MS = 6000;

export function HeroSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const current = HERO_SLIDES[active] ?? HERO_SLIDES[0];

  return (
    <section className="relative h-[calc(100svh-102px)] max-h-[780px] min-h-[640px] overflow-hidden bg-[#0e1720] text-white md:h-[min(710px,76vw)] md:max-h-none md:min-h-[610px]">
      {/* Quiet full-bleed photography with slow Ken Burns drift */}
      <AnimatePresence mode="sync">
        <m.img
          key={current.index}
          src={current.image}
          alt={current.alt}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Soft, calm editorial gradient scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,21,29,0.86)_0%,rgba(12,21,29,0.52)_45%,rgba(12,21,29,0.12)_85%),linear-gradient(0deg,rgba(8,14,20,0.45)_0%,transparent_50%)]"
      />

      {/* Minimalist left-aligned editorial stage */}
      <div className="relative z-10 max-w-[740px] px-[25px] pt-[92px] md:pt-[112px] md:pr-0 md:pl-[8%] lg:pl-[10.5%]">
        <HeroItem delay={0.55}>
          <div className="flex flex-wrap items-center gap-3 text-[9px] font-bold tracking-[2.4px] text-[#d4d8d9]">
            <span className="inline-block h-px w-7 bg-[#d97736]" />
            <span className="text-[#e9b17f]">NORTHSTAR</span>
            <span className="text-white/30">/</span>
            <span>THE STANDARD IN GARAGE DOOR CARE</span>
          </div>
        </HeroItem>

        <h1 className="mt-6 mb-5 font-heading text-[54px] leading-[1.04] font-semibold tracking-[-3px] md:text-[clamp(54px,6.2vw,84px)] md:tracking-[-4px]">
          <HeroLine delay={0.62}>Good doors.</HeroLine>
          <HeroLine delay={0.7} className="overflow-visible py-1">
            <FlipWords
              words={HERO_FLIP_WORDS}
              intervalMs={3200}
              className="font-serif font-normal text-[#e9b17f] italic"
            />{" "}
            of mind.
          </HeroLine>
        </h1>

        <HeroItem delay={0.82}>
          <p className="max-w-[420px] text-[13px] leading-[1.85] text-[#cfd6d9] md:text-[14px]">
            Thoughtful repairs. Beautiful installations. Service that makes
            coming home feel even better.
          </p>
        </HeroItem>

        <HeroItem delay={0.9}>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <BookButton variant="accent" className="px-6 py-4">
              <span>Schedule a service</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </BookButton>

            <a
              href="#services"
              className="group inline-flex items-center gap-2.5 py-2 text-[11px] font-bold tracking-[0.2px] text-white/90 transition-colors hover:text-[#e9b17f]"
            >
              <span>Explore our services</span>
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </HeroItem>

        <HeroItem delay={0.98}>
          <div className="mt-12 flex items-center gap-4 md:mt-14">
            <div className="text-[11px] tracking-[2px] text-[#e2a25f]">
              ★★★★★
            </div>
            <span className="h-3 w-px bg-white/20" />
            <small className="text-[10px] tracking-[0.3px] text-[#cfd6d9]">
              Local service. Personal attention.
            </small>
          </div>
        </HeroItem>
      </div>

      {/* Quiet bottom-right stone note card */}
      <HeroItem
        delay={1.04}
        className="absolute right-4 bottom-6 z-10 md:right-[7%] md:bottom-11"
      >
        <div className="flex items-center gap-3.5 bg-[#f8f7f4] px-4 py-3.5 text-[#25313a] shadow-[0_16px_40px_rgba(0,0,0,0.22)] md:px-5 md:py-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center bg-[#efe6dc] text-[#d97736]">
            <Check className="size-4 stroke-[2]" />
          </span>
          <div>
            <b className="block font-heading text-[11px] font-bold">
              Done with care.
            </b>
            <small className="mt-0.5 block text-[9px] text-[#737d80]">
              From the first call to the final check.
            </small>
          </div>
        </div>
      </HeroItem>

      {/* Minimalist bottom-left 01 — 04 index */}
      <div className="absolute bottom-6 left-[5.5%] z-10 hidden items-center gap-3 text-[9px] font-bold tracking-[2px] text-[#d8dadd] md:flex">
        <span>{current.index}</span>
        <div className="flex items-center gap-1.5">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.index}
              type="button"
              aria-label={`Slide ${s.index}`}
              onClick={() => setActive(idx)}
              className={cn(
                "h-px cursor-pointer border-0 p-0 transition-all duration-500",
                idx === active
                  ? "w-10 bg-[#d97736]"
                  : "w-3 bg-white/30 hover:bg-white/60"
              )}
            />
          ))}
        </div>
        <span className="text-white/50">04</span>
      </div>
    </section>
  );
}
