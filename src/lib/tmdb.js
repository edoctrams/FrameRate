const TMDB_BASE_URL = "https://api.themoviedb.org/3";


export async function tmdbFetch(endpoint) {

    const res = await fetch(
        `${TMDB_BASE_URL}${endpoint}`,
        {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
            },
            next: {
                revalidate: 3600
            }
        }
    );


    if (!res.ok) {
        throw new Error(
            `TMDB request failed: ${res.status}`
        );
    }


    return res.json();

}