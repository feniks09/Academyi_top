"use strict";


function echoText()
{
    let inputElement = document.querySelector("input#input");
    let outputElement = document.querySelector("#output");
    let userText = inputElement.value;

    outputElement.innerText = userText;
}