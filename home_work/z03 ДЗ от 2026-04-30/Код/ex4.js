"use strict";


function process()
{
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");

    let description;

    // Потом всё это можно заменить словарём (объектом)
    switch (input.value.toLowerCase())
    {
        case "пн": description = "понедельник"; break;
        case "вт": description = "вторник"; break;
        case "ср": description = "среда"; break;
        case "чт": description = "четверг"; break;
        case "пт": description = "пятница"; break;
        case "сб": description = "суббота"; break;
        case "вс": description = "воскресенье"; break;
        default: description = "<некорректный день недели>"; break;
    }

    output.innerText
        = `Ввели: ${input.value}\n`
        + `День недели: ${description}.\n`
    ;
}
