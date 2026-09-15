"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    signIn({ name: name.trim() || username.trim() || "Parth", email });
    router.push("/dashboard-new");
  };

  return (
    <main className="fr-page relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="relative w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#252529] bg-[#151518] text-lg font-black text-[#F5F5F5] shadow-md">
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF3B78]" />
              <span className="relative">F</span>
            </div>
            <span className="text-lg font-black tracking-[0.26em] text-[#F5F5F5]">
              FRAME RATE
            </span>
          </div>
        </div>

        <div className="fr-panel rounded-lg p-7 sm:p-9">
          <div className="mb-8 text-center">
            <span className="fr-label">Join the club</span>
            <h1 className="mt-3 text-3xl font-black tracking-normal text-[#F5F5F5]">
              Create account
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#85858C]">
              Start tracking the films and debates that deserve a second screening.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#85858C]">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="h-12 w-full rounded-lg border border-[#252529] bg-[#080808] px-4 text-sm text-[#F5F5F5] placeholder:text-[#85858C] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
              />
            </div>

            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-[#85858C]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
                required
                className="h-12 w-full rounded-lg border border-[#252529] bg-[#080808] px-4 text-sm text-[#F5F5F5] placeholder:text-[#85858C] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#85858C]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 w-full rounded-lg border border-[#252529] bg-[#080808] px-4 text-sm text-[#F5F5F5] placeholder:text-[#85858C] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#85858C]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="h-12 w-full rounded-lg border border-[#252529] bg-[#080808] px-4 pr-12 text-sm text-[#F5F5F5] placeholder:text-[#85858C] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#85858C] transition hover:text-[#FF3B78]"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#85858C]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="h-12 w-full rounded-lg border border-[#252529] bg-[#080808] px-4 pr-12 text-sm text-[#F5F5F5] placeholder:text-[#85858C] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#85858C] transition hover:text-[#FF3B78]"
                >
                  {showConfirmPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-[#FF3B78]/40 bg-[#FF3B78]/10 px-4 py-3 text-sm text-[#FF3B78]">
                {error}
              </p>
            )}

            <button type="submit" className="fr-button h-12 w-full">
              Create Account
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#252529]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#85858C]">Or</span>
            <div className="h-px flex-1 bg-[#252529]" />
          </div>

          <button
            type="button"
            className="fr-button-secondary flex h-12 w-full items-center justify-center text-sm font-medium"
          >
            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-[#85858C]">
            Already have an account? {" "}
            <Link href="/login" className="font-semibold text-[#FF3B78] underline decoration-[#FF3B78] underline-offset-4 transition hover:text-[#F5F5F5]">
              Log in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.22em] text-[#FF3B78]">
          EAT · SLEEP · BINGE · REVIEW · REPEAT
        </p>
      </div>
    </main>
  );
}
