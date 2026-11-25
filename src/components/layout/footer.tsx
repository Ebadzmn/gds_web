import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { FooterMarquee } from "@/components/animations/footer-marquee";
import { siteConfig } from "@/config/site";
import { BookButton } from "@/features/northstar/components/book-button";
import { BrandMark } from "@/features/northstar/components/brand-mark";

const FOOTER_SERVICES = [
  "Garage Door Repair",
  "Spring Replacement",
  "Opener Repair & Install",
  "New Door Installation",
] as const;

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-grain relative overflow-hidden bg-[#0d151d] text-white">
      {/* Subtle architectural grid & ambient copper/navy glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_35%,transparent_100%)] bg-[length:64px_64px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/4 h-[380px] w-[380px] rounded-full bg-[#d97736]/[0.09] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-10 h-[340px] w-[340px] rounded-full bg-[#24394c]/35 blur-[110px]"
      />

      <div className="relative z-10 px-[22px] pt-14 md:px-[6%] md:pt-20 lg:px-[7%]">
        {/* Top Glassmorphic Dispatch & Booking Ribbon */}
        <div className="mb-14 flex flex-col justify-between gap-6 rounded-[24px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md md:mb-16 md:p-8 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[8px] font-bold tracking-[1.6px] text-[#e9b17f]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d97736]" />
              SAME-DAY LOCAL DISPATCH
            </div>
            <h3 className="mt-3 font-heading text-[24px] leading-tight font-semibold tracking-[-1px] text-white md:text-[30px]">
              Need a quick repair or{" "}
              <em className="font-serif font-normal text-[#e9b17f] italic">
                a custom door quote?
              </em>
            </h3>
            <p className="mt-1.5 text-[11px] text-[#9ba6ab] md:text-[12px]">
              Book an arrival window online in under two minutes or speak
              directly with our dispatch team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-[11px] font-bold text-white transition-all hover:-translate-y-0.5 hover:border-[#e9b17f]/60 hover:bg-white/[0.08]"
            >
              <Phone className="size-3.5 stroke-[1.75] text-[#e9b17f]" />
              <span>{siteConfig.phone}</span>
            </a>
            <BookButton
              variant="accent"
              className="rounded-full px-6 py-3.5 text-[11px]"
            >
              <span>Schedule a visit</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </BookButton>
          </div>
        </div>

        {/* Main 4-Column Architectural Directory */}
        <div className="grid grid-cols-1 gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1fr_1.15fr] lg:gap-12">
          {/* Column 1: Brand & Credentials */}
          <div>
            <BrandMark variant="light" />
            <p className="mt-5 max-w-[290px] text-[11px] leading-[1.85] text-[#9ba5a9]">
              {siteConfig.tagline} Thoughtful repairs, quiet openers, and
              architectural garage doors installed with lasting care.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold tracking-[1px] text-[#c4ccd0]">
              <ShieldCheck className="size-3.5 stroke-[1.75] text-[#d97736]" />
              <span>LICENSED · INSURED · 5-YR WARRANTY</span>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={siteConfig.phoneHref}
                aria-label="Call Northstar"
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-[#c4cacc] transition-all hover:-translate-y-0.5 hover:border-[#d97736] hover:bg-[#d97736] hover:text-white"
              >
                <Phone className="size-3.5 stroke-[1.75]" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email Northstar"
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-[#c4cacc] transition-all hover:-translate-y-0.5 hover:border-[#d97736] hover:bg-[#d97736] hover:text-white"
              >
                <Mail className="size-3.5 stroke-[1.75]" />
              </a>
              <a
                href="#services"
                aria-label="Explore services"
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-[#c4cacc] transition-all hover:-translate-y-0.5 hover:border-[#d97736] hover:bg-[#d97736] hover:text-white"
              >
                <MapPin className="size-3.5 stroke-[1.75]" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="flex flex-col items-start">
            <span className="mb-4 font-heading text-[9px] font-bold tracking-[1.8px] text-[#e9b17f]">
              01 // EXPLORE
            </span>
            <ul className="space-y-3">
              {[
                { label: "Our services", href: "#services" },
                { label: "Door collection", href: "#doors" },
                { label: "About Northstar", href: "#about" },
                { label: "Customer stories", href: "#reviews" },
                { label: "Contact & dispatch", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[11px] font-medium text-[#aab3b7] transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#d97736]/60 transition-transform duration-300 group-hover:scale-150 group-hover:bg-[#d97736]" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Service Booking */}
          <div className="flex flex-col items-start">
            <span className="mb-4 font-heading text-[9px] font-bold tracking-[1.8px] text-[#e9b17f]">
              02 // SERVICES
            </span>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <BookButton
                    variant="card-link"
                    service={service}
                    className="text-[11px] font-medium text-[#aab3b7] hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#d97736]/60 transition-transform duration-300 group-hover:scale-150 group-hover:bg-[#d97736]" />
                    <span>{service}</span>
                  </BookButton>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hours & Contact Card */}
          <div>
            <span className="mb-4 block font-heading text-[9px] font-bold tracking-[1.8px] text-[#e9b17f]">
              03 // DISPATCH &amp; HOURS
            </span>
            <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-[10px] font-semibold text-white">
                <Clock className="size-3.5 stroke-[1.75] text-[#d97736]" />
                <span>Service Hours</span>
              </div>
              <div className="mt-3 space-y-2 text-[10px] text-[#aab3b7] tabular-nums">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <b className="font-semibold text-white">8:00 AM – 6:00 PM</b>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <b className="font-semibold text-white">9:00 AM – 2:00 PM</b>
                </div>
                <div className="flex justify-between">
                  <span>Emergency</span>
                  <b className="font-semibold text-[#e9b17f]">24/7 On-Call</b>
                </div>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3.5 block truncate border-t border-white/10 pt-3 text-[10px] font-medium text-[#9ba5a9] transition-colors hover:text-[#e9b17f]"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Company Name Marquee Showcase Band */}
      <FooterMarquee />

      {/* Bottom Legal & Back-to-Top Bar */}
      <div className="relative z-10 flex flex-col items-center justify-between gap-4 px-[22px] py-6 text-[9px] font-semibold tracking-[1.4px] text-[#758187] sm:flex-row md:px-[6%] lg:px-[7%]">
        <span>© {year} NORTHSTAR GARAGE DOORS. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-5">
          <a href="#top" className="transition-colors hover:text-white">
            PRIVACY
          </a>
          <span>·</span>
          <a href="#top" className="transition-colors hover:text-white">
            TERMS
          </a>
          <span>·</span>
          <a href="#top" className="transition-colors hover:text-white">
            ACCESSIBILITY
          </a>
        </div>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[9px] font-bold tracking-[1.4px] text-white transition-all hover:border-[#d97736] hover:bg-[#d97736]"
        >
          <span>TOP</span>
          <ArrowUp className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
