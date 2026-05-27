"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");

    function doOne()
    {
        output.innerText += "doOne()\n";
    }

    const doTwo = function()   // Вместо const можно и let
    {
        output.innerText += "doTwo()\n";
    };

    doOne();
    doTwo();

    (function(){
        output.innerText += "doThree...\n";
    })();
});