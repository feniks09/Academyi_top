"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const outputOne = document.querySelector("#outputOne");
    const outputTwo = document.querySelector("#outputTwo");
    const outputThree = document.querySelector("#outputThree");
    const outputFour = document.querySelector("#outputFour");

    outputOne.innerText = "<b>*   innerText   *</b>";
    outputTwo.innerHTML = "<b>*   innerHTML   *</b>";
    outputThree.textContent = "<b>*   textContent   *</b>";  // Самый эффективный способ вставки просто текста

    const b = document.createElement("b");
    b.innerText = '*   document.createElement("b")   *';
    outputFour.appendChild(b);
});