"use strict"

document.addEventListener("DOMContentLoaded", () =>
{
    const inputCountryCode = document.querySelector("#input-countryCode")
    const inputCityName = document.querySelector("#input-cityName")
    const button = document.querySelector("#button")
    const body = document.querySelector(".body")
    const output = document.querySelector("#output")

    function outputWeather()
    {
        let inputDate = input.value
        output.textContent = inputDate
    }
    // {"cloud_pct":100,"temp":18,"feels_like":18,"humidity":85,"min_temp":17,"max_temp":19,"wind_speed":2.24,
    //     "wind_degrees":269,"sunrise":1781754163,"sunset":1781814031}
    function fetchWeather(latitude, longitude)
    {   
        fetch( `https://api.api-ninjas.com/v1/weather?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`,
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
                // console.log(response)
                // console.log(response.text())
                // console.log(response.json())
                // console.log(JSON.stringify(response.json().temp))
                return response.json()   
            }
            else
            {
                throw new Error(`Ошибка : ${response.status}`)
            }
        }
        ).then(weatherDate =>
        {
            const weatherDateStr = JSON.stringify(weatherDate)
            output.textContent = weatherDateStr;
            output.innerHTML = `<p><i class=fas fa-cloud-sun></i>Облачность : ${weatherDate.cloud_pct}%</p>
                                <p>Температура : ${weatherDate.temp}°C</p>
                                <p>Ощущается : ${weatherDate.feels_like}°C</p>
                                <p>Влажность : ${weatherDate.humidity}%</p>
                                <p>Минимальная температура : ${weatherDate.min_temp}°C</p>
                                <p>Максимальная температура : ${weatherDate.max_temp}°C</p>
                                <p>Скорость ветра : ${weatherDate.wind_speed}м/c</p>
                                <p>Порывы : ${weatherDate.wind_degrees}м/c</p>
                                <p>Рассвет : ${new Date(weatherDate.sunrise * 1000).toLocaleTimeString()}</p>
                                <p>Закат : ${new Date(weatherDate.sunset * 1000).toLocaleTimeString()}</p>`
                                console.log(weatherDate)
                            // console.log(JSON.stringify(weatherDate))
                            // console.log(weatherDate.temp)
                            // console.log(weatherDateStr)
                            // console.log(weatherDate.cloud_pct)
                            // console.log(weatherDate.temp)
                            // console.log(weatherDate.feels_like)
        }
        ).catch(error =>
        {
            output.textContent = `ошибка${error.message}`
        })
    }
    function geolocationDate()
    {
        let cityName = inputCityName.value.trim().toUpperCase()
        let countryCode = inputCountryCode.value.trim().toUpperCase()
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
                const keys = Object.keys(geoDate);
                const values = Object.values(geoDate)
                let cityName = geoDate.name;
                let latitude = geoDate.latitude;
                let longitude = geoDate.longitude;
                let country = geoDate.country;
                let state = geoDate.state; 

                // body.innerHTML = `<p>${geolocation[0].name}</p>`

                // console.log(Array.isArray(geolocation))
                // console.log(typeof geolocation)
                // console.log(keys)
                // console.log(values)
                // console.log(values[0])
                   console.log(geolocation)
                // console.log(geolocation[0])
                // console.log(Array.isArray(values))
                // console.log(typeof values)
                // console.log(cityName)
                // console.log(latitude)
                // console.log(longitude)
                // console.log(country)
                // console.log(state)

                fetchWeather(latitude, longitude)
            }        
        })
    }
    // async function main()
    // {
    //     const {latitude, longitude} = await geolocationDate()
    //     fetchWeather(latitude, longitude)
    // }
    button.addEventListener("click", ()=>
    {
        geolocationDate()
    })
})


