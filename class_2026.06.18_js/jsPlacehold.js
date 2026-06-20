"use strict"



document.addEventListener("DOMContentLoaded", () =>
{
    const button = document.querySelector("#button");
    const output = document.querySelector("#output");

    function loadeDate()
    {
        fetch("https://json-placeholder.mock.beeceptor.com/users",
            {
                method : "GET"
            }
        ).then(response =>
            {
                if(response.ok)
                {
                    console.log(response)
                    return response.json()
                }
                else
                {
                    throw new Error(`следующая ошибка ${response.status}`)
                }
            }
        ).then(userDate =>
            {   let list = [];
                for (let i = 0; i < userDate.length; i++)
                {   const container = document.createElement("div")
                    container.className = "container"
                    output.appendChild(container)
                    let userN = userDate[i];
                    let userKeys = Object.keys(userN) 
                    // let userValues = Object.values(user)
                    for (let j = 0; j < userKeys.length; j++)
                    {
                        let key = userKeys[j]
                        let user = `${key} : ${userN[key]};`
                        container.innerHTML += `<span>${user}</span><br>`
                        // list.push(HTMLuser)
                    }
                }
                // output.innerHTML += `${JSON.stringify(list)}`
                // console.log(userDate[0]["id"])
                   console.log(list)
                // output.textContent = `${JSON.stringify(userDate[0].id)}`
                //    output.textContent = `${JSON.stringify(list)}`
                // let userDate1 = userDate[0];
                // output.textContent = JSON.stringify(userDate1)
                console.log(userDate)
                // let list = [];
                // for (let key in userDateNew)
                // {
                //     for(let name in userDateNew)
                //     {
                //         list.push(`${key} - ${name}`) 
                //     }
                // }
                // output.textContent = JSON.stringify(list)
            })
    }
    button.addEventListener("click", loadeDate)
})