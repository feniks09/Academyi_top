"use strict";


document.addEventListener("DOMContentLoaded", () => {
    let output = document.querySelector("#output");
    let buttonFetchWeather = document.querySelector("#button-fetchWeather");

    function fetchWeather()
    {
        fetch(
            "https://api.openweathermap.org"
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