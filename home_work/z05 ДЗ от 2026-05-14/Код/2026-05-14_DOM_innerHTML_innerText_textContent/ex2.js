"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const sectionA = document.querySelector(".section-a");
    const sectionB = document.querySelector(".section-b");
    const button_AddToA = document.querySelector("#btn_AddToA");
    const button_AddToB = document.querySelector("#btn_AddToB");

    button_AddToA.addEventListener("click", () => {
        sectionA.innerHTML += "<p>Тыц!</p>";
    });

    button_AddToB.addEventListener("click", () => {
        sectionB.innerHTML += "<p>Чпоньк!</p>";
    });

    /*
    В этом примере намеренно заложен баг: если сначала нажать
    кнопку '"Добавить в секцию "А"', то кнопка 'Добавить
    в секцию "Б"' перестанет работать.

    Это из-за того, что код:
        sectionA.innerHTML += "<p>Тыц!</p>";
    заставляет браузер полностью заново построить содержимое
    внтури <div class="block section-a">...</div>, что
    влечёт за собой "выкидывание" старых версий элементов
    и "устаревание" ссылки sectionB (она останется ссылаться
    на прежний элемент, который уже не будет находится
    в структуре веб-страницы).
    */
});