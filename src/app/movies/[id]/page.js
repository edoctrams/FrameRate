import Link from "next/link";
import MovieActions from "../../../components/MovieActions";
import { getTMDBMovie } from "../../../lib/tmdbMovies";


async function getMovie(id) {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/movies/${id}`,
        {
            cache: "no-store",
        }
    );


    if (!res.ok) {
        return null;
    }


    return res.json();

}



export default async function MoviePage({ params }) {

    const { id } = await params;

    let movie = await getMovie(id);


    if (!movie) {

        movie = await getTMDBMovie(id);

    }



    if (!movie) {

        return (

            <main className="min-h-screen bg-[#101012] p-10 text-white">

                Movie not found

            </main>

        );

    }



    return (

        <main className="min-h-screen bg-[#101012] text-[#F5F5F5]">


            {/* Hero */}

            <section

                className="relative min-h-[650px] bg-cover bg-center"

                style={{

                    backgroundImage: `url(${movie.poster})`

                }}

            >


                <div className="absolute inset-0 bg-[#101012]/90 backdrop-blur-sm" />



                <div className="relative mx-auto flex max-w-6xl gap-10 px-8 py-20">


                    {/* Poster */}

                    <div className="hidden w-[300px] shrink-0 overflow-hidden rounded-xl border border-[#252529] md:block">


                        <img

                            src={movie.poster}

                            alt={movie.title}

                            className="h-full w-full object-cover"

                        />


                    </div>




                    {/* Details */}

                    <div className="max-w-3xl">


                        <h1 className="text-5xl font-black">

                            {movie.title}

                        </h1>



                        <div className="mt-4 flex flex-wrap gap-4 text-[#85858C]">

                            <span>{movie.year}</span>

                            <span>•</span>

                            <span>{movie.duration}</span>

                            <span>•</span>

                            <span>{movie.platform}</span>

                        </div>




                        <p className="mt-5 text-xl">

                            ⭐ {movie.rating}

                        </p>




                        <div className="mt-6 flex flex-wrap gap-3">


                            {movie.genre?.map((genre)=>(

                                <span

                                    key={genre}

                                    className="rounded-full bg-[#252529] px-4 py-2 text-sm"

                                >

                                    {genre}

                                </span>

                            ))}


                        </div>




                        <div className="mt-8">

                            <MovieActions movie={movie}/>

                        </div>





                        <div className="mt-8">


                            <h2 className="text-xl font-bold">

                                Description

                            </h2>


                            <p className="mt-3 leading-7 text-[#85858C]">

                                {movie.description}

                            </p>


                        </div>





                        <p className="mt-8 text-[#85858C]">

                            Watch on:

                            <span className="ml-2 text-[#F5F5F5]">

                                {movie.platform}

                            </span>

                        </p>



                    </div>



                </div>


            </section>



            <div className="px-8 py-8">


                <Link

                    href="/watchlist"

                    className="text-[#FF3B78]"

                >

                    ← Back to Watch Later

                </Link>


            </div>



        </main>

    );

}