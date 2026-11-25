"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  ClipboardList,
  FileCheck2,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { BookButton } from "@/features/northstar/components/book-button";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    number: "01",
    tag: "INTAKE",
    title: "Tell us what you need",
    description:
      "Choose a service and share a few details about your door, springs, or opener so our truck arrives fully stocked.",
    deliverable: "2-MIN ONLINE REQUEST · NO DEPOSIT",
    highlights: ["All door & opener brands", "Emergency slots prioritized"],
    side: "left" as const,
    Icon: ClipboardList,
  },
  {
    number: "02",
    tag: "SCHEDULING",
    title: "Choose a convenient time",
    description:
      "Pick a tight 2-hour arrival window that fits your day—no all-day waiting around the house.",
    deliverable: "2-HR ARRIVAL WINDOW · TEXT ALERTS",
    highlights: [
      "Same-day & next-day windows",
      "Live technician heads-up call",
    ],
    side: "right" as const,
    Icon: CalendarClock,
  },
  {
    number: "03",
    tag: "DIAGNOSTIC",
    title: "On-site safety inspection",
    description:
      "A licensed technician tests spring tension, cables, rollers, tracks, and photo-eye sensors in person.",
    deliverable: "18-POINT SAFETY & BALANCE CHECK",
    highlights: ["Full counterbalance test", "Track & hardware alignment"],
    side: "left" as const,
    Icon: SearchCheck,
  },
  {
    number: "04",
    tag: "ESTIMATE",
    title: "Upfront written quote",
    description:
      "Review clear, itemized repair or replacement options before a single tool touches your door.",
    deliverable: "ITEMIZED OPTIONS · ZERO SURPRISES",
    highlights: ["Transparent parts & labor", "Approve before work begins"],
    side: "right" as const,
    Icon: FileCheck2,
  },
  {
    number: "05",
    tag: "COMPLETION",
    title: "Precision work & final check",
    description:
      "Careful execution, whisper-quiet lubrication, cycle testing, and a spotless garage before we leave.",
    deliverable: "5-YEAR WORKMANSHIP WARRANTY",
    highlights: [" Safety reverse verification", "Clean workspace guarantee"],
    side: "left" as const,
    Icon: ShieldCheck,
  },
] as const;

