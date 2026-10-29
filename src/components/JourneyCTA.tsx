
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JourneyCTA() {
  return (
    <section
      className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-5 py-16 text-white sm:px-8"
      style={{
        backgroundImage: "url('/images/CTA.png')",
      }}
    >
      {/* Dark Background Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CTA Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center text-center">

        {/* Heading */}
        <h2 className="text-[30px] leading-[1.15] font-light tracking-[-0.045em] sm:text-[36px] md:text-[40px]">
          Ready To Start Your Journey?
        </h2>

        {/* Description */}
        <p className="mt-[12px] max-w-[600px] text-[12px] leading-relaxed font-normal text-white/95 sm:text-[14px]">
          Join thousands of travelers who have discovered the world with us
        </p>

        {/* CTA Button */}
        <Link
          href="/destinations"
          className="mt-[30px] flex h-[42px] min-w-[200px] items-center justify-between gap-5 rounded-none border-0 bg-white px-[17px] text-[11px] font-medium text-black shadow-none transition-all duration-300 hover:bg-[#0F9FC1] hover:text-white"
        >
          <span>BOOK YOUR TRIP TODAY</span>

          <ArrowRight
            className="size-[17px]"
            strokeWidth={1.7}
          />
        </Link>

      </div>
    </section>
  );
}
