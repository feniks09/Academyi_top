"use strict";


function process()
{
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");

    let stage = parseInt(input.value);
    let description;
    let b = 1; // Просто так, для педагогических целей

    switch (stage)
    {
        case 4:
            description = "Администрация.";
            break;
        
        case 3:
        case b + 1:
            description = "Рабочие места.";
            break;
        
        default:  // Порядок case и default может быть любым, но лучше по-порядку
            description = "Неверный этаж.";
            break;
        
        case 1:
            description = "Холл и столовая.";
            break;
    }
    
    output.innerText
        = `Выбран этаж: ${stage}\n`
        + `${description}`
    ;
}