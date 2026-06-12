"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Приложение
    /////////////

    const SERVER_PROTOCOL = "https"
    const SERVER_DOMEN = "json-placeholder.mock.beeceptor.com";
    const SERVER_URL = `${SERVER_PROTOCOL}://${SERVER_DOMEN}`;
    const API_AUTH_LOGIN = "login";
    const API_USERS = "users";

    const APPLICATION_STATE = {
        NONE: 0,
        AWAITING_LOGIN: 1,
        AUTHENTICATED: 2,
        AWAITING_USERS: 3,
    };

    class Application
    {
        constructor()
        {
            this.state = APPLICATION_STATE.NONE;
            this.authLoginDateTime = null;
            this.authToken = "";
            this.authTokenForRefresh = "";
            this.authExpiresInMins = 0;
        }

        logIn(userName, userPassword)
        {
            if (this.state != APPLICATION_STATE.NONE) return;

            this.state = APPLICATION_STATE.AWAITING_LOGIN;

            const FETCH_OPTIONS = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(
                    {
                        username: userName,
                        password: userPassword,
                        // expiresInMins: 30, // optional, defaults to 60
                    }
                ),
                //credentials: "include",  // Include cookies (e.g., accessToken) in the request
            };

            fetch(
                `${SERVER_URL}/${API_AUTH_LOGIN}`,
                FETCH_OPTIONS
            ).then(
                response => response.json()
            ).then(
                dictionaryFromJSON =>
                {
                    if (dictionaryFromJSON.success)
                    {   
                        this.state = APPLICATION_STATE.AUTHENTICATED;
                        this.authToken = dictionaryFromJSON.token;
                        console.log("Авторизация пройдена. Получен токен.");
                    }
                    else
                    {
                        this.state = APPLICATION_STATE.NONE;
                        console.log(`Авторизация не удалась. Ошибка: ${dictionaryFromJSON.error}`);
                    }
                }
            ).catch(
                error =>
                {
                    this.state = APPLICATION_STATE.NONE;
                    console.log(`Ошибка: ${error}`);
                }
            );
        }

        requestUser(userId, callback)
        {
            if (this.state != APPLICATION_STATE.AUTHENTICATED) return;

            this.state = APPLICATION_STATE.AWAITING_USERS;

            const FETCH_OPTIONS = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8",
                },
            };

            fetch(
                `${SERVER_URL}/${API_USERS}/${userId}`,
                FETCH_OPTIONS
            ).then(
                response => response.json()
            ).then(
                dictionaryFromJSON =>
                {
                    this.state = APPLICATION_STATE.AUTHENTICATED;
                    callback(dictionaryFromJSON);
                }
            ).catch(
                error =>
                {
                    this.state = APPLICATION_STATE.AUTHENTICATED;
                    console.log(`Ошибка: ${error}`);
                }
            );
        }
    }

    const app = new Application();


    // Ссылки на элементы страницы
    //////////////////////////////

    // Форма входа
    const formLogin = document.querySelector("#form-login");
    const formLogin_inputUserName = document.querySelector("#input-user-name");
    const formLogin_inputUserPassword = document.querySelector("#input-user-password");

    // Кнопка теста получения пользователя
    const buttonGetUser = document.querySelector("#button-get-user");

    // Место под вывод
    const output = document.querySelector("#output");


    // Функции и обработчики событий
    ////////////////////////////////
    
    formLogin.addEventListener("submit", (event) => {
        // Запрет форме отправлять данные своим стандартным способом
        event.preventDefault();
        
        // Запускаю свой способ
        app.logIn(
            formLogin_inputUserName.value.trim(),
            formLogin_inputUserPassword.value  // Тут без `.trim()`!
        );
    });
    
    buttonGetUser.addEventListener("click", () => {
        app.requestUser(
            12,
            (json) =>
            {
                console.log(json);
            }
        );
    });
});
