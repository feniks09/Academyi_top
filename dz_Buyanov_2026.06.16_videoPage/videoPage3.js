"use strict";

document.addEventListener("DOMContentLoaded", function() {
    elements = {
        inputTitle: document.querySelector("#inputTitle"),
        inputType: document.querySelector("#inputType"),
        searchButton: document.querySelector("#searchButton"),
        listMovie: document.querySelector("#listMovie"),
        footPage: document.querySelector("#footPage"),
        overlay: document.querySelector("#overlay"),
        modalBody: document.querySelector("#modalBody")
    };

    if (elements.inputTitle) {
        elements.inputTitle.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                searchMovies();
            }
        });
    }

    if (elements.searchButton) {
        elements.searchButton.addEventListener("click", searchMovies);
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeOverlay();
        }
    });
});

const API_KEY = "5AY8CN9-635M89B-QVNAJS0-9GB0MZG";
const BASE_URL = "https://api.poiskkino.dev/";
const VERSION = "v1.4/";
const LIMIT = 10;
const EPISODE_LIMIT = 10;

let state = {
    currentPage: 1,
    totalPages: 1,
    currentQuery: "",
    currentType: "",
    episodeAllFound: [],
    episodeCurrentPage: 1,
    episodeTotalPages: 1
};

let elements = {};

function parseEpisodeQuery(query) {
    const patterns = [
        /s(\d+)\s*e(\d+)/i,
        /(\d+)\s*x\s*(\d+)/i,
        /сезон\s*(\d+)\s*(?:серия|эпизод)\s*(\d+)/i,
        /(\d+)\s*сезон\s*(\d+)\s*(?:серия|эпизод)/i,
        /season\s*(\d+)\s*(?:episode|ep)\s*(\d+)/i,
        /(?:episode|ep)\s*(\d+)\s*season\s*(\d+)/i
    ];

    for (const pattern of patterns) {
        const match = query.match(pattern);
        if (match) {
            let season, episode;

            if (pattern.toString().includes("season") && pattern.toString().includes("episode")) {
                if (match[1].length < 3) {
                    season = parseInt(match[1]);
                    episode = parseInt(match[2]);
                } else {
                    season = parseInt(match[2]);
                    episode = parseInt(match[1]);
                }
            } else {
                season = parseInt(match[1]);
                episode = parseInt(match[2]);
            }

            let cleanTitle = query.replace(match[0], "").trim();
            cleanTitle = cleanTitle.replace(/^(сериал|series|эпизод|episode)\s*/i, "").trim();

            return {
                title: cleanTitle || query,
                season: season,
                episode: episode,
                hasEpisode: true
            };
        }
    }

    return {
        title: query,
        season: null,
        episode: null,
        hasEpisode: false
    };
}

async function searchMovies() {
    const query = elements.inputTitle?.value?.trim() || "";
    const type = elements.inputType?.value || "movie";

    state.currentQuery = query;
    state.currentType = type;
    state.currentPage = 1;
    state.episodeAllFound = [];
    state.episodeCurrentPage = 1;

    if (elements.overlay) elements.overlay.style.display = "none";

    if (!query) {
        if (elements.listMovie) elements.listMovie.innerHTML = "⚠️ Введите название для поиска";
        if (elements.footPage) elements.footPage.innerHTML = "";
        return;
    }

    if (type === "episode") {
        await searchEpisodes(query, 1);
    } else {
        await searchMoviesByType(query, type, 1);
    }
}

