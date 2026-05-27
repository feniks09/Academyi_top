"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output");
    const inputName = document.querySelector("#inputNameCart")
    const button1 = document.createElement("button")
    button1.textContent = "Создать"
    button1.className = "buttonCreate"

    function createCart ()
    {
        const cart = document.createElement("div")
        cart.className = "cart"
        cart.style.width = "200px";
        cart.style.height = "200px"
        cart.style.border ="2px solid red"
        output.appendChild(cart)
    }
    function createButton () 
    {
        const button = document.createElement("button");
        const cartForButton = document.querySelector(".cart")
        
        button.textContent = inputName.value;
        button.className = "Hello"
        button.addEventListener("click", removeButton);
        cartForButton.appendChild(button);
    }
    function removeButton ()
    {   
        const remButt = document.querySelector(".Hello")
        const cartForButton = document.querySelector(".cart")
        cartForButton.removeChild(remButt)
    }
    button1.addEventListener("click", createButton)
    output.appendChild(button1);
    
    createCart();
    createButton();
})
