"use strict"

document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output");
    let counter = 100;
    function print () 
    {
       if (counter >= 0)
        { output.innerText = `${counter}\n`
        counter--;
        }
        else {
            clearInterval(timerId);
            timerId = null;
            }  
    } 
    let timout = setInterval(print, 10)
})