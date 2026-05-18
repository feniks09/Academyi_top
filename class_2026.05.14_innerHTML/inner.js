"use strict"


document.addEventListener("DOMContentLoaded", () => {
    const sectionA = document.querySelector(".section-a");
    const sectionB = document.querySelector(".section-b");
    const button_AddToA = document.querySelector("#btn_AddToA");
    const button_AddToB = document.querySelector("#btn_AddToB");

    button_AddToA.addEventListener("click", () => {
        sectionA.innerHTML += "<p>Тыц!</p>";
    });

    button_AddToB.addEventListener("click", () => {
        sectionB.innerHTML += "<p>Чпоньк!</p>";
    })
    
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