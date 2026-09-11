"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="fr-page relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="relative w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#393E46] bg-[#17191A] text-lg font-black text-[#EEEEEE] shadow-md">
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD369]" />
              <span className="relative">F</span>
            </div>
            <span className="text-lg font-black tracking-[0.26em] text-[#EEEEEE]">
              FRAME RATE
            </span>
          </div>
        </div>

        <div className="fr-panel rounded-lg p-7 sm:p-9">
          <div className="mb-8 text-center">
            <span className="fr-label">Welcome back</span>
            <h1 className="mt-3 text-3xl font-black tracking-normal text-[#EEEEEE]">
              Sign in
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#92979D]">
              Continue exploring the next film worth your evening.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Login submitted");
            }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#C9C9C9]">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="h-12 w-full rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-4 text-sm text-[#EEEEEE] placeholder:text-[#92979D] outline-none transition focus:border-[#FFD369] focus:ring-2 focus:ring-[#FFD369]/20"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="password" className="text-sm font-medium text-[#C9C9C9]">
                  Password
                </label>
                <button type="button" className="text-xs text-[#C9C9C9] transition hover:text-[#FFD369]">
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-12 w-full rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-4 pr-12 text-sm text-[#EEEEEE] placeholder:text-[#92979D] outline-none transition focus:border-[#FFD369] focus:ring-2 focus:ring-[#FFD369]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92979D] transition hover:text-[#FFD369]"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            <button type="submit" className="fr-button h-12 w-full">
              Log In
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[rgba(238,238,238,0.12)]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#92979D]">Or</span>
            <div className="h-px flex-1 bg-[rgba(238,238,238,0.12)]" />
          </div>

          <button
            type="button"
            className="fr-button-secondary flex h-12 w-full items-center justify-center text-sm font-medium"
          >
            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-[#92979D]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#FFD369] underline decoration-[#FFD369] underline-offset-4 transition hover:text-[#EEEEEE]">
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.22em] text-[#FFD369]">
          EAT · SLEEP · BINGE · REVIEW · REPEAT
        </p>
      </div>
    </main>
  );
}
