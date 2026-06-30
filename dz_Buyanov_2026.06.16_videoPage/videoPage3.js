"use strict"

const API_KEY = "5AY8CN9-635M89B-QVNAJS0-9GB0MZG";
const BASE_URL = "https://api.poiskkino.dev/";
const VERSION = "v1.4/";

let currentPage = 1;
let totalPages = 1;
let currentQuery = "";
let currentType = "";
const LIMIT = 10;

let episodeCurrentPage = 1;
let episodeTotalPages = 1;
let episodeAllFound = [];
const EPISODE_LIMIT = 10;

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
            if (pattern.toString().includes('season') && pattern.toString().includes('episode')) {
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
            
            let cleanTitle = query.replace(match[0], '').trim();
            cleanTitle = cleanTitle.replace(/^(сериал|series|эпизод|episode)\s*/i, '').trim();
            
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
    const titleInput = document.querySelector("#inputTitle");
    const typeSelect = document.querySelector("#inputType");
    const listMovie = document.querySelector("#listMovie");
    const footPage = document.querySelector("#footPage");
    const overlay = document.querySelector("#overlay");
    
    if (overlay) overlay.style.display = "none";
    
    const query = titleInput?.value?.trim() || "";
    const type = typeSelect?.value || "movie";
    
    currentQuery = query;
    currentType = type;
    currentPage = 1;
    episodeCurrentPage = 1;
    episodeAllFound = [];
    
    if (!query) {
        if (listMovie) listMovie.innerHTML = "⚠️ Введите название для поиска";
        if (footPage) footPage.innerHTML = "";
        return;
    }
    
    if (type === "episode") {
        await searchEpisodesAdvanced(query, 1);
    } else {
        await fetchMovies(query, type, 1);
    }
}

