"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const inputTextForSearch = document.querySelector("#input-textForSearch");
    const inputPage = document.querySelector("#input-page");
    const inputAPIKey = document.querySelector("#input-apiKey");
    const buttonSearch = document.querySelector("#button-search");
    const output = document.querySelector("#output");

    const URL = "https://www.omdbapi.com";

    function search(apikey, text, page, callback)
    {
        text = encodeURIComponent(text);
        page = encodeURIComponent(page);

        fetch(
            `${URL}/?apikey=${apikey}&s=${text}&page=${page}`
        ).then(
            // В аргумент response приходит Promise-подобный объект
            response =>
            {
                // Вот тут (вызов метода json()) создаётся Promise,
                // который обслуживает задачу JSON-парсинга пришедших
                // от сервера данных. Результат исполнения этой
                // задачи подаётся на вход функции, указанной
                // в следующем then
                return response.json();
            }
        ).then(
            // Тут уже нужен async, так как эта функция не принимает
            // на вход Promise-подобный объект и мы ничего
            // Promise-подобного не запускаем
            async dictionary =>
            {
                callback(dictionary);
            }
        ).catch(
            error =>
            {
                console.log(`Ошибка: ${error}`);
            }
        )
    }

    function showMovieInfo(info)
    {
        let message = "";

        if (info.Response === "True")
        {
            let movieInfos = info.Search;

            for (let i = 0; i < movieInfos.length; i++)
            {
                let movieInfo = movieInfos[i];

                message += `${i}.\n`;

                for (let key in movieInfo)
                {
                    message += `${key}: ${movieInfo[key]}\n`;
                }

                message += `\n`;
            }
        }
        else
        {
            message = "Не удалось ничего найти.";
        }

        output.innerText = message;
    }

    buttonSearch.addEventListener(
        "click",
        () =>
        {
            search(
                inputAPIKey.value.trim(),
                inputTextForSearch.value.trim(),
                inputPage.value.trim(),
                showMovieInfo
            );
        }
    );
});