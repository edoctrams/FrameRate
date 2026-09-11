import Link from "next/link";

export default function CollectionCard({ collection, onLike }) {
  return (
    <div className="rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] p-5 transition hover:-translate-y-0.5 hover:border-[#FFD369]/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#EEEEEE]">{collection.name}</h2>
          <p className="mt-2 text-sm text-[#92979D]">
            {collection.movies?.length ?? 0} {collection.movies?.length === 1 ? "movie" : "movies"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onLike?.(collection.id)}
          className="rounded-md border border-[#FFD369]/35 bg-[#FFD369]/10 px-3 py-1.5 text-sm font-semibold text-[#FFD369] transition hover:border-[#FFD369]"
        >
          ▲ {collection.likes ?? 0}
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        {collection.movies?.length > 0 ? (
          <Link href={`/collections/${collection.id}`} className="text-sm font-semibold text-[#C9C9C9] hover:text-[#FFD369]">
            View collection →
          </Link>
        ) : (
          <span className="text-sm text-[#92979D]">No movies yet</span>
        )}
      </div>
    </div>
  );
}
