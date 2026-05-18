"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const sectionA = document.querySelector(".section-a");
    const sectionB = document.querySelector(".section-b");
    const button_AddToA = document.querySelector("#btn_AddToA");
    const button_AddToB = document.querySelector("#btn_AddToB");

    function addContent(parentElement, text)
    {
        const p = document.createElement("p");
        p.textContent = text;
        parentElement.appendChild(p);
    }

    button_AddToA.addEventListener("click", () => {
        addContent(sectionA, "Тыц!");
    });

    button_AddToB.addEventListener("click", () => {
        addContent(sectionB, "Чпоньк!");
    });

    /*
    Тут вынесли повторяющийся код в отдельную функцию.
    */
});