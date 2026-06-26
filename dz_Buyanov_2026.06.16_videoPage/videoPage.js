"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")
    const button = document.querySelector("#searchButton")
    async function queryToSearchFilm()
    {
        const response = await fetch(
            "https://api.poiskkino.dev/v1.4/movie?year=2023&genres.name=криминал",
            {
                methed: "GET",
                headers: 
                {"X-API-KEY" : "5AY8CN9-635M89B-QVNAJS0-9GB0MZG"}
            })
        if (response.ok)
        {
            console.log(response);
            const text = await response.json();
            // let textJ = JSON.stringify(text.docs[0].countries[0].name)
            let textList = []
            for(let i = 0; i < text.docs.length; i++)
            {
                let textNF = text.docs[i].alternativeName
                const p = `<p>${i+1}.  ${textNF}</p>`
                textList.push(p)
            }
            for(let p of textList)
            {
                output.innerHTML += p
            }
            // const p = `<p>${textJ}</p>`
            // output.innerHTML = p
            console.log(text)
        }
        else
        {
        }
    }
    button.addEventListener("click", queryToSearchFilm)
})
