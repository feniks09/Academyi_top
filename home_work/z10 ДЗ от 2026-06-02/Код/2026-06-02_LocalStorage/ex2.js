"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const outputInfo = document.querySelector("#outputInfo");
    const outputStrings = document.querySelector("#outputStrings");
    const input = document.querySelector("#input");
    const buttonSave = document.querySelector("#buttonSave");
    const buttonLoad = document.querySelector("#buttonLoad");
    const buttonAddString = document.querySelector("#buttonAddString");
    const LOCAL_STORAGE_KEY = "dhjdshdshui";  // Нами придуманный ключ (имя), под которым будут храниться данные

    let strings = [];

    function addString()
    {
        strings.push(input.value);
    }

    function updateUI()
    {
        let text = "";

        input.value = "";

        for (let s of strings)
        {
            text = `${text}\n${s}`;
        }

        outputStrings.innerText = text;
    }

    function save()
    {
        let stringsAsJSON = JSON.stringify(strings);

        localStorage.setItem(LOCAL_STORAGE_KEY, stringsAsJSON);
    }

    function load()
    {
        // Функция написана так, что при невозможности
        // загрузить данные из хранилища массив strings
        // не будет как-либо изменён.

        let isOperationComplete = false;
        let stringsAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (stringsAsJSON !== null)
        {
            try
            {
                strings = JSON.parse(stringsAsJSON);
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

    function notifyStringAdded()
    {
        outputInfo.textContent = "Строка добавлена в список (это ещё не сохранение).";
    }

    function notify(notifyFunction)
    {
        notifyFunction();
        setTimeout(() => { outputInfo.textContent = ""; }, 2000);
    }

    buttonSave.addEventListener("click", () => { save(); notify(notifySuccessfulSave); });
    buttonLoad.addEventListener("click", () => { notify(load() ? notifySuccessfulLoad : notifyFailedLoad); updateUI(); });
    buttonAddString.addEventListener("click", () => { addString();  notify(notifyStringAdded); updateUI(); });

    let isStorageEmpty = (localStorage.getItem(LOCAL_STORAGE_KEY) === null);
    
    notify(isStorageEmpty ? notifyFirstRun : notifyDataFound);

    updateUI();
});