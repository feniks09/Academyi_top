"use starict";

function ResolveSituation()
{
    const inputCash = document.querySelector("#inputCash");
    const inputCard = document.querySelector("#inputCard");
    const inputStore = document.querySelector("#inputStore");
    const output = document.querySelector("#output");

    let hasCash = inputCash.checked;
    let hasCard = inputCard.checked;
    let isStoreNearby = inputStore.checked;

    let hasMoney = hasCard || hasCard; // логическое или or
    let canBuyFood = hasMoney && isStoreNearby; // логиское b &&  and

    if (canBuyFood) // можно (hasCash || hasCard) &&
    {
        output.innerText = "Ура, сейчас поедим!\n";
    }
    else
    {
        output.innerText = "Увы. Идем голодными до домма.\n"
    }

}