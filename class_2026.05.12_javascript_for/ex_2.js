"use strict"

function main()
{
    const inputNam = document.querySelector("#input")

    const output = document.querySelector('#output')

    let value = parseInt(inputNam.value)
    let text = ""
    let n = 0

    while (n < value)
    {
        text += `${n}`;
        n++ ,
        text += `,`
    }
    
    
    output.innerText = text

}

function main2()
{
    const inputNam = document.querySelector("#input2")

    const output = document.querySelector('#output2')

    let value = parseInt(inputNam.value)
    let text = ""
    let n = 0
    for (let n = 0; n < value; n++, text += `${text}`)
        
    output.innerText = text

}