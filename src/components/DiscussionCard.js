import Link from "next/link";

export default function DiscussionCard({ discussion }) {
  return (
    <Link
      href={`/discussions/${discussion.id}`}
      className="block rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] p-5 transition hover:-translate-y-0.5 hover:border-[#FFD369]/50"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-[#EEEEEE]">{discussion.title}</h2>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#92979D]">
            {discussion.movie && (
              <span className="rounded-md border border-[#FFD369]/30 bg-[#FFD369]/10 px-2.5 py-1 text-[#FFD369]">
                {discussion.movie}
              </span>
            )}
            <span>by {discussion.author}</span>
            <span>•</span>
            <span>{discussion.time}</span>
          </div>
        </div>

        <div className="shrink-0 text-sm font-semibold text-[#FFD369]">
          {discussion.replies ?? 0} {discussion.replies === 1 ? "reply" : "replies"}
        </div>
      </div>
    </Link>
  );
}
