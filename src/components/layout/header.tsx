"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BookButton } from "@/features/northstar/components/book-button";
import { BrandMark } from "@/features/northstar/components/brand-mark";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-white/40 bg-[#f8f7f4]/65 px-[18px] shadow-[0_8px_32px_rgba(17,26,36,0.06)] backdrop-blur-xl backdrop-saturate-150 md:h-[82px] md:px-[4%] lg:px-[5.5%]">
      <BrandMark onClick={() => setMenuOpen(false)} />

      <nav
        aria-label="Main navigation"
        className={cn(
          "md:flex md:items-center md:gap-[17px] lg:gap-[31px]",
          menuOpen
            ? "absolute top-[68px] right-0 left-0 flex flex-col gap-1 border-b border-white/40 bg-[#f8f7f4]/90 px-[22px] pt-[18px] pb-[24px] shadow-[0_12px_24px_rgba(17,26,36,0.08)] backdrop-blur-xl"
            : "hidden"
        )}
      >
        {siteConfig.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="relative border-b border-[#e8e7e2] py-3 text-[12px] font-semibold text-[#47515a] transition-colors hover:text-[#d97736] md:border-b-0 md:py-0 md:text-[11px] md:after:absolute md:after:-bottom-[6px] md:after:left-0 md:after:h-[1.5px] md:after:w-full md:after:origin-left md:after:scale-x-0 md:after:bg-[#d97736] md:after:transition-transform md:after:duration-300 md:hover:after:scale-x-100 lg:text-[12px]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-3 md:flex lg:gap-[22px]">
        <a
          href={siteConfig.phoneHref}
          className="flex items-center gap-2 text-[12px] font-bold text-[#1c2630] transition-colors hover:text-[#d97736]"
        >
          <Phone className="size-3.5 stroke-[1.75] text-[#d97736]" />
          <span className="hidden lg:inline">{siteConfig.phone}</span>
        </a>
        <BookButton variant="dark">Book a Visit ↗</BookButton>
      </div>

      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
        className="border-0 bg-transparent p-1 text-[#1b2934] md:hidden"
      >
        {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
    </header>
  );
}
