"use strict"


function main()
{
    let input = document.querySelector("#input")
    let output = document.querySelector("#output")

    let namber = parseInt(input.value);
    let listN = []
    for (let i = 0; i <= 9; i++)
    {
        let string = `${namber} * ${i} = ${namber * i}\n`
        listN.push(string)
    }

    output.innerHTML = listN.join("<br>")

}




