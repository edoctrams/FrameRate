"use client";

import Link from "next/link";

export default function SignInGate({ open, action = "continue", onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#252529] bg-[#151518] p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FF3B78]/40 bg-[#FF3B78]/10 text-lg font-black text-[#FF3B78]">
          F
        </div>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-[#F5F5F5]">
          Sign in to {action}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#85858C]">
          Create a free Frame Rate account to review films, build collections and join the
          conversation.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Link href="/login" className="fr-button rounded-full">
            Sign In
          </Link>
          <Link href="/register" className="fr-button-secondary rounded-full">
            Create Account
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.18em] text-[#55555C] transition hover:text-[#85858C]"
          >
            Keep browsing
          </button>
        </div>
      </div>
    </div>
  );
}