"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")
    const button = document.querySelector("#button")

    async function fetchRequest()
    {
        try
        {
            let response = await fetch("https://json-placeholder.mock.beeceptor.com/users",
                {
                    method : "GET"
                }
            ); return response.json()
        }
        catch(error)
        {
            throw new Error(`новая ошибка ${error}`)
        }

    }
})