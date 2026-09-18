import { createServerSupabase } from "../../../lib/supabaseServer";
import { NextResponse } from "next/server";


// GET USER WATCHLIST
export async function GET() {

    const supabase = await createServerSupabase();

    const {
        data:{ user },
        error:userError
    } = await supabase.auth.getUser();


    if(userError || !user){
        return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        );
    }


      const {data,error}=await supabase

    .from("watchlist")

    .select("*")

    .eq("user_id",user.id);
     


    if(error){
        return NextResponse.json(
            {error:error.message},
            {status:500}
        );
    }


    return NextResponse.json(data);
}




// ADD MOVIE TO WATCHLIST
export async function POST(request){

    const supabase = await createServerSupabase();


    const {
        data:{user},
        error:userError
    } = await supabase.auth.getUser();



    if(userError || !user){
        return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        );
    }



    const body = await request.json();

const {
    movie_id,
    title,
    poster,
    year,
    rating,
    genre,
    duration,
    platform,
    description
} = body;


if(!movie_id){
    return NextResponse.json(
        {error:"movie_id required"},
        {status:400}
    );
}


const {data,error}=await supabase

    .from("watchlist")

    .insert({

        user_id:user.id,

        movie_id,

        title,

        poster,

        year,

        rating,

        genre,

        duration,

        platform,

        description

    })

    .select();



    if(error){
        return NextResponse.json(
            {error:error.message},
            {status:500}
        );
    }



    return NextResponse.json(data);
}




// REMOVE MOVIE FROM WATCHLIST
export async function DELETE(request){


    const supabase = await createServerSupabase();


    const {
        data:{user},
        error:userError
    } = await supabase.auth.getUser();



    if(userError || !user){
        return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        );
    }



    const body = await request.json();

    const {movie_id}=body;



    if(!movie_id){
        return NextResponse.json(
            {error:"movie_id required"},
            {status:400}
        );
    }



    const {error}=await supabase
        .from("watchlist")
        .delete()
        .eq("user_id",user.id)
        .eq("movie_id",movie_id);



    if(error){
        return NextResponse.json(
            {error:error.message},
            {status:500}
        );
    }



    return NextResponse.json({
        message:"Removed from watchlist"
    });
}