async function fetchMovies(query, type, page) {
    const listMovie = document.querySelector("#listMovie");
    const footPage = document.querySelector("#footPage");
    const overlay = document.querySelector("#overlay");
    
    if (listMovie) listMovie.innerHTML = "⏳ Загрузка...";
    if (overlay) overlay.style.display = "none";
    
    const params = new URLSearchParams({
        query: query,
        page: page,
        limit: LIMIT
    });
    
    try {
        const response = await fetch(
            `${BASE_URL}${VERSION}movie/search?${params}`,
            {
                method: "GET",
                headers: { "X-API-KEY": API_KEY }
            }
        );
        
        if (!response.ok) {
            if (listMovie) listMovie.innerHTML = `❌ Ошибка ${response.status}`;
            return;
        }
        
        const data = await response.json();
        
        let filteredDocs = data.docs || [];
        if (type === "movie") {
            filteredDocs = filteredDocs.filter(movie => movie.isSeries !== true);
        } else if (type === "series") {
            filteredDocs = filteredDocs.filter(movie => movie.isSeries === true);
        }
        
        totalPages = data.pages || 1;
        currentPage = data.page || 1;
        
        if (listMovie) {
            const totalFound = data.total || 0;
            listMovie.innerHTML = `<h2>🎬 Результаты поиска (${totalFound})</h2>`;
            
            if (filteredDocs.length === 0) {
                const notFoundTemplate = document.querySelector("#notFoundTemplate");
                if (notFoundTemplate) {
                    listMovie.appendChild(notFoundTemplate.content.cloneNode(true));
                } else {
                    listMovie.innerHTML += "<p>😕 Movie not found!</p>";
                }
            } else {
                const template = document.querySelector("#movieCardTemplate");
                
                filteredDocs.forEach((movie, i) => {
                    const globalNumber = (page - 1) * LIMIT + (i + 1);
                    
                    let name = movie.name || movie.alternativeName || "название неизвестно";
                    let year = movie.year ? ` (${movie.year})` : "";
                    let rating = movie.rating?.kp ? `⭐ ${movie.rating.kp.toFixed(1)}` : "";
                    let typeIcon = movie.isSeries ? "📺" : "🎬";
                    let typeName = movie.isSeries ? "Сериал" : "Фильм";
                    let genres = movie.genres?.map(g => g.name).join(", ") || "";
                    
                    let posterUrl = movie.poster?.previewUrl || movie.poster?.url || '';
                    
                    let card;
                    if (template) {
                        card = template.content.cloneNode(true);
                    } else {
                        card = document.createElement('div');
                        card.style.cssText = 'display:flex; align-items:center; padding:10px; margin:5px 0; background:#f8f9fa; border-radius:5px; cursor:pointer; transition:all 0.2s;';
                    }
                    
                    const cardDiv = card.querySelector('.movie-card') || card;
                    cardDiv.setAttribute('data-movie-id', movie.id);
                    cardDiv.onclick = () => showDetails(movie.id);
                    cardDiv.onmouseover = function() { this.style.background='#e9ecef'; this.style.transform='scale(1.005)'; };
                    cardDiv.onmouseout = function() { this.style.background='#f8f9fa'; this.style.transform='scale(1)'; };
                    
                    if (posterUrl) {
                        const posterDiv = card.querySelector('.movie-poster') || cardDiv.querySelector(':scope > div:first-child');
                        if (posterDiv) {
                            posterDiv.innerHTML = `<img src="${posterUrl}" alt="${name}" style="width:50px; height:70px; object-fit:cover; border-radius:5px;">`;
                        }
                    } else {
                        const posterDiv = card.querySelector('.movie-poster') || cardDiv.querySelector(':scope > div:first-child');
                        if (posterDiv) {
                            posterDiv.innerHTML = `<div style="width:50px; height:70px; background:#ddd; border-radius:5px; display:flex; align-items:center; justify-content:center; font-size:12px; color:#666;">Нет постера</div>`;
                        }
                    }
                    
                    const titleEl = card.querySelector('.movie-title');
                    if (titleEl) titleEl.textContent = `${globalNumber}. ${name}`;
                    
                    const yearEl = card.querySelector('.movie-year');
                    if (yearEl) yearEl.textContent = year;
                    
                    const ratingEl = card.querySelector('.movie-rating');
                    if (ratingEl) ratingEl.textContent = rating ? ` ${rating}` : '';
                    
                    const typeEl = card.querySelector('.movie-type');
                    if (typeEl) typeEl.textContent = `${typeIcon} ${typeName}`;
                    
                    const genresEl = card.querySelector('.movie-genres');
                    if (genresEl) genresEl.textContent = genres;
                    
                    const infoDiv = card.querySelector('.movie-info') || cardDiv.querySelector(':scope > div:nth-child(2)');
                    if (!infoDiv) {
                        const existingInfo = cardDiv.querySelector('div[style*="flex:1"]');
                        if (existingInfo) {
                            if (!existingInfo.querySelector('.movie-title')) {
                                existingInfo.innerHTML = `
                                    <strong class="movie-title">${globalNumber}. ${name}</strong>
                                    <span class="movie-year">${year}</span>
                                    <span class="movie-rating">${rating ? ` ${rating}` : ''}</span>
                                    <span class="movie-type" style="color:#666; font-size:14px; margin-left:10px;">${typeIcon} ${typeName}</span>
                                    ${genres ? `<div class="movie-genres" style="color:#666; font-size:13px;">${genres}</div>` : ''}
                                `;
                            }
                        }
                    }
                    
                    listMovie.appendChild(cardDiv);
                });
            }
        }
        
        renderPagination(data.page, totalPages, type);
        
    } catch (error) {
        console.error("Ошибка запроса:", error);
        if (listMovie) listMovie.innerHTML = "❌ Ошибка при выполнении запроса";
    }
}

