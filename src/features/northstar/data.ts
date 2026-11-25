export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tag?: string;
}

export interface DoorModel {
  id: number;
  number: string;
  name: string;
  type: string;
  description: string;
  material: string;
  insulation: string;
  finish: string;
  price: string;
  specBadge: string;
  image: string;
}

export interface ReviewItem {
  quote: string;
  author: string;
  initials: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Garage Door Repair",
    description:
      "Fast, careful diagnostics and repairs to get your door moving safely again.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85",
    alt: "Garage door repair",
    tag: "MOST REQUESTED",
  },
  {
    number: "02",
    title: "Spring Replacement",
    description:
      "Professional spring service for balanced, reliable operation.",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85",
    alt: "Technician at work",
  },
  {
    number: "03",
    title: "Opener Repair & Install",
    description:
      "Quiet, dependable access with expert opener troubleshooting and installation.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85",
    alt: "Home service technician",
  },
  {
    number: "04",
    title: "New Door Installation",
    description:
      "A considered upgrade in curb appeal, comfort, and everyday performance.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    alt: "New home installation",
  },
];

export const DOORS: DoorModel[] = [
  {
    id: 0,
    number: "01",
    name: "Modern Flush",
    type: "CONTEMPORARY SERIES",
    description:
      "Clean, uninterrupted horizontal steel panels with a polyurethane thermal core—built for whisper-quiet operation and crisp modern curb appeal.",
    material: "Triple-layer insulated steel",
    insulation: "R-16 Polyurethane",
    finish: "Graphite",
    price: "From $1,899",
    specBadge: "R-16 INSULATED · FLUSH PANEL",
    image:
      "https://images.pexels.com/photos/31944676/pexels-photo-31944676/free-photo-of-minimalist-urban-garage-exterior-with-closed-doors.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 1,
    number: "02",
    name: "Classic Carriage",
    type: "TIMELESS SERIES",
    description:
      "Authentic coach-house proportions with moisture-resistant composite overlays, wrought-iron hardware accents, and heavy-duty torsion balance.",
    material: "Steel & composite overlay",
    insulation: "R-18 Thermal Core",
    finish: "Walnut",
    price: "From $2,250",
    specBadge: "R-18 INSULATED · CARRIAGE TRIM",
    image:
      "https://images.pexels.com/photos/14193874/pexels-photo-14193874.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 2,
    number: "03",
    name: "Signature Glass",
    type: "ARCHITECTURAL SERIES",
    description:
      "Anodized aluminum rails paired with frosted or clear tempered glass panels—flooding your garage with natural daylight while keeping privacy intact.",
    material: "Anodized aluminum & tempered glass",
    insulation: "Dual-Pane Insulated Glass",
    finish: "Black",
    price: "Request pricing",
    specBadge: "TEMPERED GLASS · ANODIZED FRAME",
    image:
      "https://images.pexels.com/photos/12069489/pexels-photo-12069489.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    quote:
      "The whole experience was refreshingly straightforward. Great communication, careful work, and everything left neat and tidy.",
    author: "Jordan D.",
    initials: "JD",
    role: "Verified Homeowner · Oakridge",
  },
  {
    quote:
      "Booked online in two minutes and the technician arrived right on time. Our spring replacement was finished cleanly in under an hour.",
    author: "Maya R.",
    initials: "MR",
    role: "Spring Replacement · Westbrook",
  },
  {
    quote:
      "Our new Modern Flush door completely transformed the front of the house. Quiet operation and thoughtful attention to every detail.",
    author: "Alex T.",
    initials: "AT",
    role: "New Door Installation · North Hills",
  },
];

export const DOOR_COLORS = [
  { name: "Graphite", className: "bg-[#343b40]" },
  { name: "Walnut", className: "bg-[#79543c]" },
  { name: "White", className: "bg-[#f1f0e9] border border-[#ccc]" },
  { name: "Sand", className: "bg-[#c8b9a2]" },
  { name: "Black", className: "bg-[#15181c]" },
] as const;

export const FAQS: FaqItem[] = [
  {
    question: "How do I know if my garage door spring is broken?",
    answer:
      "A door that feels unusually heavy, won’t lift, or has a visible gap in the spring may need professional attention. Avoid operating the door and contact a qualified technician.",
  },
  {
    question: "Can I book an appointment online?",
    answer:
      "Yes. Use the booking form to select a service, preferred date, and time window. Our team will follow up to confirm the appointment details.",
  },
  {
    question: "Do you offer estimates for new garage doors?",
    answer:
      "Absolutely. Share your preferred style, material, and project details through your appointment request so the team can discuss options.",
  },
  {
    question: "How often should a garage door be maintained?",
    answer:
      "A periodic professional inspection can help identify wear, alignment issues, and safety concerns before they become larger problems.",
  },
];

export const SERVICE_CHOICES = [
  "Garage Door Repair",
  "Spring Replacement",
  "Opener Repair & Install",
  "New Door Installation",
  "Maintenance",
  "Commercial Service",
  "Emergency Repair",
] as const;

export const TIME_WINDOWS = [
  { label: "8:00 AM", full: false },
  { label: "10:00 AM", full: false },
  { label: "12:00 PM", full: false },
  { label: "2:00 PM", full: false },
  { label: "4:00 PM", full: true },
] as const;
