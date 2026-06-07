"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");

    class Torch
    {
        constructor()
        {
            this.__isBurning = false;
            this.__durability = 10;
        }

        ignite()
        {
            if (this.__durability > 0)
            {
                this.__isBurning = true;
            }
        }

        use()
        {
            if (!this.__isBurning) return;

            this.__durability--;

            if (this.__durability === 0)
            {
                this.__isBurning = false;
            }
        }
    }

    let torch = new Torch();
    let torchAsJSON = JSON.stringify(torch);
    output.innerText += `${torchAsJSON}\n`;

    let torches = [new Torch(), new Torch(), new Torch()];
    torches[1].ignite();
    torches[1].use();
    torches[1].use();
    let torchesAsJSON = JSON.stringify(torches);
    output.innerText += `${torchesAsJSON}\n`;
});