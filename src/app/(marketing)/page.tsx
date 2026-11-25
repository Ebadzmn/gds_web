import { AboutSection } from "@/features/northstar/components/about-section";
import { BookingBand } from "@/features/northstar/components/booking-band";
import { DoorShowcase } from "@/features/northstar/components/door-showcase";
import { FaqSection } from "@/features/northstar/components/faq-section";
import { FinalCta } from "@/features/northstar/components/final-cta";
import { HeroSection } from "@/features/northstar/components/hero-section";
import { ProcessSection } from "@/features/northstar/components/process-section";
import { ReviewsSection } from "@/features/northstar/components/reviews-section";
import { ServiceAreaSection } from "@/features/northstar/components/service-area-section";
import { ServicesSection } from "@/features/northstar/components/services-section";
import { TeamGallerySection } from "@/features/northstar/components/team-gallery-section";
import { TrustStrip } from "@/features/northstar/components/trust-strip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <BookingBand />
      <DoorShowcase />
      <AboutSection />
      <TeamGallerySection />
      <ProcessSection />
      <ReviewsSection />
      <ServiceAreaSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
