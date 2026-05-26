"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const playground = document.querySelector("#playground");
    const buttonPlus = document.querySelector("#buttonPlus");

    function removeSelf(event)
    {
       const parent = event.target.parentElement;

       if (parent !== null) parent.removeChild(event.target);
    }

    buttonPlus.addEventListener("click", () => {
        if (playground.childElementCount > 0) return;

        const buttonX = document.createElement("button");

        buttonX.textContent = "x";
        buttonX.addEventListener("click", removeSelf)
        playground.appendChild(buttonX);
    });
});