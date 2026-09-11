const advancedCategories = [
  { key: "cinematography", label: "Cinematography" },
  { key: "direction", label: "Direction" },
  { key: "acting", label: "Acting" },
  { key: "story", label: "Story" },
  { key: "music", label: "Music" },
  { key: "editing", label: "Editing" },
];

export default function AdvancedReview({ ratings }) {
  if (!ratings) return null;

  return (
    <div className="mt-5 rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#0D0F10] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFD369] font-semibold">
        Advanced Review
      </p>
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {advancedCategories.map(({ key, label }) => {
          const score = Number(ratings[key]) || 0;
          return (
            <div key={key} className="flex items-center justify-between gap-3">
              <span className="text-sm text-[#C9C9C9]">{label}</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#393E46]">
                  <div
                    className="h-full rounded-full bg-[#FFD369]"
                    style={{ width: `${score * 10}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-bold text-[#EEEEEE]">
                  {score}/10
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
