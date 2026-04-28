"use strict";

function main()
{   
    let inputElement = document.querySelector("input#input");
    let outputElement = document.querySelector("#output");
    let userText = inputElement.value;

    outputElement.innerText = userText;
}
// это не сработает

