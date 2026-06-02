"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const TICK_PERIOD_MILLISECONDS = 500;
    const output = document.querySelector("#output");
    const buttonStartTick = document.querySelector("#button_startTick");
    const buttonStopTick = document.querySelector("#button_stopTick");
    const buttonPausaTick = document.querySelector("#button_pauseTick");

    let timerId = null;
    let counter = 0;
    let timeStop = false;

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
            counter = 0;
            output.textContent = "";
        }
        if (timerId === null)
        {
            counter = counter;
            if (timeStop)
            {
                counter = 0;
                output.textContent = "";
            }
        }
        showCounter();
        timerId = setInterval(tick, TICK_PERIOD_MILLISECONDS);
        timeStop = null;
    }

    function stopTick()
    {
        clearInterval(timerId);
        timerId = null;
        timeStop = true;
        // output.textContent = "";
        // Для setTimeout есть clearTimeout
    }

    function pauseTick()
    {   counter = counter + 1;
        if (timerId !== null)
        {
            clearInterval(timerId);
            timerId = null;
            // output.textContent = `${counter}`
        
            // showCounter()
            // timerId = setInterval(tick, TICK_PERIOD_MILLISECONDS)
        }
    }

    buttonStartTick.addEventListener("click", startTick);
    buttonStopTick.addEventListener("click", stopTick);
    buttonPausaTick.addEventListener("click", pauseTick)
});