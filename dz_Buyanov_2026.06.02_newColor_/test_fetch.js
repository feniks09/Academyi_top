"use strict"

document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")

    let date = {
        "name" : "Алексей",
        "age" : 38
    }
    const name = "becjbj";
    function showDateName (name)
    {
        output.textContent = `${name}`;
    }
    
    const showDate = (date) =>
    {
        output.textContent += `${date.name} - ${date.age}`
    }

    showDateName(name)
    showDate(date)
 
    const newInfo = {
        color : "yellow",
        width : "100"
    }
     function showColor()
    {
        output.textContent = `${newInfo}`
    }
    async function loadDate()
    {
        const response = await fetch("https://json-placeholder.mock.beeceptor.com/todos/1",
            {
                method : "GET",
                headers : {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }
        )
        const date = await response.json()
        output.textContent = `${date.status}`
    }
   
    loadDate()
})



