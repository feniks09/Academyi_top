"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const playground = document.querySelector("#playground");
    const buttonPlus = document.querySelector("#buttonPlus");

    buttonPlus.addEventListener("click", () => {
        if (playground.childElementCount > 0) return;

        const buttonX = document.createElement("button");

        buttonX.textContent = "x";
        buttonX.addEventListener("click", () => {
            buttonX.remove();
        });
        playground.appendChild(buttonX);
    });
});
