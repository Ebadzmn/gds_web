import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { BookingModal } from "@/features/northstar/components/booking-modal";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AnnouncementBar />
      <Header />
      <main id="top" className="flex-1">
        {children}
      </main>
      <Footer />
      <BookingModal />
    </div>
  );
}