async function searchMoviesByType(query, type, page) {
    if (elements.listMovie) elements.listMovie.innerHTML = "⏳ Загрузка...";
    if (elements.overlay) elements.overlay.style.display = "none";

    const params = new URLSearchParams({
        query: query,
        page: page,
        limit: LIMIT
    });

    try {
        const response = await fetch(`${BASE_URL}${VERSION}movie/search?${params}`, {
            method: "GET",
            headers: { "X-API-KEY": API_KEY }
        });

        if (!response.ok) {
            if (elements.listMovie) elements.listMovie.innerHTML = `❌ Ошибка ${response.status}`;
            return;
        }

        const data = await response.json();
        let movies = data.docs || [];

        if (type === "movie") {
            movies = movies.filter(movie => !movie.isSeries);
        } else if (type === "series") {
            movies = movies.filter(movie => movie.isSeries);
        }

        state.totalPages = data.pages || 1;
        state.currentPage = data.page || 1;

        if (elements.listMovie) {
            elements.listMovie.innerHTML = `<h2>🎬 Результаты поиска (${data.total || 0})</h2>`;

            if (movies.length === 0) {
                elements.listMovie.innerHTML += `<div class="not-found"><div class="icon">😕</div><div class="title">Movie not found!</div></div>`;
            } else {
                const grid = document.createElement("div");
                grid.className = "movies-grid";

                movies.forEach((movie, index) => {
                    const number = (page - 1) * LIMIT + index + 1;
                    const name = movie.name || movie.alternativeName || "название неизвестно";
                    const year = movie.year || "";
                    const rating = movie.rating?.kp ? `⭐ ${movie.rating.kp.toFixed(1)}` : "";
                    const icon = movie.isSeries ? "📺" : "🎬";
                    const poster = movie.poster?.previewUrl || movie.poster?.url || "";

                    const card = document.createElement("div");
                    card.className = `movie-card ${movie.isSeries ? "series" : "movie"}`;
                    card.onclick = () => showDetails(movie.id);

                    if (poster) {
                        card.innerHTML = `
                            <img class="poster" src="${poster}" alt="${name}">
                            <div class="info">
                                <div class="title">${number}. ${name}</div>
                                <div class="meta">
                                    <span>${year} ${icon}</span>
                                    <span>${rating}</span>
                                </div>
                                <div class="details-link">📋 Детали</div>
                            </div>
                        `;
                    } else {
                        card.innerHTML = `
                            <div class="no-poster">Нет постера</div>
                            <div class="info">
                                <div class="title">${number}. ${name}</div>
                                <div class="meta">
                                    <span>${year} ${icon}</span>
                                    <span>${rating}</span>
                                </div>
                                <div class="details-link">📋 Детали</div>
                            </div>
                        `;
                    }

                    grid.appendChild(card);
                });

                elements.listMovie.appendChild(grid);
            }
        }

        renderPagination(data.page, data.pages, type);
    } catch (error) {
        console.error(error);
        if (elements.listMovie) elements.listMovie.innerHTML = "❌ Ошибка при выполнении запроса";
    }
}

async function searchEpisodes(query, page) {
    if (elements.listMovie) elements.listMovie.innerHTML = "⏳ Поиск эпизодов...";
    if (elements.overlay) elements.overlay.style.display = "none";

    const parsed = parseEpisodeQuery(query);

    let series = await findSeries(parsed.title);

    if (series.length === 0) {
        series = await findSeries(query);
    }

    if (series.length === 0) {
        if (elements.listMovie) {
            elements.listMovie.innerHTML = `
                <div class="not-found">
                    <div class="icon">😕</div>
                    <div class="title">Сериал не найден</div>
                    <div class="hint">Попробуйте уточнить запрос</div>
                </div>
            `;
        }
        if (elements.footPage) elements.footPage.innerHTML = "";
        return;
    }

    if (page === 1 || state.episodeAllFound.length === 0) {
        state.episodeAllFound = [];
        await collectEpisodes(series, parsed, query);
    }

    state.episodeTotalPages = Math.ceil(state.episodeAllFound.length / EPISODE_LIMIT);
    state.episodeCurrentPage = page;

    const start = (page - 1) * EPISODE_LIMIT;
    const end = Math.min(start + EPISODE_LIMIT, state.episodeAllFound.length);
    const pageEpisodes = state.episodeAllFound.slice(start, end);

    if (elements.listMovie) {
        elements.listMovie.innerHTML = `<h2>🔍 Поиск эпизодов: "${query}" (${state.episodeAllFound.length})</h2>`;

        if (pageEpisodes.length === 0) {
            elements.listMovie.innerHTML += `
                <div class="episode-not-found">
                    <div class="title">😕 Эпизодов не найдено</div>
                    <div class="hint">Попробуйте изменить запрос</div>
                    <div class="examples">Примеры: "Друзья S1E1", "Друзья 1 сезон 1 серия"</div>
                </div>
            `;
        } else {
            const grid = document.createElement("div");
            grid.className = "episodes-grid";

            pageEpisodes.forEach((ep, index) => {
                const number = (page - 1) * EPISODE_LIMIT + index + 1;
                const date = ep.date ? new Date(ep.date).toLocaleDateString() : "";

                const card = document.createElement("div");
                card.className = "episode-card";
                card.onclick = () => showDetails(ep.id);

                card.innerHTML = `
                    <div class="series-name">${number}. ${ep.seriesName} ${ep.year || ""} ${ep.country ? `(${ep.country})` : ""}</div>
                    <div class="season-ep">
                        <span class="badge">📺 Сезон ${ep.season}, эпизод ${ep.episode}</span>
                        ${date ? `<span class="date">${date}</span>` : ""}
                    </div>
                    <div class="ep-name">${ep.name}</div>
                    ${ep.description ? `<div class="description">${ep.description}</div>` : ""}
                    <div class="details-link">📋 Детали</div>
                `;

                grid.appendChild(card);
            });

            elements.listMovie.appendChild(grid);
        }

        renderEpisodePagination(page, state.episodeTotalPages);
    }
}

