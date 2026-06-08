"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameColor = document.querySelector("#nameColor");
    const inputTypeColor = document.querySelector("#typeColor");
    const inputIndexColor = document.querySelector("#indexColor");
    const output = document.querySelector("#output")
    const buttonSave = document.querySelector("#saveButton")

    buttonSave.addEventListener("click", () =>
    {
        output.textContent += inputIndexColor.value
    })

})