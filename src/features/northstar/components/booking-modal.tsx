"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Clock, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { BrandMark } from "@/features/northstar/components/brand-mark";
import { SERVICE_CHOICES, TIME_WINDOWS } from "@/features/northstar/data";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/store/booking-store";

interface BookingFormState {
  service: string;
  issue: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
  address: string;
}

const STEPS = [
  { num: 1, label: "Your service" },
  { num: 2, label: "Date & time" },
  { num: 3, label: "Your details" },
  { num: 4, label: "Review" },
] as const;

export function BookingModal() {
  const { isOpen, preselectedService, closeBooking } = useBookingStore();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <BookingModalDialog
          key={preselectedService || "default"}
          initialService={preselectedService}
          closeBooking={closeBooking}
          prefersReduced={Boolean(prefersReduced)}
        />
      )}
    </AnimatePresence>
  );
}

function BookingModalDialog({
  initialService,
  closeBooking,
  prefersReduced,
}: {
  initialService: string;
  closeBooking: () => void;
  prefersReduced: boolean;
}) {
  const [step, setStep] = useState(1);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [form, setForm] = useState<BookingFormState>({
    service: initialService,
    issue: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    zip: "",
    address: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeBooking]);

  const upcomingDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return {
        value,
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        num: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
      };
    });
  }, []);

  function handleNext() {
    if (step === 1 && !form.service) {
      toast.error("Please select a service to continue.");
      return;
    }
    if (step === 2 && (!form.date || !form.time)) {
      toast.error("Please select a date and time.");
      return;
    }
    if (
      step === 3 &&
      (!form.name.trim() || !form.phone.trim() || !form.zip.trim())
    ) {
      toast.error("Please complete your name, phone, and ZIP code.");
      return;
    }
    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }
    const randomCode = Math.floor(10000 + Math.random() * 89999);
    setConfirmedRef(`NS-${randomCode}`);
  }

  const firstName = form.name.trim().split(/\s+/)[0] || "there";

  return (
    <m.div
      role="presentation"
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBooking();
      }}
      className="fixed inset-0 z-50 grid place-items-center bg-[#071019b8] p-5 backdrop-blur-[5px]"
    >
      <m.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookingTitle"
        initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={prefersReduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[95vh] w-full max-w-[610px] overflow-auto bg-[#f8f7f4] px-[19px] py-5 shadow-[0_25px_90px_rgba(0,0,0,0.33)] md:max-h-[92vh] md:px-[35px] md:pt-[27px] md:pb-[23px]"
      >
        <div className="flex items-center justify-between border-b border-[#e2e1dc] pb-[17px]">
          <BrandMark compact onClick={closeBooking} />
          <m.button
            type="button"
            aria-label="Close booking"
            whileHover={prefersReduced ? undefined : { rotate: 90 }}
            whileTap={prefersReduced ? undefined : { scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={closeBooking}
            className="grid h-8 w-8 cursor-pointer place-items-center border border-[#deded8] bg-white text-[#46515a] transition-colors hover:border-[#d97736] hover:text-[#d97736]"
          >
            <X className="size-4 stroke-[1.75]" />
          </m.button>
        </div>

        {!confirmedRef ? (
          <div>
            <div className="pt-6 pb-[15px]">
              <div className="flex items-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#7d8585]">
                <span className="inline-block h-px w-[25px] bg-[#d97736]" />
                LET’S GET STARTED
              </div>
              <h2
                id="bookingTitle"
                className="mt-[10px] mb-[5px] font-heading text-[30px] font-bold tracking-[-1.5px] md:text-[34px]"
              >
                Book your{" "}
                <em className="font-serif font-normal italic">service.</em>
              </h2>
              <p className="m-0 text-[11px] text-[#7c8587]">
                A few details will help us make your visit count.
              </p>
            </div>

            {/* 4-Segment Step Bar */}
            <div className="mt-[10px] mb-[25px] grid grid-cols-4 gap-2">
              {STEPS.map((item) => {
                const isDone = step > item.num;
                const isActive = step === item.num;
                return (
                  <button
                    key={item.num}
                    type="button"
                    disabled={item.num > step}
                    onClick={() => {
                      if (item.num < step) setStep(item.num);
                    }}
                    className={cn(
                      "text-left transition-opacity disabled:cursor-default",
                      item.num > step ? "opacity-45" : "cursor-pointer"
                    )}
                  >
                    <div className="h-[3px] w-full bg-[#e2e0d9]">
                      <div
                        className={cn(
                          "h-full bg-[#d97736] transition-all duration-300",
                          isDone || isActive ? "w-full" : "w-0"
                        )}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={cn(
                          "text-[8px] tracking-[1px]",
                          isActive || isDone
                            ? "font-bold text-[#d97736]"
                            : "text-[#929998]"
                        )}
                      >
                        0{item.num}
                      </span>
                      <b
                        className={cn(
                          "truncate text-[9px]",
                          isActive ? "text-[#1c2630]" : "text-[#7c8587]"
                        )}
                      >
                        {item.label}
                      </b>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <m.div
                key={step}
                initial={prefersReduced ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <div>
                    <label className="mb-3 block text-[8px] font-bold tracking-[1.4px] text-[#667176]">
                      WHAT CAN WE HELP WITH?
                    </label>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {SERVICE_CHOICES.map((service) => {
                        const chosen = form.service === service;
                        return (
                          <m.button
                            key={service}
                            type="button"
                            whileHover={
                              prefersReduced
                                ? undefined
                                : { y: -2, borderColor: "#d97736" }
                            }
                            whileTap={
                              prefersReduced ? undefined : { scale: 0.98 }
                            }
                            transition={{
                              duration: 0.18,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={() => setForm((f) => ({ ...f, service }))}
                            className={cn(
                              "group flex cursor-pointer items-center justify-between gap-2 border px-3 py-[13px] text-left text-[10px] transition-colors",
                              chosen
                                ? "border-[#d97736] bg-[#f9eee5] font-semibold text-[#26333c] shadow-[0_6px_16px_rgba(217,119,54,0.14)]"
                                : "border-[#deded8] bg-white text-[#4d585e] hover:bg-[#fcfbf8]"
                            )}
                          >
                            <span>{service}</span>
                            <span
                              className={cn(
                                "grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] transition-all duration-200",
                                chosen
                                  ? "bg-[#d97736] text-white"
                                  : "text-[#687176] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d97736]"
                              )}
                            >
                              {chosen ? (
                                <Check className="size-2.5 stroke-[2.5]" />
                              ) : (
                                "↗"
                              )}
                            </span>
                          </m.button>
                        );
                      })}
                    </div>

                    <label
                      htmlFor="issueInput"
                      className="mt-[22px] mb-3 block text-[8px] font-bold tracking-[1.4px] text-[#667176]"
                    >
                      ANYTHING ELSE WE SHOULD KNOW?{" "}
                      <small className="font-normal">OPTIONAL</small>
                    </label>
                    <textarea
                      id="issueInput"
                      rows={3}
                      value={form.issue}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, issue: e.target.value }))
                      }
                      placeholder="Tell us a little about what's happening..."
                      className="w-full resize-y border border-[#deded8] bg-white p-3 text-[10px] transition-colors outline-none focus:border-[#d97736]"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <label className="mb-3 block text-[8px] font-bold tracking-[1.4px] text-[#667176]">
                      CHOOSE A DATE
                    </label>
                    <div className="grid grid-cols-7 gap-1 md:gap-[7px]">
                      {upcomingDates.map((d) => {
                        const chosen = form.date === d.value;
                        return (
                          <m.button
                            key={d.value}
                            type="button"
                            whileHover={
                              prefersReduced
                                ? undefined
                                : { y: -3, borderColor: "#d97736" }
                            }
                            whileTap={
                              prefersReduced ? undefined : { scale: 0.96 }
                            }
                            transition={{
                              duration: 0.18,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={() =>
                              setForm((f) => ({ ...f, date: d.value }))
                            }
                            className={cn(
                              "relative flex cursor-pointer flex-col items-center gap-[6px] overflow-hidden border px-[1px] py-[9px] transition-colors md:px-[2px] md:py-[10px]",
                              chosen
                                ? "border-[#d97736] bg-[#f9eee5] text-[#26333c] shadow-[0_8px_18px_rgba(217,119,54,0.16)]"
                                : "border-[#deded8] bg-white hover:bg-[#fcfbf8]"
                            )}
                          >
                            {chosen && (
                              <span className="absolute top-0 right-0 left-0 h-[2.5px] bg-[#d97736]" />
                            )}
                            <small
                              className={cn(
                                "text-[8px]",
                                chosen
                                  ? "font-bold text-[#d97736]"
                                  : "text-[#7f8888]"
                              )}
                            >
                              {d.day}
                            </small>
                            <b className="font-heading text-[14px] font-bold tabular-nums md:text-[17px]">
                              {d.num}
                            </b>
                            <small className="text-[8px] text-[#7f8888]">
                              {d.month}
                            </small>
                          </m.button>
                        );
                      })}
                    </div>

                    <label className="mt-[22px] mb-3 block text-[8px] font-bold tracking-[1.4px] text-[#667176]">
                      AVAILABLE TIME WINDOWS
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {TIME_WINDOWS.map((slot) => {
                        const chosen = form.time === slot.label;
                        return (
                          <m.button
                            key={slot.label}
                            type="button"
                            disabled={slot.full}
                            whileHover={
                              prefersReduced || slot.full
                                ? undefined
                                : { y: -2, borderColor: "#d97736" }
                            }
                            whileTap={
                              prefersReduced || slot.full
                                ? undefined
                                : { scale: 0.97 }
                            }
                            transition={{
                              duration: 0.18,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={() =>
                              setForm((f) => ({ ...f, time: slot.label }))
                            }
                            className={cn(
                              "flex cursor-pointer items-center justify-center gap-[6px] border px-2 py-3 text-[9px] tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-35",
                              chosen
                                ? "border-[#d97736] bg-[#f9eee5] font-semibold text-[#26333c] shadow-[0_6px_14px_rgba(217,119,54,0.14)]"
                                : "border-[#deded8] bg-white hover:bg-[#fcfbf8]"
                            )}
                          >
                            <Clock
                              className={cn(
                                "size-3 stroke-[1.75]",
                                chosen ? "text-[#d97736]" : "text-[#7f8888]"
                              )}
                            />
                            <span>{slot.label}</span>
                            {slot.full && <small>FULL</small>}
                          </m.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2">
                    <label className="flex flex-col gap-[7px] md:col-span-2">
                      <span className="text-[8px] font-bold tracking-[1.2px] text-[#697478]">
                        FULL NAME *
                      </span>
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Your name"
                        className="w-full border border-[#deded8] bg-white p-3 text-[10px] transition-colors outline-none focus:border-[#d97736]"
                      />
                    </label>
                    <label className="flex flex-col gap-[7px]">
                      <span className="text-[8px] font-bold tracking-[1.2px] text-[#697478]">
                        PHONE NUMBER *
                      </span>
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        placeholder="(555) 000-0000"
                        className="w-full border border-[#deded8] bg-white p-3 text-[10px] transition-colors outline-none focus:border-[#d97736]"
                      />
                    </label>
                    <label className="flex flex-col gap-[7px]">
                      <span className="text-[8px] font-bold tracking-[1.2px] text-[#697478]">
                        EMAIL ADDRESS
                      </span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="you@example.com"
                        className="w-full border border-[#deded8] bg-white p-3 text-[10px] transition-colors outline-none focus:border-[#d97736]"
                      />
                    </label>
                    <label className="flex flex-col gap-[7px]">
                      <span className="text-[8px] font-bold tracking-[1.2px] text-[#697478]">
                        ZIP CODE *
                      </span>
                      <input
                        value={form.zip}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, zip: e.target.value }))
                        }
                        placeholder="ZIP code"
                        className="w-full border border-[#deded8] bg-white p-3 text-[10px] transition-colors outline-none focus:border-[#d97736]"
                      />
                    </label>
                    <label className="flex flex-col gap-[7px]">
                      <span className="text-[8px] font-bold tracking-[1.2px] text-[#697478]">
                        STREET ADDRESS
                      </span>
                      <input
                        value={form.address}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, address: e.target.value }))
                        }
                        placeholder="Service address"
                        className="w-full border border-[#deded8] bg-white p-3 text-[10px] transition-colors outline-none focus:border-[#d97736]"
                      />
                    </label>
                    <p className="m-0 text-[9px] leading-[1.6] text-[#929997] md:col-span-2">
                      We’ll only use your details to follow up about this
                      service request.
                    </p>
                  </div>
                )}

                {step === 4 && (
                  <div className="border border-[#e3e1dc] bg-white px-[17px] py-2">
                    {[
                      ["Selected service", form.service],
                      ["Preferred date", form.date],
                      ["Time window", form.time],
                      ["Name", form.name],
                      ["Phone", form.phone],
                      ["Email", form.email || "Not provided"],
                      ["ZIP code", form.zip],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between gap-3 border-b border-[#efeee9] py-[13px] text-[9px] last:border-b-0 md:text-[10px]"
                      >
                        <span className="text-[#858e8e]">{k}</span>
                        <b className="text-right tabular-nums">{v}</b>
                      </div>
                    ))}
                  </div>
                )}
              </m.div>
            </AnimatePresence>

            <div className="mt-[25px] flex justify-between gap-[10px]">
              {step > 1 && (
                <m.button
                  type="button"
                  whileHover={prefersReduced ? undefined : { x: -2 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex cursor-pointer items-center justify-center border-0 bg-[#e9e8e2] px-5 py-[15px] text-[11px] font-bold text-[#34414a] transition-colors hover:bg-[#deddd6]"
                >
                  ← Back
                </m.button>
              )}
              <m.button
                type="button"
                whileHover={prefersReduced ? undefined : { y: -2 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                onClick={handleNext}
                className="group relative ml-auto inline-flex min-w-[145px] cursor-pointer items-center justify-center overflow-hidden border-0 bg-[#111a24] px-5 py-[15px] text-[11px] font-bold text-white transition hover:bg-[#293b4b]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.16),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative z-10">
                  {step === 4 ? "Confirm request →" : "Continue →"}
                </span>
              </m.button>
            </div>

            <div className="mt-[18px] flex items-center justify-center gap-1.5 text-[7px] tracking-[1px] text-[#929a97]">
              <ShieldCheck className="size-3 stroke-[1.75] text-[#d97736]" />
              <span>YOUR DETAILS ARE HANDLED WITH CARE</span>
            </div>
          </div>
        ) : (
          <m.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="px-[10px] pt-[38px] pb-[18px] text-center"
          >
            <div className="mx-auto mb-[22px] grid h-[62px] w-[62px] place-items-center rounded-full bg-[#e3eee5] text-[#497455]">
              <Check className="size-7 stroke-[2.25]" />
            </div>
            <div className="flex items-center justify-center gap-[10px] text-[9px] font-bold tracking-[2px] text-[#7d8585]">
              <span className="inline-block h-px w-[25px] bg-[#d97736]" />
              REQUEST RECEIVED
            </div>
            <h2 className="my-[14px] font-heading text-[37px] font-bold">
              Thanks, {firstName}.
            </h2>
            <p className="mx-auto mb-5 max-w-[390px] text-[11px] leading-[1.8] text-[#7d8586]">
              We’ve received your preferred window and will reach out shortly to
              confirm your technician’s arrival.
            </p>
            <div className="mb-5 flex flex-col gap-2 bg-white p-[17px] text-[10px] text-[#697477]">
              <b className="font-heading text-[13px] font-bold text-[#27333c]">
                {form.service}
              </b>
              <span className="tabular-nums">
                {form.date} · {form.time}
              </span>
              <span className="text-[#d97736]">Reference: {confirmedRef}</span>
            </div>
            <m.button
              type="button"
              whileHover={prefersReduced ? undefined : { y: -1 }}
              whileTap={prefersReduced ? undefined : { scale: 0.97 }}
              onClick={closeBooking}
              className="inline-flex w-full cursor-pointer items-center justify-center border-0 bg-[#111a24] px-5 py-[15px] text-[11px] font-bold text-white transition hover:bg-[#293b4b]"
            >
              Back to website →
            </m.button>
          </m.div>
        )}
      </m.div>
    </m.div>
  );
}
