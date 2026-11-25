"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { BookButton } from "@/features/northstar/components/book-button";
import { DOOR_COLORS, DOORS } from "@/features/northstar/data";
import { cn } from "@/lib/utils";

export function DoorShowcase() {
  const [selectedDoorIdx, setSelectedDoorIdx] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(DOORS[0]!.finish);
  const prefersReduced = useReducedMotion();

  const activeDoor = DOORS[selectedDoorIdx] ?? DOORS[0]!;

  function handleSelectDoor(index: number) {
    const nextDoor = DOORS[index];
    if (!nextDoor) return;
    setSelectedDoorIdx(index);
    setSelectedFinish(nextDoor.finish);
  }

  return (
    <section
      id="doors"
      className="bg-[#f0efeb] px-[22px] py-[70px] md:px-[7%] md:py-[105px] lg:px-[10.5%]"
    >
      <div className="mb-[28px] block items-end justify-between md:mb-[43px] md:flex">
        <div>
          <FadeIn y={10}>
            <div className="flex items-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#7d8585]">
              <span className="inline-block h-px w-[25px] bg-[#d97736]" />
              THE RIGHT FIRST IMPRESSION
            </div>
          </FadeIn>
          <EditorialHeading className="mt-[18px] mb-0 font-heading text-[45px] leading-[1.06] font-semibold tracking-[-2.5px] md:text-[clamp(42px,5vw,62px)] md:tracking-[-3px]">
            A door that feels
            <br />
            <em className="font-serif font-normal italic">like it belongs.</em>
          </EditorialHeading>
        </div>

        <FadeIn
          delay={0.12}
          className="mt-[17px] max-w-[340px] pb-[7px] md:mt-0"
        >
          <p className="mb-3 text-[11px] leading-[1.85] text-[#737d80] md:text-[12px]">
            Your garage door is a big part of your home’s character. Explore a
            few popular directions and let’s find the right fit.
          </p>
          <BookButton variant="text-link" service="New Door Installation">
            <span>Request a design consultation</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </BookButton>
        </FadeIn>
      </div>

      <ScrollReveal>
        <div className="grid grid-cols-1 bg-white shadow-[0_12px_40px_rgba(17,26,36,0.04)] md:grid-cols-[1.35fr_0.8fr]">
          <div className="relative min-h-[310px] overflow-hidden md:min-h-[540px]">
            <AnimatePresence mode="wait">
              <m.img
                key={activeDoor.image}
                src={activeDoor.image}
                alt={activeDoor.name}
                initial={prefersReduced ? false : { opacity: 0.4, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReduced ? undefined : { opacity: 0.4 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(17,26,36,0.72)_100%)]"
            />
            <div className="absolute top-5 left-5 z-10 bg-[#111a24]/75 px-3 py-1.5 text-[8px] font-bold tracking-[1.4px] text-white backdrop-blur-sm">
              {activeDoor.specBadge}
            </div>
            <div className="absolute bottom-[25px] left-[28px] z-10 flex flex-col gap-[7px] text-white [text-shadow:0_1px_5px_rgba(0,0,0,0.4)]">
              <span className="text-[8px] tracking-[1.7px]">
                FEATURED STYLE / {activeDoor.number}
              </span>
              <b className="font-heading text-[24px] font-semibold">
                {activeDoor.name}
              </b>
            </div>
          </div>

          <div className="px-[22px] py-[28px] md:px-[39px] md:py-[42px]">
            <div className="flex items-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#7d8585]">
              EXPLORE THE COLLECTION
            </div>
            <h3 className="mt-5 mb-[5px] font-heading text-[27px] font-bold tracking-[-1px]">
              {activeDoor.name}
            </h3>
            <p className="text-[8px] font-bold tracking-[1.5px] text-[#d97736]">
              {activeDoor.type}
            </p>
            <p className="my-6 min-h-[60px] text-[11px] leading-[1.8] text-[#747e81]">
              {activeDoor.description}
            </p>

            <div className="flex justify-between border-b border-[#e8e7e2] py-3 text-[10px]">
              <span className="text-[#899092]">Construction</span>
              <b className="font-semibold">{activeDoor.material}</b>
            </div>
            <div className="flex justify-between border-b border-[#e8e7e2] py-3 text-[10px]">
              <span className="text-[#899092]">Insulation</span>
              <b className="font-semibold">{activeDoor.insulation}</b>
            </div>
            <div className="flex justify-between border-b border-[#e8e7e2] py-3 text-[10px]">
              <span className="text-[#899092]">Featured finish</span>
              <b className="font-semibold">{selectedFinish}</b>
            </div>

            <div className="my-5">
              <span className="text-[8px] font-bold tracking-[1.4px] text-[#777]">
                EXPLORE FINISHES
              </span>
              <div className="mt-3 flex gap-[10px]">
                {DOOR_COLORS.map((color) => (
                  <m.button
                    key={color.name}
                    type="button"
                    aria-label={color.name}
                    whileHover={prefersReduced ? undefined : { scale: 1.18 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.92 }}
                    onClick={() => setSelectedFinish(color.name)}
                    className={cn(
                      "h-[21px] w-[21px] cursor-pointer rounded-full border-2 border-white outline outline-1 transition-shadow",
                      color.className,
                      selectedFinish === color.name
                        ? "outline-[#d97736]"
                        : "outline-transparent"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="my-[15px] font-heading text-[13px] font-bold">
              {activeDoor.price}
            </div>

            <BookButton
              variant="dark"
              service="New Door Installation"
              className="w-full"
            >
              <span>Talk to a door specialist</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </BookButton>

            <div className="mt-[25px] flex flex-col border-t border-[#e5e4df] pt-[15px]">
              {DOORS.map((door) => (
                <button
                  key={door.id}
                  type="button"
                  onClick={() => handleSelectDoor(door.id)}
                  className={cn(
                    "group flex cursor-pointer items-center gap-3 border-0 border-l-2 bg-transparent py-[10px] pl-3 text-left text-[10px] transition-all hover:text-[#d97736]",
                    selectedDoorIdx === door.id
                      ? "border-l-[#d97736] font-bold text-[#17242d]"
                      : "border-l-transparent text-[#687176]"
                  )}
                >
                  <span className="text-[8px] text-[#a0a6a5]">
                    {door.number}
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {door.name} ↗
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
