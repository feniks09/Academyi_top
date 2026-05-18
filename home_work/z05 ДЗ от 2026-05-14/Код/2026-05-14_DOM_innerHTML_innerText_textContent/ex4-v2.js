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

    button_AddToA.addEventListener("click", () => addContent(sectionA, "Тыц!"));
    button_AddToB.addEventListener("click", () => addContent(sectionB, "Чпоньк!"));

    /*
    Тут чуть упростили запись стрелочной функции. Например, вместо:
        () => { addContent(sectionA, "Тыц!"); }
    записали:
        () => addContent(sectionA, "Тыц!")
    так как всего одна инструкция.

    (Для нас стрелочная функция - это как лямбда-функция
    в Python.)
    */
});