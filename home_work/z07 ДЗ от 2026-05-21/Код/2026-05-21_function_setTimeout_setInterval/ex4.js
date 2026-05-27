"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");

    let counter = 0;

    function printCounterV1()
    {
        output.innerText += `!!! ${counter} !!! Однократно\n`;
    }

    function printCounterV2()
    {
        output.innerText += `${counter}\n`;
        counter++;
    }

    // Создаём таймер, которые через 4000 мс (то есть через
    // 4 секунды) вызовет функцию printCounterV1
    let oneshotTimerId = setTimeout(printCounterV1, 4000);

    output.innerText += `Создан таймер id=${oneshotTimerId} (и он уже тикает!)\n`;

    // Создаём таймер, которые через кажды 500 мс (то есть через
    // полсекунды) будет вызовать функцию printCounterV2
    let periodicTimerId = setInterval(printCounterV2, 500);

    output.innerText += `Создан таймер id=${periodicTimerId} (и он уже тикает!)\n`;

    // Все таймеры запускаются сразу в момент создания
});