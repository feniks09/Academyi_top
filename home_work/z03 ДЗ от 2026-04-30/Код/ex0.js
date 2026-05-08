"use strict";


function resolveSituation()
{
    const inputCash = document.querySelector("#inputCash");
    const inputCard = document.querySelector("#inputCard");
    const inputStore = document.querySelector("#inputStore");
    const output = document.querySelector("#output");

    let hasCash = inputCash.checked;
    let hasCard = inputCard.checked;
    let isStoreNearby = inputStore.checked;

    let hasMoney = hasCash || hasCard;  // Символы `||` означают логическое ИЛИ (or)
    let canBuyFood = hasMoney && isStoreNearby;  // Символы `&&` означают логическое И (and)

    if (canBuyFood)  // Можно сразу `(hasCash || hasCard) && isStoreNearby`
    {
        output.innerText = "Ура, сейчас поедим!\n";
    }
    else
    {
        output.innerText = "Увы. Идём голодными до дома.\n";
    }
}