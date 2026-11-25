"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  DoorOpen,
  Hammer,
  Settings2,
  Wrench,
} from "lucide-react";
import { BookButton } from "@/features/northstar/components/book-button";
import { SERVICES } from "@/features/northstar/data";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const ICONS = [Wrench, Settings2, Hammer, DoorOpen] as const;
const META = [
  "Same-day · All brands",
  "Torsion & extension",
  "Belt · Chain · Smart",
  "Steel · Wood · Glass",
] as const;
const STAGE_LABELS = ["DIAGNOSE", "BALANCE", "AUTOMATE", "INSTALL"] as const;

// Smooth harmonic S-wave whose horizontal crests align with the 4 column centers (150, 450, 750, 1050)
const SNAKE_PATH =
  "M 0 34 C 75 34, 75 14, 150 14 C 225 14, 225 46, 300 46 C 375 46, 375 14, 450 14 C 525 14, 525 46, 600 46 C 675 46, 675 14, 750 14 C 825 14, 825 46, 900 46 C 975 46, 975 14, 1050 14 C 1125 14, 1125 34, 1200 34";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const snakeRef = useRef<SVGPathElement>(null);
  const snakeGlowRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(4);

  useEffect(() => {
    const section = sectionRef.current;
    const snake = snakeRef.current;
    const snakeGlow = snakeGlowRef.current;
    if (!section || !snake || reduced) return;

    const len = snake.getTotalLength();
    gsap.set(snake, { strokeDasharray: len, strokeDashoffset: len });
    if (snakeGlow) {
      gsap.set(snakeGlow, { strokeDasharray: len, strokeDashoffset: len });
    }

    const cards = cardRefs.current.filter((el): el is HTMLElement =>
      Boolean(el)
    );
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      setCount(0);
      gsap.set(cards, { y: 140, opacity: 0, rotate: 2, scale: 0.94 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 68px",
          end: "+=2200",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setCount(
              p < 0.05 ? 0 : p < 0.3 ? 1 : p < 0.55 ? 2 : p < 0.8 ? 3 : 4
            );
          },
        },
      });

      tl.to(snake, { strokeDashoffset: 0, duration: 4, ease: "none" }, 0);
      if (snakeGlow) {
        tl.to(snakeGlow, { strokeDashoffset: 0, duration: 4, ease: "none" }, 0);
      }

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          i * 0.95
        );
      });
    });

    mm.add("(max-width: 1023px)", () => {
      setCount(4);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-[#f8f7f4] px-[22px] py-[64px] md:px-[6%] lg:px-[7%] lg:py-[56px]"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#dcdad2_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)] bg-[length:26px_26px] opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#d97736]/[0.07] blur-[100px]"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e0d8] bg-white px-3 py-1.5 text-[9px] font-bold tracking-[1.8px] text-[#5e696e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d97736]" />
              WHAT WE DO
            </div>
            <h2 className="mt-5 font-heading text-[42px] leading-[1.02] font-semibold tracking-[-2.5px] text-[#15212b] md:text-[clamp(44px,4.6vw,64px)] md:tracking-[-3.5px]">
              Care for every
              <br />
              <em className="font-serif font-normal text-[#d97736] italic">
                kind of garage door.
              </em>
            </h2>
          </div>

          <div className="max-w-[360px]">
            <p className="text-[12px] leading-[1.85] text-[#6d777b] md:text-[13px]">
              Whether it needs a quick fix or a complete refresh, our team
              brings the right tools, experience, and attention to every job.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span className="font-heading text-[30px] font-bold tracking-[-1px] text-[#15212b] tabular-nums">
                0{count}
                <span className="text-[16px] text-[#b5b9b6]">/04</span>
              </span>
              <span className="text-[9px] font-bold tracking-[1.6px] text-[#8b918f]">
                {count < 4 ? "SCROLL TO COLLECT" : "ALL SERVICES READY"}
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Crest-Aligned Snake Conduit + Non-Distorted Milestone Nodes */}
        <div className="relative mt-7 mb-2 hidden lg:block">
          {/* Center reference datum hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[21px] right-0 left-0 h-px bg-[linear-gradient(90deg,transparent,#e2e0d8_8%,#e2e0d8_92%,transparent)]"
          />

          {/* SVG Harmonic Wave Track (paths only — no circles inside so zero distortion) */}
          <svg
            viewBox="0 0 1200 60"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
            className="pointer-events-none h-[60px] w-full overflow-visible"
          >
            <defs>
              <linearGradient
                id="snakeCopperGrad"
                x1="0"
                y1="0"
                x2="1200"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#e9b17f" />
                <stop offset="50%" stopColor="#d97736" />
                <stop offset="100%" stopColor="#b85b22" />
              </linearGradient>
            </defs>

            {/* Subtle background wave shadow */}
            <path
              d={SNAKE_PATH}
              stroke="#e5e3db"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Fine dashed architectural guide wave */}
            <path
              d={SNAKE_PATH}
              stroke="#c9c6bc"
              strokeWidth="1.25"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
            {/* Soft copper ambient glow stroke */}
            <path
              ref={snakeGlowRef}
              d={SNAKE_PATH}
              stroke="#d97736"
              strokeOpacity="0.22"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Crisp active copper wave */}
            <path
              ref={snakeRef}
              d={SNAKE_PATH}
              stroke="url(#snakeCopperGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
          </svg>

          {/* True 1:1 HTML Milestone Badges + Vertical Connector Stems aligned with the 4 Cards */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-4 gap-5">
            {SERVICES.map((s, i) => {
              const lit = count >= i + 1;
              const isCurrent = count === i + 1;
              return (
                <div
                  key={s.number}
                  className="relative flex flex-col items-center"
                >
                  {/* Milestone pill sitting exactly on the wave crest (y ≈ 14px) */}
                  <div
                    className={cn(
                      "mt-[2px] inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-all duration-400",
                      lit
                        ? "border-[#d97736] bg-[#111a24] text-white shadow-[0_6px_18px_rgba(217,119,54,0.28)]"
                        : "border-[#dcdad2] bg-[#f8f7f4] text-[#8b918f]"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                        lit ? "bg-[#d97736]" : "bg-[#c9c6bc]",
                        isCurrent && "animate-ping"
                      )}
                    />
                    <span className="font-heading text-[9px] font-extrabold tracking-[1.2px] tabular-nums">
                      {s.number}
                    </span>
                    <span
                      className={cn(
                        "text-[8px] font-bold tracking-[1.4px]",
                        lit ? "text-[#e9b17f]" : "text-[#9da3a0]"
                      )}
                    >
                      {STAGE_LABELS[i]}
                    </span>
                  </div>

                  {/* Vertical connector stem dropping from the crest badge down to the card top */}
                  <div className="relative w-[1.5px] flex-1 overflow-hidden bg-[#e2e0d8]">
                    <div
                      className={cn(
                        "w-full bg-gradient-to-b from-[#d97736] to-[#e9b17f] transition-all duration-500",
                        lit ? "h-full" : "h-0"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i] ?? Wrench;
            const lit = count >= i + 1;
            return (
              <article
                key={s.number}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[22px] border bg-white p-2 shadow-[0_1px_0_rgba(17,26,36,0.03)] transition-[box-shadow,border-color] duration-500 hover:border-[#e9c7a9] hover:shadow-[0_30px_60px_-20px_rgba(17,26,36,0.22)]",
                  lit ? "border-[#e4dfd5]" : "border-[#e8e7e2]"
                )}
              >
                {/* Top center notch where the vertical stem docks into the card */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute top-0 left-1/2 z-20 hidden h-1 w-8 -translate-x-1/2 rounded-b-full transition-colors duration-500 lg:block",
                    lit ? "bg-[#d97736]" : "bg-transparent"
                  )}
                />

                {/* Image */}
                <div className="relative h-[190px] overflow-hidden rounded-[16px] bg-[#e4e2dc] lg:h-[175px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(17,26,36,0.55)_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 font-heading text-[10px] font-bold text-[#15212b] tabular-nums backdrop-blur">
                    {s.number}
                  </span>
                  {s.tag && (
                    <span className="absolute top-3 right-3 rounded-full bg-[#d97736] px-2.5 py-1 text-[7px] font-bold tracking-[1.2px] text-white">
                      {s.tag}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 text-[9px] font-semibold tracking-[1px] text-white/90">
                    {META[i]}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-[16px] leading-tight font-bold tracking-[-0.4px] text-[#15212b]">
                      {s.title}
                    </h3>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f6efe8] text-[#d97736] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-[#d97736] group-hover:text-white">
                      <Icon className="size-4 stroke-[1.75]" />
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-[11px] leading-[1.75] text-[#7c8587]">
                    {s.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-dashed border-[#e6e4dd] pt-4">
                    <BookButton
                      variant="card-link"
                      service={s.title}
                      className="text-[10px]"
                    >
                      Book this service
                    </BookButton>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-[#e2e0d8] text-[#15212b] transition-all duration-300 group-hover:border-[#15212b] group-hover:bg-[#15212b] group-hover:text-white">
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer strip */}
        <div className="mt-8 flex flex-col gap-4 rounded-[18px] border border-[#e8e7e2] bg-white/70 px-5 py-4 backdrop-blur-sm md:flex-row md:items-center">
          <span className="text-[9px] font-bold tracking-[1.6px] text-[#d97736]">
            NEED SOMETHING ELSE?
          </span>
          <p className="flex-1 text-[11px] text-[#677176]">
            Panel replacement, off-track doors, maintenance plans &amp;
            commercial solutions.
          </p>
          <BookButton variant="dark" className="rounded-full px-5 py-3">
            Tell us what you need
            <ArrowUpRight className="size-3.5" />
          </BookButton>
        </div>
      </div>
    </section>
  );
}
