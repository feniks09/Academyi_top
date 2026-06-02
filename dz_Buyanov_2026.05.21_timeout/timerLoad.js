"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")
    const button = document.querySelector("#button")
    let newX = 100;
    function creatConteinButter()
    {
        const butter = document.createElement("div")
        butter.className = "butterContein"
        butter.style.width = "100px";
        butter.style.height = "50px";
        butter.style.border = "2px solid blue";
        butter.style.borderRadius = "10px";
        butter.style.display = 'block';
        butter.style.position = "relative"

        addButterInOutput(butter)
    }

    function createMarcEnerg()
    {
        const lineEnerg = document.createElement("p")
        const divButter = document.querySelector(".butterContein")
        

        lineEnerg.style.width = "0.5px";
        lineEnerg.style.height = "50px";
        lineEnerg.style.border = "0.5px solid green";
        lineEnerg.style.backgroundColor = "green";
        lineEnerg.style.display = "block";
        lineEnerg.style.position = "absolute";
        lineEnerg.style.marginTop = 0
        lineEnerg.style.left = `${newX}px`
        addLineEnergInButtter(divButter, lineEnerg)
    }

    function modifyCoordMarEng()
    {
        if (newX < 0) return;
        createMarcEnerg();
        newX--;
    }
    function addButterInOutput (butter)
    {
        output.appendChild(butter)
    }

    function addLineEnergInButtter(divButter, line)
    {
        divButter.appendChild(line)
    }

    function addLineEnergeForTimeOut()
    {  
        let timeOut = setInterval(modifyCoordMarEng, 50)   
    }


    creatConteinButter()
    addLineEnergeForTimeOut()


})