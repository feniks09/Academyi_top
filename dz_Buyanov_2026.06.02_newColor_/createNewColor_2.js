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
        const copyCartColor = copyCart.querySelector(".CopyCart")

        let nameColor = inputNameColor.value.trim();
        let typeColor = inputTypeColor.value.trim();
        let indexColor = inputIndexColor.value.trim();

        outputNameColor.textContent = nameColor;
        outputTypeColor.textContent = typeColor;
        outputIndexColor.textContent = indexColor;
        let indexColorLS =  ""
        if (typeColor === 'RGB')
        {
            indexColor = `rgb(${indexColor})`
            indexColorLS =  indexColor.match(/\d{1,3}/g)
        }
        if (typeColor ==='HEF')
        {
            indexColor = indexColor
        }
        if (typeColor === "RGBA" )
        {
            indexColor = `rgba(${indexColor})`
            indexColorLS =  indexColor.match(/\d{1,3}/g)
        }

        copyCartColor.classList.add("CopyCart-Color")
        copyCartColor.style.backgroundColor = `${indexColor}`;

        localStorage.setItem(nameColor, `${typeColor}, ${indexColorLS}`)
    }
    buttonSave.addEventListener("click", () =>
    {
        const templateCartColor = document.querySelector("#templateCartColor")
        const copyCart = templateCartColor.content.cloneNode(true)

        outputInfoInCart(copyCart,inputNameColor, inputTypeColor, inputIndexColor)
        
        output.appendChild(copyCart)  
    })
})