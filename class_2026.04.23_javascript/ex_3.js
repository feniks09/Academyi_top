"use strict";

function main()
{
    let p = document.getElementById("output") // старый вариант
    p = document.querySelector("#output");

    p.innerText += "Работает!\n"
    console.log("output существует", typeof output !== "undefined")
    console.log("output:", output)

    output.innerText += "Ага!\n"
}



