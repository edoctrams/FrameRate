export function tmdbPoster(path){

    if(!path){
        return null;
    }

    return `https://image.tmdb.org/t/p/w500${path}`;

}


export function tmdbBackdrop(path){

    if(!path){
        return null;
    }

    return `https://image.tmdb.org/t/p/original${path}`;

}