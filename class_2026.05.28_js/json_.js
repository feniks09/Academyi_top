"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const inputUseName = document.querySelector("#inputUseName");
    const inputUsePatronomic = document.querySelector("#inputUsepatroname");
    const inputUseSorname = document.querySelector("#inputUseSorname");
    const buttonTransToJson = document.querySelector("#btnCreate");
    const output = document.querySelector("#output")


    buttonTransToJson.addEventListener("click", () => {
        let obj = {};
        obj["name"] = inputUseName.value; // добавление пары
        obj["patronam"] = inputUsePatronomic.value;
        obj["soname"] = inputUseSorname.value;
        let json = JSON.stringify(obj);
        output.innerText = json
    });
});