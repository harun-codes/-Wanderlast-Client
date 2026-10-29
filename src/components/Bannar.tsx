
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Bannar() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("Anytime/3 Days");
  const [budget, setBudget] = useState("$0-$3000");
  const [people, setPeople] = useState("5-10");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams({
      location: location.trim(),
      duration,
      budget,
      people,
    });

    router.push(`/destinations?${params.toString()}`);
  };

  const scrollToSearch = () => {
    document
      .getElementById("search")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[760px] w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat text-white lg:h-svh lg:min-h-[600px]"
      style={{
        backgroundImage:
          "url('/images/Banner.png')",
      }}
    >
      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-[#071719]/55" />

      {/* HERO SECTION */}
      <div className="flex flex-1 items-center justify-center px-5 pt-28 pb-12 sm:px-8 lg:pt-20 lg:pb-6">

        <div className="w-full max-w-[800px] translate-y-2 text-center lg:translate-y-6">

          {/* TITLE */}
          <h1 className="text-[46px] leading-[1.07] font-light tracking-[-0.055em] sm:text-[60px] md:text-[70px] lg:text-[73px]">
            Discover Your
            <br />
            Next Adventure
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-4 max-w-[490px] text-[13px] leading-[1.7] font-normal text-white/95 sm:text-[14px]">
            Explore breathtaking destinations and create
            unforgettable memories with our curated travel
            experiences.
          </p>

          {/* HERO BUTTONS */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">

            <Button
              type="button"
              onClick={scrollToSearch}
              className="h-[40px] min-w-[148px] cursor-pointer rounded-none bg-[#0F9FC1] px-4 text-[11px] font-medium text-white hover:bg-[#0B88A6]"
            >
              EXPLORE NOW
              <ArrowRight className="ml-3 size-[17px]" />
            </Button>

            <Button
              type="button"
              onClick={() => router.push("/destinations")}
              className="h-[40px] min-w-[140px] cursor-pointer rounded-none bg-white/40 px-4 text-[11px] font-medium text-white hover:bg-white/55"
            >
              VIEW DESTINATION
            </Button>

          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="relative z-10 w-full px-3 pb-4 lg:px-[5px]">

        <form
          id="search"
          onSubmit={handleSearch}
          className="grid w-full grid-cols-2 overflow-hidden bg-white/35 backdrop-blur-md md:grid-cols-[repeat(4,minmax(0,1fr))_126px]"
        >

          {/* LOCATION */}
          <div className="flex min-h-[65px] min-w-0 flex-col justify-center gap-1 border-r border-b border-white/30 px-4 py-2 md:min-h-[54px] md:border-b-0 lg:px-[18px]">
            <label
              htmlFor="location"
              className="text-[14px] leading-tight font-normal"
            >
              Location
            </label>

            <Input
              id="location"
              type="text"
              autoComplete="address-level2"
              placeholder="Address, City Or Zip"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-5 w-full rounded-none border-0 bg-transparent p-0 text-[11px] text-white shadow-none placeholder:text-white/90 focus-visible:border-transparent focus-visible:ring-0"
            />
          </div>

          {/* DATE / DURATION */}
          <div className="flex min-h-[65px] min-w-0 flex-col justify-center gap-1 border-b border-white/30 px-4 py-2 md:min-h-[54px] md:border-r md:border-b-0 lg:px-[18px]">
            <label
              htmlFor="duration"
              className="text-[14px] leading-tight"
            >
              Date/Duration
            </label>

            <div className="relative">
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent pr-4 text-[11px] text-white outline-none"
              >
                <option className="text-black" value="Anytime/3 Days">
                  Anytime/3 Days
                </option>
                <option className="text-black" value="This Weekend/3 Days">
                  This Weekend/3 Days
                </option>
                <option className="text-black" value="Next Week/7 Days">
                  Next Week/7 Days
                </option>
                <option className="text-black" value="Next Month/7 Days">
                  Next Month/7 Days
                </option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 opacity-80"
              />
            </div>
          </div>

          {/* BUDGET */}
          <div className="flex min-h-[65px] min-w-0 flex-col justify-center gap-1 border-r border-b border-white/30 px-4 py-2 md:min-h-[54px] md:border-b-0 lg:px-[18px]">
            <label
              htmlFor="budget"
              className="text-[14px] leading-tight"
            >
              Budget
            </label>

            <div className="relative">
              <select
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent pr-4 text-[11px] text-white outline-none"
              >
                <option className="text-black" value="$0-$3000">
                  $0-$3000
                </option>
                <option className="text-black" value="$0-$500">
                  $0-$500
                </option>
                <option className="text-black" value="$500-$1500">
                  $500-$1500
                </option>
                <option className="text-black" value="$1500-$3000">
                  $1500-$3000
                </option>
                <option className="text-black" value="$3000+">
                  $3000+
                </option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 opacity-80"
              />
            </div>
          </div>

          {/* PEOPLE */}
          <div className="flex min-h-[65px] min-w-0 flex-col justify-center gap-1 border-b border-white/30 px-4 py-2 md:min-h-[54px] md:border-r md:border-b-0 lg:px-[18px]">
            <label
              htmlFor="people"
              className="text-[14px] leading-tight"
            >
              People
            </label>

            <div className="relative">
              <select
                id="people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent pr-4 text-[11px] text-white outline-none"
              >
                <option className="text-black" value="5-10">
                  5-10
                </option>
                <option className="text-black" value="1-2">
                  1-2
                </option>
                <option className="text-black" value="3-4">
                  3-4
                </option>
                <option className="text-black" value="10+">
                  10+
                </option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 opacity-80"
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <Button
            type="submit"
            className="col-span-2 h-[52px] w-full cursor-pointer rounded-none bg-[#0F9FC1] text-[14px] font-medium text-white hover:bg-[#0B88A6] md:col-span-1 md:h-full"
          >
            Search
          </Button>

        </form>
      </div>
    </section>
  );
}
