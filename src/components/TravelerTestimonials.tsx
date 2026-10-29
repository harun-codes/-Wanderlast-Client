
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Testimonial data from the reference design
const testimonials = [
  {
    id: 1,
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    id: 2,
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
];

// Repeated temporarily to demonstrate desktop carousel navigation.
// Replace with additional real testimonials when available.
const carouselItems = [...testimonials, ...testimonials];

export default function TravelerTestimonials() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="w-full bg-white py-16 md:py-[85px]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-[58px]">

        {/* SECTION HEADER */}
        <div className="mb-[30px] flex items-center justify-between gap-4">

          {/* HEADING */}
          <div>
            <h2 className="text-[32px] leading-[1.15] font-normal tracking-[-0.055em] text-[#111111] sm:text-[40px] md:text-[42px]">
              What Travelers Say
            </h2>

            <p className="mt-[5px] text-[12px] font-normal text-[#777777] sm:text-[13px]">
              Real experiences from our happy travelers
            </p>
          </div>

          {/* CAROUSEL NAVIGATION */}
          <div className="flex shrink-0 items-center gap-[11px]">

            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label="Previous testimonial"
              onClick={() => api?.scrollPrev()}
              className="size-[43px] cursor-pointer rounded-full border border-[#CCCCCC] bg-white text-[#A0A0A0] shadow-none transition-colors hover:border-[#0F9FC1] hover:bg-[#0F9FC1] hover:text-white"
            >
              <ArrowLeft className="size-[18px]" strokeWidth={1.3} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label="Next testimonial"
              onClick={() => api?.scrollNext()}
              className="size-[43px] cursor-pointer rounded-full border border-[#CCCCCC] bg-white text-[#A0A0A0] shadow-none transition-colors hover:border-[#0F9FC1] hover:bg-[#0F9FC1] hover:text-white"
            >
              <ArrowRight className="size-[18px]" strokeWidth={1.3} />
            </Button>

          </div>
        </div>

        {/* SHADCN CAROUSEL */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-[18px]">

            {carouselItems.map((item, index) => (
              <CarouselItem
                key={`${item.id}-${index}`}
                className="basis-full pl-[18px] lg:basis-1/2"
              >
                {/* TESTIMONIAL CARD */}
                <article className="flex min-h-[225px] flex-col-reverse gap-[18px] border border-[#EFEFEF] bg-white p-[16px] min-[520px]:h-[225px] min-[520px]:flex-row">

                  {/* LEFT SIDE: TEXT */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-7">

                    {/* QUOTE */}
                    <p className="text-[16px] leading-[1.08] font-normal tracking-[-0.045em] text-[#111111]">
                      &quot;{item.quote}&quot;
                    </p>

                    {/* AUTHOR INFORMATION */}
                    <div className="flex flex-col">
                      <p className="text-[13px] font-normal text-[#0F9FC1]">
                        — {item.name}
                      </p>

                      <span className="ml-[18px] mt-[2px] text-[10px] leading-tight text-[#777777]">
                        {item.location}
                      </span>
                    </div>

                  </div>

                  {/* RIGHT SIDE: TRAVELER IMAGE */}
                  <div className="relative h-[220px] w-full shrink-0 overflow-hidden min-[520px]:h-full min-[520px]:w-[36%] min-[520px]:max-w-[157px]">
                    <Image
                      src={item.image}
                      alt="Traveler portrait"
                      fill
                      sizes="(max-width: 519px) 100vw, 157px"
                      className="object-cover object-center"
                    />
                  </div>

                </article>
              </CarouselItem>
            ))}

          </CarouselContent>
        </Carousel>

      </div>
    </section>
  );
}
