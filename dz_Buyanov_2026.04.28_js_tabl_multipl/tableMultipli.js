"use strict"

function tbMulti()
{
    const inputValue = document.querySelector("#input")

    const outputMultipli = document.querySelector("#output")
    
    let valFloat = parseFloat(inputValue.value)

    let rez0 = valFloat * 0
    let rez1 = valFloat * 1
    let rez2 = valFloat * 2
    let rez3 = valFloat * 3
    let rez4 = valFloat * 4
    let rez5 = valFloat * 5
    let rez6 = valFloat * 6
    let rez7 = valFloat * 7
    let rez8 = valFloat * 8
    let rez9 = valFloat * 9
    


    outputMultipli.innerText = 
        `${valFloat} * 0 = ${rez0}
         ${valFloat} * 1 = ${rez1}
         ${valFloat} * 2 = ${rez2}
         ${valFloat} * 3 = ${rez3}
         ${valFloat} * 4 = ${rez4}
         ${valFloat} * 5 = ${rez5}
         ${valFloat} * 6 = ${rez6}
         ${valFloat} * 7 = ${rez7}
         ${valFloat} * 8 = ${rez8}
         ${valFloat} * 9 = ${rez9}`

}
