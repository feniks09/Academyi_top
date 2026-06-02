"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const UPDATE_PERIOD_MILLISECONDS = 20;
    const output = document.querySelector("#output");

    let counter = 100;

    function countdown()
    {
        if (counter < 0) return;

        output.textContent = `${counter}`;
        counter--;
        setTimeout(countdown, UPDATE_PERIOD_MILLISECONDS);
    }

    countdown();
});