"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");
    const button_AddParagraph = document.querySelector("#btn_addParagraph");

    let counter = 1;

    button_AddParagraph.addEventListener("click", () => {
        const p = document.createElement("p");

        p.innerHTML = `Абзац <b>№ ${counter}</b>`;        
        output.appendChild(p);
        
        counter++;
    });
});