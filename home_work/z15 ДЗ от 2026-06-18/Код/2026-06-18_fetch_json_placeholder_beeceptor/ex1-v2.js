"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");
    const buttonGetUsers = document.querySelector("#button-getUsers");
    
    async function fetchUsers()
    {
        try
        {
            let response = await fetch(
                "https://json-placeholder.mock.beeceptor.com/users"
            );
            return response.json();
        }
        catch (error)
        {
            throw error;
        }
    }

    function createUserCard(user)
    {
        const userCardTemplate = document.querySelector("#templates").content;
        const userCard = userCardTemplate.querySelector(".user-card").cloneNode(true);

        if (user.photo)
        {
            userCard.querySelector(".user-card-photo").src = user.photo;
        }

        let htmlBlock = "";
        
        for (let key in user)
        {
            // Тут данные из сети лихо вставляются без экранирования.
            // Не надо так! Это небезопасно.
            htmlBlock += `${key}&nbsp;&mdash; ${user[key]}<br>`;
        }

        userCard.querySelector(".user-card-info").innerHTML = htmlBlock;

        return userCard;
    }

    function showUsers(users)
    {
        for (let user of users)
        {
            output.appendChild(createUserCard(user));
        }
    }

    function showError(error)
    {
        output.innerHTML = `<b>Ошибка:</b> ${error}`;
    }    

    buttonGetUsers.addEventListener(
        "click",
        () =>
        {   
            // Это краткая версия fetchUsers().then(users => showUsers(users))
            fetchUsers()
            .then(showUsers)
            .catch(showError);
        }
    );
});