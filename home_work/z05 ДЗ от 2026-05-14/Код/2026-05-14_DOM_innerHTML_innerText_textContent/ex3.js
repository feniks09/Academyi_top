"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const sectionA = document.querySelector(".section-a");
    const sectionB = document.querySelector(".section-b");
    const button_AddToA = document.querySelector("#btn_AddToA");
    const button_AddToB = document.querySelector("#btn_AddToB");

    button_AddToA.addEventListener("click", () => {
        const p = document.createElement("p");
        p.textContent = "Тыц!";
        sectionA.appendChild(p);
    });

    button_AddToB.addEventListener("click", () => {
        const p = document.createElement("p");
        p.textContent = "Чпоньк!";
        sectionB.appendChild(p);
    });

    /*
    В этом варианте кода браузеру не приходится каждый
    раз полностью строить заново содержимое <div class="block section-a">
    ...</div>.
    
    Порождается новый элемент (абзац), и он добавляется в уже
    существующую структуру веб-страницы, не требуя пересоздания
    находящихся там элементов.
    */
});