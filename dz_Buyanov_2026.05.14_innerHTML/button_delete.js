"use strict"



document.addEventListener("DOMContentLoaded", () => 
{
    const button_AddParagraf = document.querySelector("#btn_AddParagraf");

    const output = document.querySelector("#output");
    
    let counter = 1;

    button_AddParagraf.addEventListener("click", () =>
    {
        let p = document.createElement("p");
        p.innerHTML = `Абзац <b> № ${counter} </b>`;
        p.id = `paragraf${counter}`

        let button = document.createElement("button");
        button.textContent =  `Удалить`;
        button.classList.add('btn_DellParagrafStyle');

        button.addEventListener("click", () =>
        {
            output.removeChild(p);
        });
        
        p.appendChild(button);
        output.appendChild(p);
        counter++;


        
    });  
});
  
