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
    <div className="mt-6 rounded-2xl border border-[#252529] bg-[#101012] p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FF3B78]">
        Advanced Review
      </p>
      <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
        {advancedCategories.map(({ key, label }) => {
          const score = Number(ratings[key]) || 0;
          return (
            <div key={key}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-[#85858C]">{label}</span>
                <span className="text-xs font-bold text-[#FF3B78]">{score}.0</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#252529]">
                <div
                  className="h-full rounded-full bg-[#FF3B78]"
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
