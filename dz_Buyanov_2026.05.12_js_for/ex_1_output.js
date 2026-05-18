"use strict"

function main()
{
    const input = document.querySelector("#input")

    const outputFor = document.querySelector("#output_for")
    const outputWhile = document.querySelector("#output_while")
    const outputDoWhile = document.querySelector("#output_do_while")

    let num = parseFloat(input.value)
    let text = ''
    let text2 = ''
    let text3 = "";
    let i = 0;
    let n = 0;

    if (num >= 0)
    {
    for (let i = 0; i <= num; i++)
    {
        text += `${i} `
    }

    while (i <= num)
    {
        text2 += `${i} `
        i++
    }

    do
    {
        text3 += `${n} `
        n++
    }
    while (n <= num)
    }

    else if (num < 0)
    {
        for (let i = 0; i > num; i--)
        {
            text += `${i} `
        }

        while (i > num)
        {
            text2 += `${i} `
            i--
        }

        do
        {
            text3 += `${n} `
            n--
        }
        while (n > num)
    }
    else
    {
        text = "Введено не число"
        text2 = "Введено не число" 
        text3 = "Введено не число"  

    }
    outputFor.innerText = text
    outputWhile.innerText = text2
    outputDoWhile.innerText = text3

    
}