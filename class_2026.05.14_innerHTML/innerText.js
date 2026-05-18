"use strict"


document.addEventListener("DOMContentLoaded", () => {
    const block_main = document.querySelector(".block_main");
    // const block = document.querySelector(".block");
    const button_AddToBody = document.querySelector("#btn_AddToBody");
    let namber = 1
    button_AddToBody.addEventListener("click", () => {
        const p = document.createElement("p");
        p.innerHTML = `Абзац <b>№ ${namber}</b>`;
        block_main.appendChild(p);
        namber++
    });

    
    // const outputOne = document.querySelector("#outputOne");
    // const outputOne = document.querySelector("#outputTwo");
    // const outputOne = document.querySelector("#outputThree");
    // const outputOne = document.querySelector("#outputFour");

    // outputOne.innerText = "<b>* innerText *</b>"
    // outputTwo.innerHTBL = "<b>* innerHTML *</b>"
    // outputThree.textContent = "<b>* textContent *</b>"

    // const b = document.createElement("b");
    // b.innerText = '* document.createElement("b") *'
    // outputFour.appendChild(b);

});