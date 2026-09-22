import React, { useState, useMemo } from 'react';

const initialUsers = [
  { id: 1, name: "Алексей" },
  { id: 2, name: "Мария" },
  { id: 3, name: "Иван" },
  { id: 4, name: "Ольга" },
  { id: 5, name: "Дмитрий" },
];

function UserSearch() {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [renderCount, setRenderCount] = useState(0);

  const filteredUsers = useMemo(() => {
    console.log('Фильтрация выполняется, search =', search);
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Поиск пользователей (useMemo)</h2>

      <label htmlFor="search">Введите имя</label>
      <br />
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Например: Иван"
        style={{ marginTop: 8, padding: 6, width: 250 }}
      />

      {filteredUsers.length === 0 ? (
        <p>Пользователи не найдены</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <button onClick={() => setRenderCount(renderCount + 1)}>
        Вызвать лишний ререндер
      </button>
      <p>Лишний ререндер: {renderCount}</p>
    </div>
  );
}

export default UserSearch;