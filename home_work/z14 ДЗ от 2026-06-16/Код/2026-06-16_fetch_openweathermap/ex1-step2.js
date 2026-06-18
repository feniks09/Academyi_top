"use strict";


document.addEventListener("DOMContentLoaded", () => {
    // Напоминаю: вот так оставлять ключи/пароли/чувствительные данные
    // в реальном коде НЕ НАДО!
    const API_KEY = "<ВАШ_API_КЛЮЧ>";

    const output = document.querySelector("#output");
    const buttonFetchWeather = document.querySelector("#button-fetchWeather");

    function fetchWeather()
    {
        fetch(
            `https://api.api-ninjas.com/v1/weather?lat=52.2297&lon=21.0122`,
            {
                method: "GET",
                headers:
                {
                    "X-Api-Key": API_KEY,
                }
            }
        ).then(
            response =>
            {
                return response.text();
            }
        ).then(
            text =>
            {
                output.innerText = text;
            }
        ).catch(
            error =>
            {
                output.innerText = `Ошибка: ${error}`;
            }
        )
    }

    buttonFetchWeather.addEventListener("click", fetchWeather);
});