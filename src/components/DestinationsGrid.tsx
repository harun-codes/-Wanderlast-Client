
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Destination type based on your backend data
export interface Destination {
  _id?: string;
  id?: string | number;
  name?: string;
  destinationName?: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
}

interface DestinationsGridProps {
  destinations: Destination[];
}

// Convert string prices to numbers
const getPrice = (price: string | number) => {
  const value = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
};

export default function DestinationsGrid({
  destinations,
}: DestinationsGridProps) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Get available categories from backend data
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        destinations
          .map((destination) => destination.category)
          .filter(Boolean)
      )
    );
  }, [destinations]);

  // Filtering and sorting
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    // Category filter
    if (category !== "all") {
      result = result.filter(
        (item) => item.category === category
      );
    }

    // Price filter
    if (priceRange !== "all") {
      result = result.filter((item) => {
        const price = getPrice(item.price);

        switch (priceRange) {
          case "under1000":
            return price < 1000;

          case "1000to2000":
            return price >= 1000 && price <= 2000;

          case "2000to3000":
            return price > 2000 && price <= 3000;

          case "above3000":
            return price > 3000;

          default:
            return true;
        }
      });
    }

    // Sorting
    if (sortBy === "priceLow") {
      result.sort(
        (a, b) => getPrice(a.price) - getPrice(b.price)
      );
    }

    if (sortBy === "priceHigh") {
      result.sort(
        (a, b) => getPrice(b.price) - getPrice(a.price)
      );
    }

    if (sortBy === "nameAZ") {
      result.sort((a, b) =>
        (a.name ?? a.destinationName ?? "").localeCompare(
          b.name ?? b.destinationName ?? ""
        )
      );
    }

    if (sortBy === "nameZA") {
      result.sort((a, b) =>
        (b.name ?? b.destinationName ?? "").localeCompare(
          a.name ?? a.destinationName ?? ""
        )
      );
    }

    return result;
  }, [destinations, category, priceRange, sortBy]);

  // Select styling
  const selectStyle =
    "w-full !h-[33px] rounded-none border border-[#DCDCDC] bg-white px-[13px] text-[11px] font-normal text-[#777777] shadow-none focus-visible:ring-0";

  return (
    <section className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] mt-8 px-5 pt-[39px] pb-16 sm:px-[43px]">

        {/* PAGE HEADING */}
        <div>
          <h1 className="text-[30px] leading-[1.2] font-normal tracking-[-0.055em] text-[#111111] sm:text-[32px]">
            Explore All Destinations
          </h1>

          <p className="mt-[7px] text-[11px] font-normal text-[#777777]">
            Find your perfect travel experience from our curated collection
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className="mt-[24px] grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-0">

          {/* CATEGORY */}
          <Select
            value={category}
            onValueChange={(value) => {
              if (value !== null) setCategory(value);
            }}
          >
            <SelectTrigger className={selectStyle}>
              <SelectValue placeholder="CATEGORY" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                CATEGORY
              </SelectItem>

              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* PRICE RANGE */}
          <Select
            value={priceRange}
            onValueChange={(value) => {
              if (value !== null) setPriceRange(value);
            }}
          >
            <SelectTrigger className={`${selectStyle} sm:-ml-px sm:w-[calc(100%+1px)]`}>
              <SelectValue placeholder="PRICE RANGE" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                PRICE RANGE
              </SelectItem>
              <SelectItem value="under1000">
                Under $1000
              </SelectItem>
              <SelectItem value="1000to2000">
                $1000 - $2000
              </SelectItem>
              <SelectItem value="2000to3000">
                $2000 - $3000
              </SelectItem>
              <SelectItem value="above3000">
                Above $3000
              </SelectItem>
            </SelectContent>
          </Select>

          {/* SORT BY */}
          <Select
            value={sortBy}
            onValueChange={(value) => {
              if (value !== null) setSortBy(value);
            }}
          >
            <SelectTrigger className={`${selectStyle} sm:-ml-px sm:w-[calc(100%+1px)]`}>
              <SelectValue placeholder="SORT BY" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="default">
                SORT BY
              </SelectItem>
              <SelectItem value="priceLow">
                Price: Low to High
              </SelectItem>
              <SelectItem value="priceHigh">
                Price: High to Low
              </SelectItem>
              <SelectItem value="nameAZ">
                Name: A to Z
              </SelectItem>
              <SelectItem value="nameZA">
                Name: Z to A
              </SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* DESTINATION COUNT */}
        <p className="mt-[12px] text-[11px] text-[#777777]">
          Showing {filteredDestinations.length}{" "}
          {filteredDestinations.length === 1
            ? "destination"
            : "destinations"}
        </p>

        {/* DESTINATION GRID */}
        {filteredDestinations.length > 0 ? (
          <div className="mt-[24px] grid grid-cols-1 gap-x-[13px] gap-y-[18px] sm:grid-cols-2 md:grid-cols-3">

            {filteredDestinations.map((destination, index) => {
              const destinationName =
                destination.name ??
                destination.destinationName ??
                "Untitled Destination";

              const destinationId = String(
                destination._id ??
                destination.id ??
                destinationName
              );

              return (
                <article
                  key={destinationId + index}
                  className="group min-w-0 bg-white"
                >

                  {/* DESTINATION IMAGE */}
                  <div className="relative aspect-[232/132] w-full overflow-hidden bg-[#F3F5F6]">

                    <img
                      src={
                        destination.imageUrl ||
                        "/images/Banner.png"
                      }
                      alt={destinationName}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "/images/Banner.png";
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* RATING BADGE */}
                    {/* 4.5 is a design-only placeholder */}
                    <div className="absolute top-[11px] right-[11px] flex h-[23px] items-center gap-[4px] bg-white/80 px-[9px]">

                      <span className="text-[10px] font-medium text-black">
                        {typeof destination.rating === "number"
                          ? destination.rating.toFixed(1)
                          : "4.5"}
                      </span>

                      <Star
                        className="size-[12px] fill-black text-black"
                      />
                    </div>
                  </div>

                  {/* DESTINATION INFORMATION */}
                  <div className="pt-[8px]">

                    {/* LOCATION */}
                    <div className="flex items-center gap-[4px] text-[#777777]">
                      <MapPin
                        size={11}
                        strokeWidth={1.7}
                      />

                      <span className="text-[10px]">
                        {destination.country}
                      </span>
                    </div>

                    {/* TITLE AND PRICE */}
                    <div className="mt-[5px] flex items-center justify-between gap-2">

                      <h3 className="min-w-0 text-[13px] leading-tight font-normal tracking-[-0.025em] text-[#111111]">
                        {destinationName}
                      </h3>

                      <div className="shrink-0 whitespace-nowrap">
                        <span className="text-[13px] font-medium text-[#111111]">
                          ${getPrice(destination.price).toLocaleString("en-US")}
                        </span>

                        <span className="text-[9px] text-[#777777]">
                          /Person
                        </span>
                      </div>

                    </div>

                    {/* DURATION */}
                    <div className="mt-[5px] flex items-center gap-[4px] text-[#777777]">

                      <CalendarDays
                        size={11}
                        strokeWidth={1.7}
                      />

                      <span className="text-[10px]">
                        {destination.duration}
                      </span>
                    </div>

                    {/* BOOK NOW */}
                    <Link
                      href={`/destinations/${encodeURIComponent(destinationId)}`}
                      className="mt-[9px] inline-flex items-center gap-[6px] text-[11px] font-medium tracking-[0.015em] text-[#0F9FC1] underline underline-offset-2 transition-colors hover:text-[#087D9C]"
                    >
                      BOOK NOW

                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.8}
                      />
                    </Link>
                  </div>

                </article>
              );
            })}

          </div>
        ) : (
          <div className="mt-10 flex min-h-[200px] items-center justify-center border border-[#EEEEEE]">

            <div className="text-center">
              <p className="text-[15px] text-[#333333]">
                No destinations found
              </p>

              <p className="mt-2 text-[12px] text-[#888888]">
                Try changing your category or price range.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
