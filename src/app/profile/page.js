import Navbar from "../../components/navbar";
import SignOutButton from "../../components/SignOutButton";

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
        <section className="border-b border-[#252529] pb-12 pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#252529] bg-[#151518] text-2xl font-black text-[#FF3B78]">
                P
              </div>
              <div>
                <span className="fr-label">Member Profile</span>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-[#F5F5F5] sm:text-5xl">
                  {profile.name}
                </h1>
                <p className="mt-2 text-sm text-[#55555C]">{profile.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid grid-cols-3 gap-3 text-center md:min-w-[320px]">
                {Object.entries(profile.stats).map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-[#252529] bg-[#151518] p-4">
                    <p className="text-2xl font-black text-[#FF3B78]">{value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#55555C]">
                      {key}
                    </p>
                  </div>
                ))}
              </div>
              <SignOutButton />
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-base leading-7 text-[#85858C]">{profile.bio}</p>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#252529] bg-[#151518] p-6 sm:p-8">
            <h2 className="text-2xl font-black text-[#F5F5F5]">Recent Reviews</h2>
            <div className="mt-5 space-y-3">
              {recentReviews.map((review) => (
                <div key={review.title} className="flex items-center justify-between rounded-xl border border-[#252529] bg-[#101012] p-4">
                  <div>
                    <p className="font-semibold text-[#F5F5F5]">{review.title}</p>
                    <p className="text-xs text-[#85858C]">{review.time}</p>
                  </div>
                  <span className="text-sm font-bold text-[#FF3B78]">★ {review.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#252529] bg-[#151518] p-6 sm:p-8">
            <h2 className="text-2xl font-black text-[#F5F5F5]">Recent Collections</h2>
            <div className="mt-5 space-y-3">
              {recentCollections.map((collection) => (
                <div key={collection.name} className="flex items-center justify-between rounded-xl border border-[#252529] bg-[#101012] p-4">
                  <div>
                    <p className="font-semibold text-[#F5F5F5]">{collection.name}</p>
                    <p className="text-xs text-[#85858C]">{collection.count} movies</p>
                  </div>
                  <span className="text-sm text-[#FF3B78]">↗</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
