"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameComplect = document.querySelector("#inputNameComplect")
    const buttonAddComplectDoc = document.querySelector("#buttonAddComplectDoc")
    
    const inputNameDocumentALL = document.querySelector("#inputNameDocument")
    const buttonAddDocAllComlect = document.querySelector("#buttonAddDocumentAllComplect");
    buttonAddDocAllComlect.addEventListener('click', () =>
    {
        if (inputNameDocumentALL.value.trim() === "") return;
        const pDocument = document.createElement("p");
        pDocument.textContent = inputNameDocumentALL.value;
        const buttonRemoveDocument = document.createElement("button")
        buttonRemoveDocument.textContent = "X1"
        buttonRemoveDocument.classList.add("btnRemoveDocument")
        pDocument.appendChild(buttonRemoveDocument)

        const AllCard = document.querySelectorAll(".card")
        AllCard.forEach(card => 
            {               
               const cloneDocum = pDocument.cloneNode(true)
               const cloneButton = cloneDocum.querySelector(".btnRemoveDocument")
               cloneButton.addEventListener("click", () => 
                  {
                      card.removeChild(cloneDocum)
                  })
               card.appendChild(cloneDocum)
               inputNameDocumentALL.value = ""
                
            })

    })

    const output = document.querySelector("#output")

    buttonAddComplectDoc.addEventListener("click", () =>
    {
        if (inputNameComplect.value.trim() === "") return;
        const card = document.createElement("div")
        card.classList.add("card")
        const titleCard = document.createElement("p")
        titleCard.classList.add("titleCard")
        titleCard.textContent = inputNameComplect.value
        inputNameComplect.value = ""
        const buttonRemoveCard = document.createElement("button")
        buttonRemoveCard.textContent = "X2"
        buttonRemoveCard.addEventListener("click", () => 
        {
            output.removeChild(card)
        });

        const inputNameDocument = document.createElement("input")
        const buttonAddDocumentToComplect = document.createElement("button")
        buttonAddDocumentToComplect.textContent = "Добавить документ"
        buttonAddDocumentToComplect.addEventListener("click", () =>
        {
            if (inputNameDocument.value.trim() === "") return;
            const pDocument = document.createElement("p");
            pDocument.textContent = inputNameDocument.value;
            const buttonRemoveDocument = document.createElement("button")
            buttonRemoveDocument.textContent = "X3"
            inputNameDocument.value = ""
            buttonRemoveDocument.addEventListener("click", () =>
            {
                card.removeChild(pDocument)
            })
            pDocument.appendChild(buttonRemoveDocument)
            card.appendChild(pDocument);
            
        });
        
        titleCard.appendChild(buttonRemoveCard)
        card.appendChild(titleCard)
        card.appendChild(inputNameDocument)
        
        
        card.appendChild(buttonAddDocumentToComplect)

        output.appendChild(card)
        




    })
})  