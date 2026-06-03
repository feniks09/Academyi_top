"use strict"

document.addEventListener("DOMContentLoaded", () =>
{
    const outputInfo = document.querySelector("#outputInfo");
    const input = document.querySelector("#input");
    const buttonSave = document.querySelector("#buttonSave");
    const buttonLoad = document.querySelector("#buttonLoad");
    const buttonAddStr = document.querySelector("#buttonAddStr");
    const LOCAL_STORAGE_KEY = "dhewyrghvbedj";

    let saveData = [];

    function save()
    {
        let textAsJSON = JSON.stringify(input.value);
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            textAsJSON
        );

    }
    function saveArrayStr()
    {
        saveData.push(input.value);
        let arrayAsJSON = JSON.stringify(saveData);
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            arrayAsJSON
        );

    }
    function load()
    {
        let arrayAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (arrayAsJSON !== null);
        {
            saveData = JSON.parse(arrayAsJSON);
        }
    }

    function notifySuccessulSave()
    {
        outputInfo.textContent = "Запись успешно произведена."
    }

    function notifySuccessfulLoad()
    {
        outputInfo.textContent = "Загрузка успешно произведена."
    }

    function notifyFailedfulLoad()
    {
        outputInfo.textContent = "Загрузка не удалась."
    }

    function notifyFirstRun(
    )
    {
        outputInfo.textContent = "Хранилище пусто, это первый запуск"
    }
    function notifyDataFound()
    {
        outputInfo.textContent = "Хранилище содержит данные для загрузки"
    }

    function notify(notifyFunction)
    {
        notifyFunction()
        setTimeout(() =>{ outputInfo.textContent = "";}, 2000);
    }


    buttonSave.addEventListener("click", () => {saveArrayStr(), notify(notifySuccessulSave)});
    buttonLoad.addEventListener("click", load);

    if (localStorage.getItem(LOCAL_STORAGE_KEY) === null)
    {
        notify(notifyFirstRun);
    }
    else
    {
        notify(notifyDataFound);
    }
});