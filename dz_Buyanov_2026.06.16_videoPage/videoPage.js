"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    async function queryToSearchFilm()
    {
        const response = await fetch(
            "https://api.poiskkino.dev/v1.4/movie?year=2023&genres.name=криминал",
            {
                methed: "GET",
                headers: 
                {"X-API-KEY" : 5AY8CN9-635M89B-QVNAJS0-9GB0MZG"}
            }
            
        )
        {

        }
    }
})