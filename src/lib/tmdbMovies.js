import { tmdbFetch } from "./tmdb";

export async function getTMDBMovies(){

    const data = await tmdbFetch(
        "/trending/movie/week"
    );


    return data.results.map((movie)=>({

        id: movie.id,

        title: movie.title,

        year: movie.release_date
            ? movie.release_date.split("-")[0]
            : "N/A",

        rating:
            Number(movie.vote_average?.toFixed(1)) || 0,


        genre:
            movie.genre_ids || [],


        duration:"N/A",

        platform:"TMDB",

        description:
            movie.overview || "No description available",


        poster:
            movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null

    }));

}

export async function getTMDBMovie(id){

    const movie = await tmdbFetch(
        `/movie/${id}`
    );


    return {

        id: movie.id,

        title: movie.title,

        year: movie.release_date
            ? movie.release_date.split("-")[0]
            : "N/A",

        rating:
            Number(movie.vote_average?.toFixed(1)) || 0,


        genre:
            movie.genres?.map(
                (g)=>g.name
            ) || [],


        duration:
            movie.runtime
            ? `${movie.runtime} min`
            : "N/A",


        type:"Movie",

        platform:"TMDB",


        description:
            movie.overview || "No description available",


        poster:
            movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null

    };

}