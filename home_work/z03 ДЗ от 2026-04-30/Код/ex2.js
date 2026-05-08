"use strict";


function process()
{
    const THRESHOLD = -4;
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");

    let n = parseFloat(input.value);
    let result;

    if (n < THRESHOLD)
    {
        result = `Ваше число меньше ${THRESHOLD}.`;
    }
    else if (n === THRESHOLD)
    {
        result = `Ваше число равно ${THRESHOLD}.`;
    }
    else if (n > THRESHOLD)
    {
        result = `Ваше число больше ${THRESHOLD}.`;
    }
    else  // В JavaScript этот блок имеет смысл в такой цепочке условий
    {
        result = "Не определено.";
    }

    output.innerText
        = `Вы ввели число: ${n}\n`
        + `${result}`
    ;
}