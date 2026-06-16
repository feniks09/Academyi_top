"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const input = document.querySelector("#input")
    const buttonSave = document.querySelector("#button")
    const buttonAdd = document.querySelector("#buttonArray")
    const buttonLoad = document.querySelector("#buttonLoad")
    const output = document.querySelector("#output")
    let storKey = "key"
    let arrayItem = [];

    buttonSave.addEventListener("click", () =>
    {
        output.textContent = arrayItem;
        let arrayItemString = JSON.stringify(arrayItem)
        localStorage.setItem(storKey, arrayItemString) 
    })

    buttonAdd.addEventListener("click", () =>
    {
        let inputDate = input.value
        output.textContent += inputDate 
        arrayItem.push(inputDate)
    })
    buttonLoad.addEventListener("click", () =>
    {
        let loadDate = localStorage.getItem(storKey);
        if (loadDate)
        {
            let jsDate = JSON.parse(loadDate)
            let keys = Object.keys(jsDate)
            output.textContent = keys
        }
    })
})