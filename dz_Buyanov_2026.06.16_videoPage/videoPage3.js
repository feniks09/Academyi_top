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
            minLength: 3,
            itemsPerPage: 10
        },
        
        // Настройки отображения карточек
        display: {
            cardWidth: 160,      // Минимальная ширина карточки
            cardGap: 15,         // Отступ между карточками
            posterHeight: 220    // Высота постера
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
            : 'https://via.placeholder.com/300x450/444/888?text=No+Poster'
        
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
            <div class="movies-grid" style="grid-template-columns: repeat(auto-fill, minmax(${config.display.cardWidth}px, 1fr)); gap: ${config.display.cardGap}px;">
                ${pageItems.map((movie, index) => formatMovieCard(movie, index)).join('')}
            </div>
        `
        
        footPage.innerHTML = createPagination(state.totalResults)
    }

    // ===== ОСТАЛЬНЫЕ ФУНКЦИИ (без изменений) =====
    // ... (остальной код из предыдущей версии)
    
    // Функция для динамического изменения размера карточек
    window.setCardSize = function(width, gap, height) {
        if (width) config.display.cardWidth = width
        if (gap) config.display.cardGap = gap
        if (height) config.display.posterHeight = height
        
        // Обновляем стили динамически
        const style = document.createElement('style')
        style.textContent = `
            .movies-grid {
                grid-template-columns: repeat(auto-fill, minmax(${config.display.cardWidth}px, 1fr)) !important;
                gap: ${config.display.cardGap}px !important;
            }
            .movie-card img {
                height: ${config.display.posterHeight}px !important;
            }
        `
        document.head.appendChild(style)
        
        // Перерисовываем текущую страницу
        if (state.allResults.length > 0) {
            displayCurrentPage()
        }
        
        console.log(`✅ Размер карточек обновлен: ширина=${config.display.cardWidth}px, отступ=${config.display.cardGap}px, высота постера=${config.display.posterHeight}px`)
    }

    // ... (остальной код)
})

// Добавляем быструю функцию в глобальный объект для изменения размера из консоли
window.setCardSize = function(width, gap, height) {
    // Эта функция будет переопределена в событии DOMContentLoaded
    console.log('⏳ Подождите загрузки страницы...')
}