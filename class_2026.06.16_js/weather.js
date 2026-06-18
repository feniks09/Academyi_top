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
        fetch( "https://api.api-ninjas.com/v1/weather?lat=51.5074&lon=-0.1278",
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
        })
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

                // output.innerHTML = `<p>${keys[0]} - ${cityName}</p>
                //                     <p>${keys[1]} - ${latitude}</p>
                //                     <p>${keys[2]} - ${longitude}</p>
                //                     <p>${keys[3]} - ${country}</p>
                //                     <p>${keys[4]} - ${state}</p>`
                
                // localStorage.setItem(keys[1], JSON.stringify(geoDate))
                // localStorage.setItem("Weather", geolocation)
                // let dateLat = localStorage.getItem(keys[1])
                // output.innerHTML = `<p>${keys[1]} - ${dateLat}</p>`
                // output.innerHTML = `<p>${JSON.stringyfy(geolocation)}</p>`
                // localStorage.removeItem("jhdcb")
            }
        })
    }
    button.addEventListener("click", ()=>
    {
        // fetchWeather()
        geolocationDate()
    })
})


