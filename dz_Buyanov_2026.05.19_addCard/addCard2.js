"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameComplect = document.querySelector("#inputNameComplect")
    const buttonAddDocAllComlect = document.querySelector("#buttonAddDocumentAllComplect");
    
    const inputNameDocumentALL = document.querySelector("#inputNameDocument")
    const output = document.querySelector("#output")

    function createCart()
    {
        if (inputNameComplect.value.trim() === "") return;
        const card = document.createElement("div")
        const cardTop = document.createElement("p") 
        const titleCard = document.createElement("span")
        const buttonRemoveCard = document.createElement("button")
        const inputNameDocument = document.createElement("input")
        const buttonAddDocumentToComplect

        card.className = "card"
        titleCard.className ="titleCard"
        titleCard.textContent = inputNameComplect.value
        inputNameComplect.value = ""
        buttonRemoveCard.textContent = "X"
        buttonRemoveCard.addEventListener("click", () =>
        {
            output.removeChild(card)
        })

        // titleCard.appendChild()
        cardTop.appendChild(titleCard)
        cardTop.appendChild(buttonRemoveCard)
        card.appendChild(cardTop)
        card.appendChild(inputNameDocument)
        output.appendChild(card)
    }
    function AddCartForDocum()
    {   
        const buttonAddCartForDocum = document.querySelector("#buttonAddCartForDocum")
        buttonAddCartForDocum.addEventListener("click", createCart)
    }
    function AddDocInComplect()
    {   const buttonAddDocInComplect = document.createElement("button") 
        buttonAddDocInComplect.className = "buttonAddComplectDoc" 
        
        buttonAddDocInComplect.textContent = "Добавить документ"
        buttonAddDocInComplect.addEventListener("click", () =>
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
                
            })
        
    }
    function AddbuttonToAllComplect (){
        buttonAddDocAllComlect.addEventListener('click', () =>
        {
            if (inputNameDocumentALL.value.trim() === "") return;
            const pDocument = document.createElement("p");
            pDocument.textContent = inputNameDocumentALL.value;
            const buttonRemoveDocument = document.createElement("button")
            buttonRemoveDocument.textContent = "X1"
            buttonRemoveDocument.className = "btnRemoveDocument"
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
    }
    function removedCard()
    {
        output.removeChild(card)
    }    
        // titleCard.appendChild(buttonRemoveCard)
        // card.appendChild(titleCard)
        // card.appendChild(inputNameDocument)
        
        
        // card.appendChild(buttonAddDocumentToComplect)

        // output.appendChild(card)
    
    AddCartForDocum()
    // AddbuttonToComplect()
})  