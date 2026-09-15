"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCount, getMostInterested, getSeedMostInterested } from "../lib/spaces";

const thumbGradients = [
  "linear-gradient(160deg, rgba(255,59,120,0.5), rgba(90,20,50,0.4) 55%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(181,47,103,0.5), rgba(60,12,35,0.45) 55%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(120,60,200,0.42), rgba(40,15,70,0.45) 55%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(20,140,150,0.38), rgba(10,50,60,0.45) 55%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(200,90,40,0.42), rgba(70,25,10,0.45) 55%, rgba(8,8,8,0.95))",
];

export default function MostInterested({ limit = 5, activeTab = null }) {
  const [rows, setRows] = useState(() => getSeedMostInterested(limit));

  useEffect(() => {
    setRows(getMostInterested(limit));
  }, [limit]);

  return (
    <section className="rounded-2xl border border-[#252529] bg-[#151518] p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF3B78]">
            Most Interested
          </span>
          <h2 className="mt-2 text-lg font-black tracking-tight text-[#F5F5F5]">
            What people are tracking
          </h2>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-1">
        {rows.length === 0 && (
          <p className="text-sm text-[#85858C]">Nothing ranked yet.</p>
        )}

        {rows.map((row, index) => {
          const isHighlighted = activeTab ? row.tabKey === activeTab : index === 0;
          return (
            <Link
              key={`${row.type}-${row.id}`}
              href={row.href}
              className="group flex items-center gap-3 rounded-xl border border-transparent px-2 py-3 transition duration-300 hover:border-[#252529] hover:bg-[#101012]"
            >
              <span
                className={`w-9 shrink-0 text-2xl font-black leading-none tracking-tighter transition-colors duration-300 ${
                  isHighlighted ? "text-[#FF3B78]" : "text-[#2E2E34] group-hover:text-[#B52F67]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                aria-hidden
                className="relative flex h-14 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#252529]"
                style={{ background: thumbGradients[index % thumbGradients.length] }}
              >
                <span className="text-[10px] font-black text-[#F5F5F5]/70">F</span>
              </span>

              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 block text-sm font-semibold leading-5 text-[#F5F5F5] transition-colors duration-300 group-hover:text-[#FF3B78]">
                  {row.title}
                </span>
                <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.14em] text-[#55555C]">
                  {row.movie || row.tabLabel}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block text-sm font-bold text-[#F5F5F5]">
                  {formatCount(row.interested)}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-[#55555C]">
                  Interested
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#252529] pt-4">
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#55555C]">
          Ranked across Spaces
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#B52F67]">
          Live now
        </span>
      </div>
    </section>
  );
}
