"use strict"

function defound()
{
    const inputX = document.querySelector("#inputX")
    const inputY = document.querySelector("#inputY")

    const output = document.querySelector("#output")

    let x = parseFloat(inputX.value)
    let y = parseFloat(inputY.value)

    if (x > 0 && y > 0) 
        {
        let rez = `Первая четверть`
        output.innerText = rez
        }
    
    else if (x < 0 && y > 0)
        {
        let rez = `Вторая четверть`
        output.innerText = rez
        }
    
    else if (x < 0 && y < 0)
        {
            let rez = `Третья четверть`
            output.innerText = rez
        }
    
    else if (x > 0 && y < 0)
        {
            let rez = `Четвертая четверть`
            output.innerText = rez
        }
    else if (x === 0 && y > 0)
        {
            let rez = `Координаты находятся на оси Х`
            output.innerText = rez
        }
    else 
        {
           output.innerText = `Вы ввели не число` 
        }


}