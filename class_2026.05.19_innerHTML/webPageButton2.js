"use strict";

document.addEventListener("DOMContentLoaded", () => 
{
    const button_AddPlas = document.querySelector("#btn_AddPlas");

    const output = document.querySelector("#output");

    function removeSelf(event)
    {
        const parent = event.target.parentElement;
        if (parent !== null)
        {
            output.removeChild(event.target.parentElement)
        };
    };

        button_AddPlas.addEventListener("click", () =>
        {
            if (output.childElementCount > 0) return;
            const childElementCount = output.children.length;
            output.textContent = childElementCount
            let p = document.createElement('p');
            
            let button = document.createElement("button");
            button.addEventListener("click", removeSelf);

            button.innerText = "X";
            button.id = "buttonX"

            p.appendChild(button)
            output.appendChild(p)
        });    
}
)