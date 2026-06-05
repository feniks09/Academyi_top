"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")
    const button = document.querySelector("#button")

    let timeOut = null
    function creatConteinButter()
    {
        const butter = document.createElement("div")
        butter.className = "butterContein"
        butter.style.width = "100px";
        butter.style.height = "50px";
        butter.style.border = "2px solid blue";
        butter.style.borderRadius = "10px";
        butter.style.display = 'block';
        butter.style.position = "relative";

        output.appendChild(butter);
        return butter;
    }

    function createLineMarcEnerg(butter, newX)
    {
        const lineEnerg = document.createElement("p")    
        lineEnerg.style.width = "0.5px";
        lineEnerg.style.height = "50px";
        lineEnerg.style.border = "0.5px solid green";
        lineEnerg.style.backgroundColor = "green";
        lineEnerg.style.display = "block";
        lineEnerg.style.position = "absolute";
        lineEnerg.style.marginTop = 0
        lineEnerg.style.left = `${newX}px`

        butter.appendChild(lineEnerg);
        return lineEnerg
    }

    function modifyCoordMarEng(butter)
    {  
        let newX = 100
        
        timeOut = setInterval(() =>
            {   
                if (newX < 0)
                {
                    clearInterval(timeOut)
                    timeOut = null 
                    return;
                }
                newX--
                const lineEnerg = createLineMarcEnerg(butter, newX)
            }, 50)

    }
    function addLineEnergeForTimeOut(butter, lineEnerg)
    {
        butter.appendChild(lineEnerg)
    }
     
    button.addEventListener("click", () =>
    {
        const butter = creatConteinButter()
        modifyCoordMarEng(butter)
        // const lineEnerg = createLineMarcEnerg(butter, newX)
        // addLineEnergeForTimeOut(butter)    
    })
})