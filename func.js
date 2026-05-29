"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output");
    const inputName = document.querySelector("#inputNameCart")
    let text = "Создать карточку"
    let text2 = "Создать кнопку"
    
    function CreateButtonToCreatCart ()  
    {
        const btnCreaCart = document.createElement("button")
        btnCreaCart.textContent = text;
        btnCreaCart.className = "btnCreatCart"
        btnCreaCart.addEventListener("click", createCart)
        output.appendChild(btnCreaCart)
    }

    function CreateBtnToCreateBtn () 
    {
        const buttonBtn = document.createElement("button")
        buttonBtn.textContent = text2
        buttonBtn.className = "buttonCreateBtnCart"
        buttonBtn.addEventListener("click", CreateAddButtonInCart)
        output.appendChild(buttonBtn);
    }

    function CreateBtnToCreateBtnAll () 
    {
        const buttonBtnAll = document.createElement("button")
        buttonBtnAll.textContent = "Во все карты"
        buttonBtnAll.className = "buttonCreateBtnCart"
        buttonBtnAll.addEventListener("click", createButtonAllCart)
        output.appendChild(buttonBtnAll);
    }
    
    function createCart ()
    {
        const cart = document.createElement("div")
        cart.className = "cart"
        cart.style.width = "200px";
        cart.style.height = "200px"
        cart.style.border ="2px solid red"
        output.appendChild(cart)
    }
    function CreateAddButtonInCart () 
    {
        const cartForButton = document.querySelector(".cart")
        const buttonInCart = document.createElement("button");
        
        buttonInCart.textContent = "Добавить кнопку";
        buttonInCart.className = "btnInCart"
        buttonInCart.addEventListener("click", removeButton);
        cartForButton.appendChild(buttonInCart);
    }

    function createButtonAllCart ()
    {
        const allCart = document.querySelectorAll(".cart")
        allCart.forEach( cart => 
        {
            const btnAll = document.createElement("button");
            btnAll.textContent = "В каждой карточке";
            btnAll.addEventListener("click", () => 
            {
                cart.removeChild(btnAll)
            })
            btnAll.className = "btnInCart"
            cart.appendChild(btnAll)
        })
    }
    function removeButton ()
    {   
        const cartForButton = document.querySelector(".cart")
        const remButt = document.querySelector(".btnInCart")
        cartForButton.removeChild(remButt)
    }
    function removeButtonAll ()
    {   
        const cartForButton = document.querySelector(".cart")
        const remButt = document.querySelector(".btnInCart")
        cartForButton.removeChild(remButt)
    }
    CreateButtonToCreatCart()
    CreateBtnToCreateBtn()
    CreateBtnToCreateBtnAll()
    
})
