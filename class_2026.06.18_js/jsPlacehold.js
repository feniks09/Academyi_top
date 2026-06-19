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
                {
                    let user = userDate[i]
                    let userKeys = Object.keys(user) 
                    let userValues = Object.values(user)
                    let users = `${userKeys} : ${userValues}`
                    list.push(users)
                }
                // console.log(userDate[0]["id"])
                   console.log(list)
                // output.textContent = `${JSON.stringify(userDate[0].id)}`
                   output.textContent = `${JSON.stringify(list)}`
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