import { supabase } from "../../../../lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");


    if (!query) {
        return NextResponse.json(
            {
                error: "Search query required"
            },
            {
                status: 400
            }
        );
    }


    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .ilike("title", `%${query}%`);


    if (error) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        );
    }


    return NextResponse.json(data);
}