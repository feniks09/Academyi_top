"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");
    const buttonFetchData = document.querySelector("#button-fetchData");

    function fetchData()
    {
        fetch(
            "https://json-placeholder.mock.beeceptor.com/todos/1",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }
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