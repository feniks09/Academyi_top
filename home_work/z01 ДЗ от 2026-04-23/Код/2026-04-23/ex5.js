"use strict";


function main()
{
    let p = document.querySelector("#output");
    let rawData = prompt("Введите число:");

    let n1 = +rawData;
    let n2 = parseInt(rawData);
    let n3 = parseFloat(rawData);

    p.innerHTML
        += `rawData: <b>${rawData}</b><br>`
        +  `+rawData: <b>${n1}</b><br>`
        +  `parseInt: <b>${n2}</b><br>`
        +  `parseFloat: <b>${n3}</b><br>`
    ;
}