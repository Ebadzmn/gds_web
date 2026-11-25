"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { FAQS } from "@/features/northstar/data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="grid grid-cols-1 gap-[30px] bg-[#f0efeb] px-[22px] py-[70px] md:grid-cols-[0.8fr_1.2fr] md:gap-[12%] md:px-[7%] md:py-[105px] lg:px-[10.5%]">
      <div>
        <FadeIn y={10}>
          <div className="text-[9px] font-bold tracking-[2px] text-[#d97736]">
            FREQUENTLY ASKED
          </div>
        </FadeIn>
        <EditorialHeading className="mt-[18px] mb-0 font-heading text-[43px] leading-[1.06] font-semibold tracking-[-2.5px] md:text-[48px] md:tracking-[-3px]">
          A few things
          <br />
          <em className="font-serif font-normal italic">you might wonder.</em>
        </EditorialHeading>
        <FadeIn delay={0.12}>
          <p className="my-5 text-[11px] text-[#7a8384]">
            Have another question? We’re happy to help.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 py-2 text-[11px] font-bold text-[#27333c] transition-colors hover:text-[#d97736]"
          >
            <span>Ask us a question</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className="border-t border-[#d9d8d2]">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={
                  isOpen
                    ? "border-b border-l-2 border-[#d9d8d2] border-l-[#d97736] bg-[#f8f7f4] pr-3 pl-4 transition-colors duration-200"
                    : "border-b border-l-2 border-[#d9d8d2] border-l-transparent transition-colors duration-200"
                }
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full cursor-pointer items-center justify-between gap-[10px] border-0 bg-transparent py-[21px] text-left font-heading text-[11px] font-bold text-[#26333c] transition-colors hover:text-[#d97736] md:text-[12px]"
                >
                  <span>{item.question}</span>
                  <m.b
                    animate={
                      prefersReduced ? undefined : { rotate: isOpen ? 180 : 0 }
                    }
                    transition={{ duration: 0.25 }}
                    className="inline-block text-[18px] text-[#d97736]"
                  >
                    {isOpen ? "−" : "+"}
                  </m.b>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={
                        prefersReduced ? false : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        prefersReduced ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="m-0 max-w-[560px] pr-[30px] pb-5 text-[11px] leading-[1.8] text-[#737d80]">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
