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
                    return response.json()
                }
                else
                {
                    throw new Error(`следующая ошибка ${response.status}`)
                }
            }
        ).then(userDate =>
            {   let list = []
                for (let i = 0; i < 2; i++)
                {
                    let user = userDate[i]
                    list.push(user)
                }
                output.textContent = `${userDate[1]}`
                // let userDate1 = userDate[0];
                // output.textContent = JSON.stringify(userDate1)
                // console.log(userDate1)
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