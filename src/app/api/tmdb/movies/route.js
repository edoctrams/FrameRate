import { NextResponse } from "next/server";
import { tmdbFetch } from "../../../../lib/tmdb";
import { adaptTMDBMovie } from "../../../../lib/tmdbAdapter";


export async function GET() {

    try {

        const data = await tmdbFetch(
            "/movie/popular"
        );


        const movies = data.results.map(
            (movie) => adaptTMDBMovie(movie)
        );


        return NextResponse.json(movies);


    } catch(error) {

        return NextResponse.json(
            {
                error:error.message
            },
            {
                status:500
            }
        );

    }

}