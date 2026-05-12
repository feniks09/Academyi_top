"use strict"


function main()
{
    let input = document.querySelector("#input")
    let output = document.querySelector("#output")

    let namber = parseInt(input.value);
    let list_ = []
    for (let i = 0; i <= 9; i++)
    {
        let string = `${namber} * ${i} = ${namber * i}\n`
        list_.push(string)
    }
    // list_ = list_.replaceALL(',', '')

    output.innerHTML = list_.join("<br>")

}




