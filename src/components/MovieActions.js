"use client";

import {
    getCollections,
    addMovieToCollection,
    createCollection as createCollectionInSupabase
} from "../lib/collections";

import { useEffect, useState } from "react";

import SignInGate from "./SignInGate";

import { getCurrentUser } from "../lib/auth";

import {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
} from "../lib/watchlist";


export default function MovieActions({ movie }) {

    const movieId = movie.id;

    const [watchLater, setWatchLater] = useState(false);
    const [showCollectionMenu, setShowCollectionMenu] = useState(false);
    const [collections, setCollections] = useState([]);
    const [gateAction, setGateAction] = useState(null);


    useEffect(() => {

        let active = true;

        async function loadData() {

            const saved = await isInWatchlist(movieId);

            const savedCollections = await getCollections();

            if(active){
                setWatchLater(saved);
                setCollections(savedCollections || []);
            }
        }


        loadData();


        return () => {
            active = false;
        };


    }, [movieId]);





    const toggleWatchLater = async () => {


        const user = await getCurrentUser();


        if(!user){

            setGateAction("add to Watch Later");

            return;
        }




        // REMOVE

        if(watchLater){


            const result = await removeFromWatchlist(movieId);


            if(result.error){

                console.error(
                    "Remove error:",
                    result.error
                );

                return;
            }


            setWatchLater(false);

            return;

        }





        // ADD

        const result = await addToWatchlist(movie);



        if(result.error){


            const errorMessage =
                typeof result.error === "string"
                ? result.error
                : result.error.message || "";



            // already exists

            if(
                errorMessage.includes("duplicate") ||
                errorMessage.includes("unique")
            ){

                setWatchLater(true);

                return;
            }



            console.error(
                "Watchlist error:",
                result.error
            );


            return;

        }



        setWatchLater(true);

    };






    const addToCollection = async (collectionId)=>{


        const result = await addMovieToCollection(
            collectionId,
            movieId
        );


        if(result.error){

            console.error(
                "Collection error:",
                result.error
            );

            return;
        }


        setShowCollectionMenu(false);

    };








    const createCollection = async ()=>{


        const user = await getCurrentUser();



        if(!user){

            setGateAction(
                "create a collection"
            );

            setShowCollectionMenu(false);

            return;
        }



        const name = prompt(
            "Enter collection name:"
        );



        if(!name || !name.trim()){

            return;
        }





        const result =
            await createCollectionInSupabase({

                name:name.trim(),

                description:
                "A hand-picked run of films worth watching in one sitting.",

                movieId

            });




        if(result.error){

            console.error(
                "Create collection error:",
                result.error
            );

            return;

        }




        setCollections([
            ...collections,
            result.data
        ]);


        setShowCollectionMenu(false);

    };









    return (

        <div className="mt-8 flex flex-wrap gap-3">


            <button

                type="button"

                onClick={toggleWatchLater}

                className="fr-button-secondary"

            >

                {
                    watchLater
                    ? "✓ Added to Watch Later"
                    : "+ Watch Later"
                }


            </button>





            <div className="relative">


                <button

                    type="button"

                    onClick={() =>
                        setShowCollectionMenu(
                            !showCollectionMenu
                        )
                    }

                    className="fr-button-secondary"

                >

                    + Collection

                </button>





                {
                    showCollectionMenu && (

                        <div className="
                            absolute
                            left-0
                            top-full
                            z-20
                            mt-2
                            w-64
                            rounded-lg
                            border
                            border-[#252529]
                            bg-[#151518]
                            p-2
                            shadow-[0_16px_32px_rgba(0,0,0,0.4)]
                        ">


                            <p className="
                                px-3
                                py-2
                                text-[10px]
                                uppercase
                                tracking-[0.22em]
                                text-[#FF3B78]
                            ">

                                Add to collection

                            </p>





                            {
                                collections.length > 0 &&

                                collections.map((collection)=>(


                                    <button

                                        key={collection.id}

                                        onClick={() =>
                                            addToCollection(
                                                collection.id
                                            )
                                        }

                                        className="
                                            w-full
                                            rounded-md
                                            px-3
                                            py-2.5
                                            text-left
                                            text-sm
                                            text-[#85858C]
                                            transition
                                            hover:bg-[#101012]
                                            hover:text-[#F5F5F5]
                                        "

                                    >

                                        {collection.name}


                                    </button>


                                ))

                            }







                            <button

                                type="button"

                                onClick={createCollection}

                                className="
                                    mt-1
                                    w-full
                                    border-t
                                    border-[#252529]
                                    px-3
                                    py-2.5
                                    text-left
                                    text-sm
                                    text-[#F5F5F5]
                                    transition
                                    hover:bg-[#101012]
                                    hover:text-[#FF3B78]
                                "

                            >

                                + Create new collection


                            </button>




                        </div>

                    )

                }



            </div>







            <SignInGate

                open={Boolean(gateAction)}

                action={
                    gateAction || "continue"
                }

                onClose={() =>
                    setGateAction(null)
                }

            />



        </div>

    );

}