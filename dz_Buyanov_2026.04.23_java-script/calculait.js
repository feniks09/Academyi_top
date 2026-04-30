"use strict";

function main()
{
    let output_rezalt = document.querySelector("#output");
    let get_prompt = prompt("Введите число: ");
    let inputFloat = parseFloat(get_prompt);
    let f1 = inputFloat - 1;
    let f2 = inputFloat + 1;
 
    output_rezalt.innerText 
                += `Вы ввели число: ${inputFloat}\n`
                + `Число на 1 меньше: ${f1}\n`
                + `Число на 1 больше: ${f2}\n`;
        
}