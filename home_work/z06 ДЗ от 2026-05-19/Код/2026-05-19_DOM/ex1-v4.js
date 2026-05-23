"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const playground = document.querySelector("#playground");
    const buttonPlus = document.querySelector("#buttonPlus");

    function createButtonX()
    {
        if (playground.childElementCount > 0) return;

        const buttonX = document.createElement("button");

        buttonX.textContent = "x";
        buttonX.addEventListener("click", removeSelf);
        playground.appendChild(buttonX);
    }

    function removeSelf(event)  // Эту функцию можно прикрепить к любому элементу
    {
        const parent = event.target.parentElement;

        if (parent) parent.removeChild(event.target);
    }

    buttonPlus.addEventListener("click", createButtonX);

    // Пример переиспользования функции removeSelf
    document
        .querySelector("#dummy")
        .addEventListener("click", removeSelf);
});
