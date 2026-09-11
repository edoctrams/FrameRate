"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard-new", label: "Explore" },
  { href: "/discussions", label: "Discussions" },
  { href: "/collections", label: "Collections" },
  { href: "/watch-later", label: "Watch Later" },
  { href: "/search", label: "Search" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(238,238,238,0.1)] bg-[#0D0F10]/92 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1800px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <Link href="/dashboard-new" className="flex shrink-0 items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#393E46] bg-[#17191A] text-base font-black text-[#EEEEEE] shadow-sm">
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD369]" />
            <span className="relative">F</span>
          </div>
          <span className="text-base font-black tracking-[0.18em] text-[#EEEEEE]">
            FRAME RATE
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-md px-4 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-[#FFD369]/12 text-[#FFD369]"
                  : "text-[#C9C9C9] hover:bg-[#17191A] hover:text-[#EEEEEE]"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3 -bottom-[1px] h-0.5 bg-[#FFD369]" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-md text-[#C9C9C9] transition hover:bg-[#17191A] hover:text-[#FFD369]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>

          <Link
            href="/profile"
            aria-label="Profile"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(238,238,238,0.14)] bg-[#17191A] text-[#C9C9C9] transition hover:border-[#FFD369]/60 hover:text-[#FFD369]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
