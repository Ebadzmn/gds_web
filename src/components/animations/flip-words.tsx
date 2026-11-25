"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: readonly string[];
  intervalMs?: number;
  className?: string;
}

export function FlipWords({
  words,
  intervalMs = 3200,
  className,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [reduced, words.length, intervalMs]);

  const currentWord = words[index] ?? words[0] ?? "";

  if (reduced) {
    return <em className={cn(className)}>{words[0]}</em>;
  }

  return (
    <span className="relative inline-grid items-baseline overflow-visible">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.em
          key={currentWord}
          initial={{
            opacity: 0,
            y: 14,
            scale: 0.97,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -14,
            scale: 1.02,
            filter: "blur(12px)",
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "col-start-1 row-start-1 inline-block whitespace-nowrap will-change-[transform,opacity,filter]",
            className
          )}
        >
          {currentWord.split("").map((char, charIdx) => (
            <m.span
              key={`${currentWord}-${charIdx}`}
              initial={{
                opacity: 0,
                y: 8,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.65,
                delay: charIdx * 0.025,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block whitespace-pre"
            >
              {char}
            </m.span>
          ))}
        </m.em>
      </AnimatePresence>
    </span>
  );
}
