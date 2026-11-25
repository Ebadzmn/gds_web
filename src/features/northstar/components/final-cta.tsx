import { ArrowUpRight, Check, Phone } from "lucide-react";
import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { siteConfig } from "@/config/site";
import { BookButton } from "@/features/northstar/components/book-button";

const CTA_PERKS = [
  "No upfront deposit",
  "Upfront written quote",
  "5-year workmanship warranty",
] as const;

export function FinalCta() {
  return (
    <section
      id="contact"
      className="bg-grain relative overflow-hidden bg-[#14202b] px-[22px] py-[76px] text-center text-white md:py-[104px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,54,0.12),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeIn y={10}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-[9px] font-bold tracking-[1.8px] text-[#e9b17f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d97736]" />
            LET’S GET IT MOVING
          </div>
        </FadeIn>

        <EditorialHeading className="mt-5 mb-3 font-heading text-[46px] leading-[1.04] font-semibold tracking-[-2.5px] md:text-[62px] md:tracking-[-3.5px]">
          Ready for a better
          <br />
          <em className="font-serif font-normal text-[#e9b17f] italic">
            garage door day?
          </em>
        </EditorialHeading>

        <FadeIn delay={0.1}>
          <p className="mx-auto mb-8 max-w-[420px] text-[12px] leading-[1.9] text-[#b7c0c4] md:text-[13px]">
            Tell us what’s going on with your door or opener. We’ll help you
            figure out the clearest, most reliable next step.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mx-auto flex max-w-[320px] flex-col items-stretch justify-center gap-3.5 sm:max-w-none sm:flex-row sm:items-center">
            <BookButton
              variant="accent"
              className="rounded-full px-7 py-4 text-[11px]"
            >
              <span>Schedule an appointment</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </BookButton>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/18 bg-white/[0.03] px-6 py-4 text-[11px] font-bold tracking-[0.2px] text-white transition duration-250 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.08]"
            >
              <Phone className="size-3.5 stroke-[1.75] text-[#e9b17f]" />
              Call {siteConfig.phone}
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-medium text-[#9aa6ac]">
            {CTA_PERKS.map((perk) => (
              <span key={perk} className="inline-flex items-center gap-1.5">
                <Check className="size-3 stroke-[2.25] text-[#d97736]" />
                {perk}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
