import { create } from "zustand";

interface BookingModalState {
  isOpen: boolean;
  preselectedService: string;
  openBooking: (service?: string) => void;
  closeBooking: () => void;
}

export const useBookingStore = create<BookingModalState>()((set) => ({
  isOpen: false,
  preselectedService: "",
  openBooking: (service = "") =>
    set({
      isOpen: true,
      preselectedService: service,
    }),
  closeBooking: () => set({ isOpen: false }),
}));
