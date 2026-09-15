import { formatRelativeTime } from "../lib/spaces";

/* Shared comment/reply row used by discussions, trailers and news. */
export default function CommentRow({ comment }) {
  return (
    <div className="rounded-xl border border-[#252529] bg-[#151518] p-5">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#252529] bg-[#080808] text-[10px] font-bold text-[#FF3B78]">
          {comment.author?.charAt(0)?.toUpperCase() || "U"}
        </span>
        <span className="font-semibold text-[#F5F5F5]">{comment.author}</span>
        <span className="text-[#55555C]">·</span>
        <span className="text-xs text-[#55555C]">
          {comment.time || formatRelativeTime(comment.createdAt)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#85858C]">{comment.content}</p>
    </div>
  );
}