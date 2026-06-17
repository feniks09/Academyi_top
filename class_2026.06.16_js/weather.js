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
                    "X-Api-Key" : "bDdArAV6qhKl9wjEykr9lE2RRuIZ2kRO0GFET8O5"
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
    function geolocationDate()
    {
        let countryCode = inputCountryCode.value.trim().toUpperCase()
        let cityName = inputCityName.value.trim().toUpperCase()
        fetch(`https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryCode)}`,
            {
                method : "GET",
                headers : {
                    "X-Api-Key" : "bDdArAV6qhKl9wjEykr9lE2RRuIZ2kRO0GFET8O5"
                }
            }
        ).then(response =>
        {
            if (response.ok)
            {
                return response.json();
            }
            else
            {
                throw new Error(`следующая ошибка ${response.status}`)
            }
        }).then(geolocation =>
        {
            if(geolocation.length > 0)
            {
                let geoDate = geolocation[0];
                const keys = Object.keys(geoDate)
                let cityName = geoDate.name;
                let latitude = geoDate.latitude;
                let longitude = geoDate.longitude;
                let country = geoDate.country;
                let state = geoDate.state; 
                console.log(keys)
                console.log(geolocation)
                console.log(cityName)
                console.log(latitude)
                console.log(longitude)
                console.log(country)
                console.log(state)

                output.innerHTML = `<p>${cityName}</p>
                                    <p>${latitude}</p>
                                    <p>${longitude}</p>
                                    <p>${country}</p>
                                    <p>${state}</p>
                                    <p>${keys}</p>
                                    `
            }
        })
    }
    button.addEventListener("click", ()=>
    {
        geolocationDate()
    })
})


