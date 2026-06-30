"use strict";


$(() => {
    $("p.output").html("<b>Работает!</b>");
});


// Для сравнения обычный JS (причём данная стрелочная
// функция исполнится раньше той, что в $)

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("p.output").forEach(
        item => item.innerHTML = "<b>JS Работает!</b>"
    );
});