async function findSeries(title) {
    const params = new URLSearchParams({ query: title, page: 1, limit: 10 });
    const response = await fetch(`${BASE_URL}${VERSION}movie/search?${params}`, {
        method: "GET",
        headers: { "X-API-KEY": API_KEY }
    });

    if (!response.ok) return [];

    const data = await response.json();
    return (data.docs || []).filter(movie => movie.isSeries);
}

async function collectEpisodes(series, parsed, query) {
    for (let i = 0; i < Math.min(series.length, 3); i++) {
        const movie = series[i];
        const seriesName = movie.name || movie.alternativeName || "название неизвестно";
        const year = movie.year ? ` (${movie.year})` : "";
        const country = movie.countries?.[0]?.name || "";

        const params = new URLSearchParams({ movieId: movie.id });
        const response = await fetch(`${BASE_URL}${VERSION}season?${params}`, {
            method: "GET",
            headers: { "X-API-KEY": API_KEY }
        });

        if (!response.ok) continue;

        const data = await response.json();
        const seasons = data.docs || [];

        if (parsed.hasEpisode && parsed.season && parsed.episode) {
            const targetSeason = seasons.find(s => s.number === parsed.season);
            if (targetSeason?.episodes) {
                const targetEpisode = targetSeason.episodes.find(e => e.number === parsed.episode);
                if (targetEpisode) {
                    state.episodeAllFound.push({
                        seriesName,
                        year,
                        country,
                        season: parsed.season,
                        episode: parsed.episode,
                        name: targetEpisode.name || targetEpisode.enName || `Эпизод ${parsed.episode}`,
                        description: targetEpisode.description || targetEpisode.plot || "",
                        date: targetEpisode.airDate || targetEpisode.releaseDate || "",
                        id: movie.id
                    });
                }
            }
        } else {
            let searchText = query.toLowerCase();
            searchText = searchText.replace(/эпизод с|эпизод|серия с/g, "").trim();

            seasons.forEach(season => {
                if (season.episodes && Array.isArray(season.episodes)) {
                    season.episodes.forEach(ep => {
                        const epName = (ep.name || ep.enName || "").toLowerCase();
                        const epDesc = (ep.description || ep.plot || "").toLowerCase();

                        if (epName.includes(searchText) || epDesc.includes(searchText)) {
                            state.episodeAllFound.push({
                                seriesName,
                                year,
                                country,
                                season: season.number,
                                episode: ep.number,
                                name: ep.name || ep.enName || `Эпизод ${ep.number}`,
                                description: ep.description || ep.plot || "",
                                date: ep.airDate || ep.releaseDate || "",
                                id: movie.id
                            });
                        }
                    });
                }
            });
        }
    }
}

