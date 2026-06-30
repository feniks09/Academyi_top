"use strict"

document.addEventListener("DOMContentLoaded", () => {
    const inputNameFilm = document.querySelector("#inputTitle")
    const inputTypeFilm = document.querySelector("#inputType")
    const listMovie = document.querySelector("#listMovie")
    const footPage = document.querySelector("#footPage")
    const button = document.querySelector("#searchButton")

    async function queryToSearchFilm() {   
        listMovie.innerHTML = "⏳ Загрузка..."
        let nameFilm = inputNameFilm.value.trim()
        let typeFilm = inputTypeFilm.value.trim()
        const baseURL = "https://api.poiskkino.dev/";
        const version = "v1.4/";
        
        if (!nameFilm) {
            listMovie.innerHTML = "⚠️ Введите название для поиска";
            return;
        }

        try {
            if (typeFilm === "movie") {
                await searchMovies(nameFilm, baseURL, version);
            } else if (typeFilm === "series") {
                await searchSeries(nameFilm, baseURL, version);
            } else if (typeFilm === "episode") {
                await searchEpisodes(nameFilm, baseURL, version);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            listMovie.innerHTML = "❌ Ошибка при выполнении запроса";
        }
    }

    // ═══════════════════════════════════════════════
    // 1️⃣ ПОИСК ФИЛЬМОВ
    // ═══════════════════════════════════════════════
    async function searchMovies(nameFilm, baseURL, version) {
        listMovie.innerHTML = "⏳ Поиск фильмов..."
        
        const params = new URLSearchParams({
            query: nameFilm,
            page: 1,
            limit: 10
        });

        const response = await fetch(
            `${baseURL}${version}movie/search?${params}`,
            {
                method: "GET",
                headers: { "X-API-KEY": "5AY8CN9-635M89B-QVNAJS0-9GB0MZG" }
            }
        );

        if (response.ok) {
            const data = await response.json();
            const movies = data.docs.filter(movie => movie.isSeries !== true);
            
            listMovie.innerHTML = `<h2>🎬 Фильмы (${movies.length})</h2>`;
            
            if (movies.length === 0) {
                listMovie.innerHTML += "<p>😕 Фильмов не найдено</p>";
            } else {
                movies.forEach((movie, i) => {
                    let name = movie.name || movie.alternativeName || "название неизвестно";
                    let year = movie.year ? ` (${movie.year})` : "";
                    let rating = movie.rating?.kp ? `⭐ ${movie.rating.kp.toFixed(1)}` : "";
                    let genres = movie.genres?.map(g => g.name).join(", ") || "";
                    
                    listMovie.innerHTML += `
                        <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #007bff;">
                            <strong>${i + 1}. ${name}</strong>${year}
                            ${rating ? ` ${rating}` : ""}
                            ${genres ? `<br><span style="color: #666; font-size: 14px;">${genres}</span>` : ""}
                        </div>
                    `;
                });
            }
            
            footPage.innerHTML = `<p>Найдено фильмов: ${movies.length} из ${data.total || 0}</p>`;
        } else {
            listMovie.innerHTML = `❌ Ошибка ${response.status}`;
        }
    }

    // ═══════════════════════════════════════════════
    // 2️⃣ ПОИСК СЕРИАЛОВ (БЕЗ КНОПКИ ПОКАЗАТЬ ЭПИЗОДЫ)
    // ═══════════════════════════════════════════════
    async function searchSeries(nameFilm, baseURL, version) {
        listMovie.innerHTML = "⏳ Поиск сериалов..."
        
        const params = new URLSearchParams({
            query: nameFilm,
            page: 1,
            limit: 10
        });

        const response = await fetch(
            `${baseURL}${version}movie/search?${params}`,
            {
                method: "GET",
                headers: { "X-API-KEY": "5AY8CN9-635M89B-QVNAJS0-9GB0MZG" }
            }
        );

        if (response.ok) {
            const data = await response.json();
            const series = data.docs.filter(movie => movie.isSeries === true);
            
            listMovie.innerHTML = `<h2>📺 Сериалы (${series.length})</h2>`;
            
            if (series.length === 0) {
                listMovie.innerHTML += "<p>😕 Сериалов не найдено</p>";
            } else {
                series.forEach((movie, i) => {
                    let name = movie.name || movie.alternativeName || "название неизвестно";
                    let year = movie.year ? ` (${movie.year})` : "";
                    let rating = movie.rating?.kp ? `⭐ ${movie.rating.kp.toFixed(1)}` : "";
                    let seasons = movie.seasonsInfo?.length || "?";
                    let genres = movie.genres?.map(g => g.name).join(", ") || "";
                    
                    // ⚠️ УБРАЛИ КНОПКУ "Показать эпизоды"
                    listMovie.innerHTML += `
                        <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #28a745;">
                            <strong>${i + 1}. ${name}</strong>${year}
                            ${rating ? ` ${rating}` : ""}
                            <span style="color: #28a745;"> 📺 ${seasons} сезонов</span>
                            ${genres ? `<br><span style="color: #666; font-size: 14px;">${genres}</span>` : ""}
                        </div>
                    `;
                });
            }
            
            footPage.innerHTML = `<p>Найдено сериалов: ${series.length} из ${data.total || 0}</p>`;
        } else {
            listMovie.innerHTML = `❌ Ошибка ${response.status}`;
        }
    }

    // ═══════════════════════════════════════════════
    // 3️⃣ ПОИСК ЭПИЗОДОВ (ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ)
    // ═══════════════════════════════════════════════
  async function searchEpisodes(nameFilm, baseURL, version) {
    listMovie.innerHTML = "⏳ Поиск эпизодов..."
    
    const params = new URLSearchParams({
        query: nameFilm,
        page: 1,
        limit: 10
    });

    const response = await fetch(
        `${baseURL}${version}movie/search?${params}`,
        {
            method: "GET",
            headers: { "X-API-KEY": "5AY8CN9-635M89B-QVNAJS0-9GB0MZG" }
        }
    );

    if (!response.ok) {
        listMovie.innerHTML = `❌ Ошибка ${response.status}`;
        return;
    }

    const data = await response.json();
    const series = data.docs.filter(movie => movie.isSeries === true);
    
    if (series.length === 0) {
        listMovie.innerHTML = "<p>😕 Сериалов с таким названием не найдено</p>";
        return;
    }

    listMovie.innerHTML = `<h2>🔍 Все эпизоды сериала: "${nameFilm}"</h2>`;
    let totalEpisodes = 0;

    // Показываем ВСЕ эпизоды для КАЖДОГО найденного сериала
    for (let i = 0; i < Math.min(series.length, 3); i++) {
        const movie = series[i];
        let seriesName = movie.name || movie.alternativeName || "название неизвестно";
        let year = movie.year ? ` (${movie.year})` : "";
        let country = movie.countries?.[0]?.name || "";
        
        listMovie.innerHTML += `
            <div style="padding: 10px; margin: 10px 0; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #ffc107;">
                <h3>📺 ${i + 1}. ${seriesName}${year} ${country ? `(${country})` : ""}</h3>
                <div id="episodes-result-${movie.id}">⏳ Загрузка эпизодов...</div>
            </div>
        `;

        // Загружаем ВСЕ эпизоды (БЕЗ фильтрации по названию)
        const count = await loadAllEpisodes(movie.id, baseURL, version);
        totalEpisodes += count;
    }

    footPage.innerHTML = `<p>Всего эпизодов: ${totalEpisodes}</p>`;
}

// ⭐ НОВАЯ ФУНКЦИЯ: загружает ВСЕ эпизоды (без фильтрации)
async function loadAllEpisodes(movieId, baseURL, version) {
    const container = document.querySelector(`#episodes-result-${movieId}`);
    
    if (!container) {
        console.error(`Контейнер не найден для ${movieId}`);
        return 0;
    }
    
    const params = new URLSearchParams({
        movieId: movieId
    });

    try {
        const response = await fetch(
            `${baseURL}${version}season?${params}`,
            {
                method: "GET",
                headers: { "X-API-KEY": "5AY8CN9-635M89B-QVNAJS0-9GB0MZG" }
            }
        );

        if (!response.ok) {
            container.innerHTML = `❌ Ошибка: ${response.status}`;
            return 0;
        }

        const data = await response.json();
        const seasons = data.docs || [];
        
        if (seasons.length === 0) {
            container.innerHTML = "<p>😕 Нет информации о сезонах</p>";
            return 0;
        }

        let totalEpisodes = 0;
        let html = `<div style="max-height: 400px; overflow-y: auto; padding: 5px;">`;
        
        // Сортируем сезоны по номеру
        seasons.sort((a, b) => (a.number || 0) - (b.number || 0));
        
        seasons.forEach(season => {
            if (season.episodes && Array.isArray(season.episodes)) {
                totalEpisodes += season.episodes.length;
                
                html += `<div style="margin: 8px 0; padding: 8px; background: #e9ecef; border-radius: 5px;">`;
                html += `<strong>📺 Сезон ${season.number || "?"}</strong> (${season.episodes.length} эп.)`;
                html += `<ul style="margin: 5px 0; padding-left: 20px; list-style: none; max-height: 200px; overflow-y: auto;">`;
                
                season.episodes.forEach(ep => {
                    let epName = ep.name || ep.enName || `Эпизод ${ep.number}`;
                    let epDate = ep.airDate || ep.releaseDate || "";
                    let dateFormatted = epDate ? new Date(epDate).toLocaleDateString() : "";
                    
                    html += `<li style="padding: 2px 0; border-bottom: 1px solid #ddd; font-size: 14px;">
                        ${ep.number}. <strong>${epName}</strong>
                        ${dateFormatted ? `(${dateFormatted})` : ""}
                    </li>`;
                });
                
                html += `</ul></div>`;
            }
        });
        
        html += `</div>`;
        container.innerHTML = html;
        
        return totalEpisodes;
        
    } catch (error) {
        console.error("Ошибка загрузки эпизодов:", error);
        container.innerHTML = `❌ Ошибка загрузки: ${error.message}`;
        return 0;
    }
}

    // ═══════════════════════════════════════════════
    // ЗАПУСК
    // ═══════════════════════════════════════════════
    button.addEventListener("click", queryToSearchFilm);
});
