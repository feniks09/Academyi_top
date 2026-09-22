import React, { memo } from 'react';

const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log(`TodoItem render: "${todo.text}" (id: ${todo.id})`);

  return (
    <li style={{ marginBottom: '8px', listStyle: 'none' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          margin: '0 8px',
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </li>
  );
});

export default TodoItem;