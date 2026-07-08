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
        // Получаем корневой элемент карточки (первый дочерний элемент фрагмента)
        const cartElement = copyCart.firstElementChild;
        
        if (!cartElement) return;

        const outputNameColor = cartElement.querySelector(".outputNameColor");
        const outputTypeColor = cartElement.querySelector(".outputTypeColor");
        const outputIndexColor = cartElement.querySelector(".outputIndexColor")

        let nameColor = inputNameColor.value.trim()
        let typeColor = inputTypeColor.value.trim()
        let indexColor = inputIndexColor.value.trim()
        
        if (outputNameColor) outputNameColor.textContent = nameColor;
        if (outputTypeColor) outputTypeColor.textContent = typeColor;
        if (outputIndexColor) outputIndexColor.textContent = indexColor; 
        
        // Меняем цвет фона карточки
        if (/^#[0-9a-f]{3,6}$/i.test(indexColor) || 
            CSS.supports("color", indexColor) || 
            /^rgb(a)?\(/.test(indexColor)) {
            cartElement.style.backgroundColor = indexColor;
        } else {
            cartElement.style.backgroundColor = "#ffffff";
        }
        
        // Меняем цвет текста для контраста
        const bgColor = cartElement.style.backgroundColor;
        if (bgColor && bgColor !== "#ffffff") {
            const rgb = bgColor.match(/\d+/g);
            if (rgb) {
                const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                cartElement.style.color = brightness < 128 ? "#ffffff" : "#000000";
            }
        }
    }
    
    buttonSave.addEventListener("click", () =>
    {
        const templateCartColor = document.querySelector("#templateCartColor")
        const copyCart = templateCartColor.content.cloneNode(true)

        outputInfoInCart(copyCart, inputNameColor, inputTypeColor, inputIndexColor)
        
        output.appendChild(copyCart)  
    })
})