"use strict"



document.addEventListener("DOMContentLoaded", () => 
{
    const button_AddParagraf = document.querySelector("#btn_AddParagraf")


    const output = document.querySelector("#output")
    
    let counter = 1

    button_AddParagraf.addEventListener("click", () =>
    {
        let p = document.createElement("p")
        p.innerHTML = `Абзац <b> № ${counter} </b>
        <button class="btn_AddParagraf" id="btn_DellParagraf${counter}">Удалить</button>`
        output.appendChild(p)

        const button_DellParagraf = document.querySelector(`#btn_DellParagraf${counter}`)
        button_DellParagraf.addEventListener("click", () =>
        {
        output.removeChild(p)
        }
        )
        counter++

    
    }
    )

    
}
)