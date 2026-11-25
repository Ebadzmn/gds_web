"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Intercept in-page anchor links so they glide smoothly via Lenis
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const el =
        href === "#top"
          ? document.documentElement
          : document.querySelector(href);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: href === "#top" ? 0 : -82,
        duration: 1.3,
      });
    };

    document.addEventListener("click", handleAnchorClick);

    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.clearTimeout(refreshId);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
