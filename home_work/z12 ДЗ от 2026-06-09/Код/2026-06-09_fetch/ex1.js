"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");
    const buttonFetchData = document.querySelector("#button-fetchData");

    function fetchData()
    {
        fetch(
            "https://json-placeholder.mock.beeceptor.com/todos/1"
        ).then(
            function(response)
            {
                return response.text();
            }
        ).then(
            function(text)
            {
                output.innerText += text;
            }
        ).catch(
            function(error)
            {
                output.innerText += `Ошибка: ${error.message}`;
            }
        )
    }

    buttonFetchData.addEventListener("click", fetchData);
});