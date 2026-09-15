import Link from "next/link";
import { formatCount, getTabByType } from "../lib/spaces";

/* Card used for Frame Rate provided content inside Spaces (Trailers + News). */

const gradients = [
  "linear-gradient(150deg, rgba(255,59,120,0.42), rgba(90,20,50,0.45) 50%, rgba(8,8,8,0.95))",
  "linear-gradient(150deg, rgba(120,60,200,0.38), rgba(40,15,70,0.45) 50%, rgba(8,8,8,0.95))",
  "linear-gradient(150deg, rgba(20,140,150,0.34), rgba(10,50,60,0.45) 50%, rgba(8,8,8,0.95))",
  "linear-gradient(150deg, rgba(200,90,40,0.38), rgba(70,25,10,0.45) 50%, rgba(8,8,8,0.95))",
  "linear-gradient(150deg, rgba(181,47,103,0.42), rgba(60,12,35,0.45) 50%, rgba(8,8,8,0.95))",
];

export default function SpacesContentCard({ item, type, index = 0, commentCount, interested }) {
  const tab = getTabByType(type);
  const href = `${tab.href}/${item.id}`;
  const isTrailer = type === "trailer";
  const title = isTrailer ? item.title : item.headline;
  const comments = Number(commentCount ?? item.comments ?? 0);
  const votes = Number(interested ?? item.interested ?? 0);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-[#252529] bg-[#151518] p-6 transition duration-300 hover:border-[#FF3B78]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
    >
      <div className="flex gap-5">
        <span
          aria-hidden
          className="relative flex h-24 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#252529]"
          style={{ background: gradients[index % gradients.length] }}
        >
          <span className="text-sm font-black text-[#F5F5F5]/75">
            {isTrailer ? "▶" : "N"}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B52F67]">
            {isTrailer ? "Trailer" : "News"}
          </span>
          <h2 className="mt-2 text-lg font-black leading-6 tracking-tight text-[#F5F5F5] transition-colors duration-300 group-hover:text-[#FF3B78]">
            {title}
          </h2>
          {item.movie ? (
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#55555C]">{item.movie}</p>
          ) : null}
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#85858C]">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#85858C]">
        <span className="rounded-full border border-[#252529] bg-[#101012] px-2.5 py-1">
          {isTrailer ? item.release : item.date}
        </span>
        <span className="rounded-full border border-[#252529] bg-[#101012] px-2.5 py-1 text-[#55555C]">
          {isTrailer ? item.meta : item.distributor || "Frame Rate Desk"}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#252529] pt-5">
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-[#FF3B78]">
            <span aria-hidden>▲</span>
            {formatCount(votes)}
            <span className="font-normal uppercase tracking-[0.12em] text-[#55555C]">
              Interested
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-[#85858C]">
            <span aria-hidden>◆</span>
            {comments}
            <span className="uppercase tracking-[0.12em] text-[#55555C]">
              {comments === 1 ? "Comment" : "Comments"}
            </span>
          </span>
        </div>

        <span className="text-sm font-semibold text-[#B52F67] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
          Open →
        </span>
      </div>
    </Link>
  );
}