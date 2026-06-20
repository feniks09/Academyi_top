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

    function showUsers(users)
    {
        let htmlBlock = "";

        for (let user of users)
        {
            // Тут данные из сети лихо вставляются без экранирования.
            // Не надо так! Это небезопасно.
            htmlBlock += `<b>${user.name}</b><br>`;

            for (let key in user)
            {
                htmlBlock += `${key}&nbsp;&mdash; ${user[key]}<br>`;
            }

            htmlBlock += `<br>`;
        }

        output.innerHTML = htmlBlock;
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