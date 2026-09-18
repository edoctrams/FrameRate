"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";

export default function WatchlistPage() {

    const router = useRouter();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);



    async function loadWatchlist() {

        const res = await fetch("/api/watchlist");

        const data = await res.json();


        if (Array.isArray(data)) {
            setMovies(data);
        }


        setLoading(false);
    }




    async function removeMovie(movieId) {

        const res = await fetch("/api/watchlist", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                movie_id: movieId
            })
        });


        const data = await res.json();


        if (!res.ok) {
            console.error(data.error);
            return;
        }


        setMovies(
            movies.filter(
                (item) => item.movie_id !== movieId
            )
        );
    }





   useEffect(() => {

    async function checkUser(){

        const user = await getCurrentUser();


        if(!user){

            router.push("/login");
            return;

        }


        loadWatchlist();

    }


    checkUser();


}, []);





    if (loading) {

        return (
            <div className="p-10 text-[#F5F5F5]">
                Loading watchlist...
            </div>
        );

    }





    return (

        <main className="min-h-screen bg-[#101012] px-8 py-10">


            <h1 className="mb-8 text-3xl font-bold text-[#F5F5F5]">
                My Watch Later
            </h1>




            {movies.length === 0 ? (

                <div className="text-[#85858C]">
                    Your watchlist is empty.
                </div>


            ) : (


                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


                    {movies.map((item) => {

                        const movie = item.movies;


                        return (

                            <div
                                key={item.movie_id}
                                className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-[#252529]
                                bg-[#151518]
                                transition
                                hover:-translate-y-1
                                hover:border-[#FF3B78]
                                "
                            >


                                {/* Poster */}

                                <div className="h-72 bg-[#252529]">


                                    {movie?.poster ? (

                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                        />

                                    ) : (

                                        <div className="flex h-full items-center justify-center text-[#85858C]">
                                            No Poster
                                        </div>

                                    )}


                                </div>





                                <div className="p-4">


                                    <h2 className="text-xl font-semibold text-[#F5F5F5]">
                                        {movie?.title}
                                    </h2>



                                    <p className="mt-1 text-sm text-[#85858C]">
                                        {movie?.year} • {movie?.duration}
                                    </p>




                                    <p className="mt-2 text-sm text-[#F5F5F5]">
                                        ⭐ {movie?.rating}
                                    </p>





                                    <div className="mt-3 flex flex-wrap gap-2">


                                        {movie?.genre?.map((genre) => (

                                            <span
                                                key={genre}
                                                className="
                                                rounded-full
                                                bg-[#252529]
                                                px-3
                                                py-1
                                                text-xs
                                                text-[#85858C]
                                                "
                                            >
                                                {genre}
                                            </span>

                                        ))}


                                    </div>





                                    <p className="mt-3 text-sm text-[#85858C]">
                                        Watch on: {movie?.platform}
                                    </p>





                                    <div className="mt-5 flex gap-4">


                                        <Link
                                            href={`/movies/${item.movie_id}`}
                                            className="text-[#FF3B78]"
                                        >
                                            View
                                        </Link>



                                        <button
                                            onClick={() => removeMovie(item.movie_id)}
                                            className="text-red-400"
                                        >
                                            Remove
                                        </button>


                                    </div>


                                </div>


                            </div>

                        );

                    })}


                </div>


            )}


        </main>

    );

}