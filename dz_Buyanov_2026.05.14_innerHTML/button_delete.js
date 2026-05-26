"use strict"


document.addEventListener("DOMContentLoaded", () => 
{
    const button_AddParagraf = document.querySelector("#btn_AddParagraf");

<<<<<<< HEAD
    const output = document.querySelector("#output");
=======
    const output = document.querySelector("#output")
>>>>>>> e3698820d8a2e96ac0225b7e5d92b49f3958734d
    
    let counter = 1;

    button_AddParagraf.addEventListener("click", () =>
    {
<<<<<<< HEAD
        let p = document.createElement("p");
        p.innerHTML = `Абзац <b> № ${counter} </b>`;
        p.id = `paragraf${counter}`

        let button = document.createElement("button");
        button.textContent =  `Удалить`;
        button.classList.add('btn_DellParagrafStyle');

        button.addEventListener("click", () =>
        {
            output.removeChild(p);
        });
        
        p.appendChild(button);
        output.appendChild(p);
        counter++;


        
    });  
});
  
=======
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
>>>>>>> e3698820d8a2e96ac0225b7e5d92b49f3958734d
