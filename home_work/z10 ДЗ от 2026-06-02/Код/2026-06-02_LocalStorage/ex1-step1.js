"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const outputInfo = document.querySelector("#outputInfo");
    const input = document.querySelector("#input");
    const buttonSave = document.querySelector("#buttonSave");
    const buttonLoad = document.querySelector("#buttonLoad");
    const LOCAL_STORAGE_KEY = "dhjdshdshui";  // Нами придуманный ключ (имя), под которым будут храниться данные

    function save()
    {
        // Здесь JSON можно не использовать, текст же ведь
        // в input.value, но для общей картины пусть будет.
        let textAsJSON = JSON.stringify(input.value);

        localStorage.setItem(LOCAL_STORAGE_KEY, textAsJSON);
    }

    function load()
    {
        let textAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (textAsJSON !== null)
        {
            input.value = JSON.parse(textAsJSON);
        }
    }

    buttonSave.addEventListener("click", save);
    buttonLoad.addEventListener("click", load);
});