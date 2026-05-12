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
        let rez = `Координаты находятся в Первой четверти`
        output.innerText = rez
        }
    
    else if (x < 0 && y > 0)
        {
        let rez = `Координаты находятся в второй четверти`
        output.innerText = rez
        }
    
    else if (x < 0 && y < 0)
        {
            let rez = `Координаты находятся в третьей четверти`
            output.innerText = rez
        }
    
    else if (x > 0 && y < 0)
        {
            let rez = `Координаты находятся в четвертой четверти`
            output.innerText = rez
        }
    else if ((x === 0 && y > 0) || (x === 0 && y < 0))
        {
            let rez = `Координаты находятся на оси Y`
            output.innerText = rez
        }

    // else if (x === 0 && y < 0)
    //     {
    //         let rez = `Координаты находятся на оси отрицательной части оси Y`
    //         output.innerText = rez
    //     }
    else if ((x > 0 && y === 0) || x < 0 && y === 0)
        {
            let rez = `Координаты находятся на оси X`
            output.innerText = rez
        }
    
    // else if (x < 0 && y === 0)
    //     {
    //         let rez = `Координаты находятся на отрицательной части оси X`
    //         output.innerText = rez
    //     }    
    else 
        {
           output.innerText = `Вы ввели не число` 
        }


}