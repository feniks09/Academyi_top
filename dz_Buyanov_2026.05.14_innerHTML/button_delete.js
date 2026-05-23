"use strict"


document.addEventListener("DOMContentLoaded", () => 
{
    const button_AddParagraf = document.querySelector("#btn_AddParagraf")

    const output = document.querySelector("#output")
    
    let counter = 1

    button_AddParagraf.addEventListener("click", () =>
    {
        let p = document.createElement("p")
        p.innerHTML = `Абзац <b> № ${counter} </b>`
        output.appendChild(p)
        counter++
        let button = document.createElement("button")
        button.classList.add("btn_AddParagraf")
        button.id = "btn_DellParagraf"
        button.textContent = "Удалить"
        
        button.addEventListener('click', () =>
        {
            output.removeChild(p)
        })

        p.appendChild(button)

    })    
})