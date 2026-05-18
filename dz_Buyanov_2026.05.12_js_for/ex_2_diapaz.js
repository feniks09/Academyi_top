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
    
    let text = ''

    for (let i = s; i <= f; i++)
    {
        if (i < t)
        {
            text += `<<${i}>>\n`
        }
        else if (i === t)
        {
            text += `${i}\n`
        }
        else if (i > t)
        {
            text += `**${i}**\n`
        }
    }
        

    output.innerText = text
}




