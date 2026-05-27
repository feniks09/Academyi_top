"use strict";


function createAdditionalParagraph()
{
    document.body.innerHTML += "<p>Ещё <b>один</b> абзац.</p>";
}


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");

    function execute(fn)
    {
        // Здесь мы ожидаем, что переменная fn хранит
        // функцию или функция-подобный объект.
        // fn - это просто имя переменной, мы сами придумали
        fn();
    }

    function doAction()
    {
        output.innerText += "doAction()\n";
    }

    execute(doAction);  // У doAction нет ( и ) после
    execute(createAdditionalParagraph);
});