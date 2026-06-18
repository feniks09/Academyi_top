"use strict";


// Некрасивое решение, но рабочее


document.addEventListener("DOMContentLoaded", () => {
    // Напоминаю: вот так оставлять ключи/пароли/чувствительные данные
    // в реальном коде НЕ НАДО!
    const API_KEY = "<ВАШ_API_КЛЮЧ>";

    const output = document.querySelector("#output");
    const inputCountryCode = document.querySelector("#input-countryCode");
    const inputCityName = document.querySelector("#input-cityName");
    const buttonFetchWeather = document.querySelector("#button-fetchWeather");

    function fetchWeather(latitude, longitude)
    {
        fetch(
            `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`,
            {
                headers:
                {
                    "X-Api-Key": API_KEY,
                }
            }
        ).then(
            response =>
            {
                return response.json();
            }
        ).then(
            weatherData =>
            {
                output.innerText = `
                Температура: ${weatherData.temp} С\n
                Ощущается как: ${weatherData.feels_like} С\n
                Влажность: ${weatherData.humidity}\n
                `;
            }
        ).catch(
            error =>
            {
                output.innerText = `Ошибка: ${error}`;
            }
        )
    }    

    function fetchCityLatitudeLongitude(callback)
    {
        let countryCode = inputCountryCode.value.trim().toUpperCase();
        let cityName = inputCityName.value.trim().toUpperCase();

        fetch(
            `https://api.api-ninjas.com/v1/geocoding?country=${countryCode}&city=${cityName}`,
            {
                headers:
                {
                    "X-Api-Key": API_KEY,
                }
            }
        ).then(
            response =>
            {
                return response.json();
            }
        ).then(
            arrayOfCities =>
            {
                for (let city of arrayOfCities)
                {
                    if (city.country === countryCode && city.name.toUpperCase() === cityName)
                    {
                        if (callback)
                        {
                            callback(city.latitude, city.longitude);
                        }

                        break;
                    }
                }
            }
        ).catch(
            error =>
            {
                output.innerText = `Ошибка: ${error}`;
            }
        )
    }

    buttonFetchWeather.addEventListener(
        "click",
        () =>
        {
            fetchCityLatitudeLongitude(fetchWeather);
        }
    );
});