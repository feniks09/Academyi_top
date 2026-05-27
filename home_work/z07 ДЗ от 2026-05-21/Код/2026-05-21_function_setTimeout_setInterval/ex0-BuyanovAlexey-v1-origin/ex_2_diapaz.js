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

    // Начало интересного участка
    for (let i = s; i <= f; i++)
    {
        // Все эти условия вычисляются на каждом витке цикла
        // В общем случае это не страшно.
        
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
    // Конец интересного участка
        

    output.innerText = text;
}




