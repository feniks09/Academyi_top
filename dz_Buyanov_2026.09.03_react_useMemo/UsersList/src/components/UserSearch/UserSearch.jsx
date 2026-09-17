import React, { useState, useMemo } from 'react';

export const UserSearch = () => {
  const [users] = useState([
    { id: 1, name: 'Алексей' },
    { id: 2, name: 'Мария' },
    { id: 3, name: 'Иван' },
    { id: 4, name: 'Ольга' },
    { id: 5, name: 'Дмитрий' },
  ]);
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    console.log('🔍 Фильтрация выполняется...');
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Поиск пользователей (useMemo)</h2>

      <label>
        Введите имя
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Начните вводить имя..."
        />
      </label>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => setCount(prev => prev + 1)}>Лишний рендер {count}</button>
    </div>
  );
}