// Vertical harmonic S-wave whose horizontal crests/valleys align with the 5 step centers (100, 300, 500, 700, 900)
const VERTICAL_SNAKE_PATH =
  "M 30 0 C 30 50, 14 50, 14 100 C 14 150, 46 150, 46 300 C 46 450, 14 450, 14 500 C 14 550, 46 550, 46 700 C 46 850, 14 850, 14 900 C 14 950, 30 950, 30 1000";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const waveGlowRef = useRef<SVGPathElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(5);

  useEffect(() => {
    const timelineEl = timelineRef.current;
    const wavePath = wavePathRef.current;
    const waveGlow = waveGlowRef.current;
    if (!timelineEl || !wavePath || prefersReduced) return;

    const totalLength = wavePath.getTotalLength();
    gsap.set(wavePath, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });
    if (waveGlow) {
      gsap.set(waveGlow, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });
    }

    const steps = stepRefs.current.filter((el): el is HTMLDivElement =>
      Boolean(el)
    );
    const badges = badgeRefs.current.filter((el): el is HTMLDivElement =>
      Boolean(el)
    );

    const mm = gsap.matchMedia();

    // Desktop: scrubbed vertical S-wave spine + alternating 1-by-1 card & opposite deliverable reveals
    mm.add("(min-width: 768px)", () => {
      setActiveStep(0);

      steps.forEach((stepEl, idx) => {
        const isLeft = PROCESS_STEPS[idx]?.side === "left";
        gsap.set(stepEl, {
          x: isLeft ? -48 : 48,
          y: 32,
          opacity: 0,
          scale: 0.96,
        });
      });

      badges.forEach((badgeEl, idx) => {
        const isLeft = PROCESS_STEPS[idx]?.side === "left";
        gsap.set(badgeEl, {
          x: isLeft ? 28 : -28,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineEl,
          start: "top 76%",
          end: "bottom 55%",
          scrub: 0.65,
          onUpdate: (self) => {
            const p = self.progress;
            const count =
              p < 0.05
                ? 0
                : p < 0.24
                  ? 1
                  : p < 0.44
                    ? 2
                    : p < 0.64
                      ? 3
                      : p < 0.84
                        ? 4
                        : 5;
            setActiveStep(count);
          },
        },
      });

      tl.to(wavePath, { strokeDashoffset: 0, duration: 5, ease: "none" }, 0);
      if (waveGlow) {
        tl.to(waveGlow, { strokeDashoffset: 0, duration: 5, ease: "none" }, 0);
      }

      steps.forEach((stepEl, idx) => {
        tl.to(
          stepEl,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          idx * 0.95
        );
      });

      badges.forEach((badgeEl, idx) => {
        tl.to(
          badgeEl,
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          idx * 0.95 + 0.15
        );
      });
    });

    // Mobile: left spine + 1-by-1 bottom-up reveal
    mm.add("(max-width: 767px)", () => {
      setActiveStep(5);

      gsap.to(wavePath, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineEl,
          start: "top 80%",
          once: true,
        },
      });

      steps.forEach((stepEl) => {
        gsap.fromTo(
          stepEl,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepEl,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f7f4] px-[22px] py-[70px] md:px-[6%] md:pt-[100px] md:pb-[110px] lg:px-[7%]"
    >
      {/* Subtle architectural dot matrix & warm copper/navy ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d5d3ca_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_45%,transparent_100%)] bg-[length:26px_26px] opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-[-8%] h-[440px] w-[440px] rounded-full bg-[#d97736]/[0.06] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 left-[-8%] h-[400px] w-[400px] rounded-full bg-[#111a24]/[0.045] blur-[110px]"
      />

      {/* Section Header */}
      <div className="relative z-10 mx-auto mb-12 flex max-w-5xl flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e0d8] bg-white px-3 py-1.5 text-[9px] font-bold tracking-[1.8px] text-[#5e696e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d97736]" />
            01 — 05 · HOW IT WORKS
          </div>
          <h2 className="mt-5 font-heading text-[42px] leading-[1.02] font-semibold tracking-[-2.5px] text-[#15212b] md:text-[clamp(44px,4.6vw,64px)] md:tracking-[-3.5px]">
            Here’s how it{" "}
            <em className="font-serif font-normal text-[#d97736] italic">
              works.
            </em>
          </h2>
        </div>

        <div className="max-w-[340px]">
          <p className="text-[12px] leading-[1.85] text-[#6d777b] md:text-[13px]">
            A clear five-step process, a friendly licensed team, and zero
            unnecessary surprises from start to finish.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="font-heading text-[28px] font-bold tracking-[-1px] text-[#15212b] tabular-nums">
              0{activeStep}
              <span className="text-[15px] text-[#b5b9b6]">/05</span>
            </span>
            <span className="text-[9px] font-bold tracking-[1.6px] text-[#8b918f]">
              {activeStep < 5 ? "SCROLL THROUGH STEPS" : "COMPLETE WORKFLOW"}
            </span>
          </div>
        </div>
      </div>

      {/* Alternating 5-Step Vertical Architectural Conduit Timeline */}
      <div ref={timelineRef} className="relative z-10 mx-auto max-w-5xl">
        {/* Center Vertical Harmonic S-Wave Conduit */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 bottom-6 left-4 w-[60px] -translate-x-1/2 md:left-1/2"
        >
          {/* Straight center datum reference line */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,#dedcd3_8%,#dedcd3_92%,transparent)]" />

          <svg
            viewBox="0 0 60 1000"
            fill="none"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient
                id="verticalCopperGrad"
                x1="0"
                y1="0"
                x2="0"
                y2="1000"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#e9b17f" />
                <stop offset="50%" stopColor="#d97736" />
                <stop offset="100%" stopColor="#b85b22" />
              </linearGradient>
            </defs>

            {/* Base wave shadow */}
            <path
              d={VERTICAL_SNAKE_PATH}
              stroke="#e5e3db"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Fine dashed architectural guide wave */}
            <path
              d={VERTICAL_SNAKE_PATH}
              stroke="#c9c6bc"
              strokeWidth="1.25"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
            {/* Soft copper ambient glow stroke */}
            <path
              ref={waveGlowRef}
              d={VERTICAL_SNAKE_PATH}
              stroke="#d97736"
              strokeOpacity="0.22"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Crisp active copper wave */}
            <path
              ref={wavePathRef}
              d={VERTICAL_SNAKE_PATH}
              stroke="url(#verticalCopperGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="space-y-8 md:space-y-12">
          {PROCESS_STEPS.map((item, idx) => {
            const isLeft = item.side === "left";
            const isLit = activeStep >= idx + 1;
            const isCurrent = activeStep === idx + 1;
            const StepIcon = item.Icon;

            return (
              <div
                key={item.number}
                className="relative grid grid-cols-1 items-center pl-12 md:grid-cols-2 md:gap-24 md:pl-0"
              >
                {/* True 1:1 Center Milestone Badge on the Spine */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-8 left-4 z-20 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-xl border transition-all duration-400 md:top-1/2 md:left-1/2 md:-translate-y-1/2",
                    isLit
                      ? "border-[#d97736] bg-[#111a24] text-white shadow-[0_0_0_6px_rgba(217,119,54,0.16)]"
                      : "border-[#d8d6ce] bg-[#f8f7f4] text-[#8b918f]"
                  )}
                >
                  {isCurrent && (
                    <span className="absolute inset-0 animate-ping rounded-xl border border-[#d97736] opacity-40" />
                  )}
                  <span className="font-heading text-[10px] font-extrabold tabular-nums">
                    {item.number}
                  </span>
                </div>

                {/* Horizontal connector arm from spine to active card (desktop) */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute top-1/2 hidden h-[1.5px] w-10 -translate-y-1/2 transition-colors duration-400 md:block",
                    isLit ? "bg-[#d97736]" : "bg-[#e2e0d8]",
                    isLeft ? "right-1/2 mr-[18px]" : "left-1/2 ml-[18px]"
                  )}
                />

                {/* Opposite-side Architectural Deliverable Pill & Watermark Numeral (desktop) */}
                <div
                  ref={(el) => {
                    badgeRefs.current[idx] = el;
                  }}
                  className={cn(
                    "hidden flex-col justify-center md:flex",
                    isLeft
                      ? "md:col-start-2 md:row-start-1 md:items-start md:pl-2"
                      : "md:col-start-1 md:row-start-1 md:items-end md:pr-2"
                  )}
                >
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "block font-heading text-[76px] leading-none font-extrabold tracking-[-4px] transition-colors duration-500 select-none",
                        isLit
                          ? "text-[#d97736]/[0.13]"
                          : "text-[#111a24]/[0.045]"
                      )}
                    >
                      {item.number}
                    </span>
                    <div
                      className={cn(
                        "mt-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[9px] font-bold tracking-[1.4px] transition-all duration-400",
                        isLit
                          ? "border-[#e9c7a9] bg-white text-[#15212b] shadow-[0_8px_20px_rgba(17,26,36,0.05)]"
                          : "border-[#e4e2da] bg-[#f3f2ed] text-[#8b918f]"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isLit ? "bg-[#d97736]" : "bg-[#c9c6bc]"
                        )}
                      />
                      <span>{item.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Main Step Card */}
                <div
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={cn(
                    "group relative rounded-[22px] border bg-white p-6 transition-all duration-500 hover:border-[#e9c7a9] hover:shadow-[0_28px_56px_-18px_rgba(17,26,36,0.16)] md:p-7",
                    isLit
                      ? "border-[#e4dfd5] shadow-[0_14px_34px_-12px_rgba(17,26,36,0.07)]"
                      : "border-[#e8e7e2]",
                    isLeft
                      ? "md:col-start-1 md:row-start-1"
                      : "md:col-start-2 md:row-start-1"
                  )}
                >
                  {/* Side docking notch where horizontal connector arm meets the card */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute top-1/2 hidden h-7 w-1 -translate-y-1/2 transition-colors duration-400 md:block",
                      isLeft
                        ? "right-0 rounded-l-full"
                        : "left-0 rounded-r-full",
                      isLit ? "bg-[#d97736]" : "bg-transparent"
                    )}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#f6efe8] px-2.5 py-1 text-[9px] font-bold tracking-[1.4px] text-[#d97736]">
                        <span>STEP {item.number}</span>
                        <span className="text-[#d97736]/40">·</span>
                        <span>{item.tag}</span>
                      </div>
                      <h3 className="mt-3 font-heading text-[18px] leading-snug font-bold tracking-[-0.4px] text-[#15212b] md:text-[20px]">
                        {item.title}
                      </h3>
                    </div>

                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-[#d97736] group-hover:text-white",
                        isLit
                          ? "bg-[#111a24] text-[#e9b17f]"
                          : "bg-[#f6efe8] text-[#d97736]"
                      )}
                    >
                      <StepIcon className="size-5 stroke-[1.75]" />
                    </span>
                  </div>

                  <p className="mt-3 text-[12px] leading-[1.8] text-[#6d777b]">
                    {item.description}
                  </p>

                  {/* Micro-checklist footer */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-dashed border-[#e6e4dd] pt-4">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#47515a]"
                      >
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-[#f6efe8] text-[#d97736]">
                          <Check className="size-2.5 stroke-[2.5]" />
                        </span>
                        {h.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Terminal CTA Dock */}
        <div className="relative z-20 mt-12 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-[#e4dfd5] bg-white/85 px-6 py-5 shadow-[0_16px_40px_-15px_rgba(17,26,36,0.08)] backdrop-blur-sm sm:flex-row">
          <div className="flex items-center gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#111a24] text-[#e9b17f]">
              <ShieldCheck className="size-5 stroke-[1.75]" />
            </span>
            <div>
              <b className="block font-heading text-[14px] font-bold text-[#15212b]">
                Ready to start Step 01?
              </b>
              <small className="text-[11px] text-[#6d777b]">
                Most service requests are confirmed within 15 minutes during
                business hours.
              </small>
            </div>
          </div>

          <BookButton variant="accent" className="rounded-full px-6 py-3.5">
            Schedule your visit
            <ArrowUpRight className="size-3.5" />
          </BookButton>
        </div>
      </div>
    </section>
  );
}
