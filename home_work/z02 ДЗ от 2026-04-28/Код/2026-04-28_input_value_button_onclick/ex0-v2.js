"use strict";


function main()
{
    let inputElement = document.querySelector("input#input");
    let outputElement = document.querySelector("#output");
    let userText = inputElement.value;

    outputElement.innerText = userText;

    // Но это не сработает. Смотрите версию v3
}