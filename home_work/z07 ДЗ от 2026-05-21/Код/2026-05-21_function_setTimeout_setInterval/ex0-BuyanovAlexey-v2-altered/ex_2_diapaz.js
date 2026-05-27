"use strict"

function main()
{
    const inputBegin = document.querySelector("#inputBegin");
    const inputEnd = document.querySelector("#inputEnd");

    const inputLimit = document.querySelector("#inputLimit");

    const output = document.querySelector("#output")

    let s = parseInt(inputBegin.value);
    let f = parseInt(inputEnd.value);
    let t = parseInt(inputLimit.value);
    
    let text = '';    

    // Кода стало больше, но вычислений условий меньше
    if (t <= f)
    {
        let i = s;

        for (; i < t; i++)
        {
            text += `<<${i}>>\n`;
        }

        if (i === t)
        {
            text += `${i}\n`;
            i++;
        }

        for (; i <= f; i++)
        {
            text += `**${i}**\n`;
        }
    }
    else
    {
        for (let i = s; i <= f; i++)
        {
            text += `<<${i}>>\n`;
        }
    }       

    output.innerText = text;
}




