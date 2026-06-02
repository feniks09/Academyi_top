"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const UPDATE_PERIOD_MILLISECONDS = 750;
    const OUTPUT_WIDTH = 200;
    const OUTPUT_HEIGHT = 180;
    const BUTTON_WIDTH = 24;
    const BUTTON_HEIGHT = 24;
    const output = document.querySelector("#output");

    let timerId = null;
    let buttonCount = 0;

    function removeButton(event)
    {
        buttonCount--;
        event.target.remove();
    }

    function spawnButton()
    {
        const button = document.createElement("button");

        let x = parseInt(Math.random() * (OUTPUT_WIDTH - BUTTON_WIDTH));
        let y = parseInt(Math.random() * (OUTPUT_HEIGHT - BUTTON_HEIGHT));

        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        button.textContent = "x";
        button.addEventListener("click", removeButton);
        output.appendChild(button);
        buttonCount++;
    }

    function showVictory()
    {
        output.innerHTML = '<p class="victory">Победа!</p>';
    }

    function dispatchFirstTime()
    {
            spawnButton();
            timerId = setTimeout(dispatchCommon, UPDATE_PERIOD_MILLISECONDS);
    }

    function dispatchCommon()
    {
        if (buttonCount === 0)
        {
            showVictory();
        }
        else
        {
            spawnButton();
            timerId = setTimeout(dispatchCommon, UPDATE_PERIOD_MILLISECONDS);
        }
    }

    dispatchFirstTime();
});