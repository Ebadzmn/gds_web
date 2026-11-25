import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="relative flex h-[34px] items-center justify-start gap-[10px] bg-[#111a24] px-[17px] text-[7px] font-bold tracking-[0.9px] text-[#d6d9d8] md:justify-center md:px-0 md:text-[9px] md:tracking-[1.4px]">
      <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#d97736] shadow-[0_0_0_4px_rgba(217,119,54,0.17)]" />
      <span className="text-[#e9b17f]">NORTHSTAR</span>
      <span className="opacity-35">/</span>
      <span>LOCAL GARAGE DOOR EXPERTS</span>
      <span className="hidden opacity-35 sm:inline">/</span>
      <span className="hidden sm:inline">SERVICE YOU CAN COUNT ON</span>
      <a
        href={siteConfig.phoneHref}
        className="hidden text-[#e9b17f] md:absolute md:right-[5.5%] md:inline"
      >
        Call {siteConfig.phone} ↗
      </a>
    </div>
  );
}