async function searchEpisodesAdvanced(query, page) {
    const listMovie = document.querySelector("#listMovie");
    const footPage = document.querySelector("#footPage");
    const overlay = document.querySelector("#overlay");
    
    if (listMovie) listMovie.innerHTML = "⏳ Поиск эпизодов...";
    if (overlay) overlay.style.display = "none";
    
    const parsed = parseEpisodeQuery(query);
    
    const searchParams = new URLSearchParams({
        query: parsed.title,
        page: 1,
        limit: 10
    });
    
    try {
        const searchResponse = await fetch(
            `${BASE_URL}${VERSION}movie/search?${searchParams}`,
            {
                method: "GET",
                headers: { "X-API-KEY": API_KEY }
            }
        );
        
        if (!searchResponse.ok) {
            if (listMovie) listMovie.innerHTML = `❌ Ошибка ${searchResponse.status}`;
            return;
        }
        
        const searchData = await searchResponse.json();
        let series = (searchData.docs || []).filter(movie => movie.isSeries === true);
        
        if (series.length === 0) {
            const searchParams2 = new URLSearchParams({
                query: query,
                page: 1,
                limit: 10
            });
            
            const response2 = await fetch(
                `${BASE_URL}${VERSION}movie/search?${searchParams2}`,
                {
                    method: "GET",
                    headers: { "X-API-KEY": API_KEY }
                }
            );
            
            if (response2.ok) {
                const data2 = await response2.json();
                series = (data2.docs || []).filter(movie => movie.isSeries === true);
            }
        }
        
        if (series.length === 0) {
            if (listMovie) listMovie.innerHTML = `<p>😕 Сериал не найден. Попробуйте уточнить запрос.</p>`;
            if (footPage) footPage.innerHTML = "";
            return;
        }
        
        if (listMovie) {
            if (page === 1 || episodeAllFound.length === 0) {
                episodeAllFound = [];
                
                for (let i = 0; i < Math.min(series.length, 3); i++) {
                    const movie = series[i];
                    let seriesName = movie.name || movie.alternativeName || "название неизвестно";
                    let year = movie.year ? ` (${movie.year})` : "";
                    let country = movie.countries?.[0]?.name || "";
                    
                    const seasonsParams = new URLSearchParams({
                        movieId: movie.id
                    });
                    
                    try {
                        const seasonsResponse = await fetch(
                            `${BASE_URL}${VERSION}season?${seasonsParams}`,
                            {
                                method: "GET",
                                headers: { "X-API-KEY": API_KEY }
                            }
                        );
                        
                        if (seasonsResponse.ok) {
                            const seasonsData = await seasonsResponse.json();
                            const seasons = seasonsData.docs || [];
                            
                            if (parsed.hasEpisode && parsed.season && parsed.episode) {
                                const targetSeason = seasons.find(s => s.number === parsed.season);
                                if (targetSeason && targetSeason.episodes) {
                                    const targetEpisode = targetSeason.episodes.find(
                                        ep => ep.number === parsed.episode
                                    );
                                    if (targetEpisode) {
                                        episodeAllFound.push({
                                            seriesName: seriesName,
                                            year: year,
                                            country: country,
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
                                
                                if (searchText.includes('эпизод с')) {
                                    searchText = searchText.replace('эпизод с', '').trim();
                                }
                                if (searchText.includes('эпизод')) {
                                    searchText = searchText.replace('эпизод', '').trim();
                                }
                                if (searchText.includes('серия с')) {
                                    searchText = searchText.replace('серия с', '').trim();
                                }
                                
                                seasons.forEach(season => {
                                    if (season.episodes && Array.isArray(season.episodes)) {
                                        season.episodes.forEach(ep => {
                                            const epName = (ep.name || ep.enName || "").toLowerCase();
                                            const epDesc = (ep.description || ep.plot || "").toLowerCase();
                                            
                                            if (epName.includes(searchText) || epDesc.includes(searchText)) {
                                                episodeAllFound.push({
                                                    seriesName: seriesName,
                                                    year: year,
                                                    country: country,
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
                    } catch (error) {
                        console.error(`Ошибка загрузки сезонов для ${movie.id}:`, error);
                    }
                }
            }
            
            episodeTotalPages = Math.ceil(episodeAllFound.length / EPISODE_LIMIT);
            episodeCurrentPage = page;
            
            const startIndex = (page - 1) * EPISODE_LIMIT;
            const endIndex = Math.min(startIndex + EPISODE_LIMIT, episodeAllFound.length);
            const pageEpisodes = episodeAllFound.slice(startIndex, endIndex);
            
            listMovie.innerHTML = `<h2>🔍 Поиск эпизодов: "${query}" (${episodeAllFound.length})</h2>`;
            
            if (pageEpisodes.length === 0) {
                const notFoundTemplate = document.querySelector("#episodeNotFoundTemplate");
                if (notFoundTemplate) {
                    listMovie.appendChild(notFoundTemplate.content.cloneNode(true));
                } else {
                    listMovie.innerHTML += `
                        <div style="padding:20px; text-align:center; background:#f8f9fa; border-radius:8px;">
                            <p style="font-size:18px; color:#666;">😕 Эпизодов не найдено</p>
                            <p style="color:#999; font-size:14px;">Попробуйте изменить запрос или уточнить сезон/эпизод</p>
                            <p style="color:#999; font-size:14px;">Примеры: "Друзья S1E1", "Друзья 1 сезон 1 серия", "Эпизод с загаром Росса"</p>
                        </div>
                    `;
                }
            } else {
                const template = document.querySelector("#episodeCardTemplate");
                
                pageEpisodes.forEach((ep, i) => {
                    const globalNumber = (page - 1) * EPISODE_LIMIT + (i + 1);
                    const dateFormatted = ep.date ? new Date(ep.date).toLocaleDateString() : "";
                    
                    let card;
                    if (template) {
                        card = template.content.cloneNode(true);
                    } else {
                        card = document.createElement('div');
                        card.style.cssText = 'padding:12px; margin:8px 0; background:#f8f9fa; border-radius:5px; border-left:4px solid #ffc107; cursor:pointer; transition:all 0.2s;';
                    }
                    
                    const cardDiv = card.querySelector('.episode-card') || card;
                    cardDiv.onclick = () => showDetails(ep.id);
                    cardDiv.onmouseover = function() { this.style.background='#e9ecef'; };
                    cardDiv.onmouseout = function() { this.style.background='#f8f9fa'; };
                    
                    const seriesEl = card.querySelector('.episode-series');
                    if (seriesEl) seriesEl.textContent = `${globalNumber}. ${ep.seriesName}`;
                    
                    const yearEl = card.querySelector('.episode-year');
                    if (yearEl) yearEl.textContent = ep.year || '';
                    
                    const countryEl = card.querySelector('.episode-country');
                    if (countryEl) countryEl.textContent = ep.country ? `(${ep.country})` : '';
                    
                    const seasonEl = card.querySelector('.episode-season');
                    if (seasonEl) seasonEl.textContent = `📺 Сезон ${ep.season}, эпизод ${ep.episode}`;
                    
                    const nameEl = card.querySelector('.episode-name');
                    if (nameEl) nameEl.textContent = ` — ${ep.name}`;
                    
                    const dateEl = card.querySelector('.episode-date');
                    if (dateEl) dateEl.textContent = dateFormatted ? `(${dateFormatted})` : '';
                    
                    const descEl = card.querySelector('.episode-description');
                    if (descEl) descEl.textContent = ep.description || '';
                    
                    listMovie.appendChild(cardDiv);
                });
            }
            
            renderEpisodePagination(page, episodeTotalPages);
        }
    } catch (error) {
        console.error("Ошибка:", error);
        if (listMovie) listMovie.innerHTML = "❌ Ошибка при выполнении запроса";
    }
}

function renderEpisodePagination(current, total) {
    const footPage = document.querySelector("#footPage");
    if (!footPage) return;
    
    if (total <= 1) {
        footPage.innerHTML = `<p style="text-align:center; color:#666;">Страница 1 из 1</p>`;
        return;
    }
    
    let html = `<div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-top:20px; flex-wrap:wrap;">`;
    
    if (current > 1) {
        html += `<button onclick="goToEpisodePage(${current - 1})" style="padding:8px 16px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">
            ⬅ Назад
        </button>`;
    }
    
    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(total, current + 2);
    
    if (startPage > 1) {
        html += `<button onclick="goToEpisodePage(1)" style="padding:8px 12px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">1</button>`;
        if (startPage > 2) html += `<span style="padding:0 5px; color:#666;">...</span>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        if (i === current) {
            html += `<span style="padding:8px 12px; background:#28a745; color:white; border-radius:5px; font-weight:bold;">${i}</span>`;
        } else {
            html += `<button onclick="goToEpisodePage(${i})" style="padding:8px 12px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">${i}</button>`;
        }
    }
    
    if (endPage < total) {
        if (endPage < total - 1) html += `<span style="padding:0 5px; color:#666;">...</span>`;
        html += `<button onclick="goToEpisodePage(${total})" style="padding:8px 12px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">${total}</button>`;
    }
    
    if (current < total) {
        html += `<button onclick="goToEpisodePage(${current + 1})" style="padding:8px 16px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">
            Вперед ➡
        </button>`;
    }
    
    html += `</div>`;
    html += `<p style="text-align:center; margin-top:10px; color:#666;">Страница ${current} из ${total}</p>`;
    
    footPage.innerHTML = html;
}

window.goToEpisodePage = function(page) {
    const overlay = document.querySelector("#overlay");
    if (overlay) overlay.style.display = "none";
    searchEpisodesAdvanced(currentQuery, page);
}

window.showDetails = async function(movieId) {
    const overlay = document.querySelector("#overlay");
    const modalBody = document.querySelector("#modalBody");
    
    if (!overlay || !modalBody) {
        console.error("Оверлей или модальное окно не найдены");
        return;
    }
    
    overlay.style.display = "flex";
    modalBody.innerHTML = "⏳ Загрузка информации...";
    
    try {
        const response = await fetch(
            `${BASE_URL}${VERSION}movie/${movieId}`,
            {
                method: "GET",
                headers: { "X-API-KEY": API_KEY }
            }
        );
        
        if (!response.ok) {
            modalBody.innerHTML = `❌ Ошибка ${response.status}`;
            return;
        }
        
        const movie = await response.json();
        const posterUrl = movie.poster?.url || movie.poster?.previewUrl || '';
        
        const template = document.querySelector("#modalTemplate");
        let modalContent;
        
        if (template) {
            modalContent = template.content.cloneNode(true);
        } else {
            modalContent = document.createElement('div');
            modalContent.style.cssText = 'max-height:70vh; overflow-y:auto; padding-right:5px;';
        }
        
        const container = modalContent.querySelector('div[style*="max-height"]') || modalContent;
        
        const posterDiv = container.querySelector('.modal-poster');
        if (posterDiv) {
            if (posterUrl) {
                posterDiv.innerHTML = `<img src="${posterUrl}" alt="${movie.name || 'Постер'}" style="width:100%; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.2);">`;
            } else {
                posterDiv.innerHTML = `<div style="width:100%; height:250px; background:#ddd; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#666; text-align:center;">Нет постера</div>`;
            }
        }
        
        const titleEl = container.querySelector('.modal-title');
        if (titleEl) titleEl.textContent = movie.name || movie.alternativeName || "N/A";
        
        const altTitleEl = container.querySelector('.modal-alt-title');
        if (altTitleEl) {
            if (movie.alternativeName && movie.alternativeName !== movie.name) {
                altTitleEl.textContent = movie.alternativeName;
            } else {
                altTitleEl.style.display = 'none';
            }
        }
        
        const badgesEl = container.querySelector('.modal-badges');
        if (badgesEl) {
            let badges = '';
            if (movie.year) badges += `<span style="background:#007bff; color:white; padding:2px 12px; border-radius:15px; font-size:13px;">📅 ${movie.year}</span>`;
            if (movie.isSeries !== undefined) {
                badges += `<span style="background:${movie.isSeries ? '#28a745' : '#007bff'}; color:white; padding:2px 12px; border-radius:15px; font-size:13px;">${movie.isSeries ? '📺 Сериал' : '🎬 Фильм'}</span>`;
            }
            if (movie.rating?.kp) badges += `<span style="background:#ffc107; color:#333; padding:2px 12px; border-radius:15px; font-size:13px;">⭐ ${movie.rating.kp.toFixed(1)}</span>`;
            if (movie.rating?.imdb) badges += `<span style="background:#6c757d; color:white; padding:2px 12px; border-radius:15px; font-size:13px;">IMDb: ${movie.rating.imdb.toFixed(1)}</span>`;
            if (movie.ageRating) badges += `<span style="background:#dc3545; color:white; padding:2px 12px; border-radius:15px; font-size:13px;">🔞 ${movie.ageRating}+</span>`;
            if (movie.movieLength) badges += `<span style="background:#17a2b8; color:white; padding:2px 12px; border-radius:15px; font-size:13px;">⏱ ${movie.movieLength} мин</span>`;
            badgesEl.innerHTML = badges;
        }
        
        const detailsEl = container.querySelector('.modal-details');
        if (detailsEl) {
            let details = '';
            if (movie.genres?.length) details += `<p><strong>Жанры:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>`;
            if (movie.countries?.length) details += `<p><strong>Страны:</strong> ${movie.countries.map(c => c.name).join(', ')}</p>`;
            if (movie.description) details += `<p><strong>Описание:</strong> ${movie.description}</p>`;
            if (movie.shortDescription) details += `<p><strong>Кратко:</strong> ${movie.shortDescription}</p>`;
            if (movie.slogan) details += `<p><strong>Слоган:</strong> "${movie.slogan}"</p>`;
            if (movie.votes?.kp) details += `<p><strong>Голосов KP:</strong> ${movie.votes.kp.toLocaleString()}</p>`;
            if (movie.votes?.imdb) details += `<p><strong>Голосов IMDb:</strong> ${movie.votes.imdb.toLocaleString()}</p>`;
            if (movie.status) details += `<p><strong>Статус:</strong> ${movie.status}</p>`;
            if (movie.top250) details += `<p><strong>🏆 Топ-250:</strong> #${movie.top250}</p>`;
            if (movie.top10) details += `<p><strong>🏆 Топ-10:</strong> #${movie.top10}</p>`;
            if (movie.ticketsOnSale) details += `<p><strong>🎫 Билеты в продаже</strong></p>`;
            if (movie.premiere?.world) details += `<p><strong>Премьера в мире:</strong> ${new Date(movie.premiere.world).toLocaleDateString()}</p>`;
            if (movie.premiere?.russia) details += `<p><strong>Премьера в России:</strong> ${new Date(movie.premiere.russia).toLocaleDateString()}</p>`;
            if (movie.budget?.value) details += `<p><strong>Бюджет:</strong> ${movie.budget.value.toLocaleString()} ${movie.budget.currency || ''}</p>`;
            if (movie.fees?.world?.value) details += `<p><strong>Сборы в мире:</strong> ${movie.fees.world.value.toLocaleString()} ${movie.fees.world.currency || ''}</p>`;
            if (movie.persons?.length) {
                details += `<p><strong>Актеры и съемочная группа:</strong></p><div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:10px;">`;
                movie.persons.slice(0, 12).forEach(p => {
                    details += `<span style="background:#e9ecef; padding:3px 10px; border-radius:15px; font-size:12px;">${p.name || p.enName || 'Без имени'}${p.profession ? `(${p.profession})` : ''}</span>`;
                });
                if (movie.persons.length > 12) details += `<span style="color:#666; font-size:12px;">+ еще ${movie.persons.length - 12}</span>`;
                details += `</div>`;
            }
            if (movie.watchability?.items?.length) details += `<p><strong>Смотреть на:</strong> ${movie.watchability.items.map(w => w.name).join(', ')}</p>`;
            if (movie.networks?.items?.length) details += `<p><strong>Сети:</strong> ${movie.networks.items.map(n => n.name).join(', ')}</p>`;
            detailsEl.innerHTML = details;
        }
        
        if (template) {
            modalBody.innerHTML = '';
            modalBody.appendChild(modalContent);
        } else {
            modalBody.innerHTML = container.innerHTML;
        }
        
    } catch (error) {
        console.error("Ошибка загрузки деталей:", error);
        modalBody.innerHTML = "❌ Ошибка при загрузке информации";
    }
}

window.closeOverlay = function() {
    const overlay = document.querySelector("#overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeOverlay();
    }
});

function renderPagination(current, total, type) {
    const footPage = document.querySelector("#footPage");
    if (!footPage) return;
    
    if (total <= 1) {
        footPage.innerHTML = `<p style="text-align:center; color:#666;">Страница 1 из 1</p>`;
        return;
    }
    
    let html = `<div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-top:20px; flex-wrap:wrap;">`;
    
    if (current > 1) {
        html += `<button onclick="goToPage(${current - 1})" style="padding:8px 16px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">
            ⬅ Назад
        </button>`;
    }
    
    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(total, current + 2);
    
    if (startPage > 1) {
        html += `<button onclick="goToPage(1)" style="padding:8px 12px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">1</button>`;
        if (startPage > 2) html += `<span style="padding:0 5px; color:#666;">...</span>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        if (i === current) {
            html += `<span style="padding:8px 12px; background:#28a745; color:white; border-radius:5px; font-weight:bold;">${i}</span>`;
        } else {
            html += `<button onclick="goToPage(${i})" style="padding:8px 12px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">${i}</button>`;
        }
    }
    
    if (endPage < total) {
        if (endPage < total - 1) html += `<span style="padding:0 5px; color:#666;">...</span>`;
        html += `<button onclick="goToPage(${total})" style="padding:8px 12px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">${total}</button>`;
    }
    
    if (current < total) {
        html += `<button onclick="goToPage(${current + 1})" style="padding:8px 16px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">
            Вперед ➡
        </button>`;
    }
    
    html += `</div>`;
    html += `<p style="text-align:center; margin-top:10px; color:#666;">Страница ${current} из ${total}</p>`;
    
    footPage.innerHTML = html;
}

window.goToPage = function(page) {
    const overlay = document.querySelector("#overlay");
    if (overlay) overlay.style.display = "none";
    fetchMovies(currentQuery, currentType, page);
}

document.addEventListener("DOMContentLoaded", () => {
    const inputTitle = document.querySelector("#inputTitle");
    const searchButton = document.querySelector("#searchButton");
    
    if (inputTitle) {
        inputTitle.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                searchMovies();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener("click", searchMovies);
    }
});