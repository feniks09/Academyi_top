"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");

    let obj = {
        "d": 3,
        "values": [1, 2, 4, -7.1],
        34: "xyz",
        "width": 23.4,
        "height": 0.001,
        "isOpen": false,
        "isActive": true,
        "link": null,
        "undefined": undefined
    };

    console.log(obj);

    let objAsJSON = JSON.stringify(obj);
    output.textContent += `${objAsJSON}\n`;

    let restoredObj = JSON.parse(objAsJSON);
    console.log(restoredObj);
    output.textContent += `Загляните в консоль\n`;
});