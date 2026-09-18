export function adaptTMDBMovie(movie) {

    return {

        id: movie.id,

        title: movie.title,

        year: movie.release_date
            ? movie.release_date.split("-")[0]
            : "N/A",

        rating: Number(
            movie.vote_average?.toFixed(1) || 0
        ),

        genre: movie.genre_ids || [],

        duration: "N/A",

        platform: "TMDB",

        description: movie.overview,

        poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,

    };

}