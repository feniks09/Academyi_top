"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameColor = document.querySelector("#nameColor");
    const inputTypeColor = document.querySelector("#typeColor");
    const inputIndexColor = document.querySelector("#indexColor");
    const output = document.querySelector("#output")
    const buttonSave = document.querySelector("#saveButton")

    function outputInfoInCart(copyCart, inputNameColor, inputTypeColor, inputIndexColor)
    {
        const outputNameColor = copyCart.querySelector(".outputNameColor");
        const outputTypeColor = copyCart.querySelector(".outputTypeColor");
        const outputIndexColor = copyCart.querySelector(".outputIndexColor")

        outputNameColor.textContent = inputNameColor.value;
        outputTypeColor.textContent = inputTypeColor.value;
        outputIndexColor.textContent = inputIndexColor.value; 
    }
    buttonSave.addEventListener("click", () =>
    {
        const templateCartColor = document.querySelector("#templateCartColor")
        const copyCart = templateCartColor.content.cloneNode(true)

        outputInfoInCart(copyCart,inputNameColor, inputTypeColor, inputIndexColor)
        
        output.appendChild(copyCart)

        
    })


})