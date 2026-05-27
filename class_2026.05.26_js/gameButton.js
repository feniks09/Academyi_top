"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output");
    const counter_ = document.querySelector("#counter");
    let counter = ''
    output.style.position = "relative"
    const randomValue = Math.random();
    function getRandomInt(min, max) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function createButton () 
       {
        if (counter === 0){
            output.textContent = "Вы победили!!" 
            clearInterval(timerId);
            timerId = null}
       const btn = document.createElement("button")
       btn.textContent = "X"
       btn.style.backgroundColor = 'green'
       btn.style.color = 'white'
       btn.style.width = "20px"
       btn.style.height = "20px"
       btn.style.position = "absolute"
       
       let left = getRandomInt(0, 300)
       let top = getRandomInt(0, 300)
       btn.style.left = `${left}px`
       btn.style.top = `${top}px`
       counter++
       btn.addEventListener("click", () =>
        {
            output.removeChild(btn)
            counter--
        })
       output.appendChild(btn)
       
       counter_.textContent = counter
    }
    let timout = setInterval(createButton, 1000)
})