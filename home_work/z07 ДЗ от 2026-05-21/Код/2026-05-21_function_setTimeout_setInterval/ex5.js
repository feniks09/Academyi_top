"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const TICK_PERIOD_MILLISECONDS = 500;
    const output = document.querySelector("#output");
    const buttonStartTick = document.querySelector("#button_startTick");
    const buttonStopTick = document.querySelector("#button_stopTick");

    let timerId = null;
    let counter = 0;

    function showCounter()
    {
        output.textContent = `${output.textContent} ${counter}`;
    }

    function tick()
    {        
        counter++;
        showCounter();
    }

    function startTick()
    {
        if (timerId !== null)
        {
            stopTick();
        }

        counter = 0;
        output.textContent = "";
        showCounter();
        timerId = setInterval(tick, TICK_PERIOD_MILLISECONDS);
    }

    function stopTick()
    {
        clearInterval(timerId);
        timerId = null;
        // Для setTimeout есть clearTimeout
    }

    buttonStartTick.addEventListener("click", startTick);
    buttonStopTick.addEventListener("click", stopTick);
});