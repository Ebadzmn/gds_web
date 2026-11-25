import { EditorialHeading } from "@/components/animations/editorial-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { ParallaxImage } from "@/components/animations/parallax-image";

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-grain grid grid-cols-1 bg-[#1b2934] text-white md:grid-cols-2"
    >
      <div className="h-[290px] min-h-[290px] overflow-hidden md:h-auto md:min-h-[560px]">
        <ParallaxImage
          src="https://images.pexels.com/photos/8387509/pexels-photo-8387509.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Custom residential garage door craftsmanship"
          speed={10}
          className="h-full w-full object-cover saturate-[0.7]"
        />
      </div>

      <div className="px-[25px] py-[55px] md:pt-[90px] md:pr-[12%] md:pb-[75px] md:pl-[11%]">
        <FadeIn y={10}>
          <div className="flex items-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#d4d8d9]">
            <span className="inline-block h-px w-[25px] bg-[#d97736]" />A LITTLE
            ABOUT NORTHSTAR
          </div>
        </FadeIn>

        <EditorialHeading className="my-[22px] font-heading text-[51px] leading-[1.06] font-semibold tracking-[-3px] md:text-[62px]">
          Good work is
          <br />
          in the <em className="font-serif font-normal italic">details.</em>
        </EditorialHeading>

        <FadeIn delay={0.1}>
          <p className="max-w-[410px] text-[12px] leading-[1.9] text-[#b7c0c4]">
            Every millimeter matters—from properly tensioned torsion springs and
            sealed nylon rollers to weather-tight bottom seals that keep your
            garage quiet and insulated.
          </p>
          <p className="mt-3 max-w-[410px] text-[12px] leading-[1.9] text-[#b7c0c4]">
            We never rush a balance test or swap parts you don’t need. Our
            technicians calibrate tracks, cables, and safety sensors by hand so
            your door glides effortlessly year-round.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mt-8 grid max-w-[400px] grid-cols-3 gap-4 border-y border-white/15 py-4">
            <div>
              <b className="block font-heading text-[18px] font-bold text-[#e6a36e]">
                14+ Yrs
              </b>
              <small className="text-[8px] tracking-[1px] text-[#aab2b5]">
                LOCAL EXPERIENCE
              </small>
            </div>
            <div>
              <b className="block font-heading text-[18px] font-bold text-white">
                2,400+
              </b>
              <small className="text-[8px] tracking-[1px] text-[#aab2b5]">
                DOORS SERVICED
              </small>
            </div>
            <div>
              <b className="block font-heading text-[18px] font-bold text-white">
                5-Yr
              </b>
              <small className="text-[8px] tracking-[1px] text-[#aab2b5]">
                WORKMANSHIP
              </small>
            </div>
          </div>

          <div className="mt-7 mb-5 flex flex-col">
            <span className="font-serif text-[30px] text-[#e6a36e] italic">
              Northstar
            </span>
            <small className="mt-1 text-[8px] tracking-[1.5px] text-[#aab2b5]">
              THE NORTHSTAR TEAM
            </small>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 py-2 text-[11px] font-bold text-white transition-colors hover:text-[#d97736]"
          >
            <span>Get to know us</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
