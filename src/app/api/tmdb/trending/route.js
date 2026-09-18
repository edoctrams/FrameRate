import { NextResponse } from "next/server";
import { tmdbFetch } from "../../../../lib/tmdb";


export async function GET() {

    try {

        const movies = await tmdbFetch(
            "/trending/movie/week"
        );


        return NextResponse.json(
            movies.results
        );


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