"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")
    const button = document.querySelector("#button")
    
    let allInterval = []

        function creatConteinButter()
    {
        const butter = document.createElement("div")
        butter.className = "butterContein"
        butter.style.width = "100px";
        butter.style.height = "50px";
        butter.style.border = "2px solid blue";
        butter.style.display = 'block';
        butter.style.position = "relative";

        output.appendChild(butter);
        return butter;
    }

    function createLineMarcEnerg(butter)
    {
        let color = "green"
        const lineEnerg = document.createElement("p")
        lineEnerg.className = "lineEnerg"    
        lineEnerg.style.width = "100px";
        lineEnerg.style.height = "50px";
        lineEnerg.style.border = "0px solid green";
        lineEnerg.style.backgroundColor = color;
        lineEnerg.style.display = "block";
        lineEnerg.style.position = "absolute";
        lineEnerg.style.marginTop = 0
        lineEnerg.style.left = "0px"

        butter.appendChild(lineEnerg);
        return lineEnerg
    }

    function draveEnergee(butter)
    {  
        let MaxVolueEnerje = 100
        let curentVolueEnerje = createLineMarcEnerg(butter)
        let color = ""

        let timeOut = setInterval(() =>
            {   
                console.log(`Интервал ${timeOut} работает`)
                if (MaxVolueEnerje <= 0)
                { 
                    clearInterval(timeOut)
                    output.removeChild(butter) 
                    return;
                }
                diferenColorDependeValue(MaxVolueEnerje, color, curentVolueEnerje)
                MaxVolueEnerje--
                curentVolueEnerje.style.width = `${MaxVolueEnerje}px`
            }, 50)
        allInterval.push(timeOut)
        console.log(`длина интервала${allInterval.length}`)
    }
    
    function diferenColorDependeValue(MaxVolueEnerje, color, curentVolueEnerje)
    {
        
        if (MaxVolueEnerje <= 20)
                {
                    color = "red"
                }
                else if (MaxVolueEnerje <= 40)
                {
                    color = "yellow"
                }
                else
                {
                    color = "green"
                }
        curentVolueEnerje.style.border = `0px solid ${color}`
        curentVolueEnerje.style.backgroundColor = `${color}`  
    }

    button.addEventListener("click", () =>
    {
        const butter = creatConteinButter()
        draveEnergee(butter)
       
    })
})