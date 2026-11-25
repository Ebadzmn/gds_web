"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import { PageLoader } from "@/components/animations/page-loader";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/providers/lenis-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <LazyMotion features={domAnimation} strict>
          <LenisProvider>
            <PageLoader />
            <ScrollProgress />
            {children}
            <Toaster richColors position="bottom-right" />
          </LenisProvider>
        </LazyMotion>
      </QueryProvider>
    </ThemeProvider>
  );
}
