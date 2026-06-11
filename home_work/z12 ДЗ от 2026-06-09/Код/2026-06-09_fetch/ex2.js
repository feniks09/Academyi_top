"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");
    const buttonFetchData = document.querySelector("#button-fetchData");

    let dataToSend = {
        username: "michael",
        password: "-_0Sup3rPass0_-"
    };    

    const FETCH_URL = "https://json-placeholder.mock.beeceptor.com/login";
    const FETCH_OPTIONS = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(dataToSend),
    };

    function fetchData()
    {
        fetch(
            FETCH_URL,
            FETCH_OPTIONS
        ).then(
            response =>
            {
                if (response.ok)
                {
                    return response.text();
                }
                else
                {
                    throw new Error(
                        `Ошибка. Статус: ${response.status}`
                    );
                }
            }
        ).then(
            text =>
            {
                output.innerText += text;
            }
        ).catch(
            error =>
            {
                output.innerText += `Ошибка: ${error.message}`;
            }
        )
    }

    buttonFetchData.addEventListener("click", fetchData);
});