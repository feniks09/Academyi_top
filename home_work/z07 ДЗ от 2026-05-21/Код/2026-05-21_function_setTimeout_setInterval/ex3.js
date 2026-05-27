"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");

    function getWriter(writerName)
    {
        function write()
        {
            output.innerText +=
                `Писатель "${writerName}" написал.\n`;
        }

        output.innerText += `ИНФО Создан писатель "${writerName}".\n`;

        return write;
    }

    let writerOne = getWriter("Первак");
    let writerTwo = getWriter("Вторяк");
    let writerThree = getWriter();  // В JavaScript так можно

    writerOne();
    writerTwo();
    writerOne();
    writerOne();
    writerThree();
    writerTwo();
});