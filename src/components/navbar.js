"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "../lib/auth";

const navItems = [
  { href: "/dashboard-new", label: "Explore" },
  { href: "/spaces", label: "Spaces", also: ["/discussions"] },
  { href: "/collections", label: "Collections" },
  { href: "/watch-later", label: "Watch Later" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(Boolean(getCurrentUser()));
  }, [pathname]);

  const isActive = (item) => {
    const paths = [item.href, ...(item.also || [])];
    return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#252529] bg-[#080808]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1800px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <Link href="/dashboard-new" className="flex shrink-0 items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#252529] bg-[#151518] text-base font-black text-[#F5F5F5]">
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF3B78]" />
            <span className="relative">F</span>
          </div>
          <span className="text-base font-black tracking-[0.18em] text-[#F5F5F5]">
            FRAME RATE
          </span>
        </Link>

        <div className="hidden items-center rounded-full border border-[#252529] bg-[#101012] p-1.5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                isActive(item)
                  ? "bg-[#FF3B78] text-[#F5F5F5]"
                  : "text-[#85858C] hover:text-[#F5F5F5]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 items-center gap-2 rounded-full border border-[#252529] bg-[#151518] px-4 text-sm text-[#85858C] transition hover:border-[#FF3B78]/60 hover:text-[#F5F5F5]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </Link>

          {signedIn ? (
            <Link
              href="/profile"
              aria-label="Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#252529] bg-[#151518] text-[#85858C] transition hover:border-[#FF3B78]/60 hover:text-[#FF3B78]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex h-10 items-center rounded-full bg-[#FF3B78] px-5 text-sm font-semibold text-[#F5F5F5] transition hover:bg-[#ff5c92]"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>

      <div className="flex gap-2 overflow-x-auto px-6 pb-3 lg:hidden sm:px-10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              isActive(item)
                ? "bg-[#FF3B78] text-[#F5F5F5]"
                : "border border-[#252529] bg-[#101012] text-[#85858C]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
