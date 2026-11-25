"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { REVIEWS } from "@/features/northstar/data";

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const activeReview = REVIEWS[index] ?? REVIEWS[0]!;

  function handlePrev() {
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  }

  function handleNext() {
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  }

  return (
    <section
      id="reviews"
      className="grid grid-cols-1 items-center gap-[30px] bg-[#263744] px-[23px] py-[60px] text-white md:grid-cols-2 md:gap-[10%] md:px-[10.5%] md:py-[85px]"
    >
      <div>
        <FadeIn y={10}>
          <div className="flex items-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#d4d8d9]">
            <span className="inline-block h-px w-[25px] bg-[#d97736]" />
            THE WORD AROUND TOWN
          </div>
        </FadeIn>
        <EditorialHeading className="my-[22px] font-heading text-[46px] leading-[1.06] font-semibold tracking-[-3px] md:text-[54px]">
          Good people.
          <br />
          <em className="font-serif font-normal italic">Good experiences.</em>
        </EditorialHeading>
        <FadeIn delay={0.1}>
          <p className="max-w-[300px] text-[12px] leading-[1.9] text-[#b7c0c4]">
            We’re proud of the relationships we build, one service visit at a
            time.
          </p>

          <div className="mt-9">
            <div className="tracking-[2px] text-[#e2a25f]">★★★★★</div>
            <b className="mt-2 block text-[10px]">
              Built on trust, one visit at a time.
            </b>
          </div>
        </FadeIn>
      </div>

      <ScrollReveal>
        <div className="relative bg-[#f8f7f4] px-[22px] py-[28px] text-[#24313a] shadow-[0_20px_50px_rgba(8,14,20,0.22)] md:px-[38px] md:pt-[38px] md:pb-[25px]">
          <div className="flex items-start justify-between">
            <div className="h-[55px] font-serif text-[80px] leading-none text-[#d97736]">
              “
            </div>
            <div className="flex items-center gap-2">
              <span className="mr-1 text-[9px] font-bold tracking-[1.4px] text-[#828a8a]">
                0{index + 1} / 0{REVIEWS.length}
              </span>
              <button
                type="button"
                aria-label="Previous review"
                onClick={handlePrev}
                className="grid h-7 w-7 cursor-pointer place-items-center border border-[#deded8] bg-white text-[11px] text-[#24313a] transition-colors hover:border-[#d97736] hover:text-[#d97736]"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={handleNext}
                className="grid h-7 w-7 cursor-pointer place-items-center border border-[#deded8] bg-white text-[11px] text-[#24313a] transition-colors hover:border-[#d97736] hover:text-[#d97736]"
              >
                →
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <m.div
              key={index}
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mt-[15px] mb-[28px] min-h-[96px] font-heading text-[17px] leading-[1.55] font-medium tracking-[-0.5px] md:text-[20px]">
                {activeReview.quote}
              </p>
              <div className="flex items-center gap-3 border-t border-[#e3e1db] pt-[18px]">
                <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#d9c6b3] text-[10px] font-bold">
                  {activeReview.initials}
                </span>
                <div>
                  <b className="block text-[10px]">{activeReview.author}</b>
                  <small className="mt-[3px] block text-[8px] text-[#828a8a]">
                    {activeReview.role}
                  </small>
                </div>
                <span className="ml-auto hidden tracking-[2px] text-[#e2a25f] md:inline">
                  ★★★★★
                </span>
              </div>
            </m.div>
          </AnimatePresence>

          <div className="mt-5 text-[7px] tracking-[1.1px] text-[#828a8a]">
            4.9 ★ GOOGLE &amp; NEXTDOOR RATING · VERIFIED LOCAL VISITS
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
