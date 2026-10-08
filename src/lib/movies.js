import { supabase } from "./supabase";
import https from "https";

function fetchFromTMDB(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      },
      (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve({
            ok:
              response.statusCode >= 200 &&
              response.statusCode < 300,
            status: response.statusCode,
            json: async () => JSON.parse(data),
          });
        });
      }
    );

    request.on("error", (error) => {
      reject(error);
    });
  });
}


// Get movies from TMDB
export async function getMovies(query = "") {
  const url = query
    ? `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1`
    : "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

  try {
    const response = await fetchFromTMDB(url);

    if (!response.ok) {
      console.error(
        "Error fetching movies from TMDB:",
        response.status
      );
      return [];
    }

    const data = await response.json();

    return data.results
      .filter((movie) => movie.media_type !== "person")
      .map((movie) => ({
        id: movie.id,
        title: movie.title || movie.name,
        type: movie.media_type === "tv" ? "Series" : "Movie",
        year:
          Number(
            (movie.release_date ||
              movie.first_air_date ||
              "").slice(0, 4)
          ) || null,
        rating: movie.vote_average,
        genre: [],
        duration: null,
        platform: "TMDB",
        description: movie.overview,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      }));
  } catch (error) {
    console.error(
      "Error fetching movies from TMDB:",
      error
    );

    return [];
  }
}


// Get one movie directly from TMDB
export async function getMovieByIdFromTMDB(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  try {
    const response = await fetchFromTMDB(url);

    if (!response.ok) {
      console.error(
        "Error fetching movie from TMDB:",
        response.status
      );

      return null;
    }

    const movie = await response.json();

    return {
      id: movie.id,
      title: movie.title,
      type: "Movie",
      year: movie.release_date
        ? Number(movie.release_date.slice(0, 4))
        : null,
      rating: movie.vote_average,
      genre:
        movie.genres?.map((genre) => genre.name) || [],
      duration: movie.runtime
        ? `${movie.runtime} min`
        : "N/A",
      platform: "TMDB",
      description: movie.overview,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
    };
  } catch (error) {
    console.error(
      "Error fetching movie from TMDB:",
      error
    );

    return null;
  }
}


// Old Supabase movie function
// Kept for compatibility with any other part of the project
export async function getMovieByIdFromSupabase(id) {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching movie:", error);
    return null;
  }

  return data;
}