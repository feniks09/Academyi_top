"use strict";


function main()
{
    let userText = prompt("Введите любой текст");
    let outputElement = document.querySelector("p");

    outputElement.innerText = userText;
}