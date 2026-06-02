"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")
    const button = document.querySelector("#button")
    let counter = 100;
    function creatButter()
    {
        const butter = document.createElement("div")
        const line = document.createElement("p")

        butter.style.width = "100px";
        butter.style.height = "50px";
        butter.style.border = "2px solid blue";
        butter.style.borderRadius = "10px";
        butter.style.display = block;
        butter.style.position = "relative"

        line.style.width = "10px";
        line.style.height = "50px";
        line.style.border = "2px solid green"
        line.style.position = "absolute"
        // butter.style.backgroundColor = 'blue'

        addButter(butter)
        addLine(butter, line)
    }

    
    creatButter()

    function addButter (butter)
    {
        output.appendChild(butter)
    }

    function addLine(butter, line)
    {
        butter.appendChild(line)
    }
})


