"use client";

import { useRouter } from "next/navigation";
import { signOut } from "../lib/auth";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        signOut();
        router.push("/login");
      }}
      className="rounded-full border border-[#252529] bg-[#151518] px-5 py-2.5 text-sm font-medium text-[#85858C] transition hover:border-[#FF3B78]/60 hover:text-[#FF3B78]"
    >
      Sign Out
    </button>
  );
}