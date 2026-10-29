
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help-center" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setStatus("Subscribed successfully!");
      setEmail("");
    } catch {
      setStatus("Unable to subscribe. Please try again.");
    }
  };

  return (
    <footer className="w-full bg-[#0D0D0D] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-[72px] pb-[22px] sm:px-8 lg:px-[53px]">

        {/* BRAND SECTION */}
        <div>
          <Link href="/" className="inline-block">
            <h2 className="text-[56px] leading-[0.95] font-semibold tracking-[-0.065em] text-white sm:text-[68px] md:text-[76px]">
              Wanderlast
            </h2>
          </Link>

          <p className="mt-[13px] text-[12px] leading-relaxed text-[#B0B0B0] sm:text-[14px]">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* FOOTER COLUMNS */}
        <div className="mt-[44px] grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-[5px] text-[12px] font-normal text-[#D0D0D0]">
              NEWSLETTER
            </h3>

            <p className="mb-[12px] text-[10px] leading-relaxed text-[#AFAFAF]">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            {/* Email Input */}
            <form
              onSubmit={handleSubscribe}
              className="relative w-full max-w-[230px]"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                aria-label="Newsletter email address"
                required
                className="h-[36px] w-full rounded-none border-none bg-[#363636] pr-[45px] pl-[12px] text-[13px] text-white shadow-none placeholder:text-[#AFAFAF] focus-visible:ring-1 focus-visible:ring-[#0F9FC1]"
              />

              <Button
                type="submit"
                variant="ghost"
                size="icon"
                aria-label="Subscribe to newsletter"
                className="absolute top-0 right-0 h-[36px] w-[40px] cursor-pointer rounded-none text-white hover:bg-[#444444] hover:text-white"
              >
                <ArrowUpRight
                  className="size-[18px]"
                  strokeWidth={2}
                />
              </Button>
            </form>

            {status && (
              <p role="status" className="mt-2 text-[11px] text-[#B0B0B0]">
                {status}
              </p>
            )}
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-[15px] text-[12px] font-normal text-[#D0D0D0]">
              QUICK LINKS
            </h3>

            <ul className="flex flex-col gap-[11px]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#B0B0B0] transition-colors duration-200 hover:text-[#0F9FC1]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="mb-[15px] text-[12px] font-normal text-[#D0D0D0]">
              SUPPORT
            </h3>

            <ul className="flex flex-col gap-[11px]">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#B0B0B0] transition-colors duration-200 hover:text-[#0F9FC1]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="mb-[15px] text-[12px] font-normal text-[#D0D0D0]">
              CONTACT US
            </h3>

            <div className="flex flex-col gap-[11px]">
              <a
                href="tel:7869011622"
                className="text-[13px] text-[#B0B0B0] transition-colors hover:text-[#0F9FC1]"
              >
                786 901 1622
              </a>

              <a
                href="mailto:info@wandarland.com"
                className="text-[13px] text-[#B0B0B0] transition-colors hover:text-[#0F9FC1]"
              >
                info@wandarland.com
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-[47px] border-t border-[#242424] pt-[15px]">

          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

            {/* COPYRIGHT */}
            <p className="text-[10px] text-[#AFAFAF]">
              © 2026 Wanderlust. All rights reserved.
            </p>

            {/* SOCIAL MEDIA LINKS */}
            <div className="flex items-center gap-[23px]">

              {/* X / TWITTER */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-white transition-colors hover:text-[#0F9FC1]"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.901 1.153h3.68L14.54 10.35 24 22.846h-7.406l-5.8-7.584-6.63 7.584H.481l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.492h2.039L6.486 3.24H4.298l13.313 17.405Z"/>
                </svg>
              </a>

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white transition-colors hover:text-[#0F9FC1]"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="4.5" cy="4.5" r="1.8" />
                  <path d="M3 8h3v13H3zm5 0h3v1.8h.05c.42-.8 1.45-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.33V21h-3v-6.45c0-1.54-.03-3.53-2.15-3.53-2.16 0-2.49 1.68-2.49 3.42V21H8z" />
                </svg>
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white transition-colors hover:text-[#0F9FC1]"
              >
                <Camera
                  className="size-[17px]"
                  strokeWidth={2}
                />
              </a>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
