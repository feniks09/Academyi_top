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
    let timePause = false;

    function showCounter()
    {
        output.textContent = `${output.textContent} ${counter}`;
    }

    function tick()
    {        
        counter++;
        showCounter();
    }

    function resetCount ()
    {
        counter = 0;
        output.textContent = ""
    }
    
    function startTick()
    {
        if (timerId !== null) // Если таймер запущен при повторном нажатии start останови и обнули счетчик;
        {
            stopTick();
            resetCount();
            showCounter() // Так как интервал не показывает страт покажи его(0);
        }
        else
        {
            if (timeStop)     // Если таймер был остановлен(timerId = null) обнули счетчик;
            {
                resetCount();
            }
            if (!timePause) // Показывай стартовое значение таймера если ранее не была нажата кнопка пауза;
            {
                showCounter();
            }
        }
        timerId = setInterval(tick, TICK_PERIOD_MILLISECONDS);
        timeStop = false;
        timePause = false
    }

    function stopTick()
    {
        clearInterval(timerId);
        timerId = null;
        timeStop = true;
        timePause = false;

    }

    function pauseTick()
    {  
        if (timerId !== null)
        {
            clearInterval(timerId);
            timerId = null;
            timePause = true;
        }
    }

    buttonStartTick.addEventListener("click", startTick);
    buttonStopTick.addEventListener("click", stopTick);
    buttonPausaTick.addEventListener("click", pauseTick)
});