import Navbar from "../../components/navbar";

const profile = {
  name: "Parth",
  username: "@parth",
  bio: "Movie lover chasing the next great watch and talking through every twist.",
  stats: {
    reviews: 18,
    collections: 5,
    discussions: 9,
  },
};

const recentReviews = [
  { title: "Interstellar", score: 9.2, time: "2 days ago" },
  { title: "Parasite", score: 8.8, time: "1 week ago" },
  { title: "The Dark Knight", score: 9.4, time: "2 weeks ago" },
];

const recentCollections = [
  { name: "Mind-Bending Sci-Fi", count: 4 },
  { name: "Late-Night Watches", count: 3 },
  { name: "Best of 2010s", count: 6 },
];

export default function ProfilePage() {
  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <section className="fr-panel rounded-lg px-8 py-10 sm:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-[#393E46] bg-[#0D0F10] text-2xl font-black text-[#FFD369] shadow-md">
                P
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-normal text-[#EEEEEE]">{profile.name}</h1>
                <p className="text-[#92979D]">{profile.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center md:min-w-[300px]">
              {Object.entries(profile.stats).map(([key, value]) => (
                <div key={key} className="rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#0D0F10] p-3">
                  <p className="text-xl font-bold text-[#FFD369]">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#92979D]">{key}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#C9C9C9]">{profile.bio}</p>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="fr-panel rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-black text-[#EEEEEE]">Recent Reviews</h2>
            <div className="mt-5 space-y-3">
              {recentReviews.map((review) => (
                <div key={review.title} className="flex items-center justify-between rounded-lg border border-[rgba(238,238,238,0.1)] bg-[#0D0F10] p-4">
                  <div>
                    <p className="font-semibold text-[#EEEEEE]">{review.title}</p>
                    <p className="text-xs text-[#92979D]">{review.time}</p>
                  </div>
                  <span className="text-sm font-bold text-[#FFD369]">★ {review.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="fr-panel rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-black text-[#EEEEEE]">Recent Collections</h2>
            <div className="mt-5 space-y-3">
              {recentCollections.map((collection) => (
                <div key={collection.name} className="flex items-center justify-between rounded-lg border border-[rgba(238,238,238,0.1)] bg-[#0D0F10] p-4">
                  <div>
                    <p className="font-semibold text-[#EEEEEE]">{collection.name}</p>
                    <p className="text-xs text-[#92979D]">{collection.count} movies</p>
                  </div>
                  <span className="text-sm text-[#FFD369]">↗</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
