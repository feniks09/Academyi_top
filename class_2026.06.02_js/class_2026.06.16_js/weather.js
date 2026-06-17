"use strict"

document.addEventListener("DOMContentLoaded", () =>
{
    const inputCountryCode = document.querySelector("#input-countryCode")
    const inputCityName = document.querySelector("#input-cityName")
    const button = document.querySelector("#button")
    const output = document.querySelector("#output")

    function outputWeather()
    {
        let inputDate = input.value
        output.textContent = inputDate
    }
    
    function fetchWeather()
    {   
        fetch( "https://api.api-ninjas.com/v1/geocoding?city=moscow&country=ru",
            {
                method : "GET",
                headers : 
                {
                    "X-Api-Key" : "NfRUPXx5PfCZnltlj48dGbqTIMQNV6wycdP8gGvl"
                } 
            }
        ).then(response => 
        {
            if (response.ok)
            {
                return response.json()
                
            }
            else
            {
                throw new Error(`Ошибка : ${response.status}`)
            }
        }
        ).then(weatherDate =>
        {
            output.textContent = weatherDate;
            console.log(weatherDate)
        }
        ).catch(error =>
        {
            output.textContent = `ошибка${error.message}`
        }
        )
    }
    function cityName()
    {
        let countryCode = inputCountryCode.value.trim().toUpperCase();
        fetch("https://api.api-ninjas.com/v1/geocoding?city=moscow&country=ru",
            {
                method : "GET",
                headers : {
                    "X-Api-Key" : "NfRUPXx5PfCZnltlj48dGbqTIMQNV6wycdP8gGvl"
                }
            }
        ).then()
    }
    button.addEventListener("click", fetchWeather)



})