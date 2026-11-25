import { CalendarCheck } from "lucide-react";
import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { ParallaxImage } from "@/components/animations/parallax-image";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { BookButton } from "@/features/northstar/components/book-button";

const BOOKING_HIGHLIGHTS = [
  {
    num: "01",
    title: "Choose a service",
    detail: "Repairs, springs, openers, or new doors",
  },
  {
    num: "02",
    title: "Pick a time window",
    detail: "2-hour arrival windows that respect your day",
  },
  {
    num: "03",
    title: "We’ll be in touch",
    detail: "Instant confirmation & upfront written quote",
  },
];

export function BookingBand() {
  return (
    <section className="bg-grain grid min-h-[540px] grid-cols-1 bg-[#111a24] text-white md:grid-cols-2">
      <div className="h-[260px] min-h-[260px] overflow-hidden md:h-auto md:min-h-[540px]">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=85"
          alt="Professional technician"
          speed={10}
          className="h-full w-full object-cover saturate-[0.7]"
        />
      </div>

      <div className="px-[25px] pt-[52px] pb-[55px] md:pt-[78px] md:pr-[12%] md:pb-[65px] md:pl-[10%]">
        <FadeIn y={10}>
          <div className="flex items-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#d4d8d9]">
            <span className="inline-block h-px w-[25px] bg-[#d97736]" />
            YOUR TIME MATTERS
          </div>
        </FadeIn>

        <EditorialHeading className="my-[22px] font-heading text-[48px] leading-[1.06] font-semibold tracking-[-3px] md:text-[clamp(43px,5vw,62px)]">
          Getting it fixed
          <br />
          should be{" "}
          <em className="font-serif font-normal italic">the easy part.</em>
        </EditorialHeading>

        <FadeIn delay={0.1}>
          <p className="max-w-[400px] text-[12px] leading-[1.9] text-[#b7c0c4]">
            Choose your service, pick a time that suits you, and leave the rest
            to us. A better service visit starts with a better booking
            experience.
          </p>
        </FadeIn>

        <Stagger
          staggerDelay={0.08}
          className="mt-7 mb-8 flex flex-col gap-3.5"
        >
          {BOOKING_HIGHLIGHTS.map((step) => (
            <StaggerItem key={step.num}>
              <div className="group border-l-2 border-[#d97736]/35 pl-4 transition-colors duration-300 hover:border-[#d97736]">
                <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#f1f2f0]">
                  <span className="font-heading text-[10px] font-bold text-[#df9860] tabular-nums">
                    {step.num}
                  </span>
                  <span>{step.title}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-[#98a3a8]">
                  {step.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center gap-5">
            <BookButton variant="accent">
              <span>Book your appointment</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </BookButton>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium text-[#b7c0c4]">
              <CalendarCheck className="size-3.5 stroke-[1.75] text-[#df9860]" />
              Same-day slots available
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
