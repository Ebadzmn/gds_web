import { Clock, MessageSquareCheck, ShieldCheck } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const TRUST_ITEMS = [
  {
    Icon: ShieldCheck,
    title: "Respect for your home",
    subtitle: "Clean, careful workmanship",
  },
  {
    Icon: Clock,
    title: "Convenient scheduling",
    subtitle: "Time slots that work for you",
  },
  {
    Icon: MessageSquareCheck,
    title: "Clear communication",
    subtitle: "No guesswork, just answers",
  },
];

export function TrustStrip() {
  return (
    <Stagger
      staggerDelay={0.09}
      className="grid grid-cols-2 items-center gap-5 border-b border-[#e2e0d8] bg-[#eeede8] px-[22px] py-[25px] md:grid-cols-[1.25fr_1fr_1fr_1fr] md:gap-0 md:divide-x md:divide-[#dcdad3] md:px-[7%] md:py-[31px] lg:px-[10.5%]"
    >
      <StaggerItem className="col-span-2 font-heading text-[15px] leading-[1.45] font-medium text-[#687077] md:col-span-1 md:pr-6">
        A better garage door
        <br />
        <b className="text-[#202d37]">experience starts here.</b>
      </StaggerItem>

      {TRUST_ITEMS.map(({ Icon, title, subtitle }) => (
        <StaggerItem key={title} className="md:px-6 lg:px-8">
          <div className="group flex items-center gap-3">
            <Icon className="size-5 shrink-0 stroke-[1.5] text-[#d97736] transition-transform duration-300 group-hover:scale-110" />
            <div>
              <b className="block text-[9px] md:text-[10px]">{title}</b>
              <small className="mt-1 block text-[8px] text-[#7d8587] md:text-[9px]">
                {subtitle}
              </small>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
