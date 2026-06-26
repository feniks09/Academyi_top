"use strict"



document.addEventListener("DOMContentLoaded", () =>
{
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")
    let x = 0
    let y = 100
    for(let i = 0; i < 8; i++)
    {   
        x = 100
        y += 10
        for(let j = 0; j < 8; j++)
        {    
            x += 10
            ctx.fillRect(x, y, 10, 10)
            ctx.fillStyle = "#10af63"
        }
    }
    

})