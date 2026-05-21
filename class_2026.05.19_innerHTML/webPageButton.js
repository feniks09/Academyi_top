"use strict"

document.addEventListener("DOMContentLoaded", () => 
{
    const button_AddPlas = document.querySelector("#btn_AddPlas")

    const output = document.querySelector("#output")
    
    let counter = 1

    if (counter === 1)
    {
        button_AddPlas.addEventListener("click", () =>
        {
            let p = document.createElement('p')
            counter++
            
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

    
}
)