"use strict"

document.addEventListener("DOMContentLoaded", () => {
    // Получаем элементы
    const inputNameColor = document.querySelector("#nameColor");
    const inputTypeColor = document.querySelector("#typeColor");
    const inputIndexColor = document.querySelector("#indexColor");
    const output = document.querySelector("#output");
    const buttonSave = document.querySelector("#saveButton");
    const clearAllButton = document.querySelector("#clearAllButton");
    const templateCartColor = document.querySelector("#templateCartColor");

    // Функция создания карточки цвета
    function createColorCard(name, type, value) {
        const copyCart = templateCartColor.content.cloneNode(true);
        const card = copyCart.querySelector(".color-card");
        const inner = copyCart.querySelector(".color-card-inner");
        const nameSpan = copyCart.querySelector(".outputNameColor");
        const typeSpan = copyCart.querySelector(".outputTypeColor");
        const valueSpan = copyCart.querySelector(".outputIndexColor");

        // Заполняем данные
        nameSpan.textContent = name.toUpperCase();
        typeSpan.textContent = type;
        valueSpan.textContent = Array.isArray(value) ? value.join(', ') : value;

        // Форматируем цвет для фона
        let bgColor = '';
        if (type === 'RGB') {
            bgColor = `rgb(${Array.isArray(value) ? value.join(',') : value})`;
        } else if (type === 'RGBA') {
            bgColor = `rgba(${Array.isArray(value) ? value.join(',') : value})`;
        } else if (type === 'HEX') {
            bgColor = value.startsWith('#') ? value : `#${value}`;
        }

        card.style.backgroundColor = bgColor;

        // Добавляем кнопку удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteColor(name, card);
        });
        card.appendChild(deleteBtn);

        return copyCart;
    }

    // Функция сохранения цвета в localStorage
    function saveColorToStorage(name, type, value) {
        const colorData = {
            name: name,
            type: type,
            value: value
        };
        localStorage.setItem(`color_${name.toLowerCase()}`, JSON.stringify(colorData));
    }

    // Функция загрузки цветов из localStorage
    function loadColorsFromStorage() {
        output.innerHTML = '';
        let hasColors = false;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('color_')) {
                try {
                    const colorData = JSON.parse(localStorage.getItem(key));
                    const card = createColorCard(colorData.name, colorData.type, colorData.value);
                    output.appendChild(card);
                    hasColors = true;
                } catch (e) {
                    console.error('Ошибка загрузки цвета:', e);
                }
            }
        }

        if (!hasColors) {
            output.innerHTML = '<p style="color: #999; font-style: italic;">Нет сохранённых цветов</p>';
        }
    }

    // Функция удаления цвета
    function deleteColor(name, cardElement) {
        if (confirm(`Удалить цвет "${name}"?`)) {
            localStorage.removeItem(`color_${name.toLowerCase()}`);
            cardElement.remove();
            
            // Проверяем, есть ли ещё карточки
            if (output.children.length === 0) {
                output.innerHTML = '<p style="color: #999; font-style: italic;">Нет сохранённых цветов</p>';
            }
        }
    }

    // Функция очистки всех цветов
    function clearAllColors() {
        if (confirm('Удалить все сохранённые цвета?')) {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('color_')) {
                    keys.push(key);
                }
            }
            keys.forEach(key => localStorage.removeItem(key));
            loadColorsFromStorage();
        }
    }

    // Функция валидации и сохранения нового цвета
    function saveNewColor() {
        const name = inputNameColor.value.trim();
        const type = inputTypeColor.value;
        let value = inputIndexColor.value.trim();

        // Валидация
        if (!name) {
            alert('Пожалуйста, введите название цвета!');
            inputNameColor.focus();
            return;
        }

        if (!value) {
            alert('Пожалуйста, введите значение цвета!');
            inputIndexColor.focus();
            return;
        }

        // Проверка на дубликат
        if (localStorage.getItem(`color_${name.toLowerCase()}`)) {
            alert(`Цвет с названием "${name}" уже существует!`);
            return;
        }

        // Обработка значения в зависимости от типа
        let formattedValue = value;
        
        if (type === 'RGB') {
            // Проверяем формат RGB (пример: 154,205,50)
            const parts = value.split(',').map(v => v.trim());
            if (parts.length !== 3 || parts.some(v => isNaN(v) || v < 0 || v > 255)) {
                alert('Неверный формат RGB! Используйте: 154,205,50');
                return;
            }
            formattedValue = parts.map(v => parseInt(v));
        } 
        else if (type === 'RGBA') {
            // Проверяем формат RGBA (пример: 0,139,139,1)
            const parts = value.split(',').map(v => v.trim());
            if (parts.length < 3 || parts.length > 4) {
                alert('Неверный формат RGBA! Используйте: 0,139,139,1');
                return;
            }
            if (parts.some((v, i) => {
                if (i === 3) return isNaN(v) || v < 0 || v > 1;
                return isNaN(v) || v < 0 || v > 255;
            })) {
                alert('Неверный формат RGBA! Используйте: 0,139,139,1');
                return;
            }
            formattedValue = parts.map((v, i) => i === 3 ? parseFloat(v) : parseInt(v));
        } 
        else if (type === 'HEX') {
            // Проверяем формат HEX (пример: #FF4500 или FF4500)
            let hex = value;
            if (!hex.startsWith('#')) {
                hex = '#' + hex;
            }
            // Проверяем валидность HEX
            if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                alert('Неверный формат HEX! Используйте: #FF4500 или FF4500');
                return;
            }
            formattedValue = hex;
        }

        // Создаём карточку
        const card = createColorCard(name, type, formattedValue);
        output.appendChild(card);

        // Сохраняем в localStorage
        saveColorToStorage(name, type, formattedValue);

        // Очищаем поля
        inputNameColor.value = '';
        inputIndexColor.value = '';

        // Убираем сообщение "Нет сохранённых цветов", если оно было
        const emptyMsg = output.querySelector('p');
        if (emptyMsg) {
            emptyMsg.remove();
        }
    }

    // Обработчики событий
    buttonSave.addEventListener("click", saveNewColor);

    clearAllButton.addEventListener("click", clearAllColors);

    // Обработка Enter в полях ввода
    inputNameColor.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            inputIndexColor.focus();
        }
    });

    inputIndexColor.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            saveNewColor();
        }
    });

    // Загружаем сохранённые цвета при старте
    loadColorsFromStorage();

    // Выводим количество сохранённых цветов в консоль
    const colorCount = Object.keys(localStorage).filter(key => key.startsWith('color_')).length;
    console.log(`Загружено ${colorCount} цветов`);
});