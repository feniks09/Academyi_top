"use strict"



document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameFilm = document.querySelector("#inputTitle")
    const inpuTypeFilm = document.querySelector("#inputType")
    const output = document.querySelector("#output")
    const footPage = document.querySelector("#footPage")
    const listMovie = document.querySelector("#listMovie")
    const button = document.querySelector("#searchButton")

    async function queryToSearchFilm()
    {   
        listMovie.innerHTML = "⏳ Загрузка..."
        let nameFilm = inputNameFilm.value.trim()
        let typeFilm = inpuTypeFilm.value.trim()
        const baseURL = "https://api.poiskkino.dev/";
        const version = "v1.4/";
        let endpoint;
        const params = new URLSearchParams({
            page: 1,
            limit: 10,
        });

        // Если есть название - используем поиск по названию
        if (nameFilm) {
            endpoint = "movie/search";
            params.append('query', nameFilm);
            
            // Для поиска по названию isSeries не работает, 
            // поэтому фильтруем результаты вручную после получения
        } else {
            // Если нет названия - используем фильтры
            endpoint = "movie";
            
            // Фильтр по типу
            if (typeFilm === "series") {
                params.set('isSeries', 'true');
            } else {
                params.set('isSeries', 'false');
            }
        }

        console.log("URL:", `${baseURL}${version}${endpoint}?${params}`);
        console.log("Параметры:", params.toString());

        // console.log(params.get("page"), params.get("limit"), params.get("query"), typeFilm)
        console.log(params.toString())
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
            const date = await response.json();

            listMovie.innerHTML = "Результаты поиска"
            // let textJ = JSON.stringify(text.docs[0].countries[0].name)
            date.docs.forEach((movie, i) =>
            {
                let movieName = movie.name || movie.alternativeName || "название неизвестно"
                let type = movie.isSeries ? `сериал - всего серий: ${movie.seriesLength || "не известно"}` : "фильм"
                let p = `<p>${i + 1}. <strong>${movieName}</strong> - ${type}</p> `
                listMovie.innerHTML += p
                
            })
            let type = date.docs[0].isSeries ? "Найдено сериалов" : "Найдено фильмов"
            footPage.innerHTML += `<p>${type} : ${date.total} на странице : ${date.page} всего страниц : ${date.pages}</p>`
            // const p = `<p>${textJ}</p>`
            // output.innerHTML = p
            console.log(date)
        }
        else
        {
        }
    }
    button.addEventListener("click", queryToSearchFilm)
})
