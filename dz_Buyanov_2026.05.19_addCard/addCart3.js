"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const inputNameCart = document.querySelector("#inputNameCart")
    const buttonAddCart = document.querySelector("#btnCreateCart")
    const inputNameDocForAddAllCart = document.querySelector("#inputNameDocumAForAllCart")
    const buttonAddDocInAllCart = document.querySelector("#btnAddDocInAllCart")
    const output = document.querySelector("#output")
    inputNameCart.placeholder = "Имя комплекта"
    inputNameDocForAddAllCart.placeholder = "Имя документа"

    function createCart ()
    {
        if (inputNameCart.value.trim() === "") return
        const cart = document.createElement("div")
        const topCart = document.createElement("p")
        const NameCart = document.createElement("span")
        const buttonRemoveCard = document.createElement("button")
        const inputNameDocument = document.createElement("input")
        const buttonAddDocInCart = document.createElement("button")

        cart.className = "cart"
        topCart.className = "topCart"
        buttonRemoveCard.className = "buttonRemoveCard"
        inputNameDocument.className = "inputNameDocument"

        NameCart.textContent = inputNameCart.value
        buttonRemoveCard.textContent = "X"
        buttonAddDocInCart.textContent = "Добавить документ"
        inputNameDocument.placeholder = "Имя документа"
        inputNameCart.value = ""

        buttonRemoveCard.addEventListener("click", removeCart)
        buttonAddDocInCart.addEventListener("click", () =>
                {
                    if (inputNameDocument.value.trim() === "") return
                    addDocumentInCart(cart, inputNameDocument)
                })

        topCart.appendChild(NameCart)
        topCart.appendChild(buttonRemoveCard)
        cart.appendChild(topCart)
        cart.appendChild(inputNameDocument)
        cart.appendChild(buttonAddDocInCart)
        output.appendChild(cart)
    }

    function removeCart()
    {
        const cart = document.querySelector(".cart")

        output.removeChild(cart)
    }
    
    function addCart()
    {
        buttonAddCart.addEventListener("click", createCart)
    }
    function addDocumentInCart(cart, inputNameDocument)
    {
        const docum  = document.createElement("p")
        const documName = document.createElement("span")
        const btnRemoveDoc = document.createElement("button")

        documName.textContent = inputNameDocument.value
        btnRemoveDoc.textContent = "X"
        inputNameDocument.value = ""

        btnRemoveDoc.addEventListener("click", () =>
        {
            cart.removeChild(docum)
        })
        docum.appendChild(documName)
        docum.appendChild(btnRemoveDoc)
        cart.appendChild(docum)
    }

    function createDocumentInAllCart()
    {
        if (inputNameDocForAddAllCart.value.trim() === "") return
        const allCart = document.querySelectorAll(".cart")
        allCart.forEach(cart =>
        {
            const documAll = document.createElement("p")
            const nameDocAll = document.createElement("span")
            const btnRemoveDoc = document.createElement("button")
            
            nameDocAll.textContent = inputNameDocForAddAllCart.value
            btnRemoveDoc.textContent = "X"

            btnRemoveDoc.addEventListener("click", () =>
            {
                cart.removeChild(documAll)
            })
            documAll.appendChild(nameDocAll)
            documAll.appendChild(btnRemoveDoc)
            cart.appendChild(documAll)
        
        })
        inputNameDocForAddAllCart.value = "";
    }
    function AddDocInAllCart()
    {
        buttonAddDocInAllCart.addEventListener("click", createDocumentInAllCart)
    }
    addCart()
    AddDocInAllCart()
})  
