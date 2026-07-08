"use strict"

document.addEventListener("DOMContentLoaded", () =>
{
    // ===== КОНФИГУРАЦИЯ =====
    const config = {
        elements: {
            inputName: document.querySelector("#inputTitle"),
            inputType: document.querySelector("#inputType"),
            output: document.querySelector("#output"),
            footPage: document.querySelector("#footPage"),
            listMovie: document.querySelector("#listMovie"),
            searchButton: document.querySelector("#searchButton"),
            modal: document.querySelector("#movieModal"),
            modalContent: document.querySelector("#modalContent"),
            closeModal: document.querySelector("#closeModal")
        },
        
        api: {
            baseURL: "https://www.omdbapi.com/",
            apiKey: "247243bf"
        },
        
        search: {
            minLength: 2,
            itemsPerPage: 10
        },
        
        display: {
            cardWidth: 160,
            cardGap: 15,
            posterHeight: 220
        },
        
        translit: {
            map: {
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
                'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
                'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
                'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
                'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
                'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
                'э': 'e', 'ю': 'yu', 'я': 'ya'
            },
            pattern: /[а-яё]/i
        }
    }

    // ===== СОСТОЯНИЕ =====
    let state = {
        currentPage: 1,
        totalResults: 0,
        allResults: [],
        currentType: null,
        searchQuery: ''
    }

    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function transliterate(text) {
        if (!text) return text
        return text.toLowerCase().split('').map(char => {
            return config.translit.map[char] || char
        }).join('')
    }

    function isCyrillic(text) {
        return config.translit.pattern.test(text)
    }

    function getTypeText(type) {
        const typeMap = {
            'series': 'сериалов',
            'movie': 'фильмов',
            'episode': 'эпизодов'
        }
        return typeMap[type] || 'результатов'
    }

    function formatMovieCard(movie, index) {
        const globalIndex = ((state.currentPage - 1) * config.search.itemsPerPage) + index + 1
        const poster = movie.Poster && movie.Poster !== 'N/A' 
            ? movie.Poster 
            : 'https://via.placeholder.com/300x450/333/666?text=No+Poster'
        
        const typeMap = {
            'series': 'Сериал',
            'movie': 'Фильм',
            'episode': 'Эпизод'
        }
        const type = typeMap[movie.Type] || "Неизвестно"
        
        return `
            <div class="movie-card" data-imdbid="${movie.imdbID}" onclick="window.openMovieDetails('${movie.imdbID}')">
                <img src="${poster}" alt="${movie.Title}" loading="lazy">
                <div class="movie-card-info">
                    <div class="movie-number">#${globalIndex}</div>
                    <h3 title="${movie.Title}">${movie.Title}</h3>
                    <p>${movie.Year} • ${type}</p>
                    <span class="card-hint">👆 Подробнее</span>
                </div>
            </div>
        `
    }

    function createPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / config.search.itemsPerPage)
        if (totalPages <= 1) return ''
        
        let paginationHTML = '<div class="pagination">'
        
        if (state.currentPage > 1) {
            paginationHTML += `<button onclick="window.goToPage(${state.currentPage - 1})">← Назад</button>`
        }
        
        const startPage = Math.max(1, state.currentPage - 2)
        const endPage = Math.min(totalPages, state.currentPage + 2)
        
        if (startPage > 1) {
            paginationHTML += `<button onclick="window.goToPage(1)">1</button>`
            if (startPage > 2) paginationHTML += `<span>...</span>`
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const active = i === state.currentPage ? 'active' : ''
            paginationHTML += `<button class="${active}" onclick="window.goToPage(${i})">${i}</button>`
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) paginationHTML += `<span>...</span>`
            paginationHTML += `<button onclick="window.goToPage(${totalPages})">${totalPages}</button>`
        }
        
        if (state.currentPage < totalPages) {
            paginationHTML += `<button onclick="window.goToPage(${state.currentPage + 1})">Вперед →</button>`
        }
        
        paginationHTML += '</div>'
        return paginationHTML
    }

    function displayCurrentPage() {
        const { listMovie, footPage } = config.elements
        
        const startIndex = (state.currentPage - 1) * config.search.itemsPerPage
        const endIndex = Math.min(startIndex + config.search.itemsPerPage, state.allResults.length)
        const pageItems = state.allResults.slice(startIndex, endIndex)
        
        if (pageItems.length === 0) {
            listMovie.innerHTML = '❌ Ничего не найдено'
            return
        }
        
        listMovie.innerHTML = `
            <div class="results-header">
                <h2>Результаты поиска: "${state.searchQuery}"</h2>
                <p>Найдено: ${state.totalResults} ${getTypeText(state.currentType)}</p>
            </div>
            <div class="movies-grid">
                ${pageItems.map((movie, index) => formatMovieCard(movie, index)).join('')}
            </div>
        `
        
        footPage.innerHTML = createPagination(state.totalResults)
    }

    function handleError(message) {
        const { listMovie, footPage } = config.elements
        listMovie.innerHTML = `❌ ${message}`
        footPage.innerHTML = ''
        
        if (message === "Too many results.") {
            listMovie.innerHTML = `
                🔍 Слишком много результатов.<br>
                Пожалуйста, уточните поиск:<br>
                - Используйте английское название<br>
                - Добавьте год выпуска<br>
                - Укажите конкретный тип (фильм/сериал)
            `
            footPage.innerHTML = `<p style="color:#888;text-align:center;">💡 Для поиска на русском используйте английское название</p>`
        }
    }

    // ===== API ФУНКЦИИ =====
    async function fetchFromAPI(params) {
        const url = `${config.api.baseURL}?${params}`
        console.log("URL:", url)
        console.log("Параметры:", params.toString())
        
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            console.error("Ошибка запроса:", error)
            throw error
        }
    }

    function buildSearchParams(query, type = null, page = 1) {
        const params = new URLSearchParams({
            apikey: config.api.apiKey,
            s: query,
            page: page
        })
        
        if (type) {
            params.set('type', type)
        }
        
        return params
    }

    function buildDetailParams(imdbID) {
        return new URLSearchParams({
            apikey: config.api.apiKey,
            i: imdbID,
            plot: "full"
        })
    }

    function buildEpisodeParams(title, season, episode) {
        return new URLSearchParams({
            apikey: config.api.apiKey,
            t: title,
            season: season,
            episode: episode
        })
    }

    // ===== МОДАЛЬНОЕ ОКНО =====
    window.openMovieDetails = async function(imdbID) {
        console.log("Открытие деталей для ID:", imdbID)
        const { modal, modalContent } = config.elements
        
        try {
            modalContent.innerHTML = '⏳ Загрузка деталей...'
            modal.style.display = 'block'
            document.body.style.overflow = 'hidden'
            
            const params = buildDetailParams(imdbID)
            const data = await fetchFromAPI(params)
            
            console.log("Данные получены:", data)
            
            if (data.Response === "True") {
                const poster = data.Poster && data.Poster !== 'N/A' 
                    ? data.Poster 
                    : 'https://via.placeholder.com/500x750/333/666?text=No+Poster'
                
                const typeMap = {
                    'series': 'Сериал',
                    'movie': 'Фильм',
                    'episode': 'Эпизод'
                }
                
                modalContent.innerHTML = `
                    <div class="modal-grid">
                        <div class="modal-poster">
                            <img src="${poster}" alt="${data.Title}" onerror="this.src='https://via.placeholder.com/500x750/333/666?text=No+Poster'">
                        </div>
                        <div class="modal-info">
                            <h2>${data.Title}</h2>
                            <p><strong>Год:</strong> ${data.Year || 'Нет данных'}</p>
                            <p><strong>Тип:</strong> ${typeMap[data.Type] || "Неизвестно"}</p>
                            <p><strong>Рейтинг:</strong> ⭐ ${data.imdbRating || "Нет данных"}</p>
                            <p><strong>Голосов:</strong> ${data.imdbVotes || "Нет данных"}</p>
                            ${data.Type === "series" ? `<p><strong>Сезонов:</strong> ${data.totalSeasons || "Нет данных"}</p>` : ''}
                            ${data.Type === "episode" ? `
                                <p><strong>Сезон:</strong> ${data.Season || 'Нет данных'}</p>
                                <p><strong>Эпизод:</strong> ${data.Episode || 'Нет данных'}</p>
                            ` : ''}
                            ${data.Runtime && data.Runtime !== 'N/A' ? `<p><strong>Длительность:</strong> ${data.Runtime}</p>` : ''}
                            ${data.Genre && data.Genre !== 'N/A' ? `<p><strong>Жанр:</strong> ${data.Genre}</p>` : ''}
                            ${data.Director && data.Director !== 'N/A' ? `<p><strong>Режиссер:</strong> ${data.Director}</p>` : ''}
                            ${data.Actors && data.Actors !== 'N/A' ? `<p><strong>Актеры:</strong> ${data.Actors}</p>` : ''}
                            ${data.Plot && data.Plot !== 'N/A' ? `<p><strong>Сюжет:</strong> ${data.Plot}</p>` : ''}
                        </div>
                    </div>
                `
            } else {
                modalContent.innerHTML = `❌ ${data.Error || "Не удалось загрузить данные"}`
            }
        } catch (error) {
            console.error("Ошибка:", error)
            modalContent.innerHTML = `❌ Ошибка загрузки: ${error.message}`
        }
    }

    function closeModal() {
        const { modal } = config.elements
        modal.style.display = 'none'
        document.body.style.overflow = 'auto'
    }

    // ===== ФУНКЦИИ ПОИСКА =====
    async function queryToSearchFilm() {
        const { inputName, inputType, listMovie } = config.elements
        listMovie.innerHTML = "⏳ Загрузка..."
        config.elements.footPage.innerHTML = ''
        
        let nameFilm = inputName.value.trim()
        let typeFilm = inputType.value.trim()
        
        if (!nameFilm) {
            listMovie.innerHTML = '⚠️ Введите название для поиска'
            return
        }
        
        let searchQuery = nameFilm
        if (isCyrillic(nameFilm)) {
            searchQuery = transliterate(nameFilm)
            console.log(`Транслитерация: "${nameFilm}" -> "${searchQuery}"`)
        }
        
        if (searchQuery.length < config.search.minLength) {
            listMovie.innerHTML = `⚠️ Введите минимум ${config.search.minLength} символа`
            return
        }

        try {
            const params = buildSearchParams(searchQuery, typeFilm || null, 1)
            const data = await fetchFromAPI(params)
            
            console.log("Результаты поиска:", data)
            
            if (data.Response === "True") {
                state.allResults = data.Search || []
                state.totalResults = parseInt(data.totalResults) || 0
                state.currentPage = 1
                state.currentType = typeFilm
                state.searchQuery = nameFilm
                displayCurrentPage()
            } else {
                handleError(data.Error || "Ничего не найдено")
                state.allResults = []
                state.totalResults = 0
            }
        } catch (error) {
            handleError(error.message)
            state.allResults = []
            state.totalResults = 0
        }
    }

    // ===== ПАГИНАЦИЯ =====
    window.goToPage = function(page) {
        const totalPages = Math.ceil(state.totalResults / config.search.itemsPerPage)
        if (page < 1 || page > totalPages) return
        
        state.currentPage = page
        displayCurrentPage()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // ===== БЫСТРЫЙ ПОИСК ЭПИЗОДА =====
    window.quickEpisodeSearch = async function() {
        const title = document.getElementById('episodeTitle').value.trim()
        const season = document.getElementById('seasonNum').value
        const episode = document.getElementById('episodeNum').value
        
        if (!title || !season || !episode) {
            config.elements.listMovie.innerHTML = '⚠️ Заполните все поля для поиска эпизода'
            return
        }
        
        await searchEpisodeByTitle(title, season, episode)
    }

    async function searchEpisodeByTitle(seriesTitle, seasonNumber, episodeNumber) {
        const { listMovie } = config.elements
        listMovie.innerHTML = "⏳ Загрузка..."
        config.elements.footPage.innerHTML = ''
        
        let searchQuery = seriesTitle
        if (isCyrillic(seriesTitle)) {
            searchQuery = transliterate(seriesTitle)
        }

        try {
            const params = buildEpisodeParams(searchQuery, seasonNumber, episodeNumber)
            const data = await fetchFromAPI(params)
            
            if (data.Response === "True") {
                state.allResults = [data]
                state.totalResults = 1
                state.currentPage = 1
                state.currentType = 'episode'
                state.searchQuery = `${seriesTitle} - S${seasonNumber}E${episodeNumber}`
                displayCurrentPage()
                return data
            } else {
                handleError(data.Error || "Эпизод не найден")
                return null
            }
        } catch (error) {
            handleError(error.message)
            return null
        }
    }

    // ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====
    async function searchRefined(title, type = null, year = null) {
        const { listMovie } = config.elements
        listMovie.innerHTML = "⏳ Загрузка..."
        config.elements.footPage.innerHTML = ''
        
        let searchQuery = title
        if (isCyrillic(title)) {
            searchQuery = transliterate(title)
        }
        
        if (searchQuery.length < config.search.minLength) {
            listMovie.innerHTML = `⚠️ Введите минимум ${config.search.minLength} символа`
            return null
        }

        try {
            const params = buildSearchParams(searchQuery, type, 1)
            if (year) params.set('y', year)
            
            const data = await fetchFromAPI(params)
            
            if (data.Response === "True") {
                state.allResults = data.Search || []
                state.totalResults = parseInt(data.totalResults) || 0
                state.currentPage = 1
                state.currentType = type
                state.searchQuery = title
                displayCurrentPage()
                return data
            } else {
                handleError(data.Error || "Ничего не найдено")
                return null
            }
        } catch (error) {
            handleError(error.message)
            return null
        }
    }

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    window.goToPage = goToPage
    window.searchRefined = searchRefined
    window.searchEpisodeByTitle = searchEpisodeByTitle
    window.quickEpisodeSearch = quickEpisodeSearch
    
    window.searchById = async function(imdbID) {
        await window.openMovieDetails(imdbID)
    }
    
    window.searchByYear = async function(title, year) {
        if (!year) {
            config.elements.listMovie.innerHTML = "⚠️ Пожалуйста, укажите год"
            return null
        }
        return await searchRefined(title, null, year)
    }
    
    window.transliterate = transliterate

    // Навешиваем обработчики
    config.elements.searchButton.addEventListener("click", queryToSearchFilm)
    config.elements.inputName.addEventListener("keypress", (e) => {
        if (e.key === "Enter") queryToSearchFilm()
    })
    
    config.elements.closeModal.addEventListener("click", closeModal)
    window.addEventListener("click", (e) => {
        if (e.target === config.elements.modal) {
            closeModal()
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal()
    })

    // Выводим справку
    console.log("===== ДОСТУПНЫЕ ФУНКЦИИ =====")
    console.log("📌 searchById(imdbID) - поиск по ID")
    console.log("📌 searchEpisodeByTitle(seriesTitle, season, episode) - поиск эпизода")
    console.log("📌 searchRefined(title, type, year) - уточненный поиск")
    console.log("📌 searchByYear(title, year) - поиск по году")
    console.log("📌 goToPage(page) - переход на страницу")
    console.log("📌 quickEpisodeSearch() - быстрый поиск эпизода из формы")
    console.log("==============================")
})