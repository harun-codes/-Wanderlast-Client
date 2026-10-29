
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, UserRound } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
];

const accountLinks = [
  { label: "Profile", href: "/profile" },
  { label: "Login", href: "/signin" },
  { label: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="absolute inset-x-4 top-3 z-30 lg:inset-x-[18px]">
      <nav className="relative flex h-14 items-center justify-center bg-white px-4 text-black shadow-sm lg:grid lg:h-10 lg:grid-cols-[1fr_auto_1fr] lg:px-[17px]">
        {/* LEFT: DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap text-[11px] font-medium transition-colors hover:text-[#0F9FC1] ${
                  isActive
                    ? "text-[#0F9FC1] underline underline-offset-4"
                    : "text-[#111111]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CENTER: BRAND */}
        <Link
          href="/"
          className="text-[24px] font-semibold tracking-[-1px] text-[#0F9FC1] lg:text-[23px]"
        >
          Wanderlast
        </Link>

        {/* RIGHT: DESKTOP ACCOUNT NAVIGATION */}
        <div className="hidden items-center justify-end gap-6 lg:flex">
          <Link
            href="/profile"
            className="flex items-center gap-1 text-[11px] font-medium transition-colors hover:text-[#0F9FC1]"
          >
            <UserRound size={14} strokeWidth={1.8} />
            Profile
          </Link>

          {user ? (
            <Popover>
              {/* FIXED POPOVER TRIGGER */}
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open account menu"
                    className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#0F9FC1]"
                  >
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image ?? undefined}
                        alt={user.name ?? "User"}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent align="end">
                <PopoverHeader>
                  <PopoverTitle>
                    {user.name ?? "User"}
                  </PopoverTitle>

                  <PopoverDescription>
                    <p className="mb-4">{user.email}</p>

                    <Button
                      onClick={handleSignOut}
                      variant="destructive"
                    >
                      Sign Out
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-[11px] font-medium transition-colors hover:text-[#0F9FC1]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-[11px] font-medium transition-colors hover:text-[#0F9FC1]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="absolute left-4 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="flex size-9 cursor-pointer items-center justify-center rounded-md hover:bg-slate-100"
            >
              <Menu size={23} />
            </SheetTrigger>

            <SheetContent side="left" className="w-[290px] bg-white">
              <SheetHeader>
                <SheetTitle className="text-left text-2xl font-semibold text-[#0F9FC1]">
                  Wanderlast
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 py-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-3 text-sm transition-colors hover:bg-cyan-50 ${
                      pathname === link.href
                        ? "bg-cyan-50 font-semibold text-[#0F9FC1]"
                        : "text-slate-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="my-3 border-t border-slate-200" />

                {accountLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-sm text-slate-800 hover:bg-cyan-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
