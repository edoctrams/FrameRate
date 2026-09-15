import Link from "next/link";
import { formatCount, formatPostedAt, getTabByType } from "../lib/spaces";

export default function DiscussionCard({ discussion, commentCount, interested }) {
  const comments = Number(commentCount ?? discussion.replies ?? 0);
  const votes = Number(interested ?? discussion.interested ?? 0);
  const href = `${getTabByType("discussion").href}/${discussion.id}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-[#252529] bg-[#151518] p-6 transition duration-300 hover:border-[#FF3B78]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="min-w-0 text-lg font-black leading-6 tracking-tight text-[#F5F5F5] transition-colors duration-300 group-hover:text-[#FF3B78]">
          {discussion.title}
        </h2>
        <span className="shrink-0 rounded-full border border-[#FF3B78]/30 bg-[#FF3B78]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF3B78]">
          Discussion
        </span>
      </div>

      {discussion.content ? (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#85858C]">{discussion.content}</p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#55555C]">
        {discussion.movie ? (
          <span className="rounded-full border border-[#252529] bg-[#101012] px-2.5 py-1 text-[#85858C]">
            {discussion.movie}
          </span>
        ) : (
          <span className="rounded-full border border-[#252529] bg-[#101012] px-2.5 py-1 text-[#55555C]">
            General
          </span>
        )}
        <span className="text-[#85858C]">by {discussion.author}</span>
        <span>·</span>
        <span>{formatPostedAt(discussion)}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
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
