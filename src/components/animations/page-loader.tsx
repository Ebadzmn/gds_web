"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

export function PageLoader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReduced) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 680);

    return () => window.clearTimeout(timer);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111a24] text-white"
        >
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="grid h-10 w-10 place-items-center border border-[#45515a] text-[24px] text-[#d97736]">
              ⌂
            </span>
            <div>
              <b className="block font-heading text-[14px] font-extrabold tracking-[2.4px]">
                NORTHSTAR
              </b>
              <small className="mt-0.5 block text-[8px] tracking-[3.4px] text-[#aab3b7]">
                GARAGE DOORS
              </small>
            </div>
          </m.div>

          <div className="mt-6 h-[2px] w-36 overflow-hidden bg-white/10">
            <m.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left bg-[#d97736]"
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
