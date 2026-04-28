"use strict";


function process()
{
    const DEFAULT_VALUE = 7777;
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");

    let n = parseFloat(input.value) || DEFAULT_VALUE;
    let nextN = n + 1;
    let prevN = n - 1;

    output.innerText
        = `Вы ввели число: ${n}\n`
        + `Чило на 1 больше: ${nextN}\n`
        + `Число на 1 меньше: ${prevN}\n`

}

function process_2()
{

    const DEFAULT_VALUE = 7777;
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");

    let n = parseFloat(input.value) || DEFAULT_VALUE;
    let nextN = n + 2;
    let prevN = n - 2;

    output.innerText
        = `Вы ввели число: ${n}\n`
        + `Чило на 2 больше: ${nextN}\n`
        + `Число на 2 меньше: ${prevN}\n`    

}