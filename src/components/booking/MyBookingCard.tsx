
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    CalendarDays,
    Eye,
    MapPin,
    Trash2,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { IBooking } from "@/lib/bookings";

const MyBookingCard = ({
    booking,
}: {
    booking: IBooking;
}) => {
    const router = useRouter();

    const [isCancelling, setIsCancelling] = useState(false);
    const [error, setError] = useState("");

    // Format departure date
    const formatDate = (value: string) => {
        if (!value) return "Not specified";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
        });
    };

    // Format price
    const price = Number(booking.price);

    const formattedPrice = Number.isFinite(price)
        ? price.toLocaleString("en-US")
        : booking.price;

    // Booking status
    const status = booking.status || "Confirmed";
    const normalizedStatus = status.toLowerCase();

    const isConfirmed = normalizedStatus === "confirmed";
    const isPending = normalizedStatus === "pending";

    const statusStyle = isConfirmed
        ? "bg-[#E8F8EE] text-[#16A34A]"
        : isPending
            ? "bg-[#FFF4E5] text-[#F59E0B]"
            : "bg-gray-100 text-gray-600";

    // Cancel booking
    const handleCancelBooking = async () => {
        if (isCancelling) return;

        setIsCancelling(true);
        setError("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_UR}/my-bookings/${booking._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                const message = await res.text();

                throw new Error(
                    message || "Failed to cancel booking"
                );
            }

            router.refresh();
        } catch (err) {
            console.error("Cancel booking error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <Card className="w-full overflow-hidden rounded-none border border-[#EEEEEE] bg-white p-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-md">

            <div className="flex flex-col gap-[18px] md:flex-row md:items-center">

                {/* DESTINATION IMAGE */}
                <div className="relative h-[165px] w-full shrink-0 overflow-hidden bg-[#F3F6F7] md:w-[292px]">

                    <Image
                        src={booking.imageUrl}
                        alt={booking.name}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, 292px"
                    />

                </div>

                {/* BOOKING INFORMATION */}
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-[18px] sm:flex-row sm:items-end sm:gap-4">

                    {/* LEFT: DETAILS */}
                    <div className="min-w-0 flex-1">

                        {/* STATUS BADGE */}
                        <div
                            className={`inline-flex items-center gap-[5px] rounded-full px-[12px] py-[6px] text-[11px] font-medium ${statusStyle}`}
                        >
                            {isPending ? (
                                <Clock3
                                    size={13}
                                    strokeWidth={2}
                                />
                            ) : (
                                <CheckCircle2
                                    size={13}
                                    strokeWidth={2}
                                />
                            )}

                            <span>
                                {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                            </span>
                        </div>

                        {/* DESTINATION NAME */}
                        <h2 className="mt-[7px] text-[25px] leading-[1.2] font-semibold tracking-[-0.045em] text-[#111111]">
                            {booking.name}
                        </h2>

                        {/* DEPARTURE DATE */}
                        <div className="mt-[12px] flex items-center gap-[7px] text-[#777777]">

                            <CalendarDays
                                size={13}
                                strokeWidth={1.8}
                                className="shrink-0"
                            />

                            <span className="text-[11px]">
                                Departure: {formatDate(booking.departureDate)}
                            </span>

                        </div>

                        {/* BOOKING ID */}
                        <div className="mt-[8px] flex items-center gap-[7px] text-[#777777]">

                            <MapPin
                                size={13}
                                strokeWidth={1.8}
                                className="shrink-0"
                            />

                            <span className="text-[11px]">
                                Booking ID: {booking._id}
                            </span>

                        </div>

                        {/* PRICE */}
                        <p className="mt-[10px] text-[28px] leading-[1.1] font-medium tracking-[-0.04em] text-[#0F9FC1]">
                            ${formattedPrice}
                        </p>

                    </div>

                    {/* RIGHT: ACTION BUTTONS */}
                    <div className="flex shrink-0 items-center justify-end gap-[10px]">

                        {/* CANCEL BUTTON */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancelBooking}
                            disabled={isCancelling}
                            className="h-[35px] cursor-pointer gap-[7px] rounded-none border border-[#FF7979] bg-white px-[14px] text-[11px] font-normal text-red-500 shadow-none hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2
                                size={13}
                                strokeWidth={1.8}
                            />

                            {isCancelling ? "Cancelling..." : "Cancel"}
                        </Button>

                   
                        <Link
                            href={`/destinations/${encodeURIComponent(
                                booking._id
                            )}`}
                            className="inline-flex h-[35px] w-[85px] shrink-0 flex-row flex-nowrap items-center justify-center gap-[7px] whitespace-nowrap rounded-none bg-[#0F9FC1] px-3 text-[11px] font-normal text-white transition-colors hover:bg-[#0B89A6]"
                        >
                            <Eye
                                size={15}
                                strokeWidth={1.8}
                                className="shrink-0"
                            />

                            <span>View</span>
                        </Link>

                    </div>

                </div>

            </div>

            {/* ERROR MESSAGE */}
            {error && (
                <p
                    role="alert"
                    className="mt-3 text-right text-xs text-red-500"
                >
                    {error}
                </p>
            )}

        </Card>
    );
};

export default MyBookingCard;
