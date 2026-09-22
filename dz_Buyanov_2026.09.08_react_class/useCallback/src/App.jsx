import React, { useState, useCallback } from 'react';
import TodoItem from './components/useCallback/useCallback';


function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить React', completed: false },
    { id: 2, text: 'Выучить useCallback', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue('');
  };

  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Список задач (useCallback)</h1>

      <div>
        <input
          type="text"
          placeholder="Новая задача"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <ul style={{ padding: 0, marginTop: '16px' }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;