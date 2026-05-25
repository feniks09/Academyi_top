"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameComplect = document.querySelector("#inputNameComplect")
    const buttonAddComplectDoc = document.querySelector("#buttonAddComplectDoc")
    
    const inputNameDocumentALL = document.querySelector("#inputNameDocument")
    const buttonAddDocAllComlect = document.querySelector("#buttonAddDocumentAllComplect");
    buttonAddDocAllComlect.addEventListener('click', () =>
    {
        const pDocumentF = document.createElement("p");
        pDocumentF.textContent = inputNameDocumentALL.value;
        const buttonRemoveDocumentF = document.createElement("button")
        buttonRemoveDocumentF.textContent = "X"
        buttonRemoveDocumentF.addEventListener("click", () =>
        {
            const card2 = document.querySelector(".card")
            card2.removeChild(pDocumentF)
        })
        pDocumentF.appendChild(buttonRemoveDocumentF)
        const AllCard = document.querySelectorAll(".card")
        AllCard.forEach(card => 
            {
                card.appendChild(pDocumentF.cloneNode(true))
            })
    })

    const output = document.querySelector("#output")

    buttonAddComplectDoc.addEventListener("click", () =>
    {
        const card = document.createElement("div")
        card.classList.add("card")
        const titleCard = document.createElement("p")
        titleCard.classList.add("titleCard")
        titleCard.textContent = inputNameComplect.value
        const buttonRemoveCard = document.createElement("button")
        buttonRemoveCard.textContent = "X"
        buttonRemoveCard.addEventListener("click", () => 
        {
            output.removeChild(card)
        });

        const inputNameDocument = document.createElement("input")
        const buttonAddDocumentToComplect = document.createElement("button")
        buttonAddDocumentToComplect.textContent = "Добавить документ"
        buttonAddDocumentToComplect.addEventListener("click", () =>
        {
            const pDocument = document.createElement("p");
            pDocument.textContent = inputNameDocument.value;
            const buttonRemoveDocument = document.createElement("button")
            buttonRemoveDocument.textContent = "X"
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