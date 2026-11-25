"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

interface PolaroidCard {
  id: number;
  caption: string;
  tag: string;
  story: string;
  image: string;
  grayscale?: boolean;
}

const POLAROIDS: readonly PolaroidCard[] = [
  {
    id: 0,
    caption: "The first truck",
    tag: "FOUNDATION · 2012",
    story:
      "Stocking our very first service truck before dawn—every torsion spring, roller, and cable organized by hand.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 1,
    caption: "Friday dispatch",
    tag: "MORNING BRIEFING",
    story:
      "Routing same-day repair calls across Oakridge and Westbrook so every homeowner gets a tight 2-hour arrival window.",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    caption: "First custom door",
    tag: "CRAFTSMANSHIP",
    story:
      "Completing our first custom insulated carriage-house installation and testing the final balance by hand.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    caption: "Summer installs",
    tag: "CURB APPEAL",
    story:
      "Full-day architectural flush door upgrades—pairing thermally broken steel panels with whisper-quiet belt drives.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    caption: "Planning week",
    tag: "NORTHSTAR CREW",
    story:
      "Reviewing custom door measurements, hardware specs, and safety checklists at the shop table before heading out.",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    caption: "Late-night fix",
    tag: "24/7 ON-CALL",
    story:
      "Getting an off-track door safely closed and balanced after hours so a family could sleep with peace of mind.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85",
  },
  {
    id: 6,
    caption: "Early kickoff",
    tag: "7:30 AM PREP",
    story:
      "Loading insulated panels, smart Wi-Fi openers, and perimeter weather seals for a three-bay residential retrofit.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85",
  },
  {
    id: 7,
    caption: "Launch day",
    tag: "NEW FLEET",
    story:
      "Expanding our local dispatch coverage to North Hills with fully equipped mobile workshop vans.",
    image:
      "https://images.pexels.com/photos/12069489/pexels-photo-12069489.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 8,
    caption: "Shop & office",
    tag: "BEHIND THE SCENES",
    story:
      "Where every spring cycle rating is verified and every written quote is prepared with zero hidden fees.",
    image:
      "https://images.pexels.com/photos/8387509/pexels-photo-8387509.jpeg?auto=compress&cs=tinysrgb&w=1200",
    grayscale: true,
  },
] as const;

const CENTER_INDEX = 4;

