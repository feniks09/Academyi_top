"use strict";


function main()
{
    // Сохраняем в переменной `p` ссылку
    // на элемент, заданный тегом <p></p>
    // с айдишником "output"
    let p = document.getElementById("#output");  // Старый вариант
    p = document.querySelector("#output");  // Современный вариант

    p.innerText += "Работает!\n";

    // На самом деле современный браузер все
    // элементы с id помещает в переменные,
    // имя которых такое же, как и у id
    output.innerText += "Ага!\n";
}