function renderPagination(current, total, type) {
    if (!elements.footPage) return;

    if (total <= 1) {
        elements.footPage.innerHTML = '<p style="text-align:center;color:#666;">Страница 1 из 1</p>';
        return;
    }

    let html = '<div class="pagination">';

    if (current > 1) {
        html += `<button onclick="goToPage(${current - 1})">⬅ Назад</button>`;
    }

    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);

    if (start > 1) {
        html += `<button class="page-num" onclick="goToPage(1)">1</button>`;
        if (start > 2) html += '<span class="dots">...</span>';
    }

    for (let i = start; i <= end; i++) {
        if (i === current) {
            html += `<span class="page-current">${i}</span>`;
        } else {
            html += `<button class="page-num" onclick="goToPage(${i})">${i}</button>`;
        }
    }

    if (end < total) {
        if (end < total - 1) html += '<span class="dots">...</span>';
        html += `<button class="page-num" onclick="goToPage(${total})">${total}</button>`;
    }

    if (current < total) {
        html += `<button onclick="goToPage(${current + 1})">Вперед ➡</button>`;
    }

    html += `<div class="info">Страница ${current} из ${total}</div></div>`;
    elements.footPage.innerHTML = html;
}

function renderEpisodePagination(current, total) {
    if (!elements.footPage) return;

    if (total <= 1) {
        elements.footPage.innerHTML = '<p style="text-align:center;color:#666;">Страница 1 из 1</p>';
        return;
    }

    let html = '<div class="pagination">';

    if (current > 1) {
        html += `<button onclick="goToEpisodePage(${current - 1})">⬅ Назад</button>`;
    }

    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);

    if (start > 1) {
        html += `<button class="page-num" onclick="goToEpisodePage(1)">1</button>`;
        if (start > 2) html += '<span class="dots">...</span>';
    }

    for (let i = start; i <= end; i++) {
        if (i === current) {
            html += `<span class="page-current">${i}</span>`;
        } else {
            html += `<button class="page-num" onclick="goToEpisodePage(${i})">${i}</button>`;
        }
    }

    if (end < total) {
        if (end < total - 1) html += '<span class="dots">...</span>';
        html += `<button class="page-num" onclick="goToEpisodePage(${total})">${total}</button>`;
    }

    if (current < total) {
        html += `<button onclick="goToEpisodePage(${current + 1})">Вперед ➡</button>`;
    }

    html += `<div class="info">Страница ${current} из ${total}</div></div>`;
    elements.footPage.innerHTML = html;
}

async function showDetails(movieId) {
    if (!elements.overlay || !elements.modalBody) return;

    elements.overlay.style.display = "flex";
    elements.modalBody.innerHTML = "⏳ Загрузка информации...";

    try {
        const response = await fetch(`${BASE_URL}${VERSION}movie/${movieId}`, {
            method: "GET",
            headers: { "X-API-KEY": API_KEY }
        });

        if (!response.ok) {
            elements.modalBody.innerHTML = `❌ Ошибка ${response.status}`;
            return;
        }

        const movie = await response.json();
        const poster = movie.poster?.url || movie.poster?.previewUrl || "";

        elements.modalBody.innerHTML = `
            <div class="modal-container">
                <div class="modal-flex">
                    ${poster ? `
                        <div class="modal-poster">
                            <img src="${poster}" alt="${movie.name || "Постер"}">
                        </div>
                    ` : `
                        <div class="modal-poster">
                            <div class="no-poster">Нет постера</div>
                        </div>
                    `}
                    <div class="modal-info">
                        <div class="title">${movie.name || movie.alternativeName || "N/A"}</div>
                        ${movie.alternativeName && movie.alternativeName !== movie.name ? `<div class="alt-title">${movie.alternativeName}</div>` : ""}

                        <div class="badges">
                            ${movie.year ? `<span class="badge blue">📅 ${movie.year}</span>` : ""}
                            ${movie.isSeries !== undefined ? `<span class="badge ${movie.isSeries ? "green" : "blue"}">${movie.isSeries ? "📺 Сериал" : "🎬 Фильм"}</span>` : ""}
                            ${movie.rating?.kp ? `<span class="badge gold">⭐ ${movie.rating.kp.toFixed(1)}</span>` : ""}
                            ${movie.rating?.imdb ? `<span class="badge gray">IMDb: ${movie.rating.imdb.toFixed(1)}</span>` : ""}
                            ${movie.ageRating ? `<span class="badge red">🔞 ${movie.ageRating}+</span>` : ""}
                            ${movie.movieLength ? `<span class="badge teal">⏱ ${movie.movieLength} мин</span>` : ""}
                        </div>

                        ${movie.genres?.length ? `<p><strong>Жанры:</strong> ${movie.genres.map(g => g.name).join(", ")}</p>` : ""}
                        ${movie.countries?.length ? `<p><strong>Страны:</strong> ${movie.countries.map(c => c.name).join(", ")}</p>` : ""}
                        ${movie.description ? `<p><strong>Описание:</strong> ${movie.description}</p>` : ""}
                        ${movie.shortDescription ? `<p><strong>Кратко:</strong> ${movie.shortDescription}</p>` : ""}
                        ${movie.slogan ? `<p><strong>Слоган:</strong> "${movie.slogan}"</p>` : ""}
                        ${movie.votes?.kp ? `<p><strong>Голосов KP:</strong> ${movie.votes.kp.toLocaleString()}</p>` : ""}
                        ${movie.votes?.imdb ? `<p><strong>Голосов IMDb:</strong> ${movie.votes.imdb.toLocaleString()}</p>` : ""}
                        ${movie.status ? `<p><strong>Статус:</strong> ${movie.status}</p>` : ""}
                        ${movie.top250 ? `<p><strong>🏆 Топ-250:</strong> #${movie.top250}</p>` : ""}
                        ${movie.top10 ? `<p><strong>🏆 Топ-10:</strong> #${movie.top10}</p>` : ""}
                        ${movie.ticketsOnSale ? `<p><strong>🎫 Билеты в продаже</strong></p>` : ""}
                        ${movie.premiere?.world ? `<p><strong>Премьера в мире:</strong> ${new Date(movie.premiere.world).toLocaleDateString()}</p>` : ""}
                        ${movie.premiere?.russia ? `<p><strong>Премьера в России:</strong> ${new Date(movie.premiere.russia).toLocaleDateString()}</p>` : ""}
                        ${movie.budget?.value ? `<p><strong>Бюджет:</strong> ${movie.budget.value.toLocaleString()} ${movie.budget.currency || ""}</p>` : ""}
                        ${movie.fees?.world?.value ? `<p><strong>Сборы в мире:</strong> ${movie.fees.world.value.toLocaleString()} ${movie.fees.world.currency || ""}</p>` : ""}

                        ${movie.persons?.length ? `
                            <p><strong>Актеры:</strong></p>
                            <div class="persons">
                                ${movie.persons.slice(0, 12).map(p => `
                                    <span class="person-tag">${p.name || p.enName || "Без имени"}${p.profession ? `(${p.profession})` : ""}</span>
                                `).join("")}
                                ${movie.persons.length > 12 ? `<span style="color:#666;font-size:12px;">+ еще ${movie.persons.length - 12}</span>` : ""}
                            </div>
                        ` : ""}

                        ${movie.watchability?.items?.length ? `<p><strong>Смотреть на:</strong> ${movie.watchability.items.map(w => w.name).join(", ")}</p>` : ""}
                        ${movie.networks?.items?.length ? `<p><strong>Сети:</strong> ${movie.networks.items.map(n => n.name).join(", ")}</p>` : ""}
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        elements.modalBody.innerHTML = "❌ Ошибка при загрузке информации";
    }
}

function closeOverlay() {
    if (elements.overlay) elements.overlay.style.display = "none";
}

window.goToPage = function(page) {
    if (elements.overlay) elements.overlay.style.display = "none";
    searchMoviesByType(state.currentQuery, state.currentType, page);
};

window.goToEpisodePage = function(page) {
    if (elements.overlay) elements.overlay.style.display = "none";
    searchEpisodes(state.currentQuery, page);
};

window.showDetails = showDetails;
window.closeOverlay = closeOverlay;