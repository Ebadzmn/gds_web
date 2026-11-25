import { env } from "@/config/env";

export const siteConfig = {
  name: "Northstar Garage Doors",
  shortName: "NORTHSTAR",
  subName: "GARAGE DOORS",
  tagline: "Precision. Reliability. Security.",
  description:
    "Northstar Garage Doors — professional garage door repair, installation, and maintenance. Request an appointment online.",
  url: env.NEXT_PUBLIC_SITE_URL,
  phone: "(555) 014-8200",
  phoneHref: "tel:+15550148200",
  email: "hello@northstargaragedoors.example",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Garage Doors", href: "#doors" },
    { label: "About Us", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