export function TeamGallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const selectedCard =
    selectedId !== null
      ? (POLAROIDS.find((c) => c.id === selectedId) ?? null)
      : null;

  useEffect(() => {
    if (selectedId === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowRight") {
        setSelectedId((prev) =>
          prev === null ? 0 : (prev + 1) % POLAROIDS.length
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedId((prev) =>
          prev === null ? 0 : (prev - 1 + POLAROIDS.length) % POLAROIDS.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  return (
    <section className="relative overflow-hidden bg-[#f8f7f4] pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Subtle warm radial glow behind the polaroid fan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d97736]/[0.055] blur-[110px]"
      />

      {/* Top Editorial Header (aligned to match the reference screenshot) */}
      <div className="relative z-10 mx-auto max-w-5xl px-[22px] md:px-[8%]">
        <FadeIn y={10}>
          <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-[2.4px] text-[#7d8585] uppercase">
            <span className="inline-block h-px w-5 bg-[#d97736]" />
            ABOUT US
          </div>
        </FadeIn>

        <EditorialHeading className="mt-4 font-heading text-[40px] leading-[1.06] font-semibold tracking-[-2px] text-[#15212b] sm:text-[52px] md:text-[60px] md:tracking-[-3px]">
          A small team with
          <br />a big{" "}
          <em className="font-serif font-normal text-[#d97736] italic">
            to-do list.
          </em>
        </EditorialHeading>
      </div>

      {/* Semicircular Fanned Polaroid Arc (Desktop & Tablet) */}
      <div className="relative z-10 mx-auto mt-14 hidden h-[390px] max-w-[1280px] items-start justify-center sm:flex md:mt-20 md:h-[440px]">
        {POLAROIDS.map((card, idx) => {
          const offset = idx - CENTER_INDEX; // -4 .. +4
          const absOffset = Math.abs(offset);
          const isHovered = hoveredId === card.id;

          // Exact fan arc geometry matching the reference image
          const rotateDeg = offset * 6.5;
          const translateX = offset * 98;
          const translateY = Math.pow(absOffset, 1.82) * 11.5;

          // Center card sits highest by default; hovered card elevates to top
          const zIndex = isHovered ? 60 : 40 - absOffset * 5;

          return (
            <m.button
              key={card.id}
              type="button"
              onClick={() => setSelectedId(card.id)}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      x: 0,
                      y: 110,
                      rotate: 0,
                      scale: 0.86,
                    }
              }
              whileInView={{
                opacity: 1,
                x: translateX,
                y: isHovered ? translateY - 24 : translateY,
                rotate: isHovered ? rotateDeg * 0.75 : rotateDeg,
                scale: isHovered ? 1.07 : 1,
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 22,
                delay: isHovered ? 0 : absOffset * 0.055,
              }}
              style={{ zIndex }}
              className={cn(
                "group absolute top-2 w-[160px] origin-bottom cursor-pointer border bg-white p-2.5 pb-5 text-center transition-shadow duration-300 md:w-[205px] md:p-3 md:pb-6",
                isHovered
                  ? "border-[#d97736] shadow-[0_28px_60px_rgba(17,26,36,0.24)]"
                  : "border-[#e6e4dd] shadow-[0_16px_38px_rgba(17,26,36,0.13)]"
              )}
            >
              <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#e4e2dc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.caption}
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108",
                    card.grayscale && "grayscale"
                  )}
                />
                <div className="pointer-events-none absolute inset-0 bg-[#111a24]/0 transition-colors duration-300 group-hover:bg-[#111a24]/15" />
                <span className="pointer-events-none absolute top-2.5 right-2.5 grid h-7 w-7 scale-90 place-items-center rounded-full bg-[#111a24]/75 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Expand className="size-3.5 stroke-[2]" />
                </span>
              </div>

              <span
                className={cn(
                  "mt-3 block truncate text-[11px] font-medium transition-colors duration-200 md:mt-4 md:text-[12px]",
                  isHovered ? "font-semibold text-[#d97736]" : "text-[#3a444c]"
                )}
              >
                {card.caption}
              </span>
            </m.button>
          );
        })}
      </div>

      {/* Mobile Fanned Horizontal Carousel (< 640px) */}
      <div className="relative z-10 mt-10 flex gap-4 overflow-x-auto px-[22px] pb-6 sm:hidden">
        {POLAROIDS.map((card, idx) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setSelectedId(card.id)}
            style={{
              transform: `rotate(${(idx % 2 === 0 ? -1 : 1) * 2}deg)`,
            }}
            className="w-[175px] shrink-0 cursor-pointer border border-[#e6e4dd] bg-white p-2.5 pb-5 text-center shadow-[0_12px_28px_rgba(17,26,36,0.12)]"
          >
            <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#e4e2dc]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.caption}
                className={cn(
                  "h-full w-full object-cover",
                  card.grayscale && "grayscale"
                )}
              />
            </div>
            <span className="mt-3 block text-[11px] font-medium text-[#3a444c]">
              {card.caption}
            </span>
          </button>
        ))}
      </div>

      {/* Subtle Interactive Hint */}
      <div className="relative z-10 mt-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e2e0d8] bg-white/80 px-3.5 py-1.5 text-[9px] font-bold tracking-[1.6px] text-[#737d80] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d97736]" />
          CLICK ANY PHOTO TO INSPECT
        </span>
      </div>

      {/* Interactive Lightbox Modal when a Polaroid is Clicked */}
      <AnimatePresence>
        {selectedCard && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedCard.caption}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedId(null);
            }}
            className="fixed inset-0 z-50 grid place-items-center bg-[#0b131b]/80 p-5 backdrop-blur-md"
          >
            <m.div
              key={selectedCard.id}
              initial={
                reduced ? false : { opacity: 0, y: 28, scale: 0.92, rotate: -2 }
              }
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={
                reduced
                  ? undefined
                  : { opacity: 0, y: 18, scale: 0.94, rotate: 1 }
              }
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
              }}
              className="relative w-full max-w-[520px] border border-[#e6e4dd] bg-white p-4 pb-6 shadow-[0_35px_100px_rgba(0,0,0,0.5)] sm:p-5 sm:pb-7"
            >
              {/* Top Close & Counter Bar */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-[1.8px] text-[#d97736]">
                  0{selectedCard.id + 1} / 0{POLAROIDS.length} ·{" "}
                  {selectedCard.tag}
                </span>
                <button
                  type="button"
                  aria-label="Close photo"
                  onClick={() => setSelectedId(null)}
                  className="grid h-8 w-8 cursor-pointer place-items-center border border-[#e6e4dd] bg-[#f8f7f4] text-[#1c2630] transition-colors hover:border-[#d97736] hover:text-[#d97736]"
                >
                  <X className="size-4 stroke-[1.75]" />
                </button>
              </div>

              {/* Expanded Polaroid Photo */}
              <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-[#e4e2dc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedCard.image}
                  alt={selectedCard.caption}
                  className={cn(
                    "h-full w-full object-cover",
                    selectedCard.grayscale && "grayscale"
                  )}
                />
              </div>

              {/* Polaroid Chin: Title, Story & Prev/Next Controls */}
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-heading text-[22px] font-bold tracking-[-0.5px] text-[#15212b]">
                    {selectedCard.caption}
                  </h3>
                  <p className="mt-1.5 max-w-[360px] text-[12px] leading-[1.75] text-[#687176]">
                    {selectedCard.story}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() =>
                      setSelectedId(
                        (selectedCard.id - 1 + POLAROIDS.length) %
                          POLAROIDS.length
                      )
                    }
                    className="grid h-9 w-9 cursor-pointer place-items-center border border-[#deded8] bg-[#f8f7f4] text-[#15212b] transition-colors hover:border-[#d97736] hover:bg-[#d97736] hover:text-white"
                  >
                    <ArrowLeft className="size-4 stroke-[1.75]" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() =>
                      setSelectedId((selectedCard.id + 1) % POLAROIDS.length)
                    }
                    className="grid h-9 w-9 cursor-pointer place-items-center border border-[#deded8] bg-[#f8f7f4] text-[#15212b] transition-colors hover:border-[#d97736] hover:bg-[#d97736] hover:text-white"
                  >
                    <ArrowRight className="size-4 stroke-[1.75]" />
                  </button>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
