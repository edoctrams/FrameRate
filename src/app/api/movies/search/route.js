import { NextResponse } from "next/server";
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  try {
    let url;

    if (query && query.trim()) {
      url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1`;
    } else {
      url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    }

    const response = await fetchFromTMDB(url);

    if (!response.ok) {
      console.error("TMDB API error:", response.status);

      return NextResponse.json(
        {
          error: "Failed to fetch movies from TMDB",
          results: [],
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    const movies = data.results
      .filter((movie) => movie.media_type !== "person")
      .map((movie) => ({
        id: movie.id,
        title: movie.title || movie.name,
        type: movie.media_type === "tv" ? "Series" : "Movie",
        year:
          Number(
            (movie.release_date || movie.first_air_date || "").slice(0, 4)
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

    return NextResponse.json({ results: movies });
  } catch (error) {
    console.error("TMDB request failed:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to TMDB",
        results: [],
      },
      { status: 500 }
    );
  }
}