"use strict"

document.addEventListener("DOMContentLoaded", () => 
{
    const button_AddPlas = document.querySelector("#btn_AddPlas")

    const output = document.querySelector("#output")
    

    if (output.childElementCount > 0) return;
    
        button_AddPlas.addEventListener("click", () =>
        {
            let p = document.createElement('p')
            
            let button = document.createElement("button")

            button.innerText = "X"
            button.id = "buttonX"

            button.addEventListener("click", () =>
            {
                output.removeChild(p)

            })
            p.appendChild(button)
            output.appendChild(p)
        });    
}
)