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
        let isOperationComplete = false;
        let textAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (textAsJSON !== null)
        {
            try
            {
                input.value = JSON.parse(textAsJSON);
                isOperationComplete = true;
            }
            catch
            { }
        }

        return isOperationComplete;
    }

    function notifySuccessfulSave()
    {
        outputInfo.textContent = "Запись успешно произведена.";
    }

    function notifySuccessfulLoad()
    {
        outputInfo.textContent = "Загрузка успешно произведена.";
    }

    function notifyFailedLoad()
    {
        outputInfo.textContent = "Загрузка не удалась.";
    }

    function notifyFirstRun()
    {
        outputInfo.textContent = "Хранилище пусто. Похоже, это первый запуск.";
    }

    function notifyDataFound()
    {
        outputInfo.textContent = "Хранилище содержит данные для загрузки.";
    }

    function notify(notifyFunction)
    {
        notifyFunction();
        setTimeout(() => { outputInfo.textContent = ""; }, 2000);
    }

    buttonSave.addEventListener("click", () => { save(); notify(notifySuccessfulSave); });
    buttonLoad.addEventListener("click", () => { notify(load() ? notifySuccessfulLoad : notifyFailedLoad); });

    let isStorageEmpty = (localStorage.getItem(LOCAL_STORAGE_KEY) === null);
    
    notify(isStorageEmpty ? notifyFirstRun : notifyDataFound);
});