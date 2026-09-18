import { supabase } from "./supabase";


// ADD MOVIE
export async function addToWatchlist(movie){

    try {

        const res = await fetch("/api/watchlist", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                movie_id: movie.id,
                title: movie.title,
                poster: movie.poster,
                year: movie.year,
                rating: movie.rating,
                genre: movie.genre,
                duration: movie.duration,
                platform: movie.platform,
                description: movie.description
            })
        });


        const data = await res.json();


        if(!res.ok){
            return {
                data:null,
                error:data.error
            };
        }


        return {
            data,
            error:null
        };


    } catch(error){

        return {
            data:null,
            error:error.message
        };

    }

}





// REMOVE MOVIE
export async function removeFromWatchlist(movieId){

    try{

        const res = await fetch("/api/watchlist",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                movie_id:movieId
            })
        });


        const data = await res.json();


        if(!res.ok){
            return {
                data:null,
                error:data.error
            };
        }


        return {
            data,
            error:null
        };


    }catch(error){

        return {
            data:null,
            error:error.message
        };

    }

}





// CHECK IF MOVIE EXISTS
export async function isInWatchlist(movieId){

    try {

        const res = await fetch("/api/watchlist");

        const data = await res.json();

        if(!Array.isArray(data)){
            return false;
        }


        return data.some(
            item => Number(item.movie_id) === Number(movieId)
        );


    } catch(error){

        console.error(
            "Watchlist check error:",
            error
        );

        return false;
    }
}