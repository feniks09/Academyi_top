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
        "color" : "yellow",
        "width" : "100"
    }
    function showColor()
    {
        output.innerHTML += `<p>${newInfo.color} - ${newInfo.width}<p/>`
    }   output.innerHTML += `<p>${JSON.stringify(newInfo)}<p/>`
    showColor()
    // async function loadDate()
    // {
    //     const response = await fetch("https://json-placeholder.mock.beeceptor.com/todos/1",
    //         {
    //             method : "GET",
    //             headers : {
    //                 "Content-Type": "application/json;charset=utf-8"
    //             }
    //         }
    //     )
    //     const date = await response.json()
    // //     output.textContent = `${date.status}`
    // }
   
    const date2 = () =>
    {
        let a = 5;
        let b = 6;
        return {a, b}
    }
    const myDate = date2()
    function showDate2(myDate)
    {
        output.textContent = `${JSON.stringify(myDate.a + myDate.b)}`
    }   
    // loadDate()




const number = (num) =>
{
    let c = 14 + num
    let d = 13 - num
    return {c, d}
}

const {c, d} = number(2)

function showNumber()
{
    output.innerHTML = `<p>${c} - ${d}</p>`
    console.log(`<p>${c-d}</p>`)
}

showDate2(myDate) 
showNumber()
















})



