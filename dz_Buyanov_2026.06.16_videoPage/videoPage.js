"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameFilm = document.querySelector("#inputTitle")
    const inpuTypeFilm = document.querySelector("#inputType")
    const output = document.querySelector("#output")
    const button = document.querySelector("#searchButton")

    async function queryToSearchFilm()
    {   
        output.innerHTML = "⏳ Загрузка..."
        let nameFilm = inputNameFilm.value.trim()
        let typeFilm = inpuTypeFilm.value.trim()
        const baseURL = "https://api.poiskkino.dev/";
        const version = "v1.4/";
        const endpoint = "movie/search";
        const params = new URLSearchParams(
            {
                page : 1,
                limit : 10,
                query : nameFilm
            }
        )
        // console.log(params.get("page"), params.get("limit"), params.get("query"), typeFilm)
        console.log(params.toString())
        console.log(`${baseURL}${version}${endpoint}?${params}`)
        const response = await fetch(
            `${baseURL}${version}${endpoint}?${params}`,
            {
                method: "GET",
                headers: 
                {"X-API-KEY" : "5AY8CN9-635M89B-QVNAJS0-9GB0MZG"}
            })
        if (response.ok)
        {
            console.log(response);
            const text = await response.json();
            output.innerHTML = ""
            // let textJ = JSON.stringify(text.docs[0].countries[0].name)
            let textList = []
            for(let i = 0; i < text.docs.length; i++)
            {
                let textNF = text.docs[i].name
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
