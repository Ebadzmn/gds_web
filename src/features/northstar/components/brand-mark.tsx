import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  variant?: "dark" | "light";
  compact?: boolean;
  onClick?: () => void;
}

export function BrandMark({
  variant = "dark",
  compact = false,
  onClick,
}: BrandMarkProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="#top"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3",
        isLight ? "text-white" : "text-[#111a24]"
      )}
    >
      <span
        className={cn(
          "relative grid place-items-center border transition-colors duration-300",
          isLight
            ? "border-[#d97736]/60 bg-white/[0.04] group-hover:border-[#d97736]"
            : "border-[#111a24] bg-[#111a24] text-white group-hover:border-[#d97736]",
          compact
            ? "h-[34px] w-[34px]"
            : "h-[36px] w-[36px] md:h-[42px] md:w-[42px]"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={cn(compact ? "h-4 w-4" : "h-[19px] w-[19px]")}
        >
          <path
            d="M3 10.5L12 4L21 10.5V20H3V10.5Z"
            stroke="#d97736"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M7 13.5H17M7 16.5H17"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>
        <b
          className={cn(
            "flex items-center gap-1 font-heading leading-none font-extrabold tracking-[2.6px]",
            compact ? "text-[13px]" : "text-[14px] md:text-[17px]"
          )}
        >
          <span>{siteConfig.shortName}</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#d97736]" />
        </b>
        <small
          className={cn(
            "mt-[3px] block font-bold tracking-[3.4px] text-[#d97736]",
            compact ? "text-[7px]" : "text-[7.5px] md:text-[8.5px]"
          )}
        >
          {siteConfig.subName}
        </small>
      </span>
    </Link>
  );
}
