import { supabase } from "../../../../lib/supabase";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {

    const { id } = await params;

    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", Number(id))
        .single();


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