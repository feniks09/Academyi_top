"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");

    function serializeWithType(obj)
    {
        let objAsJSON = JSON.stringify(
            {
                __type: obj.constructor.name,
                __data: obj
            }
        );

        return objAsJSON;
    }

    function deserializeWithType(objAsJSON)
    {
        let meta = JSON.parse(objAsJSON);
        let obj = null;

        // Тут надо проверить meta на undefined

        switch (meta.__type)
        {
            case 'Torch':
                obj = new Torch();
                obj.__durability = meta.__data.__durability;
                obj.__isBurning = meta.__data.__isBurning;
        }

        return obj;
    }

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
    torch.ignite();
    torch.use();
    let torchAsJSON = serializeWithType(torch);
    output.innerText += `${torchAsJSON}\n`;

    let torches = [new Torch(), new Torch(), new Torch()];
    torches[1].ignite();
    torches[1].use();
    torches[1].use();
    let torchesAsJSON = serializeWithType(torches);
    output.innerText += `${torchesAsJSON}\n`;

    let restoredTorch = deserializeWithType(torchAsJSON);
    console.log(restoredTorch);
});