"use strict"

function tbMulti()
{
    const inputValue = document.querySelector("#input")

    const output = document.querySelector("#output")

    let val = parseFloat(inputValue.value)
    let l = []
    for (let v = 0; v < 10; v++)
    {
        let rez = val * v
        l.push(`${val} * ${v} = ${rez}\n`)
    }

    output.innerText = l